//middleware
let { items } = require('./itemsDB');
const { BadRequestError, NotFoundError } = require("./expressError");

/** Logger: prints log message and goes to next. */

function logger(req, res, next) {
  console.log(`Sending ${req.method} request to ${req.path}.`);
  return next();
}
// end logger

/** Check that name param exists in items or raise BadReq. */

function checkName(req, res, next) {
  const name = req.params.name;
  const findName = items.filter(item => item.name === name);
  if (findName.length > 0) {
    return next();
  } else {
    throw new NotFoundError(`${name} not found`);
  }
}
// end checkName


module.exports = { logger, checkName };