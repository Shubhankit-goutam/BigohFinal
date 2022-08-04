module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define("VideoTable", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
    },
  });

  return Video;
};
