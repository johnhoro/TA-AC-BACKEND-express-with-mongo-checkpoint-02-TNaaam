var express = require("express");
var router = express.Router();
var Category = require("../models/category");

router.get("/", (req, res) => {
  Category.find({}, (err, categories) => {
    res.render("categoryList", { categories });
  });
});

router.get("/new", (req, res) => {
  res.render("categoryForm");
});

router.post("/", (req, res, next) => {
  Category.create(req.body, (err, createdCategory) => {
    if (err) return next(err);
    console.log(createdCategory);
    res.redirect("/events");
  });
});

module.exports = router;
