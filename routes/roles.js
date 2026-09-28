var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("layout/main-layout", {
    body: "../pages/roles-page.ejs", //this is the page that will be rendered
    // no pageScript needed — the if-check handles that
    title: "Error",
  });
});

module.exports = router;
