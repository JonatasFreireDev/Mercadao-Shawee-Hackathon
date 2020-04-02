import Sequelize, { Model } from 'sequelize';

class PurchaseOrder_Products extends Model {
   static init(sequelize) {
      super.init(
         {
            status: Sequelize.STRING,
            qty: Sequelize.INTEGER,
            tot_price: Sequelize.INTEGER,
         },
         {
            tableName: 'purchaseOrder_products',
            sequelize,
         }
      );

      return this;
   }

   static associate(models) {
      this.belongsTo(models.Product, {
         foreignKey: 'products_id',
      });
      this.belongsTo(models.PurchaseOrder, {
         foreignKey: 'purchase_order_id',
      });
      this.belongsTo(models.Entrepreneurial, {
         foreignKey: 'entrepreneurial_id',
      });
   }
}

export default PurchaseOrder_Products;
