import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import bcrypt from 'bcrypt'; // ✅ Import de bcrypt pour le hachage des mots de passe

// Définition du modèle User
class User extends Model {
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: string;
  public createdAt!: Date;

  // ✅ Méthode pour vérifier le mot de passe
  public async isValidPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}

// Initialisation du modèle User avec ses attributs et options
User.init(
  {
    // Attribut id : clé primaire, générée automatiquement en tant qu'UUID
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    // Attribut name : nom de l'utilisateur, non nul
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    // Attribut email : email de l'utilisateur, unique et non nul
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    // Attribut password : mot de passe de l'utilisateur, non nul
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Attribut role : rôle de l'utilisateur, valeur par défaut est 'user'
    role: {
      type: DataTypes.STRING(10),
      defaultValue: 'user',
    },
    // Attribut createdAt : date de création, valeur par défaut est la date actuelle
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize, // Instance de Sequelize pour la connexion à la base de données
    tableName: 'users', // Nom de la table dans la base de données
    timestamps: false, // Désactive les timestamps automatiques (updatedAt, createdAt)
  }
);

export default User;