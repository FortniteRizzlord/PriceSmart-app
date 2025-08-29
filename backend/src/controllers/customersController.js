import Customer from "../models/customers.js";

const customersController = {
  // Obtener todos los customers
  getcustomers: async (req, res) => {
    try {
      const customers = await Customer.find();
      res.status(200).json(customers);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener customers", error: error.message });
    }
  },

  // Crear un nuevo customer
  createcustomers: async (req, res) => {
    try {
      const newCustomer = new Customer(req.body);
      const savedCustomer = await newCustomer.save();
      res.status(201).json(savedCustomer);
    } catch (error) {
      res.status(500).json({ message: "Error al crear customer", error: error.message });
    }
  },

  // Actualizar un customer
  updatecustomers: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedCustomer = await Customer.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedCustomer) {
        return res.status(404).json({ message: "Customer no encontrado" });
      }
      res.status(200).json(updatedCustomer);
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar customer", error: error.message });
    }
  },

  // Eliminar un customer
  deletecustomers: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedCustomer = await Customer.findByIdAndDelete(id);
      if (!deletedCustomer) {
        return res.status(404).json({ message: "Customer no encontrado" });
      }
      res.status(200).json({ message: "Customer eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar customer", error: error.message });
    }
  }
};

export default customersController;