import * as Yup from 'yup';

import max from '../../config/entrepreneurial';
import File from '../models/File';
import Product from '../models/Product';

class ProductController {
   async index(req, res) {
      const { userId } = req;

      const product = await Product.findAll({
         where: { entrepreneurial_id: userId },
         attributes: ['id', 'name', 'category', 'price', 'amount'],
         include: [{ model: File, attributes: ['id', 'path', 'url'] }],
      });

      return res.json(product);
   }

   async store(req, res) {
      const schema = Yup.object().shape({
         name: Yup.string().required(),
         category: Yup.string().required(),
         price: Yup.number().positive().required(),
         amount: Yup.number().min(0).required(),
      });

      const { userId } = req;

      // Verifica a validação
      if (!(await schema.isValid(req.body))) {
         return res.status(400).json({ error: 'Validation fails' });
      }

      // Restringe a quantidade de itens
      const { count } = await Product.findAndCountAll({
         where: { entrepreneurial_id: userId },
      });

      if (count >= max.maxProduct) {
         return res
            .status(400)
            .json({ error: `The limit of product is ${max.maxProduct}` });
      }

      // Cria um novo Produto
      const { id, name, category, price, amount } = await Product.create({
         entrepreneurial_id: userId,
         ...req.body,
      });

      let file = {};

      if (req.file) {
         const { originalname, filename: path } = req.file;

         file = await File.create({
            name: originalname,
            path,
            product_id: id,
         });
      }

      const { id: idFile, url: newUrl, path: newPath } = file;

      return res.json({
         id,
         name,
         category,
         price,
         amount,
         files: {
            id: idFile,
            url: newUrl,
            path: newPath,
         },
      });
   }

   async update(req, res) {
      const schema = Yup.object().shape({
         name: Yup.string(),
         price: Yup.number().positive(),
         amount: Yup.number().min(0),
      });

      if (!(await schema.isValid(req.body))) {
         return res.status(400).json({ error: 'Validation fails' });
      }

      // Procura o produto no banco
      const product = await Product.findByPk(req.params.id);

      // Altera os dados no Banco
      await product.update(req.body);

      // Consulta os novos Dados
      const newProduct = await Product.findByPk(req.userId, {
         attributes: ['id', 'name', 'category', 'price', 'amount'],
         include: [{ model: File, attributes: ['id', 'path', 'url'] }],
      });

      return res.json(newProduct);
   }

   async delete(req, res) {
      const product = await Product.findByPk(req.params.id);

      if (!product) {
         return res.status(401).json({ error: 'Product does not exists' });
      }

      await product.destroy();

      return res.json({
         sucess: 'Product was deleted',
      });
   }
}

export default new ProductController();
