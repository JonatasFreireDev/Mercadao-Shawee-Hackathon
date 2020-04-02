import Sequelize, { Model } from 'sequelize';

class Address extends Model {
   static init(sequelize) {
      super.init(
         {
            street: Sequelize.STRING,
            number: Sequelize.INTEGER,
            neighborhood: Sequelize.STRING,
            city: Sequelize.STRING,
            state: Sequelize.STRING,
            country: Sequelize.STRING,
            postal_code: Sequelize.INTEGER,
            lat: Sequelize.STRING,
            lng: Sequelize.STRING,
         },
         {
            underscored: true,
            tableName: 'address',
            sequelize,
         }
      );

      return this;
   }

   static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' });
      this.belongsTo(models.Entrepreneurial, {
         foreignKey: 'entrepreneurial_id',
      });
   }
}

export default Address;
