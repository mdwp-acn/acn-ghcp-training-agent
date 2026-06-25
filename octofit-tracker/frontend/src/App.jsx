import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import { getApiBaseUrl } from './api'
import './App.css'

const navigation = [
  { label: 'Home', path: '/' },
  { label: 'Activities', path: '/activities' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Teams', path: '/teams' },
  { label: 'Users', path: '/users' },
  { label: 'Workouts', path: '/workouts' },
]

function HomePage() {
  const apiBaseUrl = getApiBaseUrl()
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

  return (
    <div className="row g-4">
      <div className="col-lg-8">
        <div className="card shadow-sm">
          <div className="card-body">
            <h1 className="card-title">Octofit Tracker</h1>
            <p className="card-text">
              Monitor activities, teams, users, workouts, and the leaderboard from a
              single React 19 presentation tier.
            </p>
            <div className="alert alert-info mb-0">
              <strong>API base:</strong> {apiBaseUrl}
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card shadow-sm h-100">
          <div className="card-body">
            <h2 className="h5">Environment setup</h2>
            <p className="card-text">
              Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> when
              you run the app in GitHub Codespaces so the frontend can target the
              correct API origin.
            </p>
            <p className="card-text mb-0">
              {codespaceName
                ? `Current codespace value: ${codespaceName}`
                : 'No codespace name is set yet, so the app will fall back to http://localhost:8000.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand mb-0 h1">Octofit Tracker</span>
          <ul className="navbar-nav ms-auto">
            {navigation.map((item) => (
              <li className="nav-item" key={item.path}>
                <NavLink
                  className={({ isActive }) =>
                    `nav-link${isActive ? ' active' : ''}`
                  }
                  to={item.path}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main className="container py-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
