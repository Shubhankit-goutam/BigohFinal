module.exports = (sequelize, DataTypes) => {
  const PostTag = sequelize.define("postTag", {
    postId: {
      type: DataTypes.INTEGER,
    },
    tagId: {
      type: DataTypes.INTEGER,
    },
  });

  return PostTag;
};
