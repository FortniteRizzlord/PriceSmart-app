import Employee from "../models/employee.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config.js";

const loginController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Verificar que se proporcionen email y password
      if (!email || !password) {
        return res.status(400).json({ message: "Email y password son requeridos" });
      }

      // Buscar el empleado por email
      const employee = await Employee.findOne({ email });
      if (!employee) {
        return res.status(401).json({ message: "Credenciales inválidas" });
      }

      // Verificar la contraseña
      const isPasswordValid = await bcrypt.compare(password, employee.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Credenciales inválidas" });
      }

      // Generar JWT token
      const token = jwt.sign(
        { 
          id: employee._id, 
          email: employee.email,
          role: employee.role 
        },
        config.JWT.secret,
        { expiresIn: config.JWT.expiresIn }
      );

      // Establecer cookie con el token
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 días
      });

      res.status(200).json({
        message: "Login exitoso",
        user: {
          id: employee._id,
          email: employee.email,
          role: employee.role,
          name: employee.name
        }
      });

    } catch (error) {
      res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
  }
};

export default loginController;