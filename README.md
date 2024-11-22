# Event-Logging-System
A scalable backend system that provides a decentralized, tamper-proof event logging platform for distributed applications.

## Features
- **Event Logging API**: RESTful API to receive and manage event logs.
- **Tamper-Proof Storage**: Cryptographic hashing to ensure event integrity.
- **Search and Query**: Filters by timestamp range, event type, and source application with pagination support.
- **Scalable Database**: Uses MongoDB with indexing for efficient querying.

  
## Getting Started

Follow the steps below to set up the project locally.

### Prerequisites

- **Node.js** (version 14 or later)
- **MongoDB** (Local or MongoDB Atlas)
- **npm** (Node Package Manager)

### 1. Clone the Repository & Install Dependencies

```bash
git clone https://github.com/skg1312/Event-Logging-System.git
cd event-logging-system
npm install
```
### 2. Set Up Environment Variables
 - Create a .env file in the root of the project and add the following configuration:
```bash
MONGO_URI=mongodb://localhost:27017/event_logs  # Or your MongoDB Atlas URI
PORT=3000
```
### 3. Start the Application
```bash
npm run dev
```
- This will run the server on http://localhost:3000


### Test the API
- You can test the API using tools like Postman.

**POST /logs**
To create a new log entry:
- URL: /logs
- Method: POST
- Body (JSON)
```json
{
  "eventType": "USER_LOGIN",
  "sourceAppId": "App123",
  "dataPayload": {
    "username": "john_doe",
    "status": "success"
  }
}
```
**GET /logs**
To retrieve logs with filters:
- URL: /logs
- Method: GET
- Query Params:
  - **Example request**
```bash
https://localhost:3000/logs?eventType=USER_LOGIN&sourceAppId=App123&page=1&limit=10
```

### Error Handling
- The API returns appropriate HTTP status codes:
- - 400 Bad Request: For invalid or missing data.
  - 500 Internal Server Error: For server-side errors.





