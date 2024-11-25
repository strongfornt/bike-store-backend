
## Bike Store API
This project implements a Bike Store API using Express and TypeScript, integrated with MongoDB using Mongoose. It provides CRUD operations for managing bikes and orders, ensuring data integrity with Mongoose schema validation.

##  API Endpoints
### Products (Bikes)
- POST /api/products - Add a new bike.
- GET /api/products - Retrieve all bikes (search by name, brand, or category optional).
- GET /api/products/:productId - Get details of a specific bike.
- PUT /api/products/:productId - Update a bike.
- DELETE /api/products/:productId - Delete a bike.

### Orders
- POST /api/orders - Place a new order.
- GET /api/orders/revenue - Get total revenue from all orders.


## Features

### Products (Bikes)
- Create a bike: Add a new bike to the inventory with the required details in the following format
{
    "data": {
  "name": "Xtreme Mountain Bike",
  "brand": "Giant",
  "price": 1200,
  "category": "Mountain",
  "description": "A high-performance bike built for tough terrains.",
  "quantity": 50, (default to 1 if no quantity given)
  "inStock": true (default true if not given)
}
}

- Retrieve All Bikes: View all bikes, with optional search by name, brand, or category.
- Get a Specific Bike: Retrieve detailed information about a particular bike by ID.
- Update a Bike: Modify details like price and quantity of a bike.
- Delete a Bike: Remove a bike from the inventory.

### Orders
- Create an order: Place an order for a bike following this given data format
{
    "data":{
  "email": "customer@example.com",
  "product": "648a45e5f0123c45678d9012",
  "quantity": 2,
  "totalPrice": 2400
}
}

- Inventory Management: Automatically reduce bike quantity and update stock status.
- Revenue Calculation: Aggregate total revenue from all orders.

## 3. Technologies Used

- Backend Framework: Express.js with TypeScript
- Database: MongoDB with Mongoose
- Environment Management: dotenv
- Validation: Zod


## Locally Project Setup Instructions
### Clone the Repository:
- git clone https://github.com/strongfornt/bike-store-backend.git
- cd bike-store-backend

### Install Dependencies:
- npm install
### Configure Environment Variables:
- Create a .env file in the root directory.
- Add the following variables:
 PORT=3000
 DB_URL= mongodb+srv://<username>:<password>@cluster0.v2tnkbl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

### Run the Application:
- tsc --watch
- node dist/server.js (another terminal)