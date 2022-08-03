const db = require("../models");

const Product = db.products;
const Review = db.reviews;

const addProduct = async (req, res) => {
  let info = {
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  const product = await Product.create(info);
  res.status(200).send(product);
  console.log(product);
};

const getAllProducts = async (req, res) => {
  let products = await Product.findAll({});
  res.status(200).send(products);
};

const getPublishedProduct = async (req, res) => {
  const products = await Product.findAll({ where: { published: true } });

  res.status(200).send(products);
};

const getProductReviews = async (req, res) => {
  const id = req.params.id;

  const data = await Product.findOne({
    include: [
      {
        model: Review,
        as: "review",
      },
    ],
    where: { id: id },
  });

  res.status(200).send(data);
};

module.exports = {
  addProduct,
  getAllProducts,
  getPublishedProduct,
  getProductReviews,
};
