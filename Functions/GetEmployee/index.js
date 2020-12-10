module.exports = async function (context, req, inputDocument) {
  if (inputDocument) {
    const { id, name, role } = inputDocument;
    context.res = {
      body: { id, name, role },
    };
  } else {
    context.res = {
      status: 404,
    };
  }
};
