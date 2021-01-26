import { useEffect, useState } from 'react';
import {  Container } from 'semantic-ui-react';
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';
import { NavBar } from '../../features/nav/NavBar';

function App() {
  const [activities, setActivities] = useState([])
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity = (id) => {
    setSelectedActivity(activities.find(activity => activity.id === id));
  }

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }

  const handleCreateActivity = (activity) => {
    setActivities([...activities, activity])
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const handleEditActivity = (activity) => {
    setActivities([...activities.filter(act => act.id !== activity.id), activity])
    setSelectedActivity(activity);
    setEditMode(false);
  }

  useEffect(() => {
    fetch('http://localhost:5000/api/activities').then(response => response.json()).then(json => setActivities(json))
  }, [])
  return (
    <div>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard 
          activities={activities} 
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          editMode={editMode} 
          selectActivity={handleSelectActivity} 
          selectedActivity={selectedActivity} 
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
        />
      </Container>
    </div>

  );
}

export default App;
