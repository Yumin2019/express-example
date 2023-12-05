const { Router } = require("express");

const router = Router();

const supermarkets = [
  {
    id: 1,
    store: "whoe foods",
    miles: 0.6,
  },
  {
    id: 2,
    store: "poonam store",
    miles: 2.5,
  },
  {
    id: 3,
    store: "yumin store",
    miles: 2.8,
  },
  {
    id: 4,
    store: "sinsung store",
    miles: 4,
  },
  {
    id: 5,
    store: "real store",
    miles: 5,
  },
];

router.get("/", (req, res) => {
  console.log(req.query);
  const { miles } = req.query;
  const parsedMiles = parseInt(miles);
  if (miles && !isNaN(parsedMiles)) {
    res.send(supermarkets.filter((s) => s.miles <= miles));
  } else {
    res.send(supermarkets);
  }
});

module.exports = router;
