import React, { useEffect } from 'react'
import { httpClient } from '../../constants/httpClient';
import esewa from '../../assests/images/eSewa.png';
import khalti from '../../assests/images/khalti.png';
import './paymentPage.css';
function Paymentpage(props) {
    const handlePayment=()=>{
        
        let finalData={
            paymentType:0,
            token:props.history.location.state,
        }
        httpClient.PUT("api/generate-payment-link",finalData,false,localStorage.getItem('dm-access_token')?true:false)
        .then((res)=>{
            console.log('resss',res);
            let paymentlink=res.data.data.paymentUrl;
            localStorage.setItem("paymentToken",res.data.data.token)
            window.location.assign(paymentlink,'_blank')
        })
        .catch((err)=>{
            
        })
        
    }
    const handlePayment1=()=>{
        
        let finalData={
            paymentType:1,
            token:props.history.location.state,
        }
        httpClient.PUT("api/generate-payment-link",finalData,false,localStorage.getItem('dm-access_token')?true:false)
        .then((res)=>{
            console.log('resss',res);
            let paymentlink=res.data.data.paymentUrl;
            localStorage.setItem("paymentToken",res.data.data.token)
            window.location.assign(paymentlink,'_blank')
        })
        .catch((err)=>{
            
        })
        
    }
  return (
    <div className="container-payment">
        <h1 className='payment-title'>Payment Partner</h1>
        <hr className='line-payment'/>
        <div className='payment-partners'>
        <button onClick={handlePayment} className='payment-img-btn'>
            <img className='payment-logo' src={esewa}/>
            {/* E-Sewa */}
        </button>
        <button onClick={handlePayment1} className='payment-img-btn'>
            <img className='payment-logo' src={khalti}/>
            {/* E-Sewa */}
        </button>
        {/* <button onClick={handlePayment} className='payment-img-btn'>
            <img className='payment-logo' src={esewa}/>
            E-Sewa
        </button> */}
        </div>
        
    </div>
  )
}

export default Paymentpage