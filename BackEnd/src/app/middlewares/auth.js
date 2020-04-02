import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
   const authHeader = req.headers.authorization;

   if (!authHeader) {
      return res.status(401).json({ error: 'Token not provided' });
   }

   const [, token] = authHeader.split(' ');

   try {
      const decoded = await promisify(jwt.verify)(token, authConfig.secretUser);
      req.typeUser = 'user';
      req.userId = decoded.id;
      return next();
   } catch (err) {
      try {
         const decoded = await promisify(jwt.verify)(
            token,
            authConfig.secretEntrepreneurial
         );
         req.typeUser = 'entrepreneurial';
         req.userId = decoded.id;
         return next();
      } catch (er) {
         return res.status(401).json({ error: 'Token Invalid' });
      }
   }
};
