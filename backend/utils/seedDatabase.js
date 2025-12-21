import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Gift from '../models/Gift.js';

// Load environment variables
dotenv.config();

// Gift data from the frontend
const giftsData = [
  {
    name: "Artisan Chocolate Collection",
    description: "Hand-crafted Belgian chocolates in an elegant gift box",
    basePrice: 45,
    category: "Food & Treats",
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&h=400&fit=crop",
    tags: ["chocolate", "gourmet", "luxury"],
    popular: true
  },
  {
    name: "Scented Candle Set",
    description: "Premium soy candles with relaxing lavender and vanilla notes",
    basePrice: 35,
    category: "Home & Living",
    image: "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?w=400&h=400&fit=crop",
    tags: ["candles", "relaxation", "home"],
    popular: true
  },
  {
    name: "Silk Scarf",
    description: "100% mulberry silk scarf with hand-painted floral design",
    basePrice: 85,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
    tags: ["fashion", "silk", "accessory"]
  },
  {
    name: "Gourmet Tea Collection",
    description: "Exquisite loose leaf teas from around the world",
    basePrice: 55,
    category: "Food & Treats",
    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=400&fit=crop",
    tags: ["tea", "gourmet", "wellness"],
    popular: true
  },
  {
    name: "Crystal Wine Glasses",
    description: "Set of 2 hand-blown crystal wine glasses",
    basePrice: 120,
    category: "Home & Living",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=400&fit=crop",
    tags: ["crystal", "wine", "elegant"]
  },
  {
    name: "Cashmere Throw Blanket",
    description: "Ultra-soft cashmere blend blanket in neutral tones",
    basePrice: 150,
    category: "Home & Living",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
    tags: ["cashmere", "cozy", "luxury"]
  },
  {
    name: "Leather Journal",
    description: "Hand-stitched Italian leather journal with gold-edged pages",
    basePrice: 65,
    category: "Stationery",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=400&fit=crop",
    tags: ["journal", "leather", "writing"],
    popular: true
  },
  {
    name: "Perfume Gift Set",
    description: "Curated collection of designer fragrance samples",
    basePrice: 95,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop",
    tags: ["perfume", "beauty", "luxury"]
  },
  {
    name: "Succulent Garden Kit",
    description: "Mini succulent plants in artisan ceramic pots",
    basePrice: 40,
    category: "Plants",
    image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=400&fit=crop",
    tags: ["plants", "garden", "decor"]
  },
  {
    name: "Artisan Coffee Set",
    description: "Premium single-origin coffee beans with brewing accessories",
    basePrice: 70,
    category: "Food & Treats",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
    tags: ["coffee", "gourmet", "brewing"]
  },
  {
    name: "Spa Relaxation Set",
    description: "Luxurious bath bombs, oils, and skincare essentials",
    basePrice: 80,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=400&fit=crop",
    tags: ["spa", "relaxation", "skincare"],
    popular: true
  },
  {
    name: "Vintage Wine Selection",
    description: "Carefully curated selection of premium vintage wines",
    basePrice: 200,
    category: "Food & Treats",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=400&fit=crop",
    tags: ["wine", "vintage", "celebration"]
  },
  {
    name: "Designer Watch",
    description: "Elegant timepiece with leather strap and precision movement",
    basePrice: 350,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=400&fit=crop",
    tags: ["watch", "luxury", "timepiece"],
    popular: true
  },
  {
    name: "Handcrafted Jewelry Box",
    description: "Wooden jewelry box with velvet interior and brass accents",
    basePrice: 90,
    category: "Home & Living",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
    tags: ["jewelry", "storage", "handcrafted"]
  },
  {
    name: "Premium Leather Wallet",
    description: "Genuine Italian leather wallet with RFID protection",
    basePrice: 75,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop",
    tags: ["wallet", "leather", "accessory"]
  },
  {
    name: "Wireless Headphones",
    description: "Premium noise-cancelling headphones with superior sound quality",
    basePrice: 280,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    tags: ["headphones", "audio", "tech"],
    popular: true
  },
  {
    name: "Bamboo Desk Organizer",
    description: "Eco-friendly desk organizer with multiple compartments",
    basePrice: 55,
    category: "Stationery",
    image: "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=400&h=400&fit=crop",
    tags: ["organizer", "bamboo", "office"]
  },
  {
    name: "Gourmet Cookbook Collection",
    description: "Set of 3 bestselling cookbooks from renowned chefs",
    basePrice: 85,
    category: "Books",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop",
    tags: ["cookbook", "cooking", "recipes"]
  },
  {
    name: "Yoga Mat & Accessories",
    description: "Premium yoga mat with carrying strap and blocks",
    basePrice: 95,
    category: "Wellness",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop",
    tags: ["yoga", "fitness", "wellness"]
  },
  {
    name: "Luxury Board Game Set",
    description: "Classic board games with premium wooden pieces",
    basePrice: 120,
    category: "Entertainment",
    image: "https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=400&h=400&fit=crop",
    tags: ["games", "entertainment", "family"]
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing gifts
    await Gift.deleteMany({});
    console.log('🗑️  Cleared existing gifts');

    // Insert new gifts
    const gifts = await Gift.insertMany(giftsData);
    console.log(`✨ Successfully seeded ${gifts.length} gifts`);

    // Display summary
    console.log('\n📊 Database Summary:');
    const categories = await Gift.distinct('category');
    for (const category of categories) {
      const count = await Gift.countDocuments({ category });
      console.log(`   ${category}: ${count} items`);
    }

    const popularCount = await Gift.countDocuments({ popular: true });
    console.log(`   Popular items: ${popularCount}`);

    console.log('\n✅ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
