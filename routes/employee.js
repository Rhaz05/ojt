var express = require("express");
var router = express.Router();

let employee = [
  {
    "Id": 101,
    "Name": "Alice Santos",
    "Age": 28,
    "Department": "Engineering",
    "Salary": 75000,
    "Years": 3,
    "City": "Manila",
    "Performance": 92
  },
  {
    "Id": 102,
    "Name": "Brian Cruz",
    "Age": 34,
    "Department": "Marketing",
    "Salary": 82000,
    "Years": 7,
    "City": "Cebu",
    "Performance": 88
  },
  {
    "Id": 103,
    "Name": "Carla Reyes",
    "Age": 25,
    "Department": "Design",
    "Salary": 62000,
    "Years": 2,
    "City": "Manila",
    "Performance": 95
  },
  {
    "Id": 104,
    "Name": "Daniel Garcia",
    "Age": 41,
    "Department": "Engineering",
    "Salary": 105000,
    "Years": 12,
    "City": "Davao",
    "Performance": 91
  },
  {
    "Id": 105,
    "Name": "Emma Torres",
    "Age": 29,
    "Department": "Human Resources",
    "Salary": 68000,
    "Years": 4,
    "City": "Manila",
    "Performance": 86
  },
  {
    "Id": 106,
    "Name": "Frank Mendoza",
    "Age": 36,
    "Department": "Finance",
    "Salary": 79000,
    "Years": 8,
    "City": "Cebu",
    "Performance": 89
  },
  {
    "Id": 107,
    "Name": "Grace Aquino",
    "Age": 31,
    "Department": "Engineering",
    "Salary": 98000,
    "Years": 6,
    "City": "Laguna",
    "Performance": 97
  },
  {
    "Id": 108,
    "Name": "Henry Flores",
    "Age": 45,
    "Department": "Sales",
    "Salary": 115000,
    "Years": 15,
    "City": "Manila",
    "Performance": 83
  },
  {
    "Id": 109,
    "Name": "Ivy Navarro",
    "Age": 26,
    "Department": "Information Technology",
    "Salary": 58000,
    "Years": 2,
    "City": "Cebu",
    "Performance": 90
  },
  {
    "Id": 110,
    "Name": "Jack Ramos",
    "Age": 39,
    "Department": "Operations",
    "Salary": 93000,
    "Years": 10,
    "City": "Davao",
    "Performance": 87
  },
  {
    "Id": 111,
    "Name": "Karen Villanueva",
    "Age": 24,
    "Department": "Marketing",
    "Salary": 55000,
    "Years": 1,
    "City": "Manila",
    "Performance": 91
  },
  {
    "Id": 112,
    "Name": "Leo Bautista",
    "Age": 30,
    "Department": "Data & Analytics",
    "Salary": 72000,
    "Years": 4,
    "City": "Quezon City",
    "Performance": 94
  },
  {
    "Id": 113,
    "Name": "Maria Castillo",
    "Age": 37,
    "Department": "Accounting",
    "Salary": 76000,
    "Years": 9,
    "City": "Manila",
    "Performance": 85
  },
  {
    "Id": 114,
    "Name": "Nathan Lim",
    "Age": 27,
    "Department": "Engineering",
    "Salary": 58000,
    "Years": 2,
    "City": "Cebu",
    "Performance": 89
  },
  {
    "Id": 115,
    "Name": "Olivia Tan",
    "Age": 33,
    "Department": "Product Management",
    "Salary": 90000,
    "Years": 7,
    "City": "Manila",
    "Performance": 93
  },
  {
    "Id": 116,
    "Name": "Paul Herrera",
    "Age": 42,
    "Department": "Legal",
    "Salary": 125000,
    "Years": 14,
    "City": "Makati",
    "Performance": 90
  },
  {
    "Id": 117,
    "Name": "Rachel Diaz",
    "Age": 29,
    "Department": "Quality Assurance",
    "Salary": 70000,
    "Years": 5,
    "City": "Laguna",
    "Performance": 96
  },
  {
    "Id": 118,
    "Name": "Steven Co",
    "Age": 35,
    "Department": "Security",
    "Salary": 85000,
    "Years": 8,
    "City": "Manila",
    "Performance": 88
  },
  {
    "Id": 119,
    "Name": "Tina Valdez",
    "Age": 32,
    "Department": "Customer Service",
    "Salary": 78000,
    "Years": 6,
    "City": "Cebu",
    "Performance": 84
  },
  {
    "Id": 120,
    "Name": "Victor Ong",
    "Age": 48,
    "Department": "Information Technology",
    "Salary": 110000,
    "Years": 18,
    "City": "Manila",
    "Performance": 92
  }
];

const DEPARTMENT = [
  "Information Technology(IT)",
  "Human Resources",
  "Finance",
  "Accounting",
  "Marketing",
  "Sales",
  "Operations",
  "Customer Service",
  "Product Management",
  "Research & Development (R&D)",
  "Design",
  "Legal"
];


function validateEmployee(body, ignoreId = null) {
  const Name = (body.Name ?? "").trim();
  const Age = (body.Age ?? "").trim();
  const Department = (body.Department ?? "").trim();
  const Salary = (body.Salary ?? "").trim();
  const Years = (body.Years ?? "").trim();
  const City = (body.City ?? "").trim();
  const Performance = (body.Performance ?? "").trim();

  if (!Name) return { error: "Name is required." };
  if (!Age) return { error: "Age is required." };
  if (!DEPARTMENT.includes(Department)) return { error: "Invalid Department." };
  if (!Salary) return { error: "Salary is required." };
  if (!Years) return { error: "Years is required." };
  if (!City) return { error: "City is required." };
  if (!Performance) return { error: "Performance is required." };

  return { value: { Name, Age, Department, Position, Salary, Years, City, Performance, } };
}

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("layout/main-layout", {
    body: "../pages/employee-page.ejs",
    title: "Error",
    pageScript: "../scripts/employee-script.ejs",
  });
});

router.get("/load", function (req, res) {
  res.json(employee);
});

/* POST create a student. */
router.post("/create", function (req, res) {
  const { error, value } = validateEmployee(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error });
  }

  const nextId = employee.length ? Math.max(...employee.map((s) => s.employeeId)) + 1 : 1;
  const addEmployee = { employeeId: nextId, ...value };
  employee.push(addEmployee);

  res
    .status(201)
    .json({ success: true, message: "Student created.", employee: addEmployee });
});

/* PUT update a student. */
router.put("/update/:id", function (req, res) {
  const id = parseInt(req.params.id, 10);
  console.log(id);
  const index = employee.findIndex((s) => s.Id === id);

  if (index === -1) {
    return res
      .status(404)
      .json({ success: false, message: "Employee not found." });
  }

  const { error, value } = validateEmployee(req.body, id);
  if (error) {
    return res.status(400).json({ success: false, message: error });
  }

  employee[index] = { ...employee[index], ...value };
  res.json({ success: true, message: "Employee updated.", employee: employee[index] });
});

/* DELETE a student. */
router.delete("/delete/:id", function (req, res) {
  const id = parseInt(req.params.id, 10);
  const index = employee.findIndex((s) => s.Id === id);

  if (index === -1) {
    return res
      .status(404)
      .json({ success: false, message: "Student not found." });
  }

  employee.splice(index, 1);
  res.json({ success: true, message: "Student deleted." });
});

module.exports = router;