# Frontend - Todo Mastery

React frontend for the Todo Mastery application with beautiful modern UI and animations.

## 🎨 Features

- Modern glass-morphism design with backdrop blur effects
- Animated floating background shapes
- Real-time progress tracking with SVG rings
- Custom checkboxes with smooth animations
- Responsive mobile-first design
- Loading states and error handling

## 🛠️ Tech Stack

- **React** 18.x
- **Modern CSS** with animations and transitions
- **Fetch API** for backend communication
- **Proxy Configuration** for API routing

## 🚀 Getting Started

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm start
```
**Runs on http://localhost:3000** (React default port)

### Build for Production
```bash
npm run build
```

### Stop Development Server
```bash
# Kill react-scripts process
pkill -f "react-scripts start"

# Or kill by port
lsof -ti:3000 | xargs kill -9
```

## ⚙️ Configuration

### API URL Setup
For **local development**, you can use a proxy in `package.json`:
```json
"proxy": "http://localhost:8000"
```
This routes all `/api/*` requests to the FastAPI backend on port 8000.

For **production/Azure deployment**, set the API URL in `frontend/.env`:
```
REACT_APP_API_URL=https://your-backend-app.azurewebsites.net
```
The React app will use this value for all API calls.

## 📁 Structure

```
src/
├── App.js          # Main component with todo logic
├── App.css         # Styles and animations
└── index.js        # React entry point
```

## 🎯 API Integration

- `GET /api/todos` - Fetch all todos
- `POST /api/todos` - Create new todo
- `PUT /api/todos/{id}` - Update todo
- `DELETE /api/todos/{id}` - Delete todo
- `GET /api/todos/stats` - Get statistics

## 💅 Styling Features

- **Glass-morphism**: Backdrop blur effects
- **Animations**: Floating shapes, progress rings, hover effects
- **Responsive**: Mobile-first design
- **Color Scheme**: Purple to pink gradients

Built with ❤️ using React
