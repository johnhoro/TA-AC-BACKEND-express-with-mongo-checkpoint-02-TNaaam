var express = require(`express`);
var router = express.Router();
var Remark = require(`../models/remark`);
var Event = require(`../models/event`);

router.get(`/:id/edit`, (req, res, next) => {
  var id = req.params.id;
  Remark.findById(id, (err, remark) => {
    console.log(remark);
    if (err) return next(err);
    res.render(`updateRemark`, { remark });
  });
});

router.post(`/:id`, (req, res, next) => {
  var id = req.params.id;
  var data = req.body;
  Remark.findByIdAndUpdate(id, data, (err, updatedRemark) => {
    if (err) return next(err);
    res.redirect(`/events/` + updatedRemark.eventId);
  });
});

router.get(`/:id/delete`, (req, res, next) => {
  var id = req.params.id;
  Remark.findByIdAndDelete(id, (err, deletedRemark) => {
    if (err) return next(err);
    Event.findByIdAndUpdate(
      deletedRemark.eventId,
      { $pull: { remark: id } },
      (err, event) => {
        if (err) return next(err);
        res.redirect(`/events/` + deletedRemark.eventId);
      }
    );
  });
});

router.get(`/:id/likes`, (req, res, next) => {
  var id = req.params.id;
  Remark.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, like) => {
    if (err) return next(err);
    res.redirect(`/events/` + like.eventId);
  });
});

module.exports = router;
