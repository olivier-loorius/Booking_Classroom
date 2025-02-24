/// <reference types="jest" />

import request from 'supertest';
import express from 'express';
import reservationRoutes from '../src/routes/reservationRoutes';
import { sequelize } from '../src/config/database';
import { expect, beforeAll, afterAll } from '@jest/globals';

// Initialisation d'Express
const app = express();
app.use(express.json());
app.use('/api', reservationRoutes);

// Avant tous les tests, synchroniser la base de données
beforeAll(async () => {
  await sequelize.sync({ force: true });
});

// Après tous les tests, fermer la connexion à la base de données
afterAll(async () => {
  await sequelize.close();
});

describe('Test des routes de réservation', () => {
  it('devrait créer une nouvelle réservation', async () => {
    const response = await request(app)
      .post('/api/reservations')
      .send({
        userId: '123e4567-e89b-12d3-a456-426614174000',
        roomId: '123e4567-e89b-12d3-a456-426614174001',
        startTime: new Date(),
        endTime: new Date(Date.now() + 60 * 60 * 1000) // 1 heure plus tard
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('devrait récupérer toutes les réservations', async () => {
    const response = await request(app).get('/api/reservations');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('devrait récupérer une réservation par son ID', async () => {
    const newReservation = await request(app)
      .post('/api/reservations')
      .send({
        userId: '123e4567-e89b-12d3-a456-426614174000',
        roomId: '123e4567-e89b-12d3-a456-426614174001',
        startTime: new Date(),
        endTime: new Date(Date.now() + 60 * 60 * 1000) // 1 heure plus tard
      });

    const response = await request(app).get(`/api/reservations/${newReservation.body.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', newReservation.body.id);
  });

  it('devrait mettre à jour une réservation', async () => {
    const newReservation = await request(app)
      .post('/api/reservations')
      .send({
        userId: '123e4567-e89b-12d3-a456-426614174000',
        roomId: '123e4567-e89b-12d3-a456-426614174001',
        startTime: new Date(),
        endTime: new Date(Date.now() + 60 * 60 * 1000) // 1 heure plus tard
      });

    const response = await request(app)
      .put(`/api/reservations/${newReservation.body.id}`)
      .send({
        startTime: new Date(),
        endTime: new Date(Date.now() + 2 * 60 * 60 * 1000) // 2 heures plus tard
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('endTime');
  });

  it('devrait supprimer une réservation', async () => {
    const newReservation = await request(app)
      .post('/api/reservations')
      .send({
        userId: '123e4567-e89b-12d3-a456-426614174000',
        roomId: '123e4567-e89b-12d3-a456-426614174001',
        startTime: new Date(),
        endTime: new Date(Date.now() + 60 * 60 * 1000) // 1 heure plus tard
      });

    const response = await request(app).delete(`/api/reservations/${newReservation.body.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Réservation supprimée');
  });
});