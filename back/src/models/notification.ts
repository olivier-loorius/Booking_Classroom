import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import User from './user';

class Notification extends Model {
  public id!: string;
  public userId!: string;
  public message!: string;
  public createdAt!: Date;
  public read!: boolean;
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
      references: {
        model: User,
        key: 'id',
      },
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'notifications',
    timestamps: false,
  }
);

export default Notification;