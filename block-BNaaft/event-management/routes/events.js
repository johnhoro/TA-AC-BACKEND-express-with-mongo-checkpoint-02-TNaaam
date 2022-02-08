var express = require("express");
var router = express.Router();
var Event = require("../models/event");
var Category = require("../models/category");
var Remark = require("../models/remark");

/* GET users listing. */

router.get("/", (req, res, next) => {
  console.log(req.query);
  const query = req.query.category ? req.query : {};
  Event.find(query).exec((err, events) => {
    if (err) return next(err);
    Category.find({}, (err, category) => {
      if (err) return next(err);
      res.render("eventsList", { events, category });
    });
  });
});

router.get("/new", (req, res) => {
  Category.find({}, (err, categories) => {
    res.render("addEvent", { categories: categories });
  });
});

router.post("/", (req, res, next) => {
  Event.create(req.body, (err, eventCreated) => {
    if (err) return next(err);
    res.redirect("/events");
  });
});

router.get(`/:id/edit`, (req, res, next) => {
  var id = req.params.id;
  Event.findById(id, (err, events) => {
    if (err) return next(err);
    res.render(`updateEvent`, { events });
  });
});

//Sort by date

router.get("/sortdate", (req, res, next) => {
  const query = req.query.category ? req.query : {};
  Event.find(query)
    .sort({ start_date: 1 })
    .exec((err, events) => {
      if (err) return next(err);
      Category.find({}, (err, category) => {
        if (err) return next(err);
        res.render("eventsList", { events, category });
      });
    });
});

router.post("/location", (req, res) => {
  var loc = req.body.location.toLowerCase();
  console.log(loc);
  const query = req.query.category ? req.query : {};
  Event.find({ ...query, location: loc })
    .sort({ start_date: 1 })
    .exec((err, events) => {
      if (err) return next(err);
      Category.find({}, (err, category) => {
        if (err) return next(err);
        res.render("eventsList", { events, category });
      });
    });
});

router.post(`/:id`, (req, res, next) => {
  var id = req.params.id;
  Event.findByIdAndUpdate(id, req.body, (err, updatedEvent) => {
    console.log(updatedEvent);
    if (err) return next(err);
    res.redirect(`/events/` + id);
  });
});
router.get("/:id", (req, res, next) => {
  var id = req.params.id;
  Event.findById(id)
    .populate("category")
    .populate("remark")
    .exec((err, event) => {
      if (err) return next(err);
      res.render("eventDetails", { event });
    });
});

router.get(`/:id/delete`, (req, res, next) => {
  var id = req.params.id;
  Event.findByIdAndDelete(id, (err, deletedEvent) => {
    if (err) return next(err);
    res.redirect(`/events`);
  });
});

router.get(`/:id/likes`, (req, res, next) => {
  var id = req.params.id;
  Event.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, like) => {
    if (err) return next(err);
    res.redirect(`/events/` + id);
  });
});

router.post("/:id/remarks", (req, res, next) => {
  let id = req.params.id;
  req.body.eventId = id;
  Remark.create(req.body, (err, remark) => {
    console.log(err, remark, req.body);
    if (err) return next(err);
    Event.findByIdAndUpdate(
      id,
      { $push: { remark: remark.id } },
      (err, event) => {
        if (err) return next(err);
        res.redirect("/events/" + id);
      }
    );
  });
});

module.exports = router;
