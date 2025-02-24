/// <reference types="jest" />

import request from 'supertest';
import express from 'express';
import cors from 'cors';
import { sequelize } from '../src/config/database';
import userRoutes from '../src/routes/userRoutes';
import authRoutes from '../src/routes/authRoutes';
import roomRoutes from '../src/routes/roomRoutes';
import equipmentRoutes from '../src/routes/equipmentRoutes';
import Equipment from '../src/models/equipment';
import RoomEquipment from '../src/models/roomEquipment';

// Initialisation d'Express
const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/rooms', roomRoutes);
app.use('/api', equipmentRoutes);

// Route de test
app.get('/', (req, res) => {
  res.send('Bienvenue sur le serveur Booking Classroom!');
});

// Avant tous les tests, synchroniser la base de données
beforeAll(async () => {
  try {
    // Supprimer les tables dans le bon ordre
    await RoomEquipment.drop();
    await Equipment.drop();
    await sequelize.sync({ force: true });
  } catch (error) {
    console.error('Erreur de synchronisation de la base de données :', error);
  }
});

// Après tous les tests, fermer la connexion à la base de données
afterAll(async () => {
  try {
    await sequelize.close();
  } catch (error) {
    console.error('Erreur de fermeture de la connexion à la base de données :', error);
  }
});

describe('Test de la route de test', () => {
  it('devrait renvoyer un message de bienvenue', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Bienvenue sur le serveur Booking Classroom!');
  });
});