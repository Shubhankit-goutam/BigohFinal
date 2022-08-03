const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const router = require("./routes/productRouter.js");
app.use("/api/products", router);

app.use("/Images", express.static("./Images"));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
