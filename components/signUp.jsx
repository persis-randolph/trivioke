/* eslint-disable react/no-unused-state */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

class SignUp extends React.Component {
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
    const signUpInfo = this.state;
    axios({ method: 'POST', url: '/signUp', params: signUpInfo })
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
          display: 'flex', justifyContent: 'center', alignItems: 'center', height: '35vh',
        }}
        >
          <div>
            <p><strong>Sign Up</strong></p>
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
export default SignUp;
