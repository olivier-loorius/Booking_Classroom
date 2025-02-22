// Configuration JWT pour l'authentification
// Cette configuration utilise des variables d'environnement pour définir le secret et la durée d'expiration du token JWT

export const jwtConfig = {
  // Secret utilisé pour signer les tokens JWT
  secret: process.env.JWT_SECRET as string,

  // Durée d'expiration des tokens JWT en secondes
  // Si la variable d'environnement JWT_EXPIRES_IN est définie, elle est convertie en nombre
  // Sinon, la durée par défaut est de 3600 secondes (1 heure)
  expiresIn: process.env.JWT_EXPIRES_IN ? parseInt(process.env.JWT_EXPIRES_IN) : 3600,
};