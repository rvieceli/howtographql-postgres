import User from '../database/models/User';
import Link from '../database/models/Link';
import Vote from '../database/models/Vote';

import { getUserId } from '../utils';

async function signup(parent, { email, password, name }) {
  const exists = await User.findByEmail(email);

  if (exists) {
    throw new Error('Email has been exists');
  }

  const user = await User.create({
    email,
    password,
    name,
  });

  const token = user.generateToken();

  return {
    token,
    user,
  };
}

async function login(parent, { email, password }) {
  const user = await User.findByEmail(email);

  if (!user) {
    throw new Error('User not found or invalid password');
  }

  const valid = await user.checkPassword(password);

  if (!valid) {
    throw new Error('User not found or invalid password');
  }

  const token = user.generateToken();

  return {
    token,
    user,
  };
}

async function post(parent, { description, url }, { request, pubsub }) {
  const userId = getUserId(request);

  const newLink = await Link.create({
    url,
    description,
    posted_by: userId,
  });

  pubsub.publish('NEW_LINK', {
    newLink,
  });

  return newLink;
}

async function updateLink(parent, { id, description, url }, { request }) {
  const userId = getUserId(request);

  const link = await Link.findByPk(id);

  if (!link || link.posted_by !== userId) {
    throw new Error("You can't update this link");
  }

  return link.update({
    description,
    url,
  });
}

async function deleteLink(parent, { id }, context) {
  const userId = getUserId(context);

  const link = await Link.findByPk(id);

  if (!link || link.posted_by !== userId) {
    throw new Error("You can't delete this link");
  }

  await link.destroy();

  return link;
}

async function vote(parent, { linkId }, { request, pubsub }) {
  const userId = getUserId(request);

  const exists = await Vote.findOne({
    where: {
      user_id: userId,
      link_id: linkId,
    },
  });

  if (exists) {
    throw new Error(`Already voted for link: ${linkId}`);
  }

  const newVote = await Vote.create({
    user_id: userId,
    link_id: linkId,
  });

  pubsub.publish('NEW_VOTE', {
    newVote,
  });

  return newVote;
}

export default {
  signup,
  login,
  post,
  updateLink,
  deleteLink,
  vote,
};
