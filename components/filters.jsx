/* eslint-disable react/prop-types */

//Filters refactor

/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { DropdownButton, Dropdown, ButtonToolbar } from 'react-bootstrap';

// // MenuItem was depreciated to Dropdown.Item
// class Filters extends Component {
//   render() {
//     const { click } = this.props;
const Filters = () => {
  const [category, setCategory] = useState(9);
  const BUTTONS = ['Select Category'];
  const renderDropdownButton = (title, i) => (
    <DropdownButton
      bsstyle="default"
      title={title}
      key={i}
      id={`dropdown-basic-${i}`}
    >
      <Dropdown.Item name="category" id="9" onClick={() => { setCategory(9); }}>General</Dropdown.Item>
        &nbsp;
      <Dropdown.Item name="category" id="11" onClick={() => { setCategory(11); }}>Movies</Dropdown.Item>
        &nbsp;
      <Dropdown.Item name="category" id="14" onClick={() => { setCategory(14); }}>TV</Dropdown.Item>
        &nbsp;
      <Dropdown.Item name="category" id="15" onClick={() => { setCategory(15); }}>Video Games</Dropdown.Item>
        &nbsp;
      <Dropdown.Item name="category" id="17" onClick={() => { setCategory(17); }}>Science</Dropdown.Item>
        &nbsp;
      <Dropdown.Item name="category" id="22" onClick={() => { setCategory(22); }}>Geography</Dropdown.Item>
        &nbsp;
      <Dropdown.Item name="category" id="23" onClick={() => { setCategory(23); }}>History</Dropdown.Item>
        &nbsp;
      <Dropdown.Item name="category" id="26" onClick={() => { setCategory(26); }}>Celebs</Dropdown.Item>
        &nbsp;
      <Dropdown.Item name="category" id="27" onClick={() => { setCategory(9); }}>Animals</Dropdown.Item>
    </DropdownButton>
  );
  const buttonsInstance = (
    <ButtonToolbar
      style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
      }}
    >
      {BUTTONS.map(renderDropdownButton)}
    </ButtonToolbar>
  );
  return buttonsInstance;
};

export default Filters;

//Original

// import React, { Component } from 'react';
// import { DropdownButton, Dropdown, ButtonToolbar } from 'react-bootstrap';

// // MenuItem was depreciated to Dropdown.Item
// class Filters extends Component {
//   render() {
//     const { click } = this.props;
//     const BUTTONS = ['Select Category'];
//     const renderDropdownButton = (title, i) => (
//       <DropdownButton
//         bsstyle="default"
//         title={title}
//         key={i}
//         id={`dropdown-basic-${i}`}
//       >
//         <Dropdown.Item name="category" id="9" onClick={click}>General</Dropdown.Item>
//         &nbsp;
//         <Dropdown.Item name="category" id="11" onClick={click}>Movies</Dropdown.Item>
//         &nbsp;
//         <Dropdown.Item name="category" id="14" onClick={click}>TV</Dropdown.Item>
//         &nbsp;
//         <Dropdown.Item name="category" id="15" onClick={click}>Video Games</Dropdown.Item>
//         &nbsp;
//         <Dropdown.Item name="category" id="17" onClick={click}>Science</Dropdown.Item>
//         &nbsp;
//         <Dropdown.Item name="category" id="22" onClick={click}>Geography</Dropdown.Item>
//         &nbsp;
//         <Dropdown.Item name="category" id="23" onClick={click}>History</Dropdown.Item>
//         &nbsp;
//         <Dropdown.Item name="category" id="26" onClick={click}>Celebs</Dropdown.Item>
//         &nbsp;
//         <Dropdown.Item name="category" id="27" onClick={click}>Animals</Dropdown.Item>
//       </DropdownButton>
//     );
//     const buttonsInstance = (
//       <ButtonToolbar
//         style={{
//           display: 'flex', justifyContent: 'center', alignItems: 'center',
//         }}
//       >
//         {BUTTONS.map(renderDropdownButton)}
//       </ButtonToolbar>
//     );
//     return buttonsInstance;
//   }
// }
// export default Filters;