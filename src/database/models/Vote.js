import Sequelize, { Model } from 'sequelize';

class Vote extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
      },
      {
        sequelize,
        updatedAt: false,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Link, { foreignKey: 'link_id', as: 'link' });
  }
}

export default Vote;
