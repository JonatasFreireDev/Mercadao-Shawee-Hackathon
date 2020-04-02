module.exports = {
   up: async (queryInterface, Sequelize) => {
      const status = await queryInterface.addColumn(
         'purchaseOrder_products',
         'entrepreneurial_id',
         {
            type: Sequelize.INTEGER,
            references: { model: 'entrepreneurial', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            allownull: true,
         }
      );

      return [status];
   },

   down: async (queryInterface) => {
      const d_user = await queryInterface.removeColumn(
         'purchaseOrder_products',
         'entrepreneurial_id'
      );

      return [d_user];
   },
};
