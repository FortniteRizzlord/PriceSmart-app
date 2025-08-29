import Employee from "../models/employee.js";

const employeesController = {
  // Obtener todos los empleados
  getemployee: async (req, res) => {
    try {
      const employees = await Employee.find().select('-password');
      res.status(200).json(employees);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener empleados", error: error.message });
    }
  },

  // Crear un nuevo empleado
  createemployee: async (req, res) => {
    try {
      const newEmployee = new Employee(req.body);
      const savedEmployee = await newEmployee.save();
      const { password, ...employeeWithoutPassword } = savedEmployee.toObject();
      res.status(201).json(employeeWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Error al crear empleado", error: error.message });
    }
  },

  // Actualizar un empleado
  updateemployee: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, { new: true }).select('-password');
      if (!updatedEmployee) {
        return res.status(404).json({ message: "Empleado no encontrado" });
      }
      res.status(200).json(updatedEmployee);
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar empleado", error: error.message });
    }
  },

  // Eliminar un empleado
  deleteemployee: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedEmployee = await Employee.findByIdAndDelete(id);
      if (!deletedEmployee) {
        return res.status(404).json({ message: "Empleado no encontrado" });
      }
      res.status(200).json({ message: "Empleado eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar empleado", error: error.message });
    }
  }
};

export default employeesController;