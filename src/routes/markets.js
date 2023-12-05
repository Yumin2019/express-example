const { Router } = require("express");

const router = Router();

const supermarkets = [
  {
    store: "whoe foods",
  },
  {
    store: "poonam store",
  },
  {
    store: "yumin store",
  },
];

router.get("/", (req, res) => {
  res.send(supermarkets);
});

module.exports = router;
