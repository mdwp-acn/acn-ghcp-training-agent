import { useEffect, useState } from 'react'
import { fetchJson } from '../api'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchJson('users')
        setUsers(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h1 className="h3">Users</h1>
        <p className="text-muted">Profiles and account details for Octofit users.</p>

        {loading && <div className="alert alert-light">Loading users...</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-muted">
                      No users found yet.
                    </td>
                  </tr>
                ) : (
                  users.map((user, index) => (
                    <tr key={user._id ?? `${user.name}-${index}`}>
                      <td>{user.name ?? 'Unknown'}</td>
                      <td>{user.email ?? '—'}</td>
                      <td>{user.role ?? 'Member'}</td>
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

export default Users
