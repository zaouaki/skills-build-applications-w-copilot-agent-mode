import ResourcePage from './ResourcePage.jsx'

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  return (
    <ResourcePage
      collectionName="workouts"
      endpoint={workoutsEndpoint}
      title="Workout suggestions"
      description="Personalized workout recommendations for varied fitness goals."
      columns={['Workout', 'Category', 'Difficulty', 'Duration', 'Focus areas', 'Why']}
      renderItem={(workout) => (
        <tr key={workout._id ?? workout.title}>
          <td>{workout.title}</td>
          <td>{workout.category}</td>
          <td>{workout.difficulty}</td>
          <td>{workout.durationMinutes} min</td>
          <td>{workout.focusAreas?.join(', ')}</td>
          <td>{workout.recommendationReason}</td>
        </tr>
      )}
    />
  )
}

export default Workouts