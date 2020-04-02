import Sequelize, { Model } from 'sequelize';

class Product extends Model {
   static init(sequelize) {
      super.init(
         {
            category: Sequelize.STRING,
            name: Sequelize.STRING,
            price: Sequelize.INTEGER,
            amount: Sequelize.INTEGER,
         },
         {
            sequelize,
         }
      );

      return this;
   }

   static associate(models) {
      this.belongsTo(models.Entrepreneurial, {
         foreignKey: 'entrepreneurial_id',
         as: 'entrepreneurial',
      });
      this.hasMany(models.File);
      this.belongsToMany(models.PurchaseOrder, {
         through: 'PurchaseOrder_Products',
         foreignKey: 'products_id',
         // otherKey: 'purchase_order_id',
      });
   }
}

export default Product;
