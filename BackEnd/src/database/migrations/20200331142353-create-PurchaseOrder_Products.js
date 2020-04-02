module.exports = {
   up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('purchaseOrder_products', {
         id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
         },
         purchase_order_id: {
            type: Sequelize.INTEGER,
            references: { model: 'purchase_order', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            allowNull: false,
         },
         products_id: {
            type: Sequelize.INTEGER,
            references: { model: 'products', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            allowNull: false,
         },
         qty: {
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
      return queryInterface.dropTable('purchaseOrder_products');
   },
};
