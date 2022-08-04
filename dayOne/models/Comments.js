module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("CommentTable", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    commentableId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    commentype: {
      type: DataTypes.STRING,
    },
  });

  return Comment;
};
