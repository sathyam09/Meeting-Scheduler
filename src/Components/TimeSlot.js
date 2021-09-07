import React ,{useState} from 'react';
import Draggable from './DragDiv';
import { useSelector, useDispatch } from 'react-redux';
import { connect } from "react-redux";
import { removeMeeting } from './reducer/action';
import DragComponent from './dragComp';
import DragBox from './DragDiv';




const TimeSlot = (props) => {
    const allMeetings =useSelector(state => state.scheduler);
    const [scheduleDrag, setScheduleDrag] = useState('hidden')
    const [clickedId, setClickedId] = useState('')
    const dispatch =useDispatch();
    // setScheduleDrag(props.timeProps.draDivOpen)




    let scheduleTimes = [
            {id:1,time:"12 AM"},
        { id: 2, time: "1 AM" },
        { id: 3, time: "2 AM" },
        { id: 4, time: "3 AM" },
        { id: 5, time: "4 AM" },
        { id: 6, time: "5 AM" },
        { id: 7, time: "6 AM" },
        { id: 8, time: "7 AM" },
        { id: 9, time: "8 AM" },
        { id: 10, time: "9 AM" },
        { id: 11, time: "10 AM" },
        { id: 12, time: "11 AM" },
        { id: 13, time: "12 PM" },
        { id: 14, time: "1 PM" },
        { id: 15, time: "2 PM" },
        { id: 16, time: "3 PM" },
        { id: 17, time: "4 PM" },
        { id: 18, time: "5 PM" },
        { id: 19, time: "6 PM" },
        { id: 20, time: "7 PM" },
        { id: 21, time: "8 PM" },
        { id: 22, time: "9 PM" },
        { id: 23, time: "10 PM" },
        { id: 24, time: "11 PM" },
      ];

     const meetingDeleteHandler = (id) => {

         dispatch(
            removeMeeting(id)
         
            )

      }

      const timeSlotHandler =(id) => {
        setClickedId(id)
    }
      const outOffHandler = (id) => {
        alert('Meeting slots')
      }
    return(
        <div>
            <h4>{props.timeProps.selectedDay} {props.timeProps.selectedMeetingMonth} {props.timeProps.selectedMeetingYear}</h4>

            {scheduleTimes.map((time) => (
            <div className="schedule-box" key={time.id} >
            <Draggable id={time.id} clickId={clickedId} time={time.time} show={scheduleDrag} data={props} />

                <div className="schedule-time">{time.time}</div>
                {/* <DragBox id={time.id} clickId={clickedId} time={time.time} show={scheduleDrag} data={props} /> */}

                <div className="schedule-msg" onClick={() => timeSlotHandler(time.id) }>

                {/* <DragComponent id={time.id} clickId={clickedId} time={time.time} show={scheduleDrag} data={props}/> */}

                    {allMeetings && allMeetings.map((meet) => (
                        
                       <div key={meet.id}> 
                       { meet.outOfOffice ? <div  className="blocked-slot" onClick={() => outOffHandler(time.id) }>Out of office</div> :
                       
                <div key={meet.id}>
                    {meet.meetingOnTime === time.time ? (<div><span className="meetingSlot">{meet.title}  <i id="deleteMeeting" className="fa fa-trash" onClick={ () => meetingDeleteHandler(meet.id)}></i></span></div>) :null}
                     </div>}
                    </div>
                            
                    ))}

                </div>

            </div>
            ))}

        </div>



    )

}
const mapDispatchToProps = (dispatch) => ({
    removeMeeting: (meeting) => dispatch(removeMeeting(meeting))
    

})


export default connect(null, mapDispatchToProps)(TimeSlot);
 

