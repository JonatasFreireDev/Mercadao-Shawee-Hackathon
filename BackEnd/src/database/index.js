import { Sequelize } from 'sequelize';

import Address from '../app/models/Address';
import Entrepreneurial from '../app/models/Entrepreneurial';
import File from '../app/models/File';
import Product from '../app/models/Product';
import PurchaseOrder from '../app/models/PurchaseOrder';
import PurchaseOrder_Products from '../app/models/PurchaseOrder_Products';
import User from '../app/models/User';
import configDatabase from '../config/database';

const models = [
   Address,
   Entrepreneurial,
   File,
   Product,
   PurchaseOrder,
   User,
   PurchaseOrder_Products,
];

class Database {
   constructor() {
      this.init();
   }

   init() {
      this.sequelize = new Sequelize(configDatabase);

      models.map((model) => model.init(this.sequelize));
      models.map(
         (model) => model.associate && model.associate(this.sequelize.models)
      );
   }
}

export default new Database();
