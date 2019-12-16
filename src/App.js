import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { withAuthenticator } from 'aws-amplify-react';
import { Auth } from 'aws-amplify';


class App extends Component {
  constructor() {
    super();
    this.state = {
      userEmail: null
    }
  }
  
  signOutHandler = async () => {
    await Auth.signOut();
  }
  
  componentDidMount() {
    console.log("Component did mount...");
    Auth.currentAuthenticatedUser({
          bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      }).then(user => {
          console.log(user)
          this.setState({userEmail: user.attributes.email})
          })
      .catch(err => console.log(err));
  }
  
  getUserHandler = () => {
    Auth.currentAuthenticatedUser({
          bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      }).then(user => console.log(user))
      .catch(err => console.log(err));
  }
  
  render () {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            <ul>
              <li className="SignOut">
                <span className="UserEmail">{this.state.userEmail}</span>
                <button onClick={this.signOutHandler}>Sign Out</button>
              </li>
            </ul>
          </nav>
          <button onClick={this.getUserHandler}>Get User</button>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default withAuthenticator(App);
