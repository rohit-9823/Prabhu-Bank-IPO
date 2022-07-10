import React, { useState } from "react";
import "./navbar.css";
import { useHistory, Link } from "react-router-dom";
function Navbar(props) {
  const history = useHistory();
  const [click, setclick] = useState(true)
  const [showhide, setshowhide] = useState(false)

  const handleLogout = () => {
    localStorage.clear();
    history.push("/login");
  };
const handleclick=()=>{
  setshowhide(!showhide);
  
}
let cls=showhide?'fa-solid fa-caret-up fa-lg imgg':"fa-solid fa-caret-down fa-lg imgg"
  return (
      <div class="top-bar">
        <div class="topleft">
          {/* <img src={lines} class="linesicon" onClick={handleshowhide}/> */}
          <p class="text03">Prabhu Capital</p>
        </div>
        <div class="topright">
        <i class="fa-solid fa-right-from-bracket navbar_btn fa-lg" onClick={handleLogout}></i>
          {/* <img src={logout} class="logout" onClick={handleLogout} /> */}
          <p id="name">                                  </p>
          <div className="dropdown-container">
              <button className="btn-image">
                {/* <img src={profile} class="profile" /> */}
                <i class={cls} onClick={handleclick}></i>
              </button>            
              {showhide?  
            <div className="dropdown-content" >
              <Link to ="/changepassword" className="links-in-dropdown">Change Password</Link>
            </div>
            :null}
            
            
          </div>
        </div>
      </div>
  );
}

export default Navbar;
