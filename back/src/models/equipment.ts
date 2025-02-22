import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

class Equipment extends Model {
  public id!: string;
  public name!: string;
  public createdAt!: Date;
}

Equipment.init(
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
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'equipment',
    timestamps: false,
  }
);

export default Equipment;