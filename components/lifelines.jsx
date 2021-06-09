/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useContext } from 'react';

// ** COMMENT OUT THESE LINES WHEN GAME CONTEXT IS READY ****************

// import { GameContext } from '../context/gameContext';

// const Lifelines = () => {
//   const { handleClick, triviaRequest, changeCat } = useContext(GameContext);

//   return (
//     <div>
//         <h4>Lifelines</h4>
//         <table style={{
//           width: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center',
//         }}
//         >
//           <thead>
//             <tr style={{ border: 'none' }}>
//               <td><button type="button" onClick={handleClick}>50/50</button></td>
//               <td><button type="button" onClick={triviaRequest}>Change Question</button></td>
//               <td><button type="button" onClick={changeCat}>Change Category</button></td>
//             </tr>
//           </thead>
//         </table>
//       </div>
//   )
// }

// *** COMMENT THE BELOW LINES OUT WHEN GAME CONTEXT IS READY ********

class Lifelines extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { handleClick, triviaRequest, changeCat } = this.props;
    return (
      <div>
        <h4>Lifelines</h4>
        <table style={{
          width: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center',
        }}
        >
          <thead>
            <tr style={{ border: 'none' }}>
              <td><button type="button" onClick={handleClick}>50/50</button></td>
              <td><button type="button" onClick={triviaRequest}>Change Question</button></td>
              <td><button type="button" onClick={changeCat}>Change Category</button></td>
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}
export default Lifelines;
