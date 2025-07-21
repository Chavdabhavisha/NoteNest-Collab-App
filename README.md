NoteNest 📝
Real-Time Collaborative Note-Taking App

🚀 Project Overview
NoteNest is a real-time collaborative note app built with MERN + Socket.io.
Multiple users can edit the same note at the same time, see live changes, and view active collaborators.

🧑‍💻 Tech Stack
Tech	Purpose
MongoDB Atlas	Database
Express & Node.js	Backend API + WebSocket
React.js	Frontend
Socket.io	Real-time collaboration
Bootstrap	UI Styling
Render	Backend Deployment
Netlify	Frontend Deployment

🎯 Features
Create, edit, and share notes

Real-time collaborative editing

Show active collaborators

Auto-save notes every 5 seconds

Manual save option

Deployable and scalable MERN project

🛠️ How to Run Locally
Backend
cd server
npm install
npm run dev


Create a .env file in server/:
MONGO_URI=your_mongo_atlas_link
PORT=5000


Frontend
cd client
npm install
npm start

Create .env in client/:
REACT_APP_BACKEND_URL=http://localhost:5000


🌐 Live Demo
Part	                 
Frontend (vercel)	
Backend (Render)	

📬 API Endpoints
Method	Route	Purpose
POST	/notes	Create a new note
GET	/notes/:id	Get a note
PUT	/notes/:id	Update a note

🔗 WebSocket Events
Event           	Purpose
join_note	Join a note room
note_update	Broadcast real-time changes
active_users	Show active collaborators
user_joined	Notify when user joins
user_left	Notify when user leaves

📦 Deployment
Platform	Usage
Render	Backend
vercel	Frontend
MongoDB Atlas	Database.

