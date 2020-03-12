function user(parent, args, context) {
  return context.prisma.vote({ id: parent.id }).user();
}
function link(parent, args, context) {
  return context.prisma.vote({ id: parent.id }).link();
}

module.exports = {
  user,
  link
};
