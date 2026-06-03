import ResourcePage from './ResourcePage.jsx'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  return (
    <ResourcePage
      collectionName="users"
      endpoint={usersEndpoint}
      title="Athlete profiles"
      description="Registered OctoFit members and their current training goals."
      columns={['Name', 'Username', 'Email', 'Level', 'Goal']}
      renderItem={(user) => (
        <tr key={user._id ?? user.username}>
          <td>{user.displayName}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.level}</td>
          <td>{user.fitnessGoal}</td>
        </tr>
      )}
    />
  )
}

export default Users