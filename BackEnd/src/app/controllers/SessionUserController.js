import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import authConfig from '../../config/auth';
import Address from '../models/Address';
import File from '../models/File';
import User from '../models/User';

class SessionUserControler {
   async store(req, res) {
      const schema = Yup.object().shape({
         email: Yup.string().email().required(),
         password: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
         return res.status(400).json({ error: 'Validation fails' });
      }

      const { email, password } = req.body;

      const user = await User.findOne({
         where: { email },
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

      if (!user) {
         return res.status(401).json({ error: 'User not found' });
      }

      if (!(await user.checkPassword(password))) {
         return res.status(401).json({ error: 'Password does not match' });
      }

      const { id, name, date_age, avatar, Addresses } = user;
      return res.json({
         user: {
            id,
            name,
            date_age,
            email,
            avatar,
            Addresses,
         },
         token: jwt.sign({ id }, authConfig.secretUser, {
            expiresIn: authConfig.expiresIn,
         }),
      });
   }
}

export default new SessionUserControler();
