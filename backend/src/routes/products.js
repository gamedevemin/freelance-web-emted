const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all products
router.get('/', async (req, res) => {
  try {
    const { category, search, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = 'SELECT * FROM products WHERE 1=1';
    const values = [];
    
    if (category) {
      query += ' AND category = $' + (values.length + 1);
      values.push(category);
    }
    
    if (search) {
      query += ' AND (name ILIKE $' + (values.length + 1) + ' OR description ILIKE $' + (values.length + 1) + ')';
      values.push(`%${search}%`);
    }
    
    query += ` LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
    values.push(limit, offset);
    
    const { rows } = await db.query(query, values);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a single product
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM products WHERE id = $1', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new product
router.post('/', async (req, res) => {
  try {
    const { name, description, price, category, stock, image_url } = req.body;
    
    const { rows } = await db.query(
      'INSERT INTO products (name, description, price, category, stock, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, description, price, category, stock, image_url]
    );
    
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a product
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, stock, image_url } = req.body;
    
    const { rows } = await db.query(
      'UPDATE products SET name = $1, description = $2, price = $3, category = $4, stock = $5, image_url = $6 WHERE id = $7 RETURNING *',
      [name, description, price, category, stock, image_url, id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await db.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
