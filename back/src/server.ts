import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { sequelize } from "./config/database";

// ✅ CHARGER LES MODÈLES AVANT LES ROUTES
import "./models/user";
import "./models/notification";
import "./models/room";
import "./models/reservation";
import "./models/equipment";
import "./models/roomEquipment";

import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import roomRoutes from "./routes/roomRoutes";
import equipmentRoutes from "./routes/equipmentRoutes"; // Assurez-vous que le chemin est correct
import notificationRoutes from "./routes/notificationRoutes";

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/rooms", roomRoutes);
app.use("/api", equipmentRoutes);
app.use("/notifications", notificationRoutes);

app.get("/", (req, res) => {
  res.send("Bienvenue sur le serveur Booking Classroom!");
});

// Connexion à la base de données et synchronisation des modèles
sequelize
  .sync()
  .then(() => {
    console.log("Base de données synchronisée");
  })
  .catch((error) => {
    console.error("Erreur de synchronisation de la base de données :", error);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur lancé sur le port ${PORT}`));
