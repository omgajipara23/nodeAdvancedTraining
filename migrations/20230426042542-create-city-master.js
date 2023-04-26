'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('city_masters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      city_name: {
        type: Sequelize.STRING
      },
      state_id: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addConstraint('city_masters' , {
      references : {
        field : 'id',
        table : 'state_masters'
      },
      type : 'foreign key',
      fields : ['state_id']
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('city_masters');
  }
};