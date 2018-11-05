/* eslint-disable import/extensions */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
import React, { Component } from 'react';
import Filters from './filters.jsx';
import Team from './teamTable.jsx';
import Game from './game.jsx';

class Load extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diff: 'medium',
      category: 9,
      trivia: false,
      team1: '',
      team2: '',
    };
    this.begin = this.begin.bind(this);
    this.handeleClick = this.handeleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  begin() {
    const {
      diff, category, team1, team2,
    } = this.state;
    sessionStorage.setItem('diff', diff);
    sessionStorage.setItem('category', category);
    sessionStorage.setItem('team1', team1);
    sessionStorage.setItem('team2', team2);
    sessionStorage.setItem('score1', 0);
    sessionStorage.setItem('score2', 0);
    this.setState({ trivia: true });
  }

  handeleClick() {
    this.setState({
      [event.target.name]: event.target.id,
    });
  }

  handleChange() {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const {
      category, diff, team1, team2, trivia,
    } = this.state;
    if (!trivia) {
      return (
        <center>
          <div>
            <div key="team">
              <Team handleChange={this.handleChange} />
            </div>
            <Filters click={this.handeleClick} />
            <table style={{
              alignItems: 'center', width: '400px', display: 'flex', justifyContent: 'center',
            }}
            >
              <thead>
                <tr style={{ cellpadding: 8, cellspacing: 8 }}>
                  <td><button type="button" name="diff" id="easy" onClick={this.handeleClick}><h5>Easy</h5></button></td>
                  <td><button type="button" name="diff" id="medium" onClick={this.handeleClick}><h5>Medium</h5></button></td>
                  <td><button type="button" name="diff" id="hard" onClick={this.handeleClick}><h5>Hard</h5></button></td>
                </tr>
              </thead>
            </table>
            <div key="begin">
              <button type="button" onClick={this.begin}><h5>Begin Game</h5></button>
            </div>
          </div>
        </center>

      );
    }
    return (
      <div>
        <Game category={category} diff={diff} name1={team1} name2={team2} />
      </div>
    );
  }
}
export default Load;
