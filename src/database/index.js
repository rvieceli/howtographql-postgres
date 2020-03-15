import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from './models/User';
import Link from './models/Link';
import Vote from './models/Vote';

const models = [User, Link, Vote];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

module.exports = new Database();
