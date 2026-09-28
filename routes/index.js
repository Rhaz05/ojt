var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("layout/main-layout", {
    body: "../pages/user-page.ejs",
    title: "Error",
    pageScript: "../scripts/user-script.ejs",
  });
});

module.exports = router;
