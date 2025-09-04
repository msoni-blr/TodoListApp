from fastapi import FastAPI, HTTPException, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

app = FastAPI(
    title="Todo API", 
    description="A simple Todo List API", 
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Development (React dev server)
        "*"  # Production frontend (update this!)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class TodoCreate(BaseModel):
    title: str
    description: Optional[str] = None

class TodoUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None

class Todo(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    completed: bool = False
    created_at: datetime
    updated_at: datetime

# In-memory storage (in production, use a database)
todos_db = []
todo_id_counter = 1

# Create API router with /api prefix
api_router = APIRouter(prefix="/api", tags=["todos"])

@api_router.get("/todos/stats")
def get_todo_stats():
    """Get todo statistics"""
    total = len(todos_db)
    completed = len([t for t in todos_db if t["completed"]])
    pending = total - completed
    
    return {
        "total": total,
        "completed": completed,
        "pending": pending,
        "completion_rate": round((completed / total * 100) if total > 0 else 0, 1)
    }

@api_router.get("/todos", response_model=List[Todo])
def get_todos():
    """Get all todos"""
    return todos_db

@api_router.post("/todos", response_model=Todo)
def create_todo(todo: TodoCreate):
    """Create a new todo"""
    global todo_id_counter
    
    new_todo = {
        "id": todo_id_counter,
        "title": todo.title,
        "description": todo.description,
        "completed": False,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    }
    
    todos_db.append(new_todo)
    todo_id_counter += 1
    
    return new_todo

@api_router.get("/todos/{todo_id}", response_model=Todo)
def get_todo(todo_id: int):
    """Get a specific todo by ID"""
    todo = next((t for t in todos_db if t["id"] == todo_id), None)
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo

@api_router.put("/todos/{todo_id}", response_model=Todo)
def update_todo(todo_id: int, todo_update: TodoUpdate):
    """Update a todo"""
    todo = next((t for t in todos_db if t["id"] == todo_id), None)
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    
    if todo_update.title is not None:
        todo["title"] = todo_update.title
    if todo_update.description is not None:
        todo["description"] = todo_update.description
    if todo_update.completed is not None:
        todo["completed"] = todo_update.completed
    
    todo["updated_at"] = datetime.now()
    
    return todo

@api_router.delete("/todos/{todo_id}")
def delete_todo(todo_id: int):
    """Delete a todo"""
    global todos_db
    todo = next((t for t in todos_db if t["id"] == todo_id), None)
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    
    todos_db = [t for t in todos_db if t["id"] != todo_id]
    return {"message": "Todo deleted successfully"}

# Include the API router in the main app
app.include_router(api_router)

# Root route for health check
@app.get("/")
def read_root():
    """Root endpoint - API health check"""
    return {
        "message": "Todo API is running",
        "version": "1.0.0",
        "docs": "/docs",
        "api": "/api"
    }

# Explicit docs configuration for Azure compatibility
@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "todo-api"}
