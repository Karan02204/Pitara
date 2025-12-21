import mongoose from 'mongoose';

const giftSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  basePrice: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Food & Treats', 'Home & Living', 'Fashion', 'Beauty', 'Stationery', 'Plants', 'Electronics', 'Books', 'Wellness', 'Entertainment']
  },
  image: {
    type: String,
    required: true
  },
  tags: [{
    type: String
  }],
  popular: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for faster queries
giftSchema.index({ category: 1 });
giftSchema.index({ popular: 1 });
giftSchema.index({ tags: 1 });

const Gift = mongoose.model('Gift', giftSchema);

export default Gift;
