const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Acceso denegado, token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.usuario = decoded; /* Guarda el ID del usuario en req */
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
  }
};