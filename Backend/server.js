const express = require("express");
const usersRouter = require("./Endpoints/usersEndpoint");
const productsRouter = require("./Endpoints/productsEndpoint");
const ordersRouter = require("./Endpoints/ordersEndpoint");
const loginRouter = require("./Endpoints/loginEndpoint");
const rolesRouter = require("./Endpoints/rolesEndpoint");
const customersRouter = require("./Endpoints/customersEndpoint");
const customersTypeRouter = require("./Endpoints/customersTypeEndpoint");
const productsTypeRouter = require("./Endpoints/productsTypeEndpoint");
const orderDetailsRouter = require("./Endpoints/orderDetailsEndpoint");

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());
app.use("/user", usersRouter);
app.use("/product", productsRouter);
app.use("/order", ordersRouter);
app.use("/login", loginRouter);
app.use("/roles", rolesRouter);
app.use("/customers", customersRouter);
app.use("/customers-type", customersTypeRouter);
app.use("/products-type", productsTypeRouter);
app.use("/order-details", orderDetailsRouter);

app.get("/", (req, res) => {
  res.json({ message: "Inventory System Backend is running" });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
