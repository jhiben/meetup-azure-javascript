module.exports = async function (context, req) {
  const name = req.query.name || (req.body && req.body.name);

  if (!name) {
    context.res = {
      status: 400,
      body: { error: 'Invalid name' },
    };

    return;
  }

  const employee = {
    id: new Date().getTime().toString(),
    name,
    role: 'Developer',
  };

  context.bindings.outputDocument = JSON.stringify(employee);

  context.res = {
    body: employee,
  };
};
