import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

// Définition du modèle Room
class Room extends Model {
  public id!: string;
  public name!: string;
  public capacity!: number;
  public createdAt!: Date;
}

// Initialisation du modèle Room avec ses attributs et options
Room.init(
  {
    // Attribut id : clé primaire, générée automatiquement en tant qu'UUID
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    // Attribut name : nom de la salle, unique et non nul
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    // Attribut capacity : capacité de la salle, non nulle et doit être supérieure à 0
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1, // ✅ Vérifie que la capacité est supérieure à 0
      },
    },
    // Attribut createdAt : date de création, valeur par défaut est la date actuelle
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize, // Instance de Sequelize pour la connexion à la base de données
    tableName: "rooms", // Nom de la table dans la base de données
    timestamps: false, // Désactive les timestamps automatiques (updatedAt, createdAt)
  }
);

export default Room;