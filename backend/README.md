# Gifty Hub Backend

Node.js and MongoDB backend for the Gifty Hub gift shop application.

## Features

- RESTful API for gifts and orders
- MongoDB database with Mongoose ODM
- CORS enabled for frontend integration
- Auto-generated order numbers
- Gift categorization and filtering
- Order management system

## Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update `MONGODB_URI` with your MongoDB connection string
   - For local MongoDB: `mongodb://localhost:27017/gifty-hub`
   - For MongoDB Atlas: `mongodb+srv://<username>:<password>@cluster.mongodb.net/gifty-hub`

3. Seed the database with initial data:
```bash
npm run seed
```

### Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will run on `http://localhost:5000` by default.

## API Endpoints

### Gifts

- `GET /api/gifts` - Get all gifts (supports query params: `category`, `popular`)
- `GET /api/gifts/:id` - Get gift by ID
- `GET /api/gifts/category/:category` - Get gifts by category
- `POST /api/gifts` - Create new gift (admin)
- `PUT /api/gifts/:id` - Update gift (admin)
- `DELETE /api/gifts/:id` - Delete gift (admin)

### Orders

- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders/number/:orderNumber` - Get order by order number
- `GET /api/orders` - Get all orders (admin, supports pagination)
- `PUT /api/orders/:id/status` - Update order status (admin)

### Health Check

- `GET /api/health` - API health status

## Database Models

### Gift
- name, description, basePrice
- category, image, tags
- popular flag
- timestamps

### Order
- Auto-generated order number
- Customer information (name, email, phone, address)
- Order items with customization
- Total price and status
- Payment status
- timestamps

### User
- Email, password (for future authentication)
- Name, phone
- Addresses
- Order history
- Role (customer/admin)

## Environment Variables

- `MONGODB_URI` - MongoDB connection string
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)

## Project Structure

```
backend/
├── models/          # Mongoose schemas
│   ├── Gift.js
│   ├── Order.js
│   └── User.js
├── routes/          # API routes
│   ├── gifts.js
│   └── orders.js
├── utils/           # Utility scripts
│   └── seedDatabase.js
├── .env             # Environment variables
├── .env.example     # Environment template
├── server.js        # Main server file
└── package.json     # Dependencies
```

## Notes

- The cart functionality is currently handled on the frontend
- User authentication is not yet implemented but the User model is ready
- All prices are in USD
- Order numbers are generated in format: `GH{timestamp}-{count}`
