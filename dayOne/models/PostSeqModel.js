module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("PostTable", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  });

  return Post;
};
