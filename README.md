# Customizable Polling Survey Platform

This is a simple polling website built with the MERN stack (MongoDB, Express.js, React and Node) . This is a web-based pollingsurvey system that allows users to create and participate in pollsurveys. Users can create surveypolls with multiple options, and other users can vote on these surveypolls. Each user can only vote once per surveypoll. The application displays the results of each poll.

This project was developed as part of a Backend Developer task for Nexisa.

# Tech Stack
## Frontend (React):

- A user-friendly and responsive user interface.
- User authentication for creating and voting on surveypolls.
- A list of existing surveys displayed on the homepage.
- A form to allow users to create new surveypolls with multiple options.
- Shown survey details, including options, current votes, and total votes.
- Allow users to vote on a survey.

## Backend (Node.js with Express):

- Developed API endpoints to support CRUD operations for surveys.
- Implemented user authentication and authorization.
- Users can only vote once per survey.
- Vote results for each survey has been calculate and store.

## Database (MongoDB):

- Designed a schema to store user data, survey data, and vote data.
- User information (e.g., username, email, password hash).
- Poll information (e.g., question, options, creator, and vote data).
- Data integrity and consistency.

# Installation
1.	Clone the repository:

git clone https://github.com/yourusername/your-repo.git
cd your-repo
2.	Install dependencies:
For the backend:
cd api
npm install
For the frontend:
cd ../frontend
npm install
3.	Set up environment variables:
Create a .env file in the backend folder and set the following variables:
MONGODB_URI=your_mongodb_uri
PORT=5000
JWT_SECRET=your_jwt_secret
4.	Run the application:
o	Backend:
cd api
node server.js
o	Frontend:
cd ../frontend
npm run dev
5.	The application will be available at http://localhost:3000.


## Features

- Users are allowed to search for surveys by keywords.
- Provided the ability to sort and filter surveys based on criteria like date, popularity, etc.
- Displayed user profiles with their created surveys and voting history.
