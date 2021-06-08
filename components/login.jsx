/* eslint-disable react/no-unused-state */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      name: '',
      pw: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange() {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit() {
    const loginInfo = this.state;
    axios({ method: 'get', url: 'http://localhost:8080/login', params: loginInfo })
      .then(() => {
        this.setState({ redirect: true });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { redirect } = this.state;
    if (!redirect) {
      return (
        <div style={{
          display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', height: '35vh',
        }}
        >
          <div>
            <p><strong>Login</strong></p>
            Username:
            <input type="text" name="name" onChange={this.handleChange} />
            Password:
            <input type="text" name="pw" autoComplete="off" onChange={this.handleChange} />
            <input type="submit" value="Submit" onClick={this.handleSubmit} />
          </div>
        </div>
      );
    }
    return (
      <div>
        <Redirect to="/trivia" />
      </div>
    );
  }
}
export default Login;

