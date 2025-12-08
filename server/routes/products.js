const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/get/", async (req, res) => {
  try {
    const products = await Product.find().sort({ "product.name": 1 });
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Server error fetching products" });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { id, product } = req.body;
    if (!product || !product.name) {
      return res.status(400).json({ error: "Product data is required" });
    }

    const newProduct = new Product({
      id,
      product,
    });

    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ error: "Server error creating product" });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const numericId = Number(req.params.id);
    const { product } = req.body;

    const updated = await Product.findOneAndUpdate(
      { id: numericId },
      { product },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ error: "Server error updating product" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const numericId = Number(req.params.id);
    const deleted = await Product.findOneAndDelete({ id: numericId });
    if (!deleted) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ error: "Server error deleting product" });
  }
});

module.exports = router;
