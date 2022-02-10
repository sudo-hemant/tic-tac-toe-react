import React, { createContext, useState } from "react";

import Header from "./Header";
import './Display.css'

export const MyContext = createContext(null);

function Display() {
  const size = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const x = "X";
  const o = "O";

  const [buttonValue, setButtonValue] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: "",
  });

  const [whichPlayerTurn, setWhichPlayerTurn] = useState({
    1: true,
    2: false,
  });

  const [isButtonAlreadyClicked, setIsButtonAlreadyClicked] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
  });

  const checkIfEquals = (a, b, c) => {
    if (a.trim() !== "" && a === b && b === c) {
      return a === x ? 1 : 2;
    }
    return -1;
  };

  const checkIfWon = (buttonValueTemp) => {
    let returnValue = "";

    // check top row
    returnValue = checkIfEquals(
      buttonValueTemp["1"],
      buttonValueTemp["2"],
      buttonValueTemp["3"]
    );
    if (returnValue !== -1) {
      return [true, returnValue];
      // return buttonValueTemp["1"] === x ? 1 : 2
    }

    // check middle row
    returnValue = checkIfEquals(
      buttonValueTemp["4"],
      buttonValueTemp["5"],
      buttonValueTemp["6"]
    );
    if (returnValue !== -1) {
      return [true, returnValue];
      // return buttonValueTemp["4"] === x ? 1 : 2
    }

    // check bottom row
    returnValue = checkIfEquals(
      buttonValueTemp["7"],
      buttonValueTemp["8"],
      buttonValueTemp["9"]
    );
    if (returnValue !== -1) {
      return [true, returnValue];
      // return buttonValueTemp["7"] === x ? 1 : 2
    }

    // check left col
    returnValue = checkIfEquals(
      buttonValueTemp["1"],
      buttonValueTemp["4"],
      buttonValueTemp["7"]
    );
    if (returnValue !== -1) {
      return [true, returnValue];
      // return buttonValueTemp["1"] === x ? 1 : 2
    }

    // check middle col
    returnValue = checkIfEquals(
      buttonValueTemp["2"],
      buttonValueTemp["5"],
      buttonValueTemp["8"]
    );
    if (returnValue !== -1) {
      return [true, returnValue];
      // return buttonValueTemp["2"] === x ? 1 : 2
    }

    // check right col
    returnValue = checkIfEquals(
      buttonValueTemp["3"],
      buttonValueTemp["6"],
      buttonValueTemp["9"]
    );
    if (returnValue !== -1) {
      return [true, returnValue];
      // return buttonValueTemp["3"] === x ? 1 : 2
    }

    // check top-left diagonal
    returnValue = checkIfEquals(
      buttonValueTemp["1"],
      buttonValueTemp["5"],
      buttonValueTemp["9"]
    );
    if (returnValue !== -1) {
      return [true, returnValue];
      // return buttonValueTemp["1"] === x ? 1 : 2
    }

    // check top-right diagonal
    returnValue = checkIfEquals(
      buttonValueTemp["3"],
      buttonValueTemp["5"],
      buttonValueTemp["7"]
    );
    if (returnValue !== -1) {
      return [true, returnValue];
      // return buttonValueTemp["3"] === x ? 1 : 2
    }

    return [false];
  };

  const handleWin = (playerWon) => {
    let winnerAlert = window.confirm(
      `Player ${playerWon} won the game! Press OK to start a new game.`
    );

    if (winnerAlert) {
      window.location.reload(false);
    } else {
		const temp = {}
		for (let i in isButtonAlreadyClicked) {
			temp[i] = true
		}
		setIsButtonAlreadyClicked({ ...temp });
    }
  };

  const onButtonClickHandler = (e, number) => {
    let isButtonClickedFirstTime = !isButtonAlreadyClicked[number];

    if (isButtonClickedFirstTime) {
      let valueToFillButton = whichPlayerTurn["1"] ? x : o;

      const buttonValueTemp = { ...buttonValue, [number]: valueToFillButton };
      setButtonValue({ ...buttonValueTemp });
      // setButtonValue( prevState => ({ ...prevState, [number]: valueToFillButton }) )

      setIsButtonAlreadyClicked((prevState) => ({
        ...prevState,
        [number]: true,
      }));

      const didUserWin = checkIfWon(buttonValueTemp);
      if (didUserWin[0]) {
        handleWin(didUserWin[1]);

        return;
      }

      let player1NewValue = whichPlayerTurn["1"] ? false : true;
      let player2NewValue = whichPlayerTurn["2"] ? false : true;
      setWhichPlayerTurn((prevState) => ({
        ...prevState,
        ["1"]: player1NewValue,
        ["2"]: player2NewValue,
      }));
    }
  };

  return (
    <div>
      <MyContext.Provider
        value={{
          whichPlayerTurn,
          onButtonClickHandler,
        }}
      >
        <Header />

        
		<div className="button-container">
			{size.map((number, i) => {
        	  return (
        	    <ul key={number}>
        	      {/* <Button /> */}
        	      <button id="button" onClick={(e) => onButtonClickHandler(e, number)} > {buttonValue[number]} </button>
        	    </ul>
        	  );
        	})}
		</div>


      </MyContext.Provider>
    </div>
  );
}

export default Display;
