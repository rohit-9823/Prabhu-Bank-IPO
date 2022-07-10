import React, { useState ,useEffect} from "react";
import "./agentapplyIpo.css";
import Publicipo1 from "../../User/publicIpoForm/publicIpoForm";
export default function AgentApplyIpo(props) {
  useEffect(() => {
    
  }, [])
  
  return(
    <Publicipo1 value="agent1" id={props.history.location.state}/>
  )
}
