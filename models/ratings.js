module.exports = function model(sequelize, types) {
  const ratings = sequelize.define(
    "ratings",
    {
      rating_id: {
        type: types.UUID,
        defaultValue: types.UUIDV4,
        primarykey: true,
        unique: true,
      },
      rating: {
        type: types.INTEGER,
        defaultValue: 0,
      },
      user_id: {
        type: types.UUID,
        references: {
          model: {
            tableName: "users",
          },
          key: "user_id",
        },
        allowNull: false,
        onDelete: "CASCADE",
      },
    },

    {
      tableName: "ratings",
      timestamps: false,
    }
  );

  ratings.associate = function (models) {
    ratings.belongsTo(models.users, {
      as: "user",
      foreignKey: "user_id",
      targetKey: "user_id",
    });
    ratings.belongsTo(models.items, {
      as: "item",
      foreignKey: "item_id",
      targetKey: "item_id",
    });
  };
  return ratings;
};
