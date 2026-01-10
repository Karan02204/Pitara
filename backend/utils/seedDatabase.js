import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Gift from '../models/Gift.js';

// Load environment variables
dotenv.config();

// Gift data - 108 professionally curated items with accurate images
const giftsData = [
  // ==================== FOOD & TREATS (25 items) ====================
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
    name: "Gourmet Tea Collection",
    description: "Exquisite loose leaf teas from around the world",
    basePrice: 55,
    category: "Food & Treats",
    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=400&fit=crop",
    tags: ["tea", "gourmet", "wellness"],
    popular: true
  },
  {
    name: "Artisan Coffee Set",
    description: "Premium single-origin coffee beans with brewing accessories",
    basePrice: 70,
    category: "Food & Treats",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=400&fit=crop",
    tags: ["coffee", "gourmet", "brewing"]
  },
  {
    name: "Vintage Wine Selection",
    description: "Carefully curated selection of premium vintage wines",
    basePrice: 200,
    category: "Food & Treats",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&h=400&fit=crop",
    tags: ["wine", "vintage", "celebration"]
  },
  {
    name: "Organic Honey Gift Set",
    description: "Raw organic honey varieties from local beekeepers",
    basePrice: 38,
    category: "Food & Treats",
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop",
    tags: ["honey", "organic", "natural"]
  },
  {
    name: "Truffle Oil & Salt Collection",
    description: "Gourmet truffle-infused oils and finishing salts",
    basePrice: 65,
    category: "Food & Treats",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop",
    tags: ["truffle", "gourmet", "cooking"]
  },
  {
    name: "Artisan Cheese Board Set",
    description: "Premium cheese selection with crackers and preserves",
    basePrice: 85,
    category: "Food & Treats",
    image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400&h=400&fit=crop",
    tags: ["cheese", "gourmet", "entertaining"]
  },
  {
    name: "Exotic Spice Collection",
    description: "Hand-selected spices from around the globe",
    basePrice: 48,
    category: "Food & Treats",
    image: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=400&h=400&fit=crop",
    tags: ["spices", "cooking", "exotic"]
  },
  {
    name: "Gourmet Popcorn Trio",
    description: "Three flavors of artisan popcorn in decorative tins",
    basePrice: 32,
    category: "Food & Treats",
    image: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=400&h=400&fit=crop",
    tags: ["popcorn", "snacks", "gourmet"]
  },
  {
    name: "Handmade Pasta Gift Set",
    description: "Italian artisan pasta with premium sauces",
    basePrice: 52,
    category: "Food & Treats",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=400&fit=crop",
    tags: ["pasta", "italian", "gourmet"]
  },
  {
    name: "Premium Olive Oil Collection",
    description: "Extra virgin olive oils from Mediterranean estates",
    basePrice: 75,
    category: "Food & Treats",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop",
    tags: ["olive oil", "gourmet", "cooking"],
    popular: true
  },
  {
    name: "Artisan Cookie Assortment",
    description: "Hand-baked cookies in a beautiful keepsake tin",
    basePrice: 35,
    category: "Food & Treats",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=400&fit=crop",
    tags: ["cookies", "baked goods", "sweet"]
  },
  {
    name: "Gourmet Hot Sauce Set",
    description: "Small-batch hot sauces ranging from mild to extreme",
    basePrice: 42,
    category: "Food & Treats",
    image: "https://images.unsplash.com/photo-1625943553852-781c6dd46faa?w=400&h=400&fit=crop",
    tags: ["hot sauce", "spicy", "condiments"]
  },
  {
    name: "Luxury Champagne",
    description: "Premium French champagne in elegant presentation box",
    basePrice: 180,
    category: "Food & Treats",
    image: "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400&h=400&fit=crop",
    tags: ["champagne", "celebration", "luxury"]
  },
  {
    name: "Organic Nut Butter Collection",
    description: "Artisan nut butters made from premium ingredients",
    basePrice: 45,
    category: "Food & Treats",
    image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=400&fit=crop",
    tags: ["nut butter", "organic", "healthy"]
  },
  {
    name: "Gourmet Jam & Preserve Set",
    description: "Small-batch fruit preserves in assorted flavors",
    basePrice: 38,
    category: "Food & Treats",
    image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400&h=400&fit=crop",
    tags: ["jam", "preserves", "breakfast"]
  },
  {
    name: "Craft Beer Selection Box",
    description: "Curated selection of local craft beers",
    basePrice: 55,
    category: "Food & Treats",
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=400&fit=crop",
    tags: ["beer", "craft", "beverages"]
  },
  {
    name: "Matcha Tea Ceremony Set",
    description: "Premium matcha powder with traditional accessories",
    basePrice: 68,
    category: "Food & Treats",
    image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&h=400&fit=crop",
    tags: ["matcha", "tea", "japanese"]
  },
  {
    name: "Gourmet Balsamic Vinegar Set",
    description: "Aged balsamic vinegars from Modena",
    basePrice: 72,
    category: "Food & Treats",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop",
    tags: ["vinegar", "balsamic", "gourmet"]
  },
  {
    name: "Artisan Bread Making Kit",
    description: "Everything needed to bake artisan bread at home",
    basePrice: 58,
    category: "Food & Treats",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop",
    tags: ["bread", "baking", "diy"]
  },
  {
    name: "Premium Dark Chocolate Bar Collection",
    description: "Single-origin dark chocolate bars from master chocolatiers",
    basePrice: 52,
    category: "Food & Treats",
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=400&h=400&fit=crop",
    tags: ["chocolate", "dark chocolate", "premium"]
  },
  {
    name: "Gourmet Granola Gift Box",
    description: "Handcrafted granola in multiple flavors",
    basePrice: 36,
    category: "Food & Treats",
    image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=400&fit=crop",
    tags: ["granola", "breakfast", "healthy"]
  },
  {
    name: "Whiskey Tasting Set",
    description: "Premium whiskey samples from renowned distilleries",
    basePrice: 165,
    category: "Food & Treats",
    image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=400&h=400&fit=crop",
    tags: ["whiskey", "spirits", "tasting"]
  },
  {
    name: "Artisan Caramel Collection",
    description: "Hand-pulled caramels in gourmet flavors",
    basePrice: 40,
    category: "Food & Treats",
    image: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400&h=400&fit=crop",
    tags: ["caramel", "candy", "sweet"]
  },
  {
    name: "Exotic Fruit Basket",
    description: "Selection of premium seasonal exotic fruits",
    basePrice: 95,
    category: "Food & Treats",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=400&fit=crop",
    tags: ["fruit", "fresh", "healthy"]
  },

  // ==================== HOME & LIVING (25 items) ====================
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
    name: "Crystal Wine Glasses",
    description: "Set of 2 hand-blown crystal wine glasses",
    basePrice: 120,
    category: "Home & Living",
    image: "https://images.unsplash.com/photo-1461958508236-9a742665a0d5?w=400&h=400&fit=crop",
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
    name: "Handcrafted Jewelry Box",
    description: "Wooden jewelry box with velvet interior and brass accents",
    basePrice: 90,
    category: "Home & Living",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
    tags: ["jewelry", "storage", "handcrafted"]
  },
  {
    name: "Ceramic Vase Collection",
    description: "Set of 3 modern ceramic vases in complementary colors",
    basePrice: 78,
    category: "Home & Living",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&h=400&fit=crop",
    tags: ["vase", "ceramic", "decor"]
  },
  {
    name: "Luxury Bedding Set",
    description: "Egyptian cotton sheets with high thread count",
    basePrice: 220,
    category: "Home & Living",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=400&fit=crop",
    tags: ["bedding", "luxury", "cotton"],
    popular: true
  },
  {
    name: "Decorative Throw Pillows",
    description: "Set of 4 velvet throw pillows with geometric patterns",
    basePrice: 85,
    category: "Home & Living",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&h=400&fit=crop",
    tags: ["pillows", "decor", "velvet"]
  },
  {
    name: "Marble Serving Board",
    description: "Premium marble cheese and charcuterie board",
    basePrice: 95,
    category: "Home & Living",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=400&fit=crop",
    tags: ["marble", "serving", "entertaining"]
  },
  {
    name: "Essential Oil Diffuser",
    description: "Ultrasonic aromatherapy diffuser with LED lights",
    basePrice: 55,
    category: "Home & Living",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop",
    tags: ["diffuser", "aromatherapy", "wellness"]
  },
  {
    name: "Handwoven Area Rug",
    description: "Artisan-made wool rug with traditional patterns",
    basePrice: 280,
    category: "Home & Living",
    image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=400&h=400&fit=crop",
    tags: ["rug", "handwoven", "decor"]
  },
  {
    name: "Copper Cookware Set",
    description: "Professional-grade copper pots and pans",
    basePrice: 320,
    category: "Home & Living",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    tags: ["cookware", "copper", "kitchen"]
  },
  {
    name: "Vintage Wall Clock",
    description: "Antique-style wall clock with Roman numerals",
    basePrice: 68,
    category: "Home & Living",
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400&h=400&fit=crop",
    tags: ["clock", "vintage", "decor"]
  },
  {
    name: "Crystal Table Lamp",
    description: "Elegant crystal base table lamp with silk shade",
    basePrice: 145,
    category: "Home & Living",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
    tags: ["lamp", "crystal", "lighting"]
  },
  {
    name: "Bamboo Bath Accessories Set",
    description: "Eco-friendly bamboo bathroom organizer set",
    basePrice: 62,
    category: "Home & Living",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop",
    tags: ["bamboo", "bathroom", "eco-friendly"]
  },
  {
    name: "Decorative Mirror Set",
    description: "Set of 3 geometric mirrors with gold frames",
    basePrice: 110,
    category: "Home & Living",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&h=400&fit=crop",
    tags: ["mirror", "decor", "gold"]
  },
  {
    name: "Porcelain Dinnerware Set",
    description: "16-piece fine porcelain dinner set",
    basePrice: 185,
    category: "Home & Living",
    image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400&h=400&fit=crop",
    tags: ["dinnerware", "porcelain", "dining"]
  },
  {
    name: "Woven Storage Baskets",
    description: "Set of 3 handwoven seagrass storage baskets",
    basePrice: 72,
    category: "Home & Living",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&h=400&fit=crop",
    tags: ["baskets", "storage", "organization"]
  },
  {
    name: "Stainless Steel Barware Set",
    description: "Professional cocktail shaker and bar tools",
    basePrice: 88,
    category: "Home & Living",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=400&fit=crop",
    tags: ["barware", "cocktails", "entertaining"]
  },
  {
    name: "Luxury Bath Towel Set",
    description: "Turkish cotton towels in premium quality",
    basePrice: 95,
    category: "Home & Living",
    image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop",
    tags: ["towels", "bath", "luxury"]
  },
  {
    name: "Wooden Cutting Board Set",
    description: "Handcrafted acacia wood cutting boards",
    basePrice: 65,
    category: "Home & Living",
    image: "https://images.unsplash.com/photo-1635826077993-112bb31980dc?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["cutting board", "wood", "kitchen"]
  },
  {
    name: "Decorative Bookends",
    description: "Marble and brass bookends with modern design",
    basePrice: 58,
    category: "Home & Living",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=400&fit=crop",
    tags: ["bookends", "decor", "marble"]
  },
  {
    name: "Ceramic Planter Set",
    description: "Set of 4 modern ceramic planters with drainage",
    basePrice: 52,
    category: "Home & Living",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop",
    tags: ["planters", "ceramic", "garden"]
  },
  {
    name: "Velvet Ottoman",
    description: "Luxurious velvet ottoman with gold legs",
    basePrice: 165,
    category: "Home & Living",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
    tags: ["ottoman", "velvet", "furniture"]
  },
  {
    name: "Picture Frame Collection",
    description: "Set of 7 coordinating photo frames",
    basePrice: 75,
    category: "Home & Living",
    image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=400&h=400&fit=crop",
    tags: ["frames", "photos", "decor"]
  },
  {
    name: "Himalayan Salt Lamp",
    description: "Natural Himalayan salt lamp with wooden base",
    basePrice: 45,
    category: "Home & Living",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&h=400&fit=crop",
    tags: ["salt lamp", "wellness", "lighting"]
  },

  // ==================== FASHION (20 items) ====================
  {
    name: "Silk Scarf",
    description: "100% mulberry silk scarf with hand-painted floral design",
    basePrice: 85,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
    tags: ["fashion", "silk", "accessory"]
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
    name: "Premium Leather Wallet",
    description: "Genuine Italian leather wallet with RFID protection",
    basePrice: 75,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop",
    tags: ["wallet", "leather", "accessory"]
  },
  {
    name: "Cashmere Sweater",
    description: "100% pure cashmere pullover in classic colors",
    basePrice: 195,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop",
    tags: ["cashmere", "sweater", "luxury"]
  },
  {
    name: "Designer Sunglasses",
    description: "Premium polarized sunglasses with UV protection",
    basePrice: 220,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop",
    tags: ["sunglasses", "designer", "accessory"],
    popular: true
  },
  {
    name: "Leather Belt",
    description: "Full-grain leather belt with brushed metal buckle",
    basePrice: 68,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    tags: ["belt", "leather", "accessory"]
  },
  {
    name: "Wool Fedora Hat",
    description: "Classic fedora hat in premium wool felt",
    basePrice: 82,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=400&h=400&fit=crop",
    tags: ["hat", "fedora", "wool"]
  },
  {
    name: "Designer Handbag",
    description: "Luxury leather handbag with signature hardware",
    basePrice: 450,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
    tags: ["handbag", "luxury", "leather"]
  },
  {
    name: "Silk Tie Collection",
    description: "Set of 3 premium silk ties in classic patterns",
    basePrice: 95,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=400&fit=crop",
    tags: ["tie", "silk", "formal"]
  },
  {
    name: "Leather Gloves",
    description: "Lambskin leather gloves with cashmere lining",
    basePrice: 110,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop",
    tags: ["gloves", "leather", "winter"]
  },
  {
    name: "Pearl Necklace",
    description: "Freshwater pearl necklace with sterling silver clasp",
    basePrice: 165,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
    tags: ["pearls", "jewelry", "necklace"]
  },
  {
    name: "Cufflinks Set",
    description: "Sterling silver cufflinks in elegant presentation box",
    basePrice: 88,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=400&h=400&fit=crop",
    tags: ["cufflinks", "silver", "formal"]
  },
  {
    name: "Pashmina Shawl",
    description: "Authentic Kashmiri pashmina shawl",
    basePrice: 175,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=400&fit=crop",
    tags: ["pashmina", "shawl", "luxury"]
  },
  {
    name: "Designer Sneakers",
    description: "Limited edition designer sneakers in premium leather",
    basePrice: 285,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    tags: ["sneakers", "shoes", "designer"]
  },
  {
    name: "Leather Messenger Bag",
    description: "Vintage-style leather messenger bag for laptop",
    basePrice: 195,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
    tags: ["bag", "leather", "messenger"]
  },
  {
    name: "Gold Bracelet",
    description: "14k gold chain bracelet with delicate design",
    basePrice: 320,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
    tags: ["bracelet", "gold", "jewelry"]
  },
  {
    name: "Cashmere Scarf",
    description: "Luxurious cashmere scarf in timeless plaid pattern",
    basePrice: 125,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&h=400&fit=crop",
    tags: ["scarf", "cashmere", "winter"]
  },
  {
    name: "Diamond Stud Earrings",
    description: "Classic diamond stud earrings in white gold",
    basePrice: 580,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
    tags: ["earrings", "diamond", "jewelry"]
  },
  {
    name: "Leather Backpack",
    description: "Premium leather backpack with laptop compartment",
    basePrice: 245,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    tags: ["backpack", "leather", "travel"]
  },
  {
    name: "Silk Pocket Square Set",
    description: "Collection of 5 silk pocket squares in coordinating colors",
    basePrice: 72,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400&h=400&fit=crop",
    tags: ["pocket square", "silk", "formal"]
  },

  // ==================== BEAUTY (18 items) ====================
  {
    name: "Perfume Gift Set",
    description: "Curated collection of designer fragrance samples",
    basePrice: 95,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop",
    tags: ["perfume", "beauty", "luxury"]
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
    name: "Luxury Skincare Set",
    description: "Premium anti-aging skincare collection",
    basePrice: 185,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop",
    tags: ["skincare", "luxury", "anti-aging"],
    popular: true
  },
  {
    name: "Makeup Brush Set",
    description: "Professional makeup brushes with vegan bristles",
    basePrice: 92,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop",
    tags: ["makeup", "brushes", "beauty"]
  },
  {
    name: "Organic Face Mask Collection",
    description: "Set of 6 natural clay and sheet masks",
    basePrice: 48,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop",
    tags: ["face mask", "organic", "skincare"]
  },
  {
    name: "Hair Care Luxury Set",
    description: "Salon-quality shampoo, conditioner, and treatment",
    basePrice: 110,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400&h=400&fit=crop",
    tags: ["hair care", "luxury", "salon"]
  },
  {
    name: "Essential Oils Collection",
    description: "Set of 10 pure therapeutic-grade essential oils",
    basePrice: 75,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop",
    tags: ["essential oils", "aromatherapy", "wellness"]
  },
  {
    name: "Nail Care Gift Set",
    description: "Premium manicure tools and luxury nail polishes",
    basePrice: 65,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop",
    tags: ["nail care", "manicure", "beauty"]
  },
  {
    name: "Luxury Body Lotion Set",
    description: "Hydrating body lotions in exotic fragrances",
    basePrice: 72,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
    tags: ["body lotion", "hydrating", "fragrance"]
  },
  {
    name: "Jade Roller & Gua Sha Set",
    description: "Authentic jade facial massage tools",
    basePrice: 58,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop",
    tags: ["jade roller", "facial", "massage"]
  },
  {
    name: "Organic Lip Care Collection",
    description: "Natural lip balms and treatments in gift box",
    basePrice: 42,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
    tags: ["lip care", "organic", "natural"]
  },
  {
    name: "Luxury Hand Cream Set",
    description: "Nourishing hand creams in elegant packaging",
    basePrice: 55,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop",
    tags: ["hand cream", "luxury", "moisturizer"]
  },
  {
    name: "Eyeshadow Palette",
    description: "Professional eyeshadow palette with 24 shades",
    basePrice: 88,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop",
    tags: ["eyeshadow", "makeup", "palette"]
  },
  {
    name: "Beard Grooming Kit",
    description: "Complete beard care set with oil, balm, and comb",
    basePrice: 68,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1621607512214-68297480165e?w=400&h=400&fit=crop",
    tags: ["beard", "grooming", "men"]
  },
  {
    name: "Luxury Soap Collection",
    description: "Handmade artisan soaps with natural ingredients",
    basePrice: 52,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1694888684993-23b8427eb785?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["soap", "handmade", "natural"]
  },
  {
    name: "Facial Serum Set",
    description: "Anti-aging serums with vitamin C and hyaluronic acid",
    basePrice: 125,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
    tags: ["serum", "anti-aging", "skincare"]
  },
  {
    name: "Makeup Organizer Set",
    description: "Acrylic makeup storage with multiple compartments",
    basePrice: 78,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
    tags: ["organizer", "storage", "makeup"]
  },
  {
    name: "Luxury Perfume Atomizer Set",
    description: "Refillable travel perfume atomizers in gift box",
    basePrice: 45,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop",
    tags: ["perfume", "atomizer", "travel"]
  },

  // ==================== STATIONERY (12 items) ====================
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
    name: "Bamboo Desk Organizer",
    description: "Eco-friendly desk organizer with multiple compartments",
    basePrice: 55,
    category: "Stationery",
    image: "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=400&h=400&fit=crop",
    tags: ["organizer", "bamboo", "office"]
  },
  {
    name: "Fountain Pen Set",
    description: "Luxury fountain pen with ink and presentation case",
    basePrice: 145,
    category: "Stationery",
    image: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=400&h=400&fit=crop",
    tags: ["fountain pen", "luxury", "writing"]
  },
  {
    name: "Calligraphy Starter Kit",
    description: "Complete calligraphy set with nibs, ink, and guide",
    basePrice: 72,
    category: "Stationery",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=400&fit=crop",
    tags: ["calligraphy", "art", "writing"]
  },
  {
    name: "Premium Notebook Collection",
    description: "Set of 3 hardcover notebooks with dotted pages",
    basePrice: 48,
    category: "Stationery",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&h=400&fit=crop",
    tags: ["notebook", "journal", "writing"]
  },
  {
    name: "Wax Seal Stamp Set",
    description: "Vintage wax seal kit with multiple stamp designs",
    basePrice: 58,
    category: "Stationery",
    image: "https://images.unsplash.com/photo-1606115915090-be18fea23ec7?w=400&h=400&fit=crop",
    tags: ["wax seal", "vintage", "letters"]
  },
  {
    name: "Colored Pencil Art Set",
    description: "Professional colored pencils in wooden presentation box",
    basePrice: 95,
    category: "Stationery",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop",
    tags: ["colored pencils", "art", "drawing"]
  },
  {
    name: "Desk Accessories Set",
    description: "Matching desk set with pen holder, tray, and accessories",
    basePrice: 88,
    category: "Stationery",
    image: "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=400&h=400&fit=crop",
    tags: ["desk accessories", "office", "organization"]
  },
  {
    name: "Watercolor Paint Set",
    description: "Artist-grade watercolors with brushes and paper",
    basePrice: 82,
    category: "Stationery",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop",
    tags: ["watercolor", "art", "painting"]
  },
  {
    name: "Luxury Stationery Set",
    description: "Embossed letterhead and envelopes in gift box",
    basePrice: 68,
    category: "Stationery",
    image: "https://images.unsplash.com/photo-1606115915090-be18fea23ec7?w=400&h=400&fit=crop",
    tags: ["stationery", "letterhead", "luxury"]
  },
  {
    name: "Bullet Journal Kit",
    description: "Complete bullet journaling set with stencils and markers",
    basePrice: 62,
    category: "Stationery",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&h=400&fit=crop",
    tags: ["bullet journal", "planner", "organization"]
  },
  {
    name: "Vintage Typewriter",
    description: "Restored vintage typewriter in working condition",
    basePrice: 285,
    category: "Stationery",
    image: "https://images.unsplash.com/photo-1516962126636-27ad087061cc?w=400&h=400&fit=crop",
    tags: ["typewriter", "vintage", "writing"]
  },

  // ==================== PLANTS (8 items) ====================
  {
    name: "Succulent Garden Kit",
    description: "Mini succulent plants in artisan ceramic pots",
    basePrice: 40,
    category: "Plants",
    image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=400&fit=crop",
    tags: ["plants", "garden", "decor"]
  },
  {
    name: "Bonsai Tree Starter Kit",
    description: "Japanese bonsai tree with care tools and guide",
    basePrice: 95,
    category: "Plants",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop",
    tags: ["bonsai", "tree", "japanese"],
    popular: true
  },
  {
    name: "Orchid Plant Collection",
    description: "Set of 3 beautiful orchids in decorative pots",
    basePrice: 125,
    category: "Plants",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop",
    tags: ["orchid", "flowers", "elegant"]
  },
  {
    name: "Herb Garden Kit",
    description: "Indoor herb garden with basil, mint, and rosemary",
    basePrice: 52,
    category: "Plants",
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400&h=400&fit=crop",
    tags: ["herbs", "garden", "cooking"]
  },
  {
    name: "Air Plant Terrarium",
    description: "Geometric glass terrarium with air plants",
    basePrice: 68,
    category: "Plants",
    image: "https://images.unsplash.com/photo-1545241047-6083a3684587?w=400&h=400&fit=crop",
    tags: ["air plants", "terrarium", "modern"]
  },
  {
    name: "Fiddle Leaf Fig Tree",
    description: "Popular indoor tree in decorative planter",
    basePrice: 110,
    category: "Plants",
    image: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=400&h=400&fit=crop",
    tags: ["fiddle leaf fig", "tree", "indoor"]
  },
  {
    name: "Cactus Collection",
    description: "Assorted cacti in colorful ceramic pots",
    basePrice: 45,
    category: "Plants",
    image: "https://images.unsplash.com/photo-1509937528035-ad76254b0356?w=400&h=400&fit=crop",
    tags: ["cactus", "desert", "low maintenance"]
  },
  {
    name: "Hanging Plant Trio",
    description: "Three trailing plants in macrame hangers",
    basePrice: 88,
    category: "Plants",
    image: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=400&h=400&fit=crop",
    tags: ["hanging plants", "macrame", "decor"]
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
