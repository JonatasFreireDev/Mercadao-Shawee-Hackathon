import Sequelize, { Model } from 'sequelize';

class File extends Model {
   static init(sequelize) {
      super.init(
         {
            name: Sequelize.STRING,
            path: Sequelize.STRING,
            product_id: Sequelize.INTEGER,
            url: {
               type: Sequelize.VIRTUAL,
               get() {
                  return `${process.env.APP_URL}/files/${this.path}`;
               },
            },
         },
         {
            sequelize,
         }
      );

      return this;
   }

   static associate(models) {
      this.belongsTo(models.Product, {
         foreignKey: 'product_id',
         as: 'product',
      });
      this.hasOne(models.User, { foreignKey: 'avatar_id', as: 'avatar' });
      this.hasOne(models.Entrepreneurial, {
         foreignKey: 'avatar_id',
      });
   }
}

export default File;
