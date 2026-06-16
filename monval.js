const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

const SECRET_KEY = "mysecretkey";

mongoose
  .connect("mongodb://127.0.0.1:27017/anshika")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const UserSchema = new mongoose.Schema({
  uname: String,
  pass: String,
});

const User = mongoose.model("college", UserSchema);

const ProductSchema = new mongoose.Schema({
  pname: String,
  price: Number,
  description: String,
});

const Product = mongoose.model("Product", ProductSchema);

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Token Missing",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({
      message: "Invalid Token",
    });
  }
};

app.post("/register", async (req, res) => {
  try {
    const { uname, pass } = req.body;

    const existingUser = await User.findOne({ uname });

    if (existingUser) {
      return res.json({
        message: "User Already Exists",
      });
    }

    const user = new User({
      uname,
      pass,
    });

    await user.save();

    res.json({
      message: "Registration Successful",
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { uname, pass } = req.body;

    const user = await User.findOne({
      uname,
      pass,
    });

    if (!user) {
      return res.json({
        message: "Invalid Username or Password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        uname: user.uname,
      },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.json({
      message: "Login Successful",
      token,
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

app.post("/addproduct", verifyToken, async (req, res) => {
  try {
    const { pname, price, description } = req.body;

    const product = new Product({
      pname,
      price,
      description,
    });

    await product.save();

    res.json({
      message: "Product Added Successfully",
      product,
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

app.get("/products", verifyToken, async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

app.get("/", (req, res) => {
  res.send("Backend Working");
});

app.listen(5000, () => {
  console.log("Server running on 5000");
});