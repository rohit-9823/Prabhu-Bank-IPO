import {React, useState } from "react";
import  Loader  from "react-loader-spinner";

export  function Button({ isLoading, children, ...props }) {
  const [IsButtonLoading, setIsButtonLoading] = useState()
    return (
      <button className="button" {...props}>
        {isLoading ? <Loader  type="TailSpin"color='white'
          height={25}
          width={25}
          /> : children}
      </button>
    );
  }
  