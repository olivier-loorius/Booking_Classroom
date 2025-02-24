import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import User from "./user"; // ✅ Vérifie que cet import est bien présent

class Notification extends Model {
  public id!: string;
  public userId!: string;
  public message!: string;
  public read!: boolean;
  public createdAt!: Date;
}

Notification.init(
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "notifications",
    timestamps: false,
  }
);

// ✅ Vérifie cette relation :
Notification.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

export default Notification;
