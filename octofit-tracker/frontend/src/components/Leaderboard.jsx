import ResourcePage from './ResourcePage.jsx'

function Leaderboard() {
  return (
    <ResourcePage
      collectionName="leaderboard"
      title="Leaderboard"
      description="Current competitive standings by weekly activity points."
      columns={['Rank', 'Athlete', 'Team', 'Points', 'Weekly minutes']}
      renderItem={(entry) => (
        <tr key={entry._id ?? entry.rank}>
          <td>#{entry.rank}</td>
          <td>{entry.user?.displayName ?? entry.user?.username ?? 'Unknown athlete'}</td>
          <td>{entry.team?.name ?? 'No team'}</td>
          <td>{entry.points}</td>
          <td>{entry.weeklyMinutes}</td>
        </tr>
      )}
    />
  )
}

export default Leaderboard