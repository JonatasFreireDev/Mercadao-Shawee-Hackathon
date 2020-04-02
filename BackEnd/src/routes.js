import { Router } from 'express';

import multer from 'multer';

import AddressController from './app/controllers/AddressController';
import EntrepreneurialController from './app/controllers/EntrepreneurialController';
import FileController from './app/controllers/FileController';
import ProductController from './app/controllers/ProductController';
import PurchaseOrderController from './app/controllers/PurchaseOrderController';
import PurchaseOrderEntController from './app/controllers/PurchaseOrderEntController';
import SessionEntrepreneurialController from './app/controllers/SessionEntrepreneurialController';
import SessionUserController from './app/controllers/SessionUserController';
import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/auth';
import authEntre from './app/middlewares/authEntrepreneurial';
import authUser from './app/middlewares/authUser';
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
routes.get('/entrepreneurial/', authEntre, EntrepreneurialController.index);
routes.put('/entrepreneurial/', authEntre, EntrepreneurialController.update);
routes.delete('/entrepreneurial/', authEntre, EntrepreneurialController.delete);

routes.get(
   '/purchase-order/entrepreneurial',
   authEntre,
   PurchaseOrderEntController.index
);
routes.put(
   '/purchase-order/entrepreneurial/:id',
   authEntre,
   PurchaseOrderEntController.update
);

routes.get('/product', authEntre, ProductController.index);
routes.post(
   '/product',
   authEntre,
   upload.single('file'),
   ProductController.store
);
routes.put('/product/:id', authEntre, ProductController.update);
routes.delete('/product/:id', authEntre, ProductController.delete);

// Just Users
routes.get('/user/', authUser, UserController.index);
routes.put('/user/', authUser, UserController.update);
routes.delete('/user/', authUser, UserController.delete);

routes.get('/purchase-order', authUser, PurchaseOrderController.index);
routes.post('/purchase-order', authUser, PurchaseOrderController.store);
routes.put('/purchase-order/:id', authUser, PurchaseOrderController.update);

export default routes;
