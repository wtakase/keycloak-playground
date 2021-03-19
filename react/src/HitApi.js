import axios from 'axios';
import { Component } from 'react';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

class HitApi extends Component {
  constructor(props) {
    super(props);
    this.state = {apiResult: ''};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if (event.target.value !== '') {
      const token = this.props.keycloak.token ? this.props.keycloak.token : 'dummy_token';
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:8888',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        responseType: 'json'
      })
      axiosInstance.get('/test/' + event.target.value
      ).then((response) => {
        this.setState({apiResult: 'status: ' + response.status + '\ndata: ' + JSON.stringify(response.data)});
      }).catch((error) => {
        this.setState({apiResult: 'status: ' + error.response.status + '\nstatus text: ' + error.response.statusText });
      });
    } else {
      this.setState({apiResult: ''});
    }
  }

  render () {
    return (
      <Box p={2}>
        <FormControl style={{minWidth: 300}}>
          <InputLabel>Select URI to Hit</InputLabel>
          <Select value={this.uri} onChange={this.handleChange}>
            <MenuItem value="">--- Select URI ---</MenuItem>
            <MenuItem value="anonymous">http://localhost:8888/test/anonymous</MenuItem>
            <MenuItem value="user">http://localhost:8888/test/user</MenuItem>
            <MenuItem value="admin">http://localhost:8888/test/admin</MenuItem>
          </Select>
          <div>
            <TextField label="Hit API Result" multiline rows={2} value={this.state.apiResult} variant="filled" fullWidth="true" />
          </div>
        </FormControl>
      </Box>
    );
  }
}

export default HitApi;
