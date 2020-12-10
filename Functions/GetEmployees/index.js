module.exports = async function (context, req, inputDocuments) {
  context.res = {
    body: inputDocuments.map(({ id, name, role }) => ({ id, name, role })),
  };
};
