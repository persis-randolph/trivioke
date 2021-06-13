/* eslint-disable react/prop-types */
import React, { useContext } from 'react';

import { GameContext } from '../context/gameContext';

const Lifelines = () => {
  const { halveChoices, triviaRequest } = useContext(GameContext);
  return (
    <div>
      <h4>Lifelines</h4>
      <table style={{
        width: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center',
      }}
      >
        <thead>
          <tr style={{ border: 'none' }}>
            <td><button type="button" onClick={halveChoices}>50/50</button></td>
            <td><button type="button" onClick={triviaRequest}>Change Question</button></td>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default Lifelines;
