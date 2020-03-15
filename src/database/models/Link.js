import Sequelize, { Model } from 'sequelize';

class Link extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        description: Sequelize.STRING,
        url: Sequelize.STRING,
      },
      {
        sequelize,
        updatedAt: false,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'posted_by', as: 'postedBy' });
    this.hasMany(models.Vote, { foreignKey: 'link_id', as: 'votes' });
  }
}

export default Link;
