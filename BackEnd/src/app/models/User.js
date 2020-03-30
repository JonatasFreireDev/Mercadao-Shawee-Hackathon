import bcrypt from 'bcryptjs';
import { differenceInCalendarYears, parseISO } from 'date-fns';
import Sequelize, { Model } from 'sequelize';

class User extends Model {
   static init(sequelize) {
      super.init(
         {
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            age: Sequelize.VIRTUAL,
            date_age: Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            password_hash: Sequelize.STRING,
         },
         {
            underscored: true,
            tableName: 'user',
            sequelize,
         }
      );

      this.addHook('beforeSave', async (user) => {
         if (user.password) {
            user.password_hash = await bcrypt.hash(user.password, 8);
         }
      });

      return this;
   }

   checkPassword(password) {
      return bcrypt.compare(password, this.password_hash);
   }

   checkAge() {
      const today = new Date();
      return differenceInCalendarYears(today, parseISO(this.date_age));
   }

   static associate(models) {
      this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
      this.hasMany(models.Address, { foreignKey: 'user_id' });
   }
}

export default User;
