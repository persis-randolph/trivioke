/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { DropdownButton, MenuItem, ButtonToolbar } from 'react-bootstrap';

class Filters extends Component {
  render() {
    const { click } = this.props;
    const BUTTONS = ['Select Category'];
    const renderDropdownButton = (title, i) => (
      <DropdownButton
        bsStyle="default"
        title={title}
        key={i}
        id={`dropdown-basic-${i}`}
      >
        <MenuItem name="category" id="9" onClick={click}>General</MenuItem>
        <MenuItem name="category" id="11" onClick={click}>Movies</MenuItem>
        <MenuItem name="category" id="14" onClick={click}>TV</MenuItem>
        <MenuItem name="category" id="15" onClick={click}>Video Games</MenuItem>
        <MenuItem name="category" id="17" onClick={click}>Science</MenuItem>
        <MenuItem name="category" id="22" onClick={click}>Geography</MenuItem>
        <MenuItem name="category" id="23" onClick={click}>History</MenuItem>
        <MenuItem name="category" id="26" onClick={click}>Celebs</MenuItem>
        <MenuItem name="category" id="27" onClick={click}>Animals</MenuItem>
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
  }
}
export default Filters;
