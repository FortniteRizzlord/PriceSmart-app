const logoutController = {
  logout: async (req, res) => {
    try {
      // Limpiar la cookie del token
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
      });

      res.status(200).json({ message: "Logout exitoso" });
    } catch (error) {
      res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
  }
};

export default logoutController;