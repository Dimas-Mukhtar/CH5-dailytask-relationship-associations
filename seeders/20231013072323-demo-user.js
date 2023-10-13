"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        name: "john",
        age: 20,
        address: "semarang",
        role: "Owner",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "nami",
        age: 24,
        address: "bandung",
        role: "Owner",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "tio",
        age: 26,
        address: "bandung",
        role: "Owner",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "yuna",
        age: 29,
        address: "jakarta",
        role: "Owner",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {})
  }
}
