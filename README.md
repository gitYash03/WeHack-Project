# WeHack-Project

This repository contains the code and resources for the WeHack hackathon.

## Project Description

Introducing MindSync - An AI powered AI journaling app. Journaling helps you process your emotions better, a touch of AI helps the user explore deeper. Capable of the following :-

1. Prompts for the user so they can explore their emotions better.
2. Chat with an AI powered therapist with various modes to suit user preference. Your therapist can be a stoic, analytical, sensitive and more!
3. Retrieve your journals using semantic + text hybrid search! This means you can search not only based on keywords but also words which have similar meaning.
4. A beautiful landing page with login functionality with google and passport.js

## Images

![Screenshot from 2025-03-23 08-22-41](https://github.com/user-attachments/assets/243d310f-b973-4163-aa2c-87a3da6dd685)
![Screenshot from 2025-03-23 07-33-35](https://github.com/user-attachments/assets/1b76c890-61c3-497a-9182-ba2c2c8bc31e)
![Screenshot from 2025-03-23 07-33-22](https://github.com/user-attachments/assets/e3f907be-81ce-486f-8528-c6c29e12f185)
![Screenshot from 2025-03-23 07-32-20](https://github.com/user-attachments/assets/5ede6121-aef0-464e-b1f5-083712d59b29)


## Table of Contents

- [Project Description](#project-description)
- [Table of Contents](#table-of-contents)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)



### Prerequisites


-   Node.js (version 14 or higher)
-   npm (Node Package Manager)
-   Typescript
-   PostgreSQL
-   Tailwind
-   PGVector
-   Express
-   React

### Installation

To set up and run the MindSync project on your local machine, follow these steps:

1. **Clone the repository:**

   Open your terminal and execute:

   ```bash
   git clone https://github.com/gitYash03/WeHack-Project.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd WeHack-Project
   ```

3. **Install dependencies:**

   Ensure you have Node.js and npm installed. Then, install the necessary packages:

   ```bash
   npm install
   ```

4. **Set environment variables:**

   Create a `.env` file in the project's root directory and define the following variables:

   ```
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_HOST=your_database_host
   DB_NAME=your_database_name
   DB_PORT=5432
   GEMINI_API_KEY=your_gemini_api_key
   PORT=your_desired_port
   SESSION_SECRET=your_session_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   JWT_SECRET=your_jwt_secret
   ```

   Replace `your_*` placeholders with actual values. Using a `.env` file helps manage environment variables securely.
   
6. **Create database tables:**

   Initialize the PostgreSQL database and create the necessary tables as defined in `backend/src/models`. You can use an ORM like Sequelize to synchronize models with the database or run SQL scripts manually. citeturn0search3

7. **Start the Express server:**

   Compile and run the server using:

   ```bash
   npx ts-node server.ts
   ```

   Ensure `ts-node` is installed globally or as a project dependency.

8. **Start the React development server:**

   Navigate to the frontend directory (if applicable) and start the React server:

   ```bash
   npm run dev
   ```

9. **Access the application:**

   Open your browser and navigate to `http://localhost:your_desired_port` to interact with MindSync.

By following these steps, you should have the MindSync project running locally. If you encounter issues, consult the project's documentation or seek assistance from the development community. 

## Technologies Used

-   Frontend: React, JavaScript, HTML, Tailwind 
-   Backend: Node.js, Express.js, Typrscript, Zod, Gemini
-   Database: PostgreSQL

## Contributing

If you would like to contribute to this project, please follow these guidelines:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive commit messages.
4.  Push your changes to your fork.
5.  Submit a pull request.

## License


This project is licensed under the MIT License.
