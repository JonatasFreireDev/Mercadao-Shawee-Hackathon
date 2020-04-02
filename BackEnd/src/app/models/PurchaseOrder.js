import Sequelize, { Model } from 'sequelize';

class PurchaseOrder extends Model {
   static init(sequelize) {
      super.init(
         {
            status: Sequelize.STRING,
            delivery_type: Sequelize.STRING,
            payment_type: Sequelize.STRING,
            tot_price: Sequelize.INTEGER,
         },
         {
            tableName: 'purchase_order',
            sequelize,
         }
      );

      return this;
   }

   static associate(models) {
      this.belongsTo(models.User, {
         foreignKey: 'user_id',
         as: 'user',
      });
      this.belongsTo(models.Address, {
         foreignKey: 'delivery_address',
      });
      this.belongsToMany(models.Product, {
         through: 'PurchaseOrder_Products',
         foreignKey: 'purchase_order_id',
         // otherKey: 'product_id',
      });
   }
}

export default PurchaseOrder;
