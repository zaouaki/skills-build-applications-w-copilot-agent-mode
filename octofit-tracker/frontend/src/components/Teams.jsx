import ResourcePage from './ResourcePage.jsx'

function Teams() {
  return (
    <ResourcePage
      collectionName="teams"
      title="Teams"
      description="Groups competing toward shared weekly activity targets."
      columns={['Team', 'City', 'Weekly goal', 'Description']}
      renderItem={(team) => (
        <tr key={team._id ?? team.name}>
          <td>{team.name}</td>
          <td>{team.city}</td>
          <td>{team.weeklyGoalMinutes} min</td>
          <td>{team.description}</td>
        </tr>
      )}
    />
  )
}

export default Teams