import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

// Définition du modèle Reservation
class Reservation extends Model {
  public id!: string;
  public userId!: string;
  public roomId!: string;
  public startTime!: Date;
  public endTime!: Date;
  public createdAt!: Date;
}

// Initialisation du modèle Reservation avec ses attributs et options
Reservation.init(
  {
    // Attribut id : clé primaire, générée automatiquement en tant qu'UUID
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    // Attribut userId : référence à l'utilisateur, non nul
    userId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
    },
    // Attribut roomId : référence à la salle, non nul
    roomId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
    },
    // Attribut startTime : début de la réservation, non nul
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    // Attribut endTime : fin de la réservation, non nul
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    // Attribut createdAt : date de création, valeur par défaut est la date actuelle
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize, // Instance de Sequelize pour la connexion à la base de données
    tableName: 'reservations', // Nom de la table dans la base de données
    timestamps: false, // Désactive les timestamps automatiques (updatedAt, createdAt)
  }
);

export default Reservation;