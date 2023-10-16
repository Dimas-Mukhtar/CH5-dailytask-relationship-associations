"use strict"

// const {Shop} = require("../models")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const idTokoSyifa = await queryInterface.rawSelect(
      "Shops",
      {
        where: { name: "Toko syifa" }
      },
      ["id"]
    )
    const idTokoAdella = await queryInterface.rawSelect(
      "Shops",
      {
        where: { name: "Toko adella" }
      },
      ["id"]
    )
    const idTokoJordy = await queryInterface.rawSelect(
      "Shops",
      {
        where: { name: "Toko jordy" }
      },
      ["id"]
    )
    const idTokoFajrin = await queryInterface.rawSelect(
      "Shops",
      {
        where: { name: "Toko fajrin" }
      },
      ["id"]
    )
    await queryInterface.bulkInsert("Users", [
      {
        name: "syifa",
        age: 20,
        address: "semarang",
        role: "Owner",
        shopId: idTokoSyifa,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "adella",
        age: 24,
        address: "bandung",
        role: "Owner",
        shopId: idTokoAdella,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "jordy",
        age: 26,
        address: "bandung",
        role: "Owner",
        shopId: idTokoJordy,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "fajrin",
        age: 29,
        address: "jakarta",
        role: "Owner",
        shopId: idTokoFajrin,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])

    const idSyifa = await queryInterface.rawSelect(
      "Users",
      {
        where: { name: "syifa" }
      },
      ["id"]
    )
    const idAdella = await queryInterface.rawSelect(
      "Users",
      {
        where: { name: "adella" }
      },
      ["id"]
    )
    const idJordy = await queryInterface.rawSelect(
      "Users",
      {
        where: { name: "jordy" }
      },
      ["id"]
    )
    const idFajrin = await queryInterface.rawSelect(
      "Users",
      {
        where: { name: "fajrin" }
      },
      ["id"]
    )

    await queryInterface.bulkInsert("Auths", [
      {
        email: "syifa@gmail.com",
        password: "$2a$12$ahHR4fnHDStBX9jiWbUrJOeOIBUMsF0IyQP2D1m2QAZWQUb563tQe",
        confirmPassword: "$2a$12$ahHR4fnHDStBX9jiWbUrJOeOIBUMsF0IyQP2D1m2QAZWQUb563tQe",
        userId: idSyifa,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: "adella@gmail.com",
        password: "$2a$12$ahHR4fnHDStBX9jiWbUrJOeOIBUMsF0IyQP2D1m2QAZWQUb563tQe",
        confirmPassword: "$2a$12$ahHR4fnHDStBX9jiWbUrJOeOIBUMsF0IyQP2D1m2QAZWQUb563tQe",
        userId: idAdella,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: "jordy@gmail.com",
        password: "$2a$12$ahHR4fnHDStBX9jiWbUrJOeOIBUMsF0IyQP2D1m2QAZWQUb563tQe",
        confirmPassword: "$2a$12$ahHR4fnHDStBX9jiWbUrJOeOIBUMsF0IyQP2D1m2QAZWQUb563tQe",
        userId: idJordy,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: "fajrin@gmail.com",
        password: "$2a$12$ahHR4fnHDStBX9jiWbUrJOeOIBUMsF0IyQP2D1m2QAZWQUb563tQe",
        confirmPassword: "$2a$12$ahHR4fnHDStBX9jiWbUrJOeOIBUMsF0IyQP2D1m2QAZWQUb563tQe",
        userId: idFajrin,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {})
  }
}
