const { posts } = require("../models");
const db = require("../models");
const msg = require("../message");
const { Sequelize, Op, DataTypes } = require("sequelize");

const Users = db.users;
const Posts = db.posts;
const Tags = db.tags;
const PostTags = db.postTag;
const Comments = db.comments;
const Videos = db.videos;
const Images = db.images;

const addUser = async (req, res) => {
  let data = {
    Username: req.body.Username,
    UserAddress: req.body.UserAddress,
    UserEmail: req.body.UserAddress,
    Mobile_Number: req.body.Mobile_Number,
  };
  const userResult = await Users.create(data);
  res.send({
    result: userResult,
    success_msg: msg.success_msg,
    status: msg.success_code,
  });
};

const getAllUsers = async (req, res) => {
  const users = await Users.findAll({
    where: {
      // like is case senstive
      Username: {
        [Op.like]: "S%", //start with "%S"
      },

      // Username: { //ILike is case senstive
      //   [Op.iLike]: "S%", //start with "%S"
      // },
      // },
      // Username: {
      //   [Op.like]: "%y", //end with "%y"
      // },
      // Mobile_Number: {
      //   [Op.like]: "93%",
      // },
    },
    // Username: {
    //   [Op.like]: "%iy%", //find Any value  that matches "%iy%" Any Positions
    // },
    // paranoid: false, //get  delete data from Paranoid data
  });
  // const deletData = await Users.destroy({
  //   //  restore
  //   where: { id: 2 }, //soft delete data
  // });

  res.status(200).send(users);
};

// Posts controllers

const addPost = async (req, res) => {
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

// add  tags
const addTag = async (req, res) => {
  let data = {
    name: req.body.name,
  };
  const tagResult = await Tags.create(data);
  res.status(200).send(tagResult);
};

// add  Posttags
const addPostTag = async (req, res) => {
  let data = {
    postId: req.body.postId,
    tagId: req.body.tagId,
    PostTableId: req.body.postId,
  };
  const PosttagResult = await PostTags.create(data);
  res.status(200).send(PosttagResult);
};

//Many to Many Realations

const getManytoMany = async (req, res) => {
  // M to M for Post to Tags
  const postResult = await Posts.findAll({
    attributes: ["name", "title", "description"],
    include: [
      {
        model: Tags,
        attributes: ["name"],
      },
    ],
  });
  // const postResult = await Tags.findAll({
  //   include: [
  //     {
  //       model: Posts,
  //     },
  //   ],
  // });
  res.status(200).send(postResult);
};

// One to One Poly.. //
const addVideos = async (req, res) => {
  let data = {
    title: req.body.title,
    text: req.body.text,
  };
  const videoResult = await Videos.create(data);
  res.status(200).send(videoResult);
};

const addImages = async (req, res) => {
  let data = {
    title: req.body.title,
    Url: req.body.Url,
  };
  const ImagesResult = await Images.create(data);
  res.status(200).send(ImagesResult);
};

const addComments = async (req, res) => {
  let data = {
    title: req.body.title,
    commentableId: req.body.commentableId,
    commentype: req.body.commentype,
  };
  const CommentsResult = await Comments.create(data);
  res.status(200).send(CommentsResult);
};

const getpolymorphic = async (req, res) => {
  // image to comment
  // const ImagesResult = await Images.findAll({
  //   include: [
  //     {
  //       model: Comments,
  //     },
  //   ],
  // });
  // res.status(200).send(ImagesResult);

  // video to comment
  // const CommentsResult = await Videos.findAll({
  //   include: [
  //     {
  //       model: Comments,
  //     },
  //   ],
  // });
  // res.status(200).send(CommentsResult);

  // comment to video /Image  //

  const ImagesResult = await Comments.findAll({
    include: [
      {
        model: Images,
      },
    ],
  });
  res.status(200).send(ImagesResult);
};

module.exports = {
  addUser,
  getAllUsers,
  addPost,
  getAllPost,
  getBelongPost,
  getOnetoMany,
  addTag,
  addPostTag,
  getManytoMany,
  addVideos,
  addComments,
  addImages,
  getpolymorphic,
};
