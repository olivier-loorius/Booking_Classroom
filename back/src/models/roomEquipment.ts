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
      primaryKey: true,
    },
    equipmentId: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: 'room_equipment',
    timestamps: false,
  }
);

// Définir les relations
Room.belongsToMany(Equipment, { through: RoomEquipment });
Equipment.belongsToMany(Room, { through: RoomEquipment });

export default RoomEquipment;