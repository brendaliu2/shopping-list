
const express = require("express");
const app = express();

let { items } = require('./itemsDB');

const { NotFoundError } = require("./expressError");

// process JSON body => req.body
app.use(express.json());

// process traditional form data => req.body
app.use(express.urlencoded({ extended: true }));

/**Get request to /items route. Returns list of shopping items */
app.get('/items', function(req,res){

  return res
    .status(200)
    .json({'items':items})
})

/**Post new item(name and price) to DB. Returns Json {added:item} */
app.post('/items',function(req,res){
  const {name, price} = req.body;
  items.push({name,price});

  return res
    .status(201)
    .json({'added': {name,price}});
})

/**Get specific item by URL parameter. Returns Json {name, price} */
app.get('/items/:name', function(req,res){
  const name = req.params.name;
  const item = items.filter(item => item.name === name);

  return res
  .status(200)
  .json(item[0]);
})

/**Patch request to update name and price of item. Returns json{updated:item} */
app.patch('/items/:name', function(req,res){
  const origName = req.params.name;

  for(let item of items){
    if (item.name === origName) {
      const {name, price} = req.body;
      item.name = name;
      item.price = price;
      return res
        .status(200)
        .json({'updated':item})
    }
  }
})

/**Delete request to delete item. Returns {message:deleted} */
app.delete('/items/:name', function(req,res){
  const name = req.params.name;
  items = items.filter(item => item.name !== name);

  return res
    .status(200)
    .json({"message": "Deleted"})
})




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