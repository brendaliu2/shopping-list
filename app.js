
const express = require("express");
const app = express();

const itemsRoutes = require("./itemsRoutes");
const { logger, checkName } = require("./middleware");

const { NotFoundError } = require("./expressError");

// this applies to all requests at all paths
app.use(logger);

// process JSON body => req.body
app.use(express.json());

// process traditional form data => req.body
app.use(express.urlencoded({ extended: true }));

app.use("/items", itemsRoutes);






/** 404 handler: matches unmatched routes. */
app.use(function (req, res) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});
// end


module.exports = app;