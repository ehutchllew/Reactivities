import { useEffect, useState } from 'react';
import {  Container } from 'semantic-ui-react';
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';
import { NavBar } from '../../features/nav/NavBar';
import { ActivitiesService } from '../api/agent';
import { LoadingIndicator } from './LoadingIndicator';

function App() {
  const [activities, setActivities] = useState([])
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ActivitiesService.list()
    .then(response => response.json())
    .then(json => {
      let activities =  [];
      json.forEach(activity => {
        activity.date = activity.date.split('.')[0]
        activities.push(activity);
      })
      setActivities(activities)})
    .then(() => setLoading(false))
  }, [])

  const handleSelectActivity = (id) => {
    setSelectedActivity(activities.find(activity => activity.id === id));
    setEditMode(false);
  }

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }

  const handleCreateActivity = (activity) => {
    ActivitiesService.create(activity)
      .then(() => {
        setActivities([...activities, activity])
        setSelectedActivity(activity);
        setEditMode(false);
      })
  }

  const handleEditActivity = (activity) => {
    ActivitiesService.update(activity)
      .then(() => {
        setActivities([...activities.filter(act => act.id !== activity.id), activity])
        setSelectedActivity(activity);
        setEditMode(false);
      })
    
  }

  const handleDeleteActivity = (id) => {
    ActivitiesService.delete(id)
        .then(() => {
          if(selectedActivity && id===selectedActivity.id){setSelectedActivity(null);}
          setActivities([...activities.filter(activity => activity.id !== id)])
        })
  }

  if(loading) return <LoadingIndicator content="Loading Activities..." />

  
  return (
    <div>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard 
          activities={activities} 
          createActivity={handleCreateActivity}
          deleteActivity={handleDeleteActivity}
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
