module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("UserTable", {
    Username: {
      type: DataTypes.STRING,
    },
    UserAddress: {
      type: DataTypes.TEXT,
    },
    UserEmail: {
      type: DataTypes.STRING,
    },
  });

  return User;
};
