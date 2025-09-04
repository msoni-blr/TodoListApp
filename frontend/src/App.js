import React, { useState, useEffect } from 'react';
import './App.css';

// API configuration - uses environment variable
const API_BASE_URL = process.env.REACT_APP_API_URL;

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, completion_rate: 0 });
  const [error, setError] = useState('');

  // Fetch all todos
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/todos`);
      const data = await response.json();
      setTodos(data);
      setError('');
    } catch (error) {
      console.error('Error fetching todos:', error);
      setError('Error connecting to API');
    }
    setLoading(false);
  };

  // Fetch todo statistics
  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/todos/stats`);
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  // Create new todo
  const createTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.title.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTodo.title,
          description: newTodo.description || null
        }),
      });
      
      if (response.ok) {
        setNewTodo({ title: '', description: '' });
        fetchTodos();
        fetchStats();
        setError('');
      }
    } catch (error) {
      console.error('Error creating todo:', error);
      setError('Error creating todo');
    }
    setLoading(false);
  };

  // Toggle todo completion
  const toggleTodo = async (id, completed) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !completed }),
      });
      
      if (response.ok) {
        fetchTodos();
        fetchStats();
      }
    } catch (error) {
      console.error('Error updating todo:', error);
      setError('Error updating todo');
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/todos/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        fetchTodos();
        fetchStats();
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
      setError('Error deleting todo');
    }
  };

  // Fetch todos and stats on component mount
  useEffect(() => {
    fetchTodos();
    fetchStats();
  }, []);

  return (
    <div className="App">
      <div className="background-animation">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>
      </div>
      
      <header className="App-header">
        <div className="container">
          <div className="header-content">
            <h1 className="title">
              <span className="title-icon">✨</span>
              Todo Mastery
              <div className="title-subtitle">Organize • Achieve • Succeed</div>
            </h1>
          </div>
          
          {/* Enhanced Statistics Dashboard */}
          <div className="stats-dashboard">
            <div className="dashboard-header">
              <h2>📊 Your Progress Today</h2>
              <div className="progress-ring">
                <svg width="70" height="70">
                  <circle
                    cx="35"
                    cy="35"
                    r="30"
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="6"
                  />
                  <circle
                    cx="35"
                    cy="35"
                    r="30"
                    fill="none"
                    stroke="url(#progressGradient)"
                    strokeWidth="6"
                    strokeDasharray={`${(stats.completion_rate * 188.5) / 100} 188.5`}
                    strokeDashoffset="0"
                    transform="rotate(-90 35 35)"
                    className="progress-circle"
                  />
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#4ade80" />
                      <stop offset="100%" stopColor="#06d6a0" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="progress-text">{stats.completion_rate}%</span>
              </div>
            </div>
            <div className="stats-grid">
              <div className="stat-card total">
                <div className="stat-icon">📋</div>
                <div className="stat-content">
                  <span className="stat-number">{stats.total}</span>
                  <span className="stat-label">Total Tasks</span>
                </div>
                <div className="stat-trend">📈</div>
              </div>
              <div className="stat-card pending">
                <div className="stat-icon">⏳</div>
                <div className="stat-content">
                  <span className="stat-number">{stats.pending}</span>
                  <span className="stat-label">In Progress</span>
                </div>
                <div className="stat-trend">🎯</div>
              </div>
              <div className="stat-card completed">
                <div className="stat-icon">✅</div>
                <div className="stat-content">
                  <span className="stat-number">{stats.completed}</span>
                  <span className="stat-label">Completed</span>
                </div>
                <div className="stat-trend">🏆</div>
              </div>
            </div>
          </div>

          {/* Enhanced Add Todo Form */}
          <div className="card add-todo-card">
            <div className="card-header">
              <h2>🎯 Create New Task</h2>
              <p>Turn your ideas into actionable items</p>
            </div>
            <form onSubmit={createTodo} className="todo-form">
              <div className="form-group">
                <label className="form-label">Task Title *</label>
                <input
                  type="text"
                  value={newTodo.title}
                  onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                  placeholder="What needs to be done?"
                  className="input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Description (Optional)</label>
                <textarea
                  value={newTodo.description}
                  onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                  placeholder="Add more details about this task..."
                  className="input textarea"
                  rows="3"
                />
              </div>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading || !newTodo.title.trim()}
              >
                <span className="btn-icon">➕</span>
                {loading ? 'Adding Task...' : 'Add Task'}
              </button>
            </form>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          {/* Enhanced Todos List */}
          <div className="card todos-card">
            <div className="card-header">
              <h2>📝 Your Tasks</h2>
              <p>{todos.length > 0 ? `${todos.length} task${todos.length !== 1 ? 's' : ''} in your list` : 'No tasks yet'}</p>
            </div>
            {loading && todos.length === 0 ? (
              <div className="loading">
                <div className="spinner"></div>
                <span>Loading your tasks...</span>
              </div>
            ) : todos.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🎯</div>
                <h3>Ready to get productive?</h3>
                <p>Create your first task above and start achieving your goals!</p>
              </div>
            ) : (
              <div className="todos-list">
                {todos.map((todo) => (
                  <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                    <div className="todo-checkbox">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id, todo.completed)}
                        className="checkbox"
                      />
                      <span className="checkmark"></span>
                    </div>
                    <div className="todo-content">
                      <div className="todo-main">
                        <h3 className="todo-title">{todo.title}</h3>
                        {todo.description && (
                          <p className="todo-description">{todo.description}</p>
                        )}
                      </div>
                      <div className="todo-meta">
                        <span className="todo-date">
                          <span className="date-icon">📅</span>
                          {new Date(todo.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                        {todo.completed && (
                          <span className="completed-badge">
                            <span>🎉</span>
                            Done!
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="todo-actions">
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="btn btn-delete"
                        title="Delete task"
                      >
                        <span>🗑️</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Enhanced API Info */}
          <div className="info-card">
            <div className="info-header">
              <h3>🔗 API Information</h3>
              <div className="api-status">
                <span className="status-dot active"></span>
                <span>Connected</span>
              </div>
            </div>
            <div className="api-grid">
              <div className="api-section">
                <h4>Endpoints</h4>
                <ul className="api-list">
                  <li><code>GET /api/todos</code> - Fetch all tasks</li>
                  <li><code>POST /api/todos</code> - Create new task</li>
                  <li><code>PUT /api/todos/{'{id}'}</code> - Update task</li>
                  <li><code>DELETE /api/todos/{'{id}'}</code> - Delete task</li>
                  <li><code>GET /api/todos/stats</code> - Get statistics</li>
                </ul>
              </div>
              <div className="api-section">
                <h4>Services</h4>
                <div className="service-info">
                  <div className="service">
                    <span className="service-name">FastAPI Backend</span>
                    <span className="service-url">/api</span>
                  </div>
                  <div className="service">
                    <span className="service-name">Interactive Docs</span>
                    <span className="service-url">/docs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="footer">
            <p>Built with ❤️ using FastAPI & React</p>
            <p>Stay productive and achieve your goals! 🚀</p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
