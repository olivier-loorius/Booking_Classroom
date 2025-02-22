import { Router } from 'express';
import { createReservation, getReservations, getReservationById, updateReservation, deleteReservation } from '../controllers/reservationController';

const router = Router();

router.post('/reservations', createReservation); // Route pour créer une nouvelle réservation
router.get('/reservations', getReservations); // Route pour récupérer toutes les réservations
router.get('/reservations/:id', getReservationById); // Route pour récupérer une réservation par son ID
router.put('/reservations/:id', updateReservation); // Route pour mettre à jour une réservation
router.delete('/reservations/:id', deleteReservation); // Route pour supprimer une réservation

export default router;