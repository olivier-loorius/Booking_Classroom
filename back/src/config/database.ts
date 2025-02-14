import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Charger les variables d'environnement
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string || "root",
  process.env.DB_PASSWORD as string || "",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: false,
  }
);

// Vérifier la connexion
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connexion à MySQL réussie !");
  } catch (error) {
    console.error("❌ Erreur de connexion à MySQL :", error);
    process.exit(1);
  }
};

export { sequelize, connectDB };
