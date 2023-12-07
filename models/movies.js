const helper = require("../services/helper");

module.exports = function model(sequelize, types) {
  const Users = sequelize.define(
    "movies",
    {
      movie_id: {
        type: types.UUID,
        defaultValue: types.UUIDV4,
        primarykey: true,
        unique: true,
      },
      movie_name: {
        type: types.STRING,
        allowNull: false,
      },
      release_year: {
        type: types.INTEGER,
        allowNull: false,
      },
      movie_desc: {
        type: types.STRING,
        allowNull: false,
      },
      user_id: {
        type: types.UUID,
        references: {
          model: {
            tableName: "users",
          },
          key: "user_id",
        },
      },
    },

    {
      tableName: "movies",
    }
  );
  // Users.associate = function (models) {
  //   Users.hasMany(models.posts, {
  //     as: "posts",
  //     foreignKey: "userId",
  //     sourceKey: "uuid",
  //   });
  // };

  return Users;
};
