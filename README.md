Getting Started

How to Run the App

Prerequisites
- Node.js (v18 or later recommended)
- npm or yarn
- Backend and frontend ports: 5000 (backend), 5173 (default Vite frontend port)

Setup and Start Backend

   Navigate to the backend folder, on terminal run :

   cd backend
   
   npm install
   
   nodemon server.js
   
   (If you don't have nodemon installed globally, you can install it with npm install -g nodemon or run node server.js instead)

Setup and Start Frontend

Navigate to the frontend folder, on terminal run:

cd frontend

npm install

Create .env file in frontend root with content:

VITE_API_URL=http://localhost:5000

Start the frontend development server:

npm run dev


Answers for questions

Q: How might you make this app more secure?

A:

Check inputs: Make sure all user data is safe and clean before using it.

Protect access: Only let the right people use or change the data.

Use HTTPS: Keep data safe over the internet.

Limit requests: Stop too many requests to avoid crashes or attacks.

Q: How would you make this solution scale to millions of records?

A:

Use a strong database with indexes on key fields to speed up searches.

Add pagination and filters to avoid loading too much data at once.

Cache data that’s requested often to reduce database work.

Balance traffic across multiple servers to handle more users.

Run heavy tasks in the background to keep the app fast.

Add more servers as needed to handle more traffic.
