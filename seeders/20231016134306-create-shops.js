"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Shops", [
      {
        name: "Toko syifa",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Toko adella",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Toko jordy",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Toko fajrin",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Shops", null, {})
  }
}
