import jwt from "jsonwebtoken";

// * funcion para crear un token con una firma secreta y un tiempo de expiración
//export const signToken = (payload) =>
//  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });


export const signToken = (user) => {
  try {
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        profile: user.profile,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    return token
  } catch (error) {
    throw new Error("Error al generar el token ");
  }
};

// * funcion para verificar que un token este con la misma firma secreta
export const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);
