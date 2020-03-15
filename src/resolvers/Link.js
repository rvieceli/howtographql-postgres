function postedBy(parent) {
  return parent.getPostedBy();
}

function votes(parent) {
  return parent.getVotes();
}

export default {
  postedBy,
  votes,
};
