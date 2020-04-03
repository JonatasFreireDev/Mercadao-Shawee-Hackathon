import * as Yup from 'yup';

import Address from '../models/Address';
import Entrepreneurial from '../models/Entrepreneurial';
import File from '../models/File';
import Product from '../models/Product';
import PurchaseOrder from '../models/PurchaseOrder';
import PurchaseOrder_Products from '../models/PurchaseOrder_Products';
import User from '../models/User';
import Notification from '../schemas/Notification';

class PurchaseOrderController {
   async index(req, res) {
      const { userId } = req;

      const purchaseOrder = await PurchaseOrder.findAll({
         where: { user_id: userId },
         attributes: [
            'id',
            'status',
            'delivery_type',
            'payment_type',
            'tot_price',
         ],
         order: [['id', 'DESC']],
         include: [
            {
               model: User,
               as: 'user',
               attributes: ['id', 'name', 'email'],
               include: [
                  {
                     model: File,
                     as: 'avatar',
                     attributes: ['id', 'path', 'url'],
                  },
               ],
            },
            {
               model: Product,
               attributes: ['id', 'name', 'category', 'price'],
               through: {
                  model: PurchaseOrder_Products,
                  attributes: ['status', 'qty', 'tot_price'],
               },
               include: [
                  {
                     model: Entrepreneurial,
                     as: 'entrepreneurial',
                     attributes: [
                        'id',
                        'name',
                        'email',
                        'cnpj',
                        'category',
                        'cell',
                     ],
                     include: [
                        {
                           model: File,
                           as: 'avatar',
                           attributes: ['id', 'path', 'url'],
                        },
                        {
                           model: Address,
                           attributes: [
                              'id',
                              'street',
                              'number',
                              'neighborhood',
                              'city',
                              'state',
                              'country',
                              'postal_code',
                           ],
                        },
                     ],
                  },
                  {
                     model: File,
                     attributes: ['id', 'path', 'url'],
                  },
               ],
            },
            {
               model: Address,
               attributes: [
                  'id',
                  'street',
                  'number',
                  'neighborhood',
                  'city',
                  'state',
                  'country',
                  'postal_code',
               ],
            },
         ],
      });

      return res.json(purchaseOrder);
   }

   async store(req, res) {
      const schema = Yup.object().shape({
         products: Yup.array().required(),
         delivery_address: Yup.number().positive().required(),
         delivery_type: Yup.string().required(),
         payment_type: Yup.string().required(),
      });

      // Verifica a validação
      if (!(await schema.isValid(req.body))) {
         return res.status(400).json({ error: 'Validation fails' });
      }

      const { userId } = req;

      if (!userId) {
         return res.status(400).json({ error: 'Inform User.' });
      }

      // Valida endereço
      const isAddress = Address.findOne({
         where: { id: req.body.delivery_address, user_id: req.userId },
      });

      if (!isAddress) {
         return res.status(400).json({ error: 'Address does not exists' });
      }

      // Cria uma nova Ordem de compra
      const savedOrder = await PurchaseOrder.create({
         status: 'pending payment',
         user_id: userId,
         ...req.body,
         tot_price: 100,
      });

      const promisse = req.body.products.map(async (product) => {
         const prod = await Product.findOne({
            where: { id: product.id },
         });

         if (!prod) {
            return res
               .status(400)
               .json({ error: `Item ${product.name} does not exists` });
         }

         if (product.qty > prod.amount) {
            await savedOrder.update({
               status: 'Canceled',
            });
            return res.status(400).json({
               error: `Item ${product.name} have just ${prod.amount} products, verify your quantity`,
            });
         }

         await prod.update({ amount: prod.amount - product.qty });

         await Notification.create({
            content: `Voce vendeu ${product.qty} ${prod.name} !`,
            user_id: prod.entrepreneurial_id,
            type_user: 'entrepreneurial',
         });

         const responseProducts = await PurchaseOrder_Products.create({
            entrepreneurial_id: prod.entrepreneurial_id,
            products_id: product.id,
            purchase_order_id: savedOrder.id,
            qty: product.qty,
            tot_price: product.qty * prod.price,
            status: 'pending payment',
         });

         return responseProducts;
      });

      await Promise.all(promisse);

      const atual = await PurchaseOrder.findByPk(savedOrder.id, {
         attributes: [
            'status',
            'delivery_type',
            'payment_type',
            'tot_price',
            'created_at',
         ],
         include: [
            {
               model: Product,
               attributes: ['id', 'name', 'category', 'price'],
               through: {
                  model: PurchaseOrder_Products,
                  attributes: ['status', 'qty', 'tot_price'],
               },
               include: [
                  {
                     model: Entrepreneurial,
                     as: 'entrepreneurial',
                     attributes: [
                        'id',
                        'name',
                        'email',
                        'cnpj',
                        'category',
                        'cell',
                     ],
                     include: [
                        {
                           model: File,
                           as: 'avatar',
                           attributes: ['id', 'path', 'url'],
                        },
                        {
                           model: Address,
                           attributes: [
                              'id',
                              'street',
                              'number',
                              'neighborhood',
                              'city',
                              'state',
                              'country',
                              'postal_code',
                           ],
                        },
                     ],
                  },
                  {
                     model: File,
                     attributes: ['id', 'path', 'url'],
                  },
               ],
            },
            {
               model: Address,
               attributes: [
                  'id',
                  'street',
                  'number',
                  'neighborhood',
                  'city',
                  'state',
                  'country',
                  'postal_code',
               ],
            },
         ],
      });

      return res.json(atual);
   }

   async update(req, res) {
      const schema = Yup.object().shape({
         status: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
         return res.status(400).json({ error: 'Validation fails' });
      }

      // Procura a ordem no banco
      const purchaseOrder = await PurchaseOrder.findByPk(req.params.id);

      if (!purchaseOrder) {
         return res
            .status(401)
            .json({ error: 'Purchase Order does not exists ' });
      }

      // Altera para cancelado tanto na ordem do usuario, quanto nos pedidos
      const productsOrder = await PurchaseOrder_Products.findAll({
         where: { purchase_order_id: req.params.id },
      });

      const promisse = productsOrder.map(async (prodOrder) => {
         const prom = await prodOrder.update({
            status: req.body.status,
         });

         await Notification.create({
            content: `O usuario cancelou uma compra de um produto !`,
            user_id: prodOrder.entrepreneurial_id,
            type_user: 'entrepreneurial',
         });

         return prom;
      });

      await Promise.all(promisse);

      await purchaseOrder.update({ status: req.body.status });

      return res.json({ sucess: req.body.status });
   }
}

export default new PurchaseOrderController();
