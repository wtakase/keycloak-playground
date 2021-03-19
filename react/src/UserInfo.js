import { Component } from 'react';
import Typography from '@material-ui/core/Typography';

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      id: '',
      roles: ''
    };
    this.props.keycloak.loadUserInfo().success(userInfo => {
      var roles = '';
      const resourceAccess = this.props.keycloak.tokenParsed['resource_access'];
      if (resourceAccess && resourceAccess['nodejs-microservice']) {
        roles = JSON.stringify(resourceAccess['nodejs-microservice'].roles);
      }
      this.setState({
        username: userInfo.preferred_username,
        id: userInfo.sub,
        roles: roles
      });
    });
  }

  render() {
    return (
      <div className="UserInfo">
        <Typography component="p">Username: {this.state.username}</Typography>
        <Typography component="p">ID: {this.state.id}</Typography>
        <Typography component="p">Roles: {this.state.roles}</Typography>
      </div>
    );
  }
}

export default UserInfo;
