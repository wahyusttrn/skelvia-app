'use strict';

const fs = require('fs').promises;

const { hashPass } = require('../helpers/helper');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = JSON.parse(await fs.readFile('./data/Users.json', 'utf-8'));
    data = data.map((e) => {
      delete e.id;
      e.createdAt = new Date();
      e.updatedAt = new Date();
      e.password = hashPass(e.password);
      return e;
    });

    await queryInterface.bulkInsert('Users', data);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
