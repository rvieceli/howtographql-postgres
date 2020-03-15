const newLink = {
  subscribe: (parent, args, { pubsub }) => {
    return pubsub.asyncIterator('NEW_LINK');
  },
};

const newVote = {
  subscribe: (parent, args, { pubsub }) => {
    return pubsub.asyncIterator('NEW_VOTE');
  },
};

export default {
  newLink,
  newVote,
};
