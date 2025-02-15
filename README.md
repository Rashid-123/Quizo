# Quizo - A Quiz App

## 🌍 Live App URL (https://quizo-phi.vercel.app/)

##     Backend URL ( https://quizo-backend-3g7k.onrender.com )

---

## 🚀 Docker Images

- **Frontend Image :**  https://hub.docker.com/r/rashid29/quizo-frontend
- **Backend Image :**   https://hub.docker.com/r/rashid29/quizo-backend

---

## 📥 Clone & Install

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/rashid-123/quizo.git
cd quizo
```

### 2️⃣ Frontend Setup
```sh
cd frontend
npm install
npm run dev  # Runs the frontend on http://localhost:3000
```

### 3️⃣ Backend Setup
```sh
cd backend
npm install
npm run dev  # Runs the backend on http://localhost:5000
```

---

## 🐳 Running with Docker

### 1️⃣ Pull the Docker Images
#### Backend
```sh
docker pull rashid29/quizo-backend
```
#### Frontend
```sh
docker pull rashid29/quizo-frontend
```

### 2️⃣ Run the Containers
#### Backend
```sh
docker run -d -p 5000:5000 rashid29/quizo-backend
```
#### Frontend
```sh
docker run -d -p 3000:80 rashid29/quizo-frontend
```
Now, access:
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000

---

## 🔌 API Endpoints (Backend)

### 📝 Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### 🎯 Quiz Endpoints
- `GET /api/quizzes/:userId` - Fetch all quizzes by user
- `GET /api/quizzes/quiz/:id` - Get a specific quiz
- `POST /api/quizzes` - Create a new quiz
- `PUT /api/quizzes/:id` - Update a quiz 
- `DELETE /api/quizzes/:id` - Delete a quiz 

---

## 📜 License
This project is licensed under the MIT License.

---

## 📧 Contact
For issues or suggestions, please open an issue or contact me at [shadanrashid786@gmail.com].

