// filepath: /C:/Users/utilisateur/Desktop/Booking_Classroom/Booking_Classroom/back/src/controllers/authController.ts
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { jwtConfig } from '../config/auth';
import User from '../models/user';
import bcrypt from 'bcrypt';

// Inscription d'un nouvel utilisateur
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    // Vérifie si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    // Crée un nouvel utilisateur
    const newUser = await User.create({ name, email, password, role });

    // Génère un token JWT
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    // Retourne l'utilisateur et le token
    res.status(201).json({ user: newUser, token });
  } catch (error) {
    // En cas d'erreur, renvoie un message d'erreur
    res.status(500).json({ message: "Erreur lors de l'inscription", error });
  }
};

// Connexion d'un utilisateur
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Vérifie si l'utilisateur existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérifie le mot de passe avec bcrypt
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    // Génère un token JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    // Retourne l'utilisateur et le token
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la connexion", error });
  }
};