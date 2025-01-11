# Node.js Server

This is a simple Node.js server running on port 3000. You can run it either directly on your local machine or using Docker.

---

## Requirements

- **For normal execution**:
  - Node.js (v18 or later)
  - npm (Node Package Manager)

- **For Docker execution**:
  - Docker
  - Docker Compose (optional, but recommended)

---

## Getting Started

### Running Normally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/kishusingh413/KoinX_Assignment.git
   cd KoinX_Assignment
   npm install
   npm run start

2. **Using docker**:
    git clone https://github.com/kishusingh413/KoinX_Assignment.git
    cd KoinX_Assignment
    docker compose up -d

### Acceesing server
Now server is accessible on url: http://localhot:3000


3. **APIs**:
    Base URL
    Local: http://localhost:3000
    Production: http://13.61.13.107/

4. **API Endpoints**
    1. POST /api/status:
        Retrieve detailed information about a specific cryptocurrency.

        Request 
        - Method: POST
        - URL: /api/status
        - Headers:
        - Content-Type: application/json
        - body: 
            {
                coin:"bitcoin"
            }

    2.POST /api/deviation:
        Calculate and retrieve the standard deviation of the price of a specific cryptocurrency.

        Request
        - Method: POST
        - URL: /api/deviation
        - Headers:
        - Content-Type: application/json
        - body: 
            {
                coin:"bitcoin"
            }