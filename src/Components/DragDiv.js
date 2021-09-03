import React, { useEffect, useState } from "react";
import  MeetingModal from './Modal'


const Draggable = (props) => {
    const [dragabale, setDragabale] = useState(true);
    const[modalShow,setModalShow] = useState(false);
    const [dragshowDiv, setDragshowDiv] = useState(props.show);
   
 

  
    useEffect(() => {
        dragElement(document.getElementById('mydiv'))
        if(dragabale){
            setDragshowDiv(props.show)

        }
      });
     
    const dragElement = (elmnt) => {
        const dragMouseDown =(e) => {
            setDragabale(true)
            e = e || window.event;
            e.preventDefault();
            
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
          }
          
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
          /* if present, the header is where you move the DIV from:*/
          document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
          /* otherwise, move the DIV from anywhere inside the DIV:*/
          elmnt.onmousedown = dragMouseDown;
        }
        
      
        
      
        const elementDrag = (e) => {
          e = e || window.event;
          e.preventDefault();
          // calculate the new cursor position:
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;
          // set the element's new position:
          elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
          elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }
      
        const closeDragElement =() => {

            if(props.data.timeProps.selectedDay){
                setDragabale(false)
                setModalShow(true)
            }
            
        

          /* stop moving when mouse button is released:*/
          document.onmouseup = null;
          document.onmousemove = null;
          
        }
    }

   const modeShowHandler = (mode,status) => {
    setModalShow(false)
    if(status === "open"){
        setDragabale(false)
        setDragshowDiv('hidden');
    }
   }
   

return(
    <div>
 <div id="mydiv" className={props.id === props.clickId ? "block":"hidden"} time={props.time}>

  <div id="mydivheader" >

  </div>
  <MeetingModal show={modalShow} modalHandler={modeShowHandler} dataProb={props.data.timeProps} />


</div>
    </div>
   

)

}


export default Draggable;