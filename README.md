# Gifty Hub - Premium Gift Shop

A beautiful, modern gift shop application built with React, Node.js, and MongoDB. Features a curated gift catalog, custom hamper builder, and seamless checkout experience.

## 🌟 Features

### Frontend
- **Beautiful UI** - Modern design with Tailwind CSS v4 and Framer Motion animations
- **Gift Catalog** - Browse curated premium gifts with filtering and search
- **Custom Hamper Builder** - Create personalized gift hampers
- **Shopping Cart** - Full cart management with customization options
- **Responsive Design** - Works perfectly on all devices
- **Dark Mode Ready** - Theme support with next-themes

### Backend
- **RESTful API** - Clean, organized Express.js endpoints
- **MongoDB Database** - Persistent data storage with Mongoose ODM
- **Order Management** - Auto-generated order numbers and tracking
- **Gift Management** - CRUD operations for gift catalog
- **Error Handling** - Comprehensive error handling and validation

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gifty-hub-jsx
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Configure MongoDB**
   
   **Option A: MongoDB Atlas (Recommended)**
   - Create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a cluster and get connection string
   - Update `backend/.env` with your connection string

   **Option B: Local MongoDB**
   - Install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)
   - Default configuration in `backend/.env` works out of the box

5. **Seed the database**
   ```bash
   cd backend
   npm run seed
   ```

6. **Start the application**
   
   **Terminal 1 - Backend:**
   ```bash
   npm run server:dev
   ```
   
   **Terminal 2 - Frontend:**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   - Frontend: `http://localhost:8080`
   - Backend API: `http://localhost:5000`

## 📁 Project Structure

```
gifty-hub-jsx/
├── backend/                 # Node.js backend
│   ├── models/             # Mongoose schemas
│   │   ├── Gift.js
│   │   ├── Order.js
│   │   └── User.js
│   ├── routes/             # API routes
│   │   ├── gifts.js
│   │   └── orders.js
│   ├── utils/              # Utility scripts
│   │   └── seedDatabase.js
│   ├── server.js           # Express server
│   ├── .env                # Environment config
│   └── package.json
│
├── src/                    # React frontend
│   ├── components/         # Reusable components
│   │   ├── gift/          # Gift-related components
│   │   ├── layout/        # Layout components
│   │   └── ui/            # UI components
│   ├── contexts/          # React contexts
│   │   └── CartContext.jsx
│   ├── pages/             # Page components
│   │   ├── Index.jsx
│   │   ├── Catalog.jsx
│   │   ├── Hampers.jsx
│   │   ├── Cart.jsx
│   │   └── Checkout.jsx
│   ├── services/          # API services
│   │   └── api.js
│   ├── data/              # Static data
│   ├── hooks/             # Custom hooks
│   ├── lib/               # Utilities
│   ├── App.jsx
│   └── main.jsx
│
├── public/                # Static assets
├── index.html
├── package.json
└── README.md
```

## 🔧 Available Scripts

### Frontend
- `npm run dev` - Start development server (Vite)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `npm run server` - Start backend server
- `npm run server:dev` - Start backend with auto-reload (nodemon)
- `cd backend && npm run seed` - Seed database with initial data

## 🎨 Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **React Query** - Data fetching and caching
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **CORS** - Cross-origin support
- **dotenv** - Environment variables

## 📡 API Endpoints

### Gifts
- `GET /api/gifts` - Get all gifts (supports `?category=` and `?popular=true`)
- `GET /api/gifts/:id` - Get single gift
- `GET /api/gifts/category/:category` - Get gifts by category
- `POST /api/gifts` - Create gift (admin)
- `PUT /api/gifts/:id` - Update gift (admin)
- `DELETE /api/gifts/:id` - Delete gift (admin)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders/number/:orderNumber` - Get order by number
- `GET /api/orders` - List all orders (admin)
- `PUT /api/orders/:id/status` - Update order status (admin)

### Health
- `GET /api/health` - API health check

## 🎁 Gift Categories

- Food & Treats
- Home & Living
- Fashion
- Beauty
- Stationery
- Plants

## 🛒 Features in Detail

### Gift Customization
- **Size Options**: Small, Medium, Large
- **Wrapping**: Standard, Premium, Luxury
- **Add-ons**: Ribbon, custom message
- **Dynamic Pricing**: Prices adjust based on customization

### Custom Hampers
- Choose hamper size (3, 5, or 8 items)
- Select from full gift catalog
- Custom naming
- Automatic price calculation
- Premium luxury wrapping included

### Shopping Cart
- Add/remove items
- Update quantities
- View customization details
- Real-time price updates
- Persistent cart state

### Checkout Process
- Two-step checkout (Shipping → Payment)
- Form validation
- Order submission to backend
- Order number generation
- Success confirmation

## 🔐 Environment Variables

Create `backend/.env` file:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/gifty-hub
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gifty-hub

# Server Configuration
PORT=5000
NODE_ENV=development
```

## 📝 Database Schema

### Gift
```javascript
{
  name: String,
  description: String,
  basePrice: Number,
  category: String,
  image: String,
  tags: [String],
  popular: Boolean,
  timestamps: true
}
```

### Order
```javascript
{
  orderNumber: String (auto-generated),
  customerInfo: {
    name: String,
    email: String,
    phone: String,
    address: Object
  },
  items: [OrderItem],
  totalPrice: Number,
  status: String,
  paymentStatus: String,
  timestamps: true
}
```

## 🚧 Future Enhancements

- [ ] User authentication (JWT)
- [ ] Admin dashboard
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Email notifications
- [ ] Order tracking
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Image upload for gifts
- [ ] Inventory management
- [ ] Advanced search with filters

## 📚 Documentation

- [Backend README](backend/README.md) - Detailed backend documentation
- [Implementation Plan](.gemini/antigravity/brain/*/implementation_plan.md) - Development plan
- [Walkthrough](.gemini/antigravity/brain/*/walkthrough.md) - Setup and testing guide

## 🐛 Troubleshooting

### Backend won't start
- Ensure MongoDB is running
- Check `.env` configuration
- Verify port 5000 is available

### Frontend can't connect to backend
- Confirm backend is running on port 5000
- Check browser console for errors
- Verify CORS settings

### No data showing
- Run database seed: `cd backend && npm run seed`
- Check MongoDB connection
- Verify data in database using MongoDB Compass

## 📄 License

This project is licensed under the ISC License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using React, Node.js, and MongoDB
