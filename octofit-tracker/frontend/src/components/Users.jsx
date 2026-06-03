import ResourcePage from './ResourcePage.jsx'

function Users() {
  return (
    <ResourcePage
      collectionName="users"
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