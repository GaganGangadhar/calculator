# Calculator API

This is a simple REST API for a calculator application built with Node.js, Express, and MongoDB. The API allows users to perform basic arithmetic operations and keeps a history of calculations.

## Features

- Perform calculations (add, subtract, multiply, divide)
- Store calculation history in a MongoDB database
- Retrieve past calculations
- Delete specific calculations

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm (Node package manager)

### Installation

1. Clone the repository:

   git clone <repository-url>

2. Navigate to the project directory:

   cd calculator-api

3. Install the dependencies:

   npm install

4. Create a `.env` file in the root directory and add your MongoDB connection string:

   MONGODB_URI=<your_mongodb_connection_string>

### Running the Application

1. Start the server:

   npm start

2. The server will run on `http://localhost:3000`.

### API Endpoints

- **POST /calculate**
  - Request Body: `{ "operation": "add|subtract|multiply|divide", "operands": [number1, number2, ...] }`
  - Response: `{ "result": number }`
  - Description: Performs the specified operation with the provided operands and saves the result in the database.

- **GET /history**
  - Response: `[ { "id": "operation_id", "operation": "add|subtract|multiply|divide", "operands": [number1, number2, ...], "result": number, "timestamp": "date" }, ... ]`
  - Description: Retrieves the history of all calculations.

- **GET /history/:id**
  - Response: `{ "id": "operation_id", "operation": "add|subtract|multiply|divide", "operands": [number1, number2, ...], "result": number, "timestamp": "date" }`
  - Description: Retrieves a specific calculation by its ID.

- **DELETE /history/:id**
  - Response: `{ "message": "Operation deleted successfully." }`
  - Description: Deletes a specific calculation by its ID.

### Error Handling

- Division by zero will return a 400 error with a message indicating the issue.
- Invalid input will return a 400 error with a message indicating the issue.

## License

This project is licensed under the MIT License.