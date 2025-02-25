import Room from './room';
import Equipment from './equipment';
import RoomEquipment from './roomEquipment';
import User from './user';
import Reservation from './reservation';
import Notification from './notification';

// Définir les relations
Room.belongsToMany(Equipment, { through: RoomEquipment });
Equipment.belongsToMany(Room, { through: RoomEquipment });

User.hasMany(Reservation, { foreignKey: 'userId' });
Reservation.belongsTo(User, { foreignKey: 'userId' });

Room.hasMany(Reservation, { foreignKey: 'roomId' });
Reservation.belongsTo(Room, { foreignKey: 'roomId' });

User.hasMany(Notification, { foreignKey: 'userId' });
Notification.belongsTo(User, { foreignKey: 'userId' });

const models = {
  Room,
  Equipment,
  RoomEquipment,
  User,
  Reservation,
  Notification,
};

export default models;