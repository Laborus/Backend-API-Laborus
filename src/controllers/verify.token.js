const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("Received Token:", authHeader);

  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  // Remova o prefixo "Bearer " para obter apenas o token
  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error while verifying token:", error);

    if (error instanceof jwt.TokenExpiredError) {
      return res
        .status(401)
        .json({ message: "Token expirado. Faça login novamente." });
    } else {
      return res.status(401).json({ message: "Token inválido" });
    }
  }
};

module.exports = verifyToken;
