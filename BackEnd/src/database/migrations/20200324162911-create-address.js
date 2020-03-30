module.exports = {
   up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('address', {
         id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
         },
         street: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         number: {
            type: Sequelize.INTEGER,
            allowNull: false,
         },
         neighborhood: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         city: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         state: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         country: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         postal_code: {
            type: Sequelize.INTEGER,
            allowNull: false,
         },
         lat: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         lng: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         created_at: {
            type: Sequelize.DATE,
            allowNull: false,
         },
         updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
         },
      });
   },

   down: (queryInterface) => {
      return queryInterface.dropTable('address');
   },
};
