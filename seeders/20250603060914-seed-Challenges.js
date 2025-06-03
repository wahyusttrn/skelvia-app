'use strict';

const fs = require('fs').promises;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = JSON.parse(await fs.readFile('./data/Challenges.json', 'utf-8'));
    data = data.map((e) => {
      delete e.id;
      e.createdAt = new Date();
      e.updatedAt = new Date();
      return e;
    });

    await queryInterface.bulkInsert('Challenges', data);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Challenges', null, {});
  }
};
