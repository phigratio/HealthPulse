HealthPulse

This is a full-stack web application built using a React.js frontend and Spring Boot backend. The project demonstrates the integration of these two technologies to build a modern web application with API communication.

Table of Contents

Features
Technologies Used
Getting Started
Prerequisites
Installation
Frontend Setup (React)
Backend Setup (Spring Boot)
Running the Application
API Documentation

Features
Responsive UI built with React
REST API integration with Spring Boot
User authentication and authorization (JWT)
Database integration (MySQL)
Easy API consumption using Axios
Scalable and maintainable architecture
Microservice Architecture in Backend

Technologies Used

Frontend (React)
React - UI library for building user interfaces
Axios - Promise-based HTTP client for API requests
React Router - For routing within the app
CSS - For styling the components

Backend (Spring Boot)
Spring Boot - Java-based framework for building web applications
Spring Data JPA - For database interaction
Spring Security - For securing the API
MySQL- Database (you can mention your database)
Gradle - Build tool

Getting Started
Prerequisites
Node.js (for frontend)
Java 17+ (for backend)
Gradle (for backend dependencies)
MySQL (or any other database you're using)
Git (for version control)

Installation

Clone the repository:

git clone https://github.com/phigratio/HealthPulse.git
cd HealthPulse
Frontend Setup (React)
Navigate to the frontend folder:

cd Healthpulse-app
Install dependencies:

npm install

Set up environment variables:

Create a .env file to store the API Keys

Start the React application:

npm start
The frontend will run on http://localhost:3000.

Backend Setup (Spring Boot)
Navigate to the backend folder:

cd backend

Set up the database:

Configure your database connection in the application.properties file located in the src/main/resources folder:

spring.datasource.url=jdbc:mysql://localhost:3306/your_db_name
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update

Install backend dependencies (if using Maven):

./gradlew build

Run the Spring Boot application:

mvn spring-boot:run
The backend will run on ports u assign to the microservices

Running the Application
Once both the React frontend and Spring Boot backend are running:

The React app will interact with the Spring Boot backend via the API endpoint.

API Documentation
You can use tools like Swagger to automatically generate API documentation for your Spring Boot backend.

Alternatively, here’s an example of how API requests are structured:

Example API Request

GET /api/users
Content-Type: application/json
Authorization: Bearer <token>
Example Response

{
"id": 1,
"name": "abc",
"email": "abc@example.com"
}

Available Endpoints

GET --> /api/users --> Get list of all users
POST --> /api/signup --> Register a new user
POST --> /api/login --> Login and get a JWT token
GET --> /api/user/{id} --> Get user by ID
DELETE --> /api/user/{id} --> Delete user by ID
