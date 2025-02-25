import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import Room from './room';
import Equipment from './equipment';

class RoomEquipment extends Model {
  public roomId!: string;
  public equipmentId!: string;
}

RoomEquipment.init(
  {
    roomId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: Room,
        key: 'id',
      },
      primaryKey: true,
    },
    equipmentId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: Equipment,
        key: 'id',
      },
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: 'room_equipment',
    timestamps: false,
  }
);

export default RoomEquipment;