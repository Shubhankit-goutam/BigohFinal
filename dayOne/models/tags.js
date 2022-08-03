module.exports = (sequelize, DataTypes) => {
  const Tags = sequelize.define("tags", {
    name: {
      type: DataTypes.STRING,
    },
  });

  return Tags;
};
