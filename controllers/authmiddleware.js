const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.cookies.authToken;
  
  if (!token) return res.status(403).json({mensaje: 'Access denied!'});

   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido o expirado' });
    }

    // Si el token es válido, agregar el usuario al objeto req
    req.user = user;
    next();  // Continuar con la solicitud
  });
};

module.exports = authenticateToken;