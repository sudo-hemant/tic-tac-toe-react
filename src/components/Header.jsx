import React, { useContext, } from "react";

import { MyContext } from "./Display";

import './Header.css'


function Header() {

  let { whichPlayerTurn } = useContext(MyContext)

  let turn = whichPlayerTurn["1"] ? 1 : 2

  return (
    <div className="header">
      It's Player { turn } turn! 
    </div>
  )
}

export default Header;
