import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database";

// Charger les variables d'environnement
dotenv.config();

// Initialisation d'Express
const app = express();
app.use(express.json());
app.use(cors());

// Connexion à la base de données
connectDB();

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur lancé sur le port ${PORT}`));

