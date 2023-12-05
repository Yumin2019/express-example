const { Router } = require("express");

const router = Router();

const groceryList = [
  {
    item: "milk",
    quantity: 2,
  },
  {
    item: "cereal",
    quantity: 1,
  },
  {
    item: "pop-tarts",
    quantity: 1,
  },
];

router.get("/", (req, res) => {
  res.send(groceryList);
});

router.get("/:item", (req, res) => {
  console.log(req.params.item);
  const { item } = req.params;
  const groceryItem = groceryList.find((g) => g.item === item);
  res.send(groceryItem);
});

router.post("/", (req, res) => {
  console.log(req.body);
  groceryList.push(req.body);
  res.send(201);
});

module.exports = router;
