module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define("ImageTable", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Url: {
      type: DataTypes.STRING,
    },
  });

  return Image;
};
