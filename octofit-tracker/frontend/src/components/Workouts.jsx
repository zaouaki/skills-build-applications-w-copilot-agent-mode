import ResourcePage from './ResourcePage.jsx'

function Workouts() {
  return (
    <ResourcePage
      collectionName="workouts"
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