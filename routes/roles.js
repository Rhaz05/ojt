var express = require("express");
var router = express.Router();

let position = [
{ id: 1, name: "Intern" },
  { id: 2, name: "Junior Developer" },
  { id: 3, name: "Software Developer" },
  { id: 4, name: "Senior Developer" },
  { id: 5, name: "Team Lead" },
  { id: 6, name: "Project Manager" },
  { id: 7, name: "Product Manager" },
  { id: 8, name: "Data Analyst" },
  { id: 9, name: "Data Scientist" },
  { id: 10, name: "Marketing Specialist" },
  { id: 11, name: "HR Specialist" },
  { id: 12, name: "Accountant" }
]

const POSITION = [
    "Intern",
  "Junior Developer",
  "Software Developer",
  "Senior Developer",
  "Team Lead",
  "Project Manager",
  "Product Manager",
  "Data Analyst",
  "Data Scientist",
  "Marketing Specialist",
  "HR Specialist",
  "Accountant"
];

router.get("/load", function (req, res) {
  res.json(position);
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("layout/main-layout", {
    body: "../pages/roles-page.ejs", //this is the page that will be rendered
    // no pageScript needed — the if-check handles that
    title: "Error",
  });
});

module.exports = router;
