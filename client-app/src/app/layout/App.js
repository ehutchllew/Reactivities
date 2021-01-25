import { useEffect, useState } from 'react';
import {  Container, List } from 'semantic-ui-react';
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';
import { NavBar } from '../../features/nav/NavBar';

function App() {
  const [activities, setActivities] = useState([])
  const [selectedActivity, setSelectedActivity] = useState(null);

  const handleSelectActivity = (id) => {
    setSelectedActivity(activities.find(activity => activity.id === id));
  }

  useEffect(() => {
    fetch('http://localhost:5000/api/activities').then(response => response.json()).then(json => setActivities(json))
  }, [])
  return (
    <div>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard activities={activities} selectActivity={handleSelectActivity} selectedActivity={selectedActivity} />
      </Container>
    </div>

  );
}

export default App;
