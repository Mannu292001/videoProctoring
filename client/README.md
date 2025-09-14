# 🎥 Video Proctoring System

A full-stack video proctoring system that helps monitor candidates during online interviews or exams.  

✅ Detects candidate focus (face & eye tracking)  
✅ Flags unauthorized items (phone, books, extra devices)  
✅ Logs suspicious events with timestamps  
✅ Saves monitoring sessions in a MongoDB database  

---

## 🏗 Project Structure

│
├── client/ # Frontend (React + Tailwind CSS)
│ ├── public/
│ └── src/
│ ├── components/ # Reusable UI (VideoPlayer, LogsTable, AlertBox)
│ ├── pages/ # Screens (InterviewScreen)
│ ├── services/ # API calls
│ ├── ml/ # TensorFlow.js + MediaPipe detection
│ └── App.js
│
├── server/ # Backend (Node.js + Express + MongoDB)
│ ├── src/
│ │ ├── config/ # DB connection
│ │ ├── models/ # Mongoose schemas
│ │ ├── routes/ # API endpoints
│ │ └── controllers/ # Business logic
│ └── package.json
│
└── README.md



---

## ⚙️ Tech Stack

- **Frontend:** React.js, Tailwind CSS  
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)  
- **ML:** TensorFlow.js + MediaPipe (face detection, object detection)  

---

## 🚀 Setup Instructions

### 1️⃣ Clone the repo
```bash
git clone 
cd client
npm install

for client side
.env=# API URL (backend)
VITE_API_URL=http://localhost:5000

for server side
cd server
npm install

.env file
PORT=5000
NODE_ENV=development
MONGO_URI=
JWT_SECRET=superstkey123


