import * as Yup from 'yup';

import Address from '../models/Address';
import Entrepreneurial from '../models/Entrepreneurial';
import File from '../models/File';
import Product from '../models/Product';
import PurchaseOrder from '../models/PurchaseOrder';
import PurchaseOrder_Products from '../models/PurchaseOrder_Products';
import User from '../models/User';

class PurchaseOrderEntController {
   async index(req, res) {
      const { userId } = req;

      const purchaseOrder = await PurchaseOrder_Products.findAll({
         where: { entrepreneurial_id: userId },
         order: [['id', 'DESC']],
         attributes: ['id', 'status', 'qty', 'tot_price'],
         include: [
            {
               model: Product,
               attributes: ['id', 'category', 'name', 'price', 'amount'],
               include: [
                  {
                     model: File,
                     attributes: ['id', 'path', 'url'],
                  },
               ],
            },
            {
               model: PurchaseOrder,
               attributes: ['id', 'status', 'delivery_type', 'payment_type'],
               include: [
                  {
                     model: User,
                     as: 'user',
                     attributes: ['name', 'email'],
                     include: [
                        {
                           model: File,
                           as: 'avatar',
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
            },
         ],
      });

      return res.json(purchaseOrder);
   }

   async update(req, res) {
      const schema = Yup.object().shape({
         status: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
         return res.status(400).json({ error: 'Validation fails' });
      }

      const purchaseProduct = await PurchaseOrder_Products.findOne({
         where: { id: req.params.id },
      });

      if (!purchaseProduct) {
         return res
            .status(401)
            .json({ error: 'Purchase Order does not exists ' });
      }

      await purchaseProduct.update({ status: req.body.status });

      return res.json({ sucess: req.body.status });
   }
}

export default new PurchaseOrderEntController();
