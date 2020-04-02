import bcrypt from 'bcryptjs';
import Sequelize, { Model } from 'sequelize';

class Entrepreneurial extends Model {
   static init(sequelize) {
      super.init(
         {
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            cnpj: Sequelize.STRING,
            category: Sequelize.STRING,
            cell: Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            password_hash: Sequelize.STRING,
         },
         {
            tableName: 'entrepreneurial',
            sequelize,
         }
      );

      this.addHook('beforeSave', async (entrepreneurial) => {
         if (entrepreneurial.password) {
            entrepreneurial.password_hash = await bcrypt.hash(
               entrepreneurial.password,
               8
            );
         }
      });

      return this;
   }

   static associate(models) {
      this.hasMany(models.Address, { foreignKey: 'entrepreneurial_id' });
      this.hasMany(models.Product, {
         foreignKey: 'entrepreneurial_id',
         as: 'products',
      });
      this.hasMany(models.PurchaseOrder_Products, {
         foreignKey: 'entrepreneurial_id',
         as: 'entrepreneurial',
      });
      this.belongsTo(models.File, {
         foreignKey: 'avatar_id',
         as: 'avatar',
      });
   }

   checkPassword(password) {
      return bcrypt.compare(password, this.password_hash);
   }
}

export default Entrepreneurial;
