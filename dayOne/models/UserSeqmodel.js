module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "UserTable",
    {
      Username: {
        type: DataTypes.STRING,
      },
      UserAddress: {
        type: DataTypes.TEXT,
      },
      UserEmail: {
        type: DataTypes.STRING,
      },
      Mobile_Number: {
        type: DataTypes.STRING,
      },
    },
    {
      paranoid: true,
      deletedAt: "softDelete",
    }
  );

  return User;
};
