import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function Spinner({color}) {
  const [opacity,setOpacity]=useState(0);
  useEffect(()=>{
    setInterval(()=>{
      if(opacity==1){
        clearInterval();
      }
      setOpacity((prev)=>prev+0.1)
    },100)
  },[opacity])
  return (
	<div style={{opacity: opacity}}>
	<ClipLoader
        color={color}
        loading={true}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
	</div>
  )
}
