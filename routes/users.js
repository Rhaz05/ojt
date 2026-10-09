var express = require("express");
var router = express.Router();

let data = [
  {
    Id: 1,
    Name: "Rick Sanchez",
    Course: "BSIT",
    YearLevel: "3rd Year",
    Email: "rick@school.edu",
  },
  {
    Id: 2,
    Name: "Sarah Connor",
    Course: "BSCS",
    YearLevel: "2nd Year",
    Email: "sarah@school.edu",
  },
  {
    Id: 3,
    Name: "Marcus Reyes",
    Course: "BSIS",
    YearLevel: "4th Year",
    Email: "marcus@school.edu",
  },
  {
    Id: 4,
    Name: "Elena Santos",
    Course: "BSECE",
    YearLevel: "1st Year",
    Email: "elena@school.edu",
  },
];

const YEAR_LEVELS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Returns { error } or { value } with cleaned fields
function validateStudent(body, ignoreId = null) {
  const Name = (body.Name ?? "").trim();
  const Course = (body.Course ?? "").trim();
  const YearLevel = (body.YearLevel ?? "").trim();
  const Email = (body.Email ?? "").trim();

  if (!Name) return { error: "Name is required." };
  if (!Course) return { error: "Course is required." };
  if (!YEAR_LEVELS.includes(YearLevel)) return { error: "Invalid year level." };
  if (!EMAIL_RE.test(Email)) return { error: "A valid email is required." };

  const duplicate = data.some(
    (s) => s.Email.toLowerCase() === Email.toLowerCase() && s.Id !== ignoreId,
  );
  if (duplicate) return { error: "A student with this email already exists." };

  return { value: { Name, Course, YearLevel, Email } };
}

/* GET page. */
router.get("/", function (req, res, next) {
  res.render("layout/main-layout", {
    body: "../pages/user-page.ejs",
    title: "Student Page",
    pageScript: "../scripts/user-script.ejs",
  });
});

/* GET all students. */
router.get("/load", function (req, res) {
  res.json(data);
});

/* POST create a student. */
router.post("/create", function (req, res) {
  const { error, value } = validateStudent(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error });
  }

  const nextId = data.length ? Math.max(...data.map((s) => s.Id)) + 1 : 1;
  const student = { Id: nextId, ...value };
  data.push(student);

  res
    .status(201)
    .json({ success: true, message: "Student created.", data: student });
});

/* PUT update a student. */
router.put("/update/:id", function (req, res) {
  const id = parseInt(req.params.id, 10);
  const index = data.findIndex((s) => s.Id === id);

  if (index === -1) {
    return res
      .status(404)
      .json({ success: false, message: "Student not found." });
  }

  const { error, value } = validateStudent(req.body, id);
  if (error) {
    return res.status(400).json({ success: false, message: error });
  }

  data[index] = { ...data[index], ...value };
  res.json({ success: true, message: "Student updated.", data: data[index] });
});

/* DELETE a student. */
router.delete("/delete/:id", function (req, res) {
  const id = parseInt(req.params.id, 10);
  const index = data.findIndex((s) => s.Id === id);

  if (index === -1) {
    return res
      .status(404)
      .json({ success: false, message: "Student not found." });
  }

  data.splice(index, 1);
  res.json({ success: true, message: "Student deleted." });
});

module.exports = router;