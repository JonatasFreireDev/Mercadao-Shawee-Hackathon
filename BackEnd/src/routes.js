import { Router } from 'express';

import multer from 'multer';

import AddressController from './app/controllers/AddressController';
import EntrepreneurialController from './app/controllers/EntrepreneurialController';
import FileController from './app/controllers/FileController';
import SessionEntrepreneurialController from './app/controllers/SessionEntrepreneurialController';
import SessionUserController from './app/controllers/SessionUserController';
import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/auth';
import authEntrepreneurialMiddleware from './app/middlewares/authEntrepreneurial';
import authUserMiddleware from './app/middlewares/authUser';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/entrepreneurial', EntrepreneurialController.store);
routes.post('/user', UserController.store);

routes.post('/session/entrepreneurial', SessionEntrepreneurialController.store);
routes.post('/session/user', SessionUserController.store);

// Private Routes
routes.post('/address', authMiddleware, AddressController.store);
routes.put('/address/:id', authMiddleware, AddressController.update);
routes.delete('/address/:id', authMiddleware, AddressController.delete);

routes.post(
   '/files',
   authMiddleware,
   upload.single('file'),
   FileController.store
);

// Just Entrepreneurial
routes.get(
   '/entrepreneurial/',
   authEntrepreneurialMiddleware,
   EntrepreneurialController.index
);
routes.put(
   '/entrepreneurial/',
   authEntrepreneurialMiddleware,
   EntrepreneurialController.update
);
routes.delete(
   '/entrepreneurial/',
   authEntrepreneurialMiddleware,
   EntrepreneurialController.delete
);

// Just Users
routes.get('/user/', authUserMiddleware, UserController.index);
routes.put('/user/', authUserMiddleware, UserController.update);
routes.delete('/user/', authUserMiddleware, UserController.delete);

export default routes;
