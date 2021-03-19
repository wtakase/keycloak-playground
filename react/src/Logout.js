import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class Logout extends Component {
  logout() {
    this.props.keycloak.logout();
  }

  render() {
    return (
      <Button variant="contained" color="primary" onClick={() => this.logout()}>
        Logout
      </Button>
    );
  }
}

export default Logout;
