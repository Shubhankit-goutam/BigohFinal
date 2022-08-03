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
db.users.hasMany(db.posts, { foreignKey: "user_id" });

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

module.exports = db;
