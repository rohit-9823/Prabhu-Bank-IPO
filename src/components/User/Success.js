import React from "react";
import folder from '../../assests/images/folder.png';
import { useHistory } from "react-router-dom";
function Success() {
  let history=useHistory()
    const handleClick=()=>{
      history.push('/');
    }
  return (
    <div>
      <div class="container-payment">
      <h1 className='payment-title'>Payment Partner</h1>
        <hr className='line-payment'/>
      </div>
      <div class="success-content">
        <img src={folder} class="folderimg" />
        <p class="text1-payment">Your payment is successful</p>
        <p class="text2-payment">
          Thankyou for your time. An automated payment reciept will be sent
          to your registered email.
        </p>
        <button class="buttonhome" type="submit" style={{cursor:'pointer'}} onClick={handleClick}>
          Back to home
        </button>
      </div>
    </div>
  );
}

export default Success;
