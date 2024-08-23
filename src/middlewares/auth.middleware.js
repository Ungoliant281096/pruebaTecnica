import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const auth = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "No token, permiso denegado" });
    }

    jwt.verify(token, TOKEN_SECRET, (error, user) => {
      if (error) {
        return res.status(401).json({ message: "Token inválido" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const isAdmin = (req, res, next) => {
  if (!req.user || req.user.rol !== 'admin') {
    return res.status(403).json({ message: "Acceso denegado. Solo los administradores pueden realizar esta acción." });
  }
  next();
};
