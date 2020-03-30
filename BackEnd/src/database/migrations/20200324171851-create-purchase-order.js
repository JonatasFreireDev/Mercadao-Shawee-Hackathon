module.exports = {
   up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('purchase_order', {
         id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
         },
         user_id: {
            type: Sequelize.INTEGER,
            references: { model: 'user', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            allowNull: true,
         },
         products_id: {
            type: Sequelize.INTEGER,
            references: { model: 'products', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            allowNull: true,
         },
         amount: {
            type: Sequelize.INTEGER,
            allowNull: false,
         },
         totPrice: {
            type: Sequelize.INTEGER,
            allowNull: false,
         },
         status: {
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
      return queryInterface.dropTable('purchase_order');
   },
};
