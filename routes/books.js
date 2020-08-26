const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get("/", (req, res) => {
  res.json({ books: [{ title: "Lord of the Rings: Fellowship of the Ring" }] });
});

module.exports = router;
