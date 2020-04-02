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
            allowNull: false,
         },
         delivery_address: {
            type: Sequelize.INTEGER,
            references: { model: 'address', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            allowNull: false,
         },
         status: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         delivery_type: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         payment_type: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         tot_price: {
            type: Sequelize.INTEGER,
            allowNull: true,
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
