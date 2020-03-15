import jwt from 'jsonwebtoken';

export function getUserId(request) {
  const Authorization = request.get('Authorization');

  if (Authorization) {
    const [, token] = Authorization.split(' ');

    const { userId } = jwt.verify(token, process.env.APP_SECRET);

    return userId;
  }

  throw new Error('Not authenticated');
}

export function makeOrder(orderEnum) {
  if (!orderEnum) return null;

  const [field, direction = 'ASC'] = orderEnum.split('_');

  return [field.replace(/([A-Z])/g, '_$1').toLowerCase(), direction];
}
