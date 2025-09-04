# Todo Mastery App

A modern, full-stack todo list application built with FastAPI (backend) and React (frontend).

![todolistapp](https://github.com/user-attachments/assets/51f35dfa-4476-4571-81c1-87395da39898)


## 📦 Project Structure

```
/ (project root)
├── backend/      # FastAPI backend (main.py, requirements.txt, web.config)
├── frontend/     # React frontend (package.json, .env.production, src/)
└── README.md     # Project overview (this file)
```

## 🚀 Features
- Beautiful, animated UI (React)
- CRUD operations for todos
- Real-time statistics and progress tracking
- Responsive design for all devices
- RESTful API with `/api` prefix
- Ready for Azure deployment (separate frontend & backend)

## 🛠️ Tech Stack
- **Backend:** FastAPI, Python 3.8+
- **Frontend:** React 18+, Modern CSS
- **API:** RESTful, APIRouter, CORS

## ⚡ Quick Start

### 1. Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 2. Frontend
```bash
cd frontend
npm install
npm start
```

### 3. Access
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## 🌐 Azure Deployment
- Deploy `/backend` to Azure App Service (Python)
- Deploy `/frontend` to Azure Static Web Apps
- Set API URL in `frontend/.env`
- Update CORS in backend for frontend domain

---
Built with ❤️ using FastAPI & React
