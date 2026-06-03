import ResourcePage from './ResourcePage.jsx'

function formatDate(value) {
  if (!value) {
    return 'Scheduled'
  }

  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(value))
}

function Activities() {
  return (
    <ResourcePage
      collectionName="activities"
      title="Activity log"
      description="Recent workouts and fitness activity recorded across teams."
      columns={['Date', 'Athlete', 'Team', 'Type', 'Duration', 'Calories']}
      renderItem={(activity) => (
        <tr key={activity._id ?? `${activity.user?.username}-${activity.activityDate}`}>
          <td>{formatDate(activity.activityDate)}</td>
          <td>{activity.user?.displayName ?? activity.user?.username ?? 'Unassigned'}</td>
          <td>{activity.team?.name ?? 'No team'}</td>
          <td>{activity.type}</td>
          <td>{activity.durationMinutes} min</td>
          <td>{activity.caloriesBurned}</td>
        </tr>
      )}
    />
  )
}

export default Activities