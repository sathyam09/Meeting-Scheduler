// import React, { useEffect, useState } from "react";
// import  MeetingModal from './Modal'

// const Draggable = (props) => {
//     const [dragabale, setDragabale] = useState(true);
//     const[modalShow,setModalShow] = useState(false);
//     const [dragshowDiv, setDragshowDiv] = useState(props.show);

//     useEffect(() => {
//         dragElement(document.getElementById('mydiv'))
//         if(dragabale){
//             setDragshowDiv(props.show)

//         }
//       });

//     const dragElement = (elmnt) => {
//         const dragMouseDown =(e) => {
//             setDragabale(true)
//             e = e || window.event;
//             e.preventDefault();

//             // get the mouse cursor position at startup:
//             pos3 = e.clientX;
//             pos4 = e.clientY;
//             document.onmouseup = closeDragElement;
//             // call a function whenever the cursor moves:
//             document.onmousemove = elementDrag;
//           }

//         var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
//         if (document.getElementById(elmnt.id + "header")) {
//           /* if present, the header is where you move the DIV from:*/
//           document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
//         } else {
//           /* otherwise, move the DIV from anywhere inside the DIV:*/
//           elmnt.onmousedown = dragMouseDown;
//         }

//         const elementDrag = (e) => {
//           e = e || window.event;
//           e.preventDefault();
//           // calculate the new cursor position:
//           pos1 = pos3 - e.clientX;
//           pos2 = pos4 - e.clientY;
//           pos3 = e.clientX;
//           pos4 = e.clientY;
//           // set the element's new position:
//           elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
//           elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
//         }

//         const closeDragElement =() => {

//             if(props.data.timeProps.selectedDay){
//                 setDragabale(false)
//                 setModalShow(true)
//             }

//           /* stop moving when mouse button is released:*/
//           document.onmouseup = null;
//           document.onmousemove = null;

//         }
//     }

//    const modeShowHandler = (mode,status) => {
//     setModalShow(false)
//     if(status === "open"){
//         setDragabale(false)
//         setDragshowDiv('hidden');
//     }
//    }

// return(
//     <div>
//  <div id="mydiv" className={props.id === props.clickId ? "block":"hidden"} time={props.time}>

//   <div id="mydivheader" >

//   </div>
//   <MeetingModal show={modalShow} modalHandler={modeShowHandler} dataProb={props.data.timeProps} />

// </div>
//     </div>

// )

// }

// export default Draggable;

// =============================================================================================

import React, { useEffect, useState } from "react";
import "./dragComp.css";
import MeetingModal from "./Modal";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";
import { removeMeeting } from "./reducer/action";

const DragBox = (props) => {
  const allMeetings = useSelector((state) => state.scheduler);
  const dispatch = useDispatch();

  const [dragItem, setDragItem] = useState();
  const [list, setList] = useState([
    "1 AM",
    "2 AM",
    "3 AM",
    "4 AM",
    "5 AM",
    "6 AM",
    "7 AM",
    "8 AM",
    "9 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
    "5 PM",
    "6 PM",
    "7 PM",
    "8 PM",
    "9 PM",
    "10 PM",
    "11 PM",
  ]);
  const [isModalView, setIsModalView] = useState(false);
  const [selectedTimeID, setSelectedTimeID] = useState("");
  let scheduleTimes = [
    { id: 0, time: "1 AM" },
    { id: 1, time: "2 AM" },
    { id: 2, time: "3 AM" },
    { id: 3, time: "4 AM" },
    { id: 4, time: "5 AM" },
    { id: 5, time: "6 AM" },
    { id: 6, time: "7 AM" },
    { id: 7, time: "8 AM" },
    { id: 8, time: "9 AM" },
    { id: 9, time: "10 AM" },
    { id: 10, time: "11 AM" },
    { id: 11, time: "12 PM" },
    { id: 12, time: "1 PM" },
    { id: 13, time: "2 PM" },
    { id: 14, time: "3 PM" },
    { id: 15, time: "4 PM" },
    { id: 16, time: "5 PM" },
    { id: 17, time: "6 PM" },
    { id: 18, time: "7 PM" },
    { id: 19, time: "8 PM" },
    { id: 20, time: "9 PM" },
    { id: 21, time: "10 PM" },
    { id: 22, time: "11 PM" },
  ];
  const handleDragStart = (index) => {
    setDragItem(index);
  };

  const handleDragEnter = (e, index) => {
    // e.target.style.backgroundColor = "#336699";
    const newList = [...list];
    const item = newList[dragItem];
    newList.splice(dragItem, 1);
    newList.splice(index, 0, item);
    setDragItem(index);
    setList(newList);
  };

  const modalShowHandler = (mode, e) => {
    if (e) {
      setSelectedTimeID(e.target.id);
    } else {
      setSelectedTimeID("");
    }

    if (props.timeProb && props.timeProb.selectedDay) {
      setIsModalView(mode);
    } else {
      alert("please select the date");
      setIsModalView(false);
    }
  };

  const meetingDeleteHandler = (id) => {
    dispatch(removeMeeting(id));
  };
  const handleDragLeave = (e) => {
    // e.target.style.backgroundColor = "black";
  };
  const outOffHandler = (id) => {
    alert("Meeting slot blocked");
  };

  const meetingTimeValidator = (time, meet) => {
    console.log(time, meet, "Timeeeeeeeee");
    if (
      time.timeProb.selectedMonth === meet.meetingMonth &&
      time.timeProb.selectedDay === meet.meetingDate &&
      time.timeProb.selectedYear === meet.meetingYear
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleDrop = (e) => {
    // e.target.style.backgroundColor = "black";
  };
  return (
    <div className="time-slot">
      <h4>
        {props.timeProb.selectedMonth} {props.timeProb.selectedDay}{" "}
        {props.timeProb.selectedYear}
      </h4>

      <ul className="dnd">
        {list &&
          list.map((item, index) => (
            <li
              draggable
              key={index}
              onDragStart={() => handleDragStart(index)}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDragLeave={(e) => handleDragLeave(e)}
              onDrop={(e) => handleDrop(e)}
              onDragOver={(e) => e.preventDefault()}
            >
              <div className="slec-time"> {scheduleTimes[index].time} </div>
              {allMeetings &&
                allMeetings.map((meet, i) =>
                  props.timeProb.selectedMonth === meet.meetingMonth &&
                  props.timeProb.selectedDay === meet.meetingDate &&
                  props.timeProb.selectedYear === meet.meetingYear &&
                  !meet.outOfOffice &&
                  meet.isMeeting &&
                  scheduleTimes[index].time === meet.meetingOnTime ? (
                    <div className="meetingSlot">
                      {meet.title}{" "}
                      <i
                        id="deleteMeeting"
                        className="fa fa-trash"
                        onClick={() => meetingDeleteHandler(meet.id)}
                      ></i>
                    </div>
                  ) : null
                )}
              {allMeetings &&
                allMeetings.map((meet, i) =>
                  props.timeProb.selectedMonth === meet.meetingMonth &&
                  props.timeProb.selectedDay === meet.meetingDate &&
                  props.timeProb.selectedYear === meet.meetingYear &&
                  meet.outOfOffice &&
                  meet.isMeeting &&
                  scheduleTimes[index].time === meet.meetingOnTime ? (
                    <div
                      className="blocked-slot"
                      onClick={() => outOffHandler("")}
                    >
                      Out of office
                    </div>
                  ) : null
                )}
              <div
                onClick={(e) => modalShowHandler(true, e)}
                id={scheduleTimes[index].time}
                className="drag-li"
              ></div>
              {/* {allMeetings.forEach((element) => {
                if (!element.outOfOffice && !element.isMeeting) {
                  console.log(element, "LLLLLLLLLLL");
                } else {
                  return (
                    
                  );
                }
              })} */}
            </li>
          ))}

        {/* <div
  onClick={(e) => modalShowHandler(true, e)}
                                id={scheduleTimes[index].time}
                                className="drag-li"
                              >
                                addsds
                              </div> */}

        <MeetingModal
          selectedTimeId={selectedTimeID}
          show={isModalView}
          modalHandler={modalShowHandler}
          dataProb={props.timeProb}
        />
      </ul>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  removeMeeting: (meeting) => dispatch(removeMeeting(meeting)),
});

export default connect(null, mapDispatchToProps)(DragBox);
