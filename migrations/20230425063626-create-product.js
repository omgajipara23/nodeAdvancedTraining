'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      parent_cat_id: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      product_name: {
        type: Sequelize.STRING
      },
      discription: {
        type: Sequelize.STRING
      },
      product_image: {
        type: Sequelize.BLOB
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:new Date()
      },
      updatedAt: {
        allowNull: false,
        defaultValue:new Date(),
        type: Sequelize.DATE
      }
    });

    await queryInterface.addConstraint('products', {
      references: {
        field: 'id',
        table: 'perent_categories'
      },
      type: 'foreign key',
      fields: ['parent_cat_id']
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};