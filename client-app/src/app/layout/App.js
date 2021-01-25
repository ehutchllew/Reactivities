import { useEffect, useState } from 'react';
import { Header, Icon, List } from 'semantic-ui-react';

function App() {
  const [activities, setActivities] = useState([])
  useEffect(() => {
    fetch('http://localhost:5000/api/activities').then(response => response.json()).then(json => setActivities(json))
  }, [])
  return (
    <div>
      <Header as='h2'>
        <Icon name='users' />
        <Header.Content>Reactivitiess</Header.Content>
      </Header>
      <List>
          {activities.map(activity => <List.Item key={activity.id}>{activity.title}</List.Item>)}
        </List>
    </div>

  );
}

export default App;
