#!/bin/bash

# Navigate to backend and start the server
echo "Starting backend..."
cd backend
npm install
node app.js &

# Navigate to frontend and start the development server
echo "Starting frontend..."
cd ../frontend
npm install
npm start &

# Wait for any process to exit
wait
