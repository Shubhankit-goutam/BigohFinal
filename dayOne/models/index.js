const dbConfig = require("../config/dbConfig.js");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected..");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require("./productModel.js")(sequelize, DataTypes);
db.reviews = require("./reviewModel.js")(sequelize, DataTypes);
db.category = require("./CategoryModel.js")(sequelize, DataTypes);
db.users = require("./UserSeqmodel.js")(sequelize, DataTypes);
db.posts = require("./PostSeqModel.js")(sequelize, DataTypes);
db.postTag = require("./postTagModel.js")(sequelize, DataTypes);
db.tags = require("./tags.js")(sequelize, DataTypes);
db.comments = require("./Comments")(sequelize, DataTypes);
db.videos = require("./VideoModel.js")(sequelize, DataTypes);
db.images = require("./ImageModel.js")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});

// 1 to Many Relation

db.products.hasMany(db.reviews, {
  foreignKey: "product_id",
  as: "review",
});

db.reviews.belongsTo(db.products, {
  foreignKey: "product_id",
  as: "product",
});

// one to one  relationship //

//db.users.hasOne(db.posts, { foreignKey: "user_id" });

// One to Many Relationship //

db.posts.belongsTo(db.users, { foreignKey: "user_id" });
//db.users.hasMany(db.posts, { foreignKey: "user_id" });

// Many to Many Relationship //
db.posts.belongsToMany(
  db.tags,
  { through: "postTag" },
  { foreignKey: "PostTableId" }
);
db.tags.belongsToMany(
  db.posts,
  { through: "postTag" },
  { foreignKey: "PostTableId" }
);

// M to M Relationship //

db.images.hasMany(db.comments, {
  foreignKey: "commentableId",
  constraints: false,
  scope: { commentype: "image" },
});

db.videos.hasMany(db.comments, {
  foreignKey: "commentableId",
  constraints: false,
  scope: { commentype: "video" },
});

db.comments.belongsTo(db.images, {
  foreignKey: "commentableId",
  constraints: false,
});
db.comments.belongsTo(db.videos, {
  foreignKey: "commentableId",
  constraints: false,
});

db.tag_taggbale = require("./tag_tagbale")(sequelize, DataTypes);

db.images.belongsToMany(db.tags, {
  through: {
    model: db.tag_taggbale,
    unique: false,
    scope: {
      taggabletype: "image",
    },
  },
  foreignKey: "taggableId",
  constraints: false,
});

module.exports = db;
