module.exports = {
   up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('products', {
         id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
         },
         entrepreneurial_id: {
            type: Sequelize.INTEGER,
            references: { model: 'entrepreneurial', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            allowNull: true,
         },
         name: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         price: {
            type: Sequelize.INTEGER,
            allowNull: false,
         },
         amount: {
            type: Sequelize.INTEGER,
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
      return queryInterface.dropTable('products');
   },
};
