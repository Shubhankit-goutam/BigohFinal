const { posts } = require("../models");
const db = require("../models");

const Users = db.users;
const Posts = db.posts;

const addUser = async (req, res) => {
  let data = {
    Username: req.body.Username,
    UserAddress: req.body.UserAddress,
    UserEmail: req.body.UserAddress,
  };
  const userResult = await Users.create(data);
  res.status(200).send(userResult);
};

const getAllUsers = async (req, res) => {
  const users = await Users.findAll();
  res.status(200).send(users);
};

// Posts controllers

const addPost = async (req, res) => {
  console.log(">>>>>>", req.body);
  let data = {
    name: req.body.name,
    title: req.body.title,
    description: req.body.description,
    user_id: req.body.User_Id,
  };
  const postResult = await Posts.create(data);
  res.status(200).send(postResult);
};

// has one Relationship Or One to One relationship

const getAllPost = async (req, res) => {
  const id = req.params.id;
  const postResult = await Users.findAll({
    attributes: ["Username", "UserAddress", "UserEmail"],
    include: [
      {
        model: Posts,
        attributes: ["name", ["title", "Description"]],
      },
    ],
    where: {
      id: id,
    },
  });
  res.status(200).send(postResult);
};

// has blongs relationship

const getBelongPost = async (req, res) => {
  const postResult = await Posts.findAll({
    include: [
      {
        model: Users,
      },
    ],
  });
  res.status(200).send(postResult);
};

// one to many Relationship

const getOnetoMany = async (req, res) => {
  const id = req.params.id;
  const postResult = await Users.findAll({
    attributes: ["Username", "UserAddress", "UserEmail"],
    include: [
      {
        model: Posts,
        attributes: ["name", ["title", "Description"]],
      },
    ],
  });
  res.status(200).send(postResult);
};

module.exports = {
  addUser,
  getAllUsers,
  addPost,
  getAllPost,
  getBelongPost,
  getOnetoMany,
};