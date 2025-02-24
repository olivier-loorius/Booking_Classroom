import { Request, Response } from "express";
import Room from "../models/room";

// ✅ Créer une salle
export const createRoom = async (req: Request, res: Response) => {
  try {
    const { name, capacity } = req.body;
    const newRoom = await Room.create({ name, capacity });
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de la salle", error });
  }
};

// ✅ Récupérer toutes les salles
export const getRooms = async (_req: Request, res: Response) => {
  try {
    const rooms = await Room.findAll();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des salles", error });
  }
};

// ✅ Récupérer une salle par son ID
export const getRoomById = async (req: Request, res: Response) => {
  try {
    const room = await Room.findByPk(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Salle non trouvée" });
    }
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de la salle", error });
  }
};

// ✅ Mettre à jour une salle
export const updateRoom = async (req: Request, res: Response) => {
  try {
    const { name, capacity } = req.body;
    const room = await Room.findByPk(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Salle non trouvée" });
    }
    await room.update({ name, capacity });
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de la salle", error });
  }
};

// ✅ Supprimer une salle
export const deleteRoom = async (req: Request, res: Response) => {
  try {
    const room = await Room.findByPk(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Salle non trouvée" });
    }
    await room.destroy();
    res.json({ message: "Salle supprimée" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de la salle", error });
  }
};