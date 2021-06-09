/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
// import React, { useState, useEffect } from 'react';
// import {
//   FormGroup, FormLabel, FormControl, DropdownButton, Dropdown,
// } from 'react-bootstrap';

// const Teams = ({ handleChange }) => {
//   const [teamNumber, setTeamNumber] = useState(2);
//   // const [teams, setTeams] = useState([]);

//   const setTeamDropdown = (number) => {
//     const numberArr = [];
//     for (let i = 2; i <= number; i++) {
//       numberArr.push(i);
//     }
//     return numberArr.map((n, i) => (
//       <Dropdown.Item
//         key={i}
//         value={n}
//         onClick={(e) => {
//           console.log(e.target.text);
//           setTeamNumber(parseInt(e.target.text));
//           console.log(typeof teamNumber, teamNumber);
//         }}
//         href={`#/action-${n}`}
//       >
//         {n}
//       </Dropdown.Item>
//     ));
//   };

//   const listTeamForms = (n) =>
//   // for (let i = 1; i <= n; i++) {
//   // console.log(n)
//   // console.log([...Array(n)]);

//     [...Array(n)].map((e, i) => {
//       const count = i + 1;
//       return (
//         <form key={i}>
//           <FormGroup
//             controlId="formBasicText"
//           >
//             <FormLabel>{`Team ${count.toString()} Name`}</FormLabel>
//             <FormControl
//               type="text"
//               name={`team${count.toString()}`}
//               placeholder="Enter text"
//               onChange={handleChange}
//             />
//           </FormGroup>
//         </form>
//       );
//     });
//   return (
//     <div>
//       <DropdownButton id="dropdown-basic-button" title="Select number of Teams">
//         {setTeamDropdown(6)}
//       </DropdownButton>
//       {/* <form> */}
//       {/* <FormGroup
//           controlId="formBasicText"
//         >
//           <FormLabel>Team 1 Name</FormLabel>
//           <FormControl
//             type="text"
//             name="team1"
//             placeholder="Enter text"
//             onChange={handleChange}
//           />
//         </FormGroup>
//       </form>
//       <form>
//         <FormGroup
//           controlId="formBasicText"
//         >
//           <FormLabel>Team 2 Name</FormLabel>
//           <FormControl
//             type="text"
//             name="team2"
//             placeholder="Enter text"
//             onChange={handleChange}
//           />
//         </FormGroup> */}
//       {listTeamForms(teamNumber)}
//       {/* </form> */}
//     </div>
//   );
// };

// export default Teams;

// Teams

import React, { useState, useEffect } from 'react';
import {
  FormGroup, FormLabel, FormControl, DropdownButton, Dropdown,
} from 'react-bootstrap';

const Teams = ({ handleChange }) => {
  const [teamNumber, setTeamNumber] = useState(2);
  // const [teams, setTeams] = useState([]);
  const [teamNames, setTeamNames] = useState({
    team1: '',
    team2: '',
    team3: '',
    team4: '',
    team5: '',
    team6: '',
  });

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
          console.log(e.target.text);
          setTeamNumber(parseInt(e.target.text));
          console.log(typeof teamNumber, teamNumber);
        }}
        href={`#/action-${n}`}
      >
        {n}
      </Dropdown.Item>
    ));
  };

  const listTeamForms = (n) =>
  // for (let i = 1; i <= n; i++) {
  // console.log(n)
  // console.log([...Array(n)]);

    [...Array(n)].map((e, i) => {
      const count = i + 1;
      return (
        <form key={i}>
          <FormGroup
            controlId="formBasicText"
          >
            <FormLabel>{`Team ${count.toString()} Name`}</FormLabel>
            <FormControl
              type="text"
              name={`team${count.toString()}`}
              placeholder="Enter text"
              value={teamNames[`team${count}`]}
              onChange={(e) => {
                console.log('HERE ARE THE TEAM NAMES', teamNames);
                setTeamNames({ ...teamNames, [`team${count}`]: e.target.value });
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
      {/* <form> */}
      {/* <FormGroup
          controlId="formBasicText"
        >
          <FormLabel>Team 1 Name</FormLabel>
          <FormControl
            type="text"
            name="team1"
            placeholder="Enter text"
            onChange={handleChange}
          />
        </FormGroup>
      </form>
      <form>
        <FormGroup
          controlId="formBasicText"
        >
          <FormLabel>Team 2 Name</FormLabel>
          <FormControl
            type="text"
            name="team2"
            placeholder="Enter text"
            onChange={handleChange}
          />
        </FormGroup> */}
      {listTeamForms(teamNumber)}
      {/* </form> */}
    </div>
  );
};

export default Teams;
