module.exports = async function (context, documents) {
  if (!!documents && documents.length > 0) {
    context.bindings.signalRMessages = documents.map(({ id, name, role }) => ({
      target: 'updated',
      arguments: [{ id, name, role }],
    }));
  }
};
