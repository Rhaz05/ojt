var express = require("express");
var router = express.Router();

let orders = [
  {
    OrderNumber: 1,
    CustomerName: "Ryan Tugawe",
    Order: "Biscoff Latte",
    ModeOfPayment: "Cash",
    Total: "123",
  },
  {
    OrderNumber: 2,
    CustomerName: "Dinorobong Tubo",
    Order: "Mixed Berries Frappe",
    ModeOfPayment: "Gcash",
    Total: "130",
  },
 {
    OrderNumber: 3,
    CustomerName: "Makagago Wazzapman",
    Order: "Caramel Machiatto",
    ModeOfPayment: "Bank Transfer",
    Total: "110",
  },
  {
    OrderNumber: 4,
    CustomerName: "Dunk It Jonathan",
    Order: "Java Chip",
    ModeOfPayment: "Cash",
    Total: "180",
  },
];

const payment = ["Cash", "Gcash", "Bank Transfer"];

function validateOrders(body, ignoreId = null){
  const CustomerName = (body.CustomerName ?? "")
  const Order = (body.Order ?? "")
  const ModeOfPayment = (body.ModeOfPayment ?? "")
  const Total = (body.Total ?? "")


  if (!CustomerName) return { error: "Customer Name is required." };
  if (!Order) return { error: "Order is required." };
  if (!payment.includes(ModeOfPayment)) return { error: "Invalid payment method." };
  if (!Total) return { error: "Please settle your bill." };
   return { value: { CustomerName, Order, ModeOfPayment, Total } };
}

router.get("/", function (req, res, next) {
  res.render("layout/main-layout", {
    body: "../pages/testing-page.ejs",
    title: "Testing Page",
    pageScript: "../scripts/testing-script.ejs",
  });
});

router.get("/load", function (req, res) {
  res.json(orders);
});

router.post("/create", function (req, res) {
  const { error, value } = validateOrders(req.body);
  console.log(value)
  if (error) {
    return res.status(400).json({ success: false, message: error });
  }

  const nextId = orders.length ? Math.max(...orders.map((s) => s.OrderNumber)) + 1 : 1;
  const customer = { OrderNumber: nextId, ...value };
  orders.push(customer);

  res
    .status(201)
    .json({ success: true, message: "Order created.", orders: customer });
});

router.put("/update/:id", function (req, res) {
  const id = parseInt(req.params.id, 10);
  const index = orders.findIndex((s) => s.OrderNumber === id);

  if (index === -1) {
    return res
      .status(404)
      .json({ success: false, message: "Student not found." });
  }

  const { error, value } = validateOrders(req.body, id);
  if (error) {
    return res.status(400).json({ success: false, message: error });
  }

  orders[index] = { ...orders[index], ...value };
  res.json({ success: true, message: "Student updated.", orders: orders[index] });
});

/* DELETE a student. */
router.delete("/delete/:id", function (req, res) {
  const id = parseInt(req.params.id, 10);
  const index = orders.findIndex((s) => s.OrderNumber === id);

  if (index === -1) {
    return res
      .status(404)
      .json({ success: false, message: "Order not found." });
  }

  orders.splice(index, 1);
  res.json({ success: true, message: "Order deleted." });
});

module.exports = router;