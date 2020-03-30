import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import authConfig from '../../config/auth';
import Address from '../models/Address';
import Entrepreneurial from '../models/Entrepreneurial';
import File from '../models/File';

class SessionEntrepreneurialControler {
   async store(req, res) {
      const schema = Yup.object().shape({
         email: Yup.string().email().required(),
         password: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
         return res.status(400).json({ error: 'Validation fails' });
      }

      const { email, password } = req.body;

      const entrepreneurial = await Entrepreneurial.findOne({
         where: { email },
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
      });

      if (!entrepreneurial) {
         return res.status(401).json({ error: 'Entrepreneurial not found' });
      }

      if (!(await entrepreneurial.checkPassword(password))) {
         return res.status(401).json({ error: 'Password does not match' });
      }

      const { id, name, cnpj, cell, avatar, Addresses } = entrepreneurial;
      return res.json({
         entrepreneurial: {
            id,
            name,
            cnpj,
            cell,
            email,
            avatar,
            Addresses,
         },
         token: jwt.sign({ id }, authConfig.secretEntrepreneurial, {
            expiresIn: authConfig.expiresIn,
         }),
      });
   }
}

export default new SessionEntrepreneurialControler();
