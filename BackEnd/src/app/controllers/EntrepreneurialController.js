import * as Yup from 'yup';

import Address from '../models/Address';
import Entrepreneurial from '../models/Entrepreneurial';
import File from '../models/File';
import Product from '../models/Product';
import verifyCNPJ from '../util/verifyCNPF';

class EntrepreneurialController {
   async index(req, res) {
      const { userId } = req;

      const entrepreneurial = await Entrepreneurial.findOne({
         where: { id: userId },
         attributes: ['id', 'name', 'email', 'cnpj', 'cell'],
         include: [
            { model: File, as: 'avatar', attributes: ['id', 'path', 'url'] },
            {
               model: Product,
               as: 'products',
               attributes: ['id', 'name', 'price', 'amount'],
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

      return res.json(entrepreneurial);
   }

   async store(req, res) {
      const schema = Yup.object().shape({
         name: Yup.string().required(),
         email: Yup.string().email().required(),
         password: Yup.string().min(6).required(),
         cnpj: Yup.string().required(),
         cell: Yup.string().required(),
      });

      // Verifica a validação
      if (!(await schema.isValid(req.body))) {
         return res.status(400).json({ error: 'Validation fails' });
      }

      // Verifica se o email ou cnpj ja existem
      const entrepreneurialExists = await Entrepreneurial.findOne({
         where: { email: req.body.email, cnpj: req.body.cnpj.toString() },
      });

      if (entrepreneurialExists) {
         return res
            .status(400)
            .json({ error: 'Entrepreneurial already exists.' });
      }

      // Consulta o CNPJ, verifica se o nome é o mesmo do CNPJ e o status do mesmo
      const isCNPJ = await verifyCNPJ(req.body.cnpj, req.body.name);

      if (isCNPJ.status === false) {
         return res.status(400).json({ error: isCNPJ.message });
      }

      // Cria um novo Entrepreneurial
      const { id, name, email, cnpj, cell } = await Entrepreneurial.create(
         req.body
      );

      return res.json({ id, name, email, cnpj, cell });
   }

   async update(req, res) {
      const schema = Yup.object().shape({
         name: Yup.string(),
         email: Yup.string().email(),
         cnpj: Yup.string(),
         cell: Yup.string(),
         old_password: Yup.string().min(6),
         password: Yup.string()
            .min(6)
            .when('old_password', (old_password, field) =>
               old_password ? field.required() : field
            ),
         confirmPassword: Yup.string().when('password', (password, field) =>
            password ? field.required().oneOf([Yup.ref('password')]) : field
         ),
      });

      if (!(await schema.isValid(req.body))) {
         return res.status(400).json({ error: 'Validation fails' });
      }

      // Procura o usuario no banco
      const entrepreneurial = await Entrepreneurial.findByPk(req.userId);

      const { oldPassword } = req.body;

      // Se alterar email, verifica se ja não existe o email
      if (req.body.email) {
         const verify_email = await Entrepreneurial.findOne({
            where: { email: req.body.email },
         });
         if (verify_email) {
            return res.status(401).json({ error: 'Email already exists ' });
         }
      }

      // Se alterar CNPJ, verifica se ja não existe o CNPJ
      if (req.body.cnpj) {
         const verify_cnpj = await Entrepreneurial.findOne({
            where: { cnpj: req.body.cnpj.toString() },
         });

         if (verify_cnpj) {
            return res.status(401).json({ error: 'CNPJ already exists ' });
         }

         let isCNPJ;

         // Verifica se o nome tambem vai ser alterado para verificar o CNPJ
         if (req.body.name) {
            isCNPJ = await verifyCNPJ(req.body.cnpj, req.body.name);
         } else {
            isCNPJ = await verifyCNPJ(req.body.cnpj, entrepreneurial.name);
         }

         if (isCNPJ.status === false) {
            return res.status(400).json({ error: isCNPJ.message });
         }
      }

      // Se alterar a senha, Verifica se a senha antiga é igual a informada
      if (oldPassword && !(await entrepreneurial.checkPassword(oldPassword))) {
         return res.status(401).json({ error: 'Password does not match' });
      }

      // Altera os dados no Banco
      await entrepreneurial.update(req.body);

      // Consulta os novos Dados
      const newEntrepreneurial = await Entrepreneurial.findByPk(req.userId, {
         attributes: ['id', 'name', 'email', 'cnpj', 'cell'],
         include: [
            { model: File, as: 'avatar', attributes: ['id', 'path', 'url'] },
            {
               model: Product,
               as: 'products',
               attributes: ['id', 'name', 'price', 'amount'],
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

      return res.json(newEntrepreneurial);
   }

   async delete(req, res) {
      const entrepreneurial = await Entrepreneurial.findByPk(req.params.id);

      if (!entrepreneurial) {
         return res
            .status(401)
            .json({ error: 'Entrepreneurial does not exists' });
      }

      await entrepreneurial.destroy();

      return res.json({
         sucess: 'Entrepreneurial was deleted',
      });
   }
}

export default new EntrepreneurialController();
