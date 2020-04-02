module.exports = {
   up: async (queryInterface, Sequelize) => {
      const user = await queryInterface.addColumn('address', 'user_id', {
         type: Sequelize.INTEGER,
         references: { model: 'user', key: 'id' },
         allownull: true,
         onUpdate: 'CASCADE',
         onDelete: 'SET NULL',
      });
      const entre = await queryInterface.addColumn(
         'address',
         'entrepreneurial_id',
         {
            type: Sequelize.INTEGER,
            allownull: true,
            references: { model: 'entrepreneurial', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
         }
      );

      return [user, entre];
   },

   down: async (queryInterface) => {
      const d_user = await queryInterface.removeColumn('address', 'user_id');
      const d_entrepreneurial = await queryInterface.removeColumn(
         'address',
         'entrepreneurial_id'
      );

      return [d_user, d_entrepreneurial];
   },
};
