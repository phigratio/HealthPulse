# HealthPulse

**HealthPulse** is a full-stack web application built using a **React.js** frontend and **Spring Boot** backend. It showcases the integration of these two technologies to build a modern web application with seamless API communication.

## Table of Contents

- [HealthPulse](#healthpulse)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
    - [Frontend (React)](#frontend-react)
    - [Backend (Spring Boot)](#backend-spring-boot)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Frontend Setup (React)](#frontend-setup-react)
    - [Backend Setup (Spring Boot)](#backend-setup-spring-boot)
  - [Running the Application](#running-the-application)
  - [API Documentation](#api-documentation)
    - [Example API Request](#example-api-request)

## Features

- Responsive UI built with React
- REST API integration with Spring Boot
- User authentication and authorization (JWT)
- Database integration (MySQL)
- Easy API consumption using Axios
- Scalable and maintainable architecture
- Microservice Architecture for the backend

## Technologies Used

### Frontend (React)

- **React** - A UI library for building user interfaces.
- **Axios** - A promise-based HTTP client for API requests.
- **React Router** - Handles routing within the app.
- **CSS** - For styling the components.

### Backend (Spring Boot)

- **Spring Boot** - Java-based framework for building web applications.
- **Spring Data JPA** - For database interactions.
- **Spring Security** - For securing the API.
- **MySQL** - Database (replace with the database of your choice).
- **Gradle** - Build tool.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (for the frontend)
- **Java 17+** (for the backend)
- **Gradle** (for managing backend dependencies)
- **MySQL** (or any other database you're using)
- **Git** (for version control)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/phigratio/HealthPulse.git
   cd HealthPulse
   ```

### Frontend Setup (React)

1. Navigate to the frontend folder:

   ```bash
   cd Healthpulse-app
   ```

2. Install the necessary dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:

   - Create a `.env` file to store your API keys and configurations.

5. Start the React application:
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000`.

### Backend Setup (Spring Boot)

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```
2. navigate to the microservices folder:

   
   ```bash
   cd microservice_name
   ```

   #Microservice running serial :
      1. Setion Registry
      2. Config Server
      3. Api GateWay
      4. Auth Server
      5. Others as you want ...
  

2. Set up the database:

   - Configure your database connection in the `application.properties` file located in the `src/main/resources` folder:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/your_db_name
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
   ```

3. Install backend dependencies:

   ```bash
   ./gradlew build
   ```

4. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```
   The backend will run on the port(s) you assign to the microservices.

## Running the Application

Once both the React frontend and Spring Boot backend are running:

- The React app will interact with the Spring Boot backend via the defined API endpoints.

## API Documentation

To automatically generate API documentation for your Spring Boot backend, you can use tools like **Swagger**.

Alternatively, here’s an example of how API requests are structured:

### Example API Request

**GET** `/api/users`  
Headers:

- Content-Type: `application/json`
- Authorization: `Bearer <JWT Token>`

**Example Response:**

```json
{
  "id": 1,
  "name": "abc",
  "email": "abc@example.com"
}
```
