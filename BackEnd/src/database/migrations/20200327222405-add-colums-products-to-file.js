module.exports = {
   up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('files', 'product_id', {
         type: Sequelize.INTEGER,
         references: { model: 'products', key: 'id' },
         onUpdate: 'CASCADE',
         onDelete: 'SET NULL',
      });
   },

   down: (queryInterface) => {
      return queryInterface.removeColumn('files', 'product_id');
   },
};
