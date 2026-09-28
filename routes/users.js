var express = require("express");
var router = express.Router();

let data = [
  {
    Id: 1,
    Customer: "rick",
    Invoices: "Due",
    Inventory: "none",
    Subscription: "expired",
  },
  {
    Id: 2,
    Customer: "sarah",
    Invoices: "Paid",
    Inventory: "in stock",
    Subscription: "active",
  },
  {
    Id: 3,
    Customer: "marcus",
    Invoices: "Pending",
    Inventory: "low stock",
    Subscription: "active",
  },
  {
    Id: 4,
    Customer: "elena",
    Invoices: "Overdue",
    Inventory: "out of stock",
    Subscription: "cancelled",
  },
];

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("layout/main-layout", {
    body: "../pages/user-page.ejs",
    title: "Student Page",
    pageScript: "../scripts/user-script.ejs",
  });
});

router.get("/load", function (req, res) {
  res.json(data);
});

module.exports = router;
