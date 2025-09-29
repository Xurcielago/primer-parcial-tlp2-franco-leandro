import { hashPassword } from "../helpers/bcrypt.helper";
import { UserModel } from "../models/mongoose/user.model";


export const register = async (req, res) => {
  const { username, email, password, role, profile } = req.body;
  try {
  const hashedPassword = await hashPassword(password);
    // TODO: crear usuario con password hasheada y profile embebido
    // Completado 
    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      role,
      profile,
    });
    res.status(201).json({
      msg: "Usuario registrado correctamente",
      newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  try {
    // TODO: buscar user, validar password, firmar JWT y setear cookie httpOnly
    // Completado 
    
    const loginUser = await UserModel.findOne({ username });
    const validatePassword = await comparePassword(password, loginUser.password);
    if (!validatePassword) {
      return res.status(401).json("Credenciales inválidas");
    }
    const token = generateToken(loginUser);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 34560000,
    });
    return res.status(200).json({ msg: "Usuario logueado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getProfile = async (req, res) => {
  try {
    // TODO: devolver profile del user logueado actualmente
    // Completado
    const currentLoginUser = req.userLogin;
    res.status(200).json({
      profileData: currentLoginUser.profile,
    });


    return res.status(200).json({ data: profile });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const logout = async (_req, res) => {
  res.clearCookie("token");
  return res.status(204).json({ msg: "Sesión cerrada correctamente" });
};
