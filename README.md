# CheckPlots

## Overview
CheckPlots is a property listing and management API that allows users to add, retrieve, and manage property data with image uploads using Multer.

## Features
- Add new property listings with multiple images
- Retrieve property details
- Manage property attributes such as type, pricing, location, and amenities
- Uses Multer for handling file uploads
- Built with Node.js, Express, and MongoDB

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

### Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/checkplots.git
   cd checkplots
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables:
   Create a `.env` file in the root directory and add:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=3000
   ```

## Usage

### Start the Server
```sh
npm start
```

### API Endpoints

#### 1. Add Property
**Endpoint:** `POST /add-property`
- **Headers:** `Content-Type: multipart/form-data`
- **Body Parameters:**
  - `name` (string, required)
  - `type` (string, required) [Villa, Apartment, Commercial, Plot]
  - `details` (string, required)
  - `price` (string, required)
  - `address` (string, required)
  - `verified` (boolean, default: false)
  - `underDevelopment` (boolean, default: false)
  - `rating` (number, required)
  - `numberOfBedroom` (number)
  - `numberOfBathroom` (number)
  - `amenities` (array of strings)
  - `images` (file, optional)

#### 2. Get All Properties
**Endpoint:** `GET /properties`

#### 3. Get Property by ID
**Endpoint:** `GET /properties/:id`

#### 4. Delete Property
**Endpoint:** `DELETE /properties/:id`

## File Structure
```
checkplots/
│── models/
│   ├── Property.js
│── routes/
│   ├── propertyRoutes.js
│── controllers/
│   ├── propertyController.js
│── utils/
│   ├── multer.js
│── server.js
│── .env
│── package.json
│── README.md
```

## Technologies Used
- **Node.js** - Backend runtime
- **Express.js** - Web framework
- **MongoDB & Mongoose** - Database and ORM
- **Multer** - File upload middleware
- **Postman** - API testing

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License.
