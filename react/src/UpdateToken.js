import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

class UpdateToken extends Component {
  constructor(props) {
    super(props);
    this.state = {expire: ''}
    this.updateToken();
  }

  convertTimestamp() {
    return new Intl.DateTimeFormat(
      'ja-JP',
      {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).format(this.props.keycloak.tokenParsed.exp * 1000);
  }

  updateToken() {
    this.props.keycloak.updateToken(240).success(() => {
      this.setState({expire: this.convertTimestamp()});
    }).error(() => {
      console.log('Failed to refresh token');
    });
  }

  render() {
    return (
      <Box p={2}>
        <Typography component="p">Token Expire Time: {this.state.expire}</Typography>
        <Button variant="contained" color="secondary" onClick={() => this.updateToken()}>
          Update Token
        </Button>
      </Box>
    );
  }
}

export default UpdateToken;
