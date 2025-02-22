import { Request, Response } from 'express';
import Reservation from '../models/reservation';

// ✅ Créer une nouvelle réservation
export const createReservation = async (req: Request, res: Response) => {
  try {
    const { userId, roomId, startTime, endTime } = req.body;
    const newReservation = await Reservation.create({ userId, roomId, startTime, endTime });
    res.status(201).json(newReservation);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de la réservation", error });
  }
};

// ✅ Récupérer toutes les réservations
export const getReservations = async (_req: Request, res: Response) => {
  try {
    const reservations = await Reservation.findAll();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des réservations", error });
  }
};

// ✅ Récupérer une réservation par son ID
export const getReservationById = async (req: Request, res: Response) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de la réservation", error });
  }
};

// ✅ Mettre à jour une réservation
export const updateReservation = async (req: Request, res: Response) => {
  try {
    const { startTime, endTime } = req.body;
    const reservation = await Reservation.findByPk(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }

    await reservation.update({ startTime, endTime });
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de la réservation", error });
  }
};

// ✅ Supprimer une réservation
export const deleteReservation = async (req: Request, res: Response) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }

    await reservation.destroy();
    res.json({ message: "Réservation supprimée" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de la réservation", error });
  }
};