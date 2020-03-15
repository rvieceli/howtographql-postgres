import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
        timestamps: false,
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static findByEmail(email) {
    return this.findOne({ where: { email } });
  }

  static associate(models) {
    this.hasMany(models.Link, { foreignKey: 'posted_by', as: 'links' });
    this.hasMany(models.Vote, { foreignKey: 'user_id', as: 'votes' });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  generateToken() {
    return jwt.sign(
      {
        userId: this.id,
      },
      authConfig.secret,
      {
        expiresIn: authConfig.expiresIn,
      }
    );
  }
}

export default User;
