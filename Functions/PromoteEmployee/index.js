module.exports = async function (context, req, inputDocument) {
  if (!inputDocument) {
    context.res = {
      status: 404,
    };

    return;
  }

  const { id, name, role } = inputDocument;
  const employee = { id, name, role };

  switch (role) {
    case 'Developer':
      employee.role = 'Manager';
      break;
    case 'Manager':
      employee.role = 'CTO';
      break;
  }

  context.bindings.outputDocument = JSON.stringify(employee);

  context.res = {
    body: employee,
  };
};
