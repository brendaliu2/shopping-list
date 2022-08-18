
const express = require("express");

let { items } = require('./itemsDB');
const router = new express.Router();
const { checkName } = require('./middleware');


/**Get request to /items route. Returns list of shopping items */
router.get('/', function(req,res){

return res
.status(200)
    .json({'items':items})
})

/**Post new item(name and price) to DB. Returns Json {added:item} */
router.post('/',function(req,res){
  const {name, price} = req.body;
  items.push({name,price});

  return res
    .status(201)
    .json({'added': {name,price}});
})

/**Get specific item by URL parameter. Returns Json {name, price} */
router.get('/:name', checkName, function(req,res){
  const name = req.params.name;
  const item = items.filter(item => item.name === name);

  return res
  .status(200)
  .json(item[0]);
})

/**Patch request to update name and price of item. Returns json{updated:item} */
router.patch('/:name', checkName, function(req,res){
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
router.delete('/:name', checkName, function(req,res){
  const name = req.params.name;
  items = items.filter(item => item.name !== name);

  return res
    .status(200)
    .json({"message": "Deleted"})
})

module.exports = router;