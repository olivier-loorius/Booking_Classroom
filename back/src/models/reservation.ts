import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import User from './user';
import Room from './room';

class Reservation extends Model {
  public id!: string;
  public userId!: string;
  public roomId!: string;
  public startTime!: Date;
  public endTime!: Date;
  public createdAt!: Date;
}

Reservation.init(
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
    roomId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: Room,
        key: 'id',
      },
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'reservations',
    timestamps: false,
  }
);

export default Reservation;