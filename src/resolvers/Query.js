import Sequelize, { Op } from 'sequelize';
import Link from '../database/models/Link';
import { makeOrder } from '../utils';

function info() {
  return `This is the API of a hackernews clone from howtographql.com`;
}

async function feed(parent, { filter, skip, first, orderBy }) {
  const order = orderBy ? [makeOrder(orderBy)] : null;
  const where = filter
    ? {
        [Op.or]: [
          [
            Sequelize.where(
              Sequelize.fn('lower', Sequelize.col('description')),
              {
                [Op.like]: `%${filter.toLowerCase()}%`,
              }
            ),
          ],
          [
            Sequelize.where(Sequelize.fn('lower', Sequelize.col('url')), {
              [Op.like]: `%${filter.toLowerCase()}%`,
            }),
          ],
        ],
      }
    : null;

  const { rows: links, count } = await Link.findAndCountAll({
    where,
    limit: first,
    offset: skip,
    order,
  });

  return {
    links,
    count,
  };
}

function link(parent, { id }) {
  return Link.findByPk(id);
}

export default {
  info,
  feed,
  link,
};
