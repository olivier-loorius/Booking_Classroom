import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

class Room extends Model {
  public id!: string;
  public name!: string;
  public capacity!: number;
  public createdAt!: Date;
}

Room.init(
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'rooms',
    timestamps: false,
  }
);

export default Room;
