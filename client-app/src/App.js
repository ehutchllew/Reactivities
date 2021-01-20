import { useEffect, useState } from 'react';
import './App.css';
import { Header, Icon, List } from 'semantic-ui-react';

function App() {
  const [values, setValues] = useState([])
  useEffect(() => {
    fetch('http://localhost:5000/api/values').then(response => response.json()).then(json => setValues(json))
  }, [])
  return (
    <div>
      <Header as='h2'>
        <Icon name='users' />
        <Header.Content>Reactivitiess</Header.Content>
      </Header>
      <List>
          {values.map(value => <List.Item>{value.name}</List.Item>)}
        </List>
    </div>

  );
}

export default App;
