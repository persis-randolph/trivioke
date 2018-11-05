/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from 'react';

class Scoreboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { currTeam } = this.props;
    return (
      <div>
        <div>Scoreboard</div>
        <table
          className="table"
          style={{ width: '400px' }}
        >
          <thead>
            <tr>
              <th scope="col">Team</th>
              <th scope="col">Score</th>
            </tr>
          </thead>
          <tbody>
            <tr id="team1" style={{ background: currTeam === 'team1' ? 'lightgreen' : 'transparent' }}>
              <td>{sessionStorage.team1}</td>
              <td>{sessionStorage.score1}</td>
            </tr>
            <tr id="team2" style={{ background: currTeam === 'team2' ? 'lightgreen' : 'transparent' }}>
              <td>{sessionStorage.team2}</td>
              <td>{sessionStorage.score2}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default Scoreboard;
