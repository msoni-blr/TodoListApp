# Todo Mastery App

A modern, full-stack todo list application built with FastAPI and React.

## 🚀 Features

- **Beautiful UI** with glass-morphism design and animations
- **Real-time statistics** with animated progress tracking
- **CRUD operations** for todo management
- **Responsive design** for all devices
- **Professional API** with automatic documentation

## 🛠️ Tech Stack

- **Backend**: FastAPI, Python 3.8+, Uvicorn
- **Frontend**: React 18, Modern CSS with animations
- **API**: RESTful with `/api` prefix using APIRouter

## 📁 Project Structure

```
├── main.py              # FastAPI backend
├── requirements.txt     # Python dependencies
├── venv/               # Python virtual environment
└── frontend/           # React application
    ├── src/
    │   ├── App.js      # Main React component
    │   └── App.css     # Styling and animations
    └── package.json    # Node dependencies
```

## 🚦 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### 1. Backend Setup
```bash
# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start backend server (must run on port 8000 for frontend proxy)
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 2. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server (default port 3000)
npm start
```

### 3. Access Application
- **Frontend**: http://localhost:3000 (React default)
- **Backend API**: http://localhost:8000 (configured in proxy)
- **API Docs**: http://localhost:8000/docs

## 🔧 Development Commands

### Backend
```bash
# Start server (port 8000 required for frontend proxy)
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Stop server
pkill -f "uvicorn main:app"
```

### Frontend
```bash
# Start development server (React default port 3000)
npm start

# Build for production
npm run build

# Stop server
pkill -f "react-scripts start"
# Or kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

## 🔄 Changing Ports

### Backend Port Change
To change backend from port 8000 to 5000:

1. **Update uvicorn command:**
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 5000
```

2. **Update frontend proxy in `frontend/package.json`:**
```json
"proxy": "http://localhost:5000"
```

### Frontend Port Change
To change frontend from port 3000 to 4000:

1. **Use environment variable:**
```bash
PORT=4000 npm start
```

2. **Or create `frontend/.env` file:**
```
PORT=4000
```

3. **Update CORS in `main.py`:**
```python
allow_origins=["http://localhost:4000"]
```

### Change Both Ports
For backend on 5000 and frontend on 4000:
- Update uvicorn: `--port 5000`
- Update proxy: `"proxy": "http://localhost:5000"`
- Update frontend: `PORT=4000 npm start`
- Update CORS: `allow_origins=["http://localhost:4000"]`

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos |
| POST | `/api/todos` | Create new todo |
| GET | `/api/todos/{id}` | Get specific todo |
| PUT | `/api/todos/{id}` | Update todo |
| DELETE | `/api/todos/{id}` | Delete todo |
| GET | `/api/todos/stats` | Get statistics |

## 🎨 UI Features

- **Animated Background**: Floating geometric shapes
- **Progress Ring**: SVG-based completion tracking
- **Glass-morphism**: Modern frosted glass effects
- **Custom Checkboxes**: Smooth completion animations
- **Responsive Design**: Mobile-first approach

## 🔄 Architecture

- **Frontend-Backend Separation**: React proxy forwards `/api/*` to FastAPI
- **Port Configuration**: Frontend (3000) → Backend (8000) via proxy
- **APIRouter**: Clean route organization with automatic prefixing
- **CORS Enabled**: Cross-origin requests configured
- **Auto-reload**: Development servers restart on file changes

## 📝 Development Notes

- **Port Requirements**: Backend must run on port 8000 (hardcoded in proxy config)
- **Frontend Port**: React defaults to port 3000 (can be changed with PORT env var)
- **Port Changes**: See "Changing Ports" section above for complete instructions
- Routes use APIRouter with `/api` prefix for clean organization
- Frontend proxy configuration handles API routing automatically
- In-memory storage (replace with database for production)
- CORS configured for localhost development

## 🌐 Separate Deployment

### Backend Deployment (Azure App Service)
1. **Create Python App Service**
2. **Deploy backend code only:**
   - `main.py`
   - `requirements.txt`
3. **Set startup command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Frontend Deployment (Azure Static Web Apps)
1. **Build React app:** `cd frontend && npm run build`
2. **Deploy `frontend/build/` folder to Azure Static Web Apps**
3. **Update API calls** to point to backend URL
   - For Azure, set the API URL in `frontend/.env`:
     ```
     REACT_APP_API_URL=https://your-backend-app.azurewebsites.net
     ```

### Environment Configuration
- **Backend**: Update CORS to include frontend domain
- **Frontend**: Update API base URL to backend service

Built with ❤️ using FastAPI & React
