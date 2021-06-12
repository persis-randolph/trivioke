/* eslint-disable react/prop-types */

// Filters refactor

import React, { useContext, useEffect } from 'react';
import { DropdownButton, Dropdown, ButtonToolbar } from 'react-bootstrap';
import { GameContext } from '../context/gameContext';

const Filters = () => {
  const { state, getCategories } = useContext(GameContext);
  const { setCategory, categories } = state;
  useEffect(() => {
    getCategories();
  }, []);

  const catArr = Object.entries(categories);
  const BUTTONS = ['Select Category'];
  const renderDropdownButton = (title, i) => (
    <DropdownButton
      bsstyle="default"
      title={title}
      key={i}
      id={`dropdown-basic-${i}`}
    >
      {catArr.map((cat) => <Dropdown.Item name="category" id={cat[0]} onClick={() => setCategory(parseInt(cat[0], 10))}>{cat[1]}</Dropdown.Item>)}
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
