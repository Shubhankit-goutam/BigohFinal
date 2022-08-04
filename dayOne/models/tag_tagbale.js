module.exports = (sequelize, DataTypes) => {
  const Tag_taggbale = sequelize.define("Tag_taggbale", {
    tagId: {
      type: DataTypes.INTEGER,
      unique: "tt_unique_constraint",
    },
    taggableId: {
      type: DataTypes.INTEGER,
      unique: "tt_unique_constraint",
    },
    taggabletype: {
      type: DataTypes.STRING,
      unique: "tt_unique_constraint",
    },
  });

  return Tag_taggbale;
};
