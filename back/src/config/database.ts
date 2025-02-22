// Importation des modules nécessaires
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

// Afficher les variables d'environnement pour le débogage
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_HOST:', process.env.DB_HOST);

// Initialisation de Sequelize avec les variables d'environnement
const sequelize = new Sequelize(
  process.env.DB_NAME as string, // Nom de la base de données
  process.env.DB_USER as string, // Nom d'utilisateur de la base de données
  process.env.DB_PASSWORD as string, // Mot de passe de la base de données
  {
    host: process.env.DB_HOST, // Hôte de la base de données
    dialect: "mysql", // Type de base de données (MySQL)
    logging: false, // Désactiver les logs SQL
  }
);

// Fonction pour vérifier la connexion à la base de données
const connectDB = async () => {
  try {
    // Authentification auprès de la base de données
    await sequelize.authenticate();
    console.log("✅ Connexion à MySQL réussie !");
  } catch (error) {
    // En cas d'erreur, afficher le message d'erreur et arrêter le processus
    console.error("❌ Erreur de connexion à MySQL :", error);
    process.exit(1);
  }
};

// Exporter l'instance de Sequelize et la fonction de connexion
export { sequelize, connectDB };