import ResourcePage from './ResourcePage.jsx'

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  return (
    <ResourcePage
      collectionName="teams"
      endpoint={teamsEndpoint}
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