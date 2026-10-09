var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("layout/sub-layout", {
    body: "../pages/login-page.ejs",
    title: "Error",
    pageScript: "../scripts/login-script.ejs",
  });
});

module.exports = router;
