module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("category", {
    CateName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CateStatus: {
      type: DataTypes.BOOLEAN,
    },
  });

  return Category;
};
