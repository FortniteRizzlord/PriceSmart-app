import Product from "../models/Products.js";

const productsController = {
  // Obtener todos los productos
  getProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener productos", error: error.message });
    }
  },

  // Crear un nuevo producto
  createProducts: async (req, res) => {
    try {
      const newProduct = new Product(req.body);
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      res.status(500).json({ message: "Error al crear producto", error: error.message });
    }
  },

  // Obtener un producto individual
  getSingleProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener producto", error: error.message });
    }
  },

  // Actualizar un producto
  updateProducts: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedProduct) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar producto", error: error.message });
    }
  },

  // Eliminar un producto
  deleteProducts: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
      res.status(200).json({ message: "Producto eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar producto", error: error.message });
    }
  }
};

export default productsController;