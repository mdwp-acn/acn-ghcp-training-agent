import { useEffect, useState } from 'react'
import { fetchJson } from '../api'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const data = await fetchJson('workouts')
        setWorkouts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadWorkouts()
  }, [])

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h1 className="h3">Workouts</h1>
        <p className="text-muted">Personalized workout suggestions and plans.</p>

        {loading && <div className="alert alert-light">Loading workouts...</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Type</th>
                  <th scope="col">Duration</th>
                </tr>
              </thead>
              <tbody>
                {workouts.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-muted">
                      No workouts found yet.
                    </td>
                  </tr>
                ) : (
                  workouts.map((workout, index) => (
                    <tr key={workout._id ?? `${workout.name}-${index}`}>
                      <td>{workout.name ?? 'Unknown'}</td>
                      <td>{workout.type ?? '—'}</td>
                      <td>{workout.duration ?? '—'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Workouts
