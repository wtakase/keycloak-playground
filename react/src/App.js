import { useState, useEffect } from 'react';
import Keycloak from 'keycloak-js';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import './App.css';
import UserInfo from './UserInfo';
import Logout from './Logout';
import HitApi from './HitApi';
import UpdateToken from './UpdateToken';

function App() {
  const keycloak = Keycloak('/keycloak.json');
  const [keycloakState, setKeycloakState] = useState({keycloak: null, authenticated: false});
  useEffect(() => {
    keycloak.init({onLoad: 'login-required'}).then(authenticated => {
      setKeycloakState({keycloak: keycloak, authenticated: authenticated});
    });
  }, []);

  if (keycloakState.keycloak !== null) {
    if (keycloakState.authenticated) {
      return (
        <div className="App">
          <Alert severity="success">
            Authenticated
          </Alert>
          <Paper elevation={1}>
            <Box p={2}>
              <UserInfo keycloak={keycloakState.keycloak} />
              <HitApi keycloak={keycloakState.keycloak} />
              <UpdateToken keycloak={keycloakState.keycloak} />
              <Logout keycloak={keycloakState.keycloak} />
              </Box>
          </Paper>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Alert severity="error">
            Unable to authenticate
          </Alert>
        </div>
      );
    }
  }

  return (
    <div className="App">
      <p>Initializing Keycloak...</p>
    </div>
  );

}

export default App;
