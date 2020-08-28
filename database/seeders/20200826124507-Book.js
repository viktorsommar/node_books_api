"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Books", null, {});
    await queryInterface.bulkDelete("Authors", null, {});
    await queryInterface.bulkInsert("Authors", [
      {
        firstName: "Thomas",
        lastName: "Ochman",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const authors = await queryInterface.sequelize.query(
      `SELECT id from "Authors";`
    )

    const authorsRows = authors[0]

    await queryInterface.bulkInsert(
      "Books",
      [
        {
          title: "Learn NodeJS with CraftAcademy",
          createdAt: new Date(),
          updatedAt: new Date(),
          AuthorId: authorsRows[0].id,
        },
        {
          title: "Learn Sequelize with Adi",
          createdAt: new Date(),
          updatedAt: new Date(),
          AuthorId: authorsRows[0].id,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Books", null, {});
  },
};
