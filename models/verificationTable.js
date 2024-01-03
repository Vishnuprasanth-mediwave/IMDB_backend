const { DataTypes } = require("sequelize");
module.exports = function model(sequelize, types) {
  const VerificationTable = sequelize.define(
    "verificationtable",
    {
      verify_id: {
        type: types.UUID,
        defaultValue: types.UUIDV4,
        primarykey: true,
        unique: true,
      },
      verification_type: {
        type: types.STRING,
        allowNull: false,
      },
      otp: {
        type: types.INTEGER,
        allowNull: false,
      },
      expiresAt: {
        type: types.INTEGER,
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
        allowNull: false,
        onDelete: "CASCADE",
      },
    },
    {
      tableName: "verificationtable",
      timestamps: false,
    }
  );
  return VerificationTable;
};
