import * as Yup from 'yup';

import Address from '../models/Address';
import File from '../models/File';
import User from '../models/User';

class UserController {
   async index(req, res) {
      const { userId } = req;

      const user = await User.findOne({
         where: { id: userId },
         attributes: ['id', 'name', 'email', 'date_age'],
         include: [
            { model: File, as: 'avatar', attributes: ['id', 'path', 'url'] },
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

      return res.json(user);
   }

   async store(req, res) {
      const schema = Yup.object().shape({
         name: Yup.string().required(),
         email: Yup.string().email().required(),
         password: Yup.string().min(6).required(),
         date_age: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
         return res.status(400).json({ error: 'Validation fails' });
      }

      // Verifica se usuario ja existe
      const userExists = await User.findOne({
         where: { email: req.body.email },
      });

      if (userExists) {
         return res.status(400).json({ error: 'user already exists.' });
      }

      // Cria o novo usuario
      const { id, name, email, date_age } = await User.create(req.body);

      return res.json({ id, name, email, date_age });
   }

   async update(req, res) {
      const schema = Yup.object().shape({
         name: Yup.string(),
         email: Yup.string().email(),
         old_password: Yup.string().min(6),
         password: Yup.string()
            .min(6)
            .when('old_password', (old_password, field) =>
               old_password ? field.required() : field
            ),
         confirmPassword: Yup.string().when('password', (password, field) =>
            password ? field.required().oneOf([Yup.ref('password')]) : field
         ),
         date_age: Yup.string(),
         address_id: Yup.number(),
      });

      if (!(await schema.isValid(req.body))) {
         return res.status(400).json({ error: 'Validation fails' });
      }

      // Procura o usuario no banco
      const user = await User.findByPk(req.userId);

      const { oldPassword } = req.body;

      // Se alterar email, verifica se ja não existe o email
      if (req.body.email) {
         const verify_email = await User.findOne({
            where: { email: req.body.email },
         });
         if (verify_email) {
            return res.status(400).json({ error: 'Email already exists ' });
         }
      }

      // Se alterar a senha, Verifica se a senha antiga é igual a informada
      if (oldPassword && !(await user.checkPassword(oldPassword))) {
         return res.status(401).json({ error: 'Password does not match' });
      }

      // Altera os dados no Banco
      await user.update(req.body);

      // Consulta os novos Dados
      const { name, email, date_age, avatar, Addresses } = await User.findByPk(
         req.userId,
         {
            include: [
               { model: File, as: 'avatar', attributes: ['id', 'path', 'url'] },
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
         }
      );

      // Calcula idade da pessoa
      const age = user.checkAge();

      return res.json({
         name,
         email,
         date_age,
         age,
         avatar,
         Addresses,
      });
   }

   async delete(req, res) {
      const user = await User.findByPk(req.userId);

      if (!user) {
         return res.status(401).json({ error: 'User does not exists' });
      }

      await user.destroy();

      return res.json({
         sucess: 'User was deleted',
      });
   }
}

export default new UserController();
