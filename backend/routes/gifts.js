import express from 'express';
import Gift from '../models/Gift.js';

const router = express.Router();

// GET all gifts with optional category filter
router.get('/', async (req, res) => {
  try {
    const { category, popular } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (popular === 'true') {
      query.popular = true;
    }

    const gifts = await Gift.find(query).sort({ createdAt: -1 });
    res.json(gifts);
  } catch (error) {
    console.error('Error fetching gifts:', error);
    res.status(500).json({ error: 'Failed to fetch gifts', message: error.message });
  }
});

// GET single gift by ID
router.get('/:id', async (req, res) => {
  try {
    const gift = await Gift.findById(req.params.id);
    
    if (!gift) {
      return res.status(404).json({ error: 'Gift not found' });
    }

    res.json(gift);
  } catch (error) {
    console.error('Error fetching gift:', error);
    res.status(500).json({ error: 'Failed to fetch gift', message: error.message });
  }
});

// GET gifts by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const gifts = await Gift.find({ category }).sort({ createdAt: -1 });
    res.json(gifts);
  } catch (error) {
    console.error('Error fetching gifts by category:', error);
    res.status(500).json({ error: 'Failed to fetch gifts', message: error.message });
  }
});

// POST create new gift (admin functionality)
router.post('/', async (req, res) => {
  try {
    const gift = new Gift(req.body);
    await gift.save();
    res.status(201).json(gift);
  } catch (error) {
    console.error('Error creating gift:', error);
    res.status(400).json({ error: 'Failed to create gift', message: error.message });
  }
});

// PUT update gift (admin functionality)
router.put('/:id', async (req, res) => {
  try {
    const gift = await Gift.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!gift) {
      return res.status(404).json({ error: 'Gift not found' });
    }

    res.json(gift);
  } catch (error) {
    console.error('Error updating gift:', error);
    res.status(400).json({ error: 'Failed to update gift', message: error.message });
  }
});

// DELETE gift (admin functionality)
router.delete('/:id', async (req, res) => {
  try {
    const gift = await Gift.findByIdAndDelete(req.params.id);

    if (!gift) {
      return res.status(404).json({ error: 'Gift not found' });
    }

    res.json({ message: 'Gift deleted successfully', gift });
  } catch (error) {
    console.error('Error deleting gift:', error);
    res.status(500).json({ error: 'Failed to delete gift', message: error.message });
  }
});

export default router;
