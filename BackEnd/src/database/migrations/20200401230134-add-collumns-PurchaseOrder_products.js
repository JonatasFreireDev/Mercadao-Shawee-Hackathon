module.exports = {
   up: async (queryInterface, Sequelize) => {
      const status = await queryInterface.addColumn(
         'purchaseOrder_products',
         'status',
         {
            type: Sequelize.STRING,
            allownull: true,
         }
      );
      const tot_price = await queryInterface.addColumn(
         'purchaseOrder_products',
         'tot_price',
         {
            type: Sequelize.INTEGER,
            allownull: true,
         }
      );

      return [status, tot_price];
   },

   down: async (queryInterface) => {
      const d_user = await queryInterface.removeColumn(
         'purchaseOrder_products',
         'status'
      );
      const d_entrepreneurial = await queryInterface.removeColumn(
         'purchaseOrder_products',
         'tot_price'
      );

      return [d_user, d_entrepreneurial];
   },
};
