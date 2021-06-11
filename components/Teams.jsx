/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

// Teams Refactor

import React, { useState, useContext, useEffect } from 'react';
import {
  FormGroup, FormLabel, FormControl, DropdownButton, Dropdown,
} from 'react-bootstrap';
import { GameContext } from '../context/gameContext';

const Teams = () => {
  const { state } = useContext(GameContext);
  const { teams, setCurrTeam, setTeams } = state;

  const [teamNumber, setTeamNumber] = useState(2);
  const [teamNames, setTeamNames] = useState({});

  const setTeamDropdown = (number) => {
    const numberArr = [];
    for (let i = 2; i <= number; i++) {
      numberArr.push(i);
    }
    return numberArr.map((n, i) => (
      <Dropdown.Item
        key={i}
        value={n}
        onClick={(e) => {
          setTeamNumber(parseInt(e.target.text, 10));
        }}
        href={`#/${n}-teams`}
      >
        {`${n} `}
      </Dropdown.Item>
    ));
  };

  // const handleTextChange = async (event) => {

  //   await this.setState({text: event.target.value});
  //   console.log(this.state.text);
  // }

  // const [teamState, setTeamState] = useState([]);

  useEffect(() => {
    // console.log('HERE ARE TEAM NAMES', teamNames);
    setTeams(Object.values(teamNames));
    setCurrTeam(teams[0]);
  }, [teamNames]);

  const listTeamForms = (n) => [...Array(n)].map((e, i) => {
    const count = i + 1;
    // console.log('team names are: ', teamNames);
    // console.log('teams are: ', teams);
    return (
      <form key={i}>
        <FormGroup
          controlId={i}
        >
          <FormLabel>{`Team ${count.toString()} Name`}</FormLabel>
          <FormControl
            type="text"
            name={`team${count.toString()}`}
            placeholder="Enter text"
            value={teamNames[`team${count}`]}
            onChange={async (e) => {
              await setTeamNames({ ...teamNames, [`team${count}`]: e.target.value });
            }}
          />
        </FormGroup>
      </form>
    );
  });

  return (
    <div>
      <DropdownButton id="dropdown-basic-button" title="Select number of Teams">
        {setTeamDropdown(6)}
      </DropdownButton>
      {listTeamForms(teamNumber)}
    </div>
  );
};

export default Teams;
