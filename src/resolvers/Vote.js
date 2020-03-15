function user(parent) {
  return parent.getUser();
}

function link(parent) {
  return parent.getLink();
}

export default {
  user,
  link,
};
