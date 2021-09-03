import React, {useState} from 'react';
import validator from 'validator';
import { connect } from "react-redux";
import { addUser } from './reducer/action';


import { Modal, Button} from "react-bootstrap";


const MeetingModal = (props,handler,dataProb) => {
    const [userList, setUserList] = useState([]);
    const [emailInput, setEmailInput] = useState("")
    const [showResults, setShowResults] = useState(false);
    const [errorShow,setErrorShow] = useState('');
    const [titleInput, setTitleInput] = useState('')
    const [titleError, setTitleError] = useState('');
    
    

    const handleClose = () =>{
        props.modalHandler(false,"close")
        setShowResults(false)
        setEmailInput('')
        setUserList([])
        setTitleError('')
        setErrorShow('')
        setTitleInput('')
    }
    const handleShow = () => {
        if(titleInput){
            if(userList.length > 0){
                let meetingInfo ={
                    title:titleInput,
                    inputEmailList:userList,
                    id:0,
                    meetingMonth:props.dataProb.selectedMeetingMonth,
                    meetingYear:props.dataProb.selectedMeetingYear,
                    meetingDate:props.dataProb.selectedDay,
                    meetingOnTime:"1 AM"
                }
                props.addUser(meetingInfo)
                setTitleError('')
                props.modalHandler(false,"open")
                setShowResults(false)
                setEmailInput('')
                setUserList([])
                setTitleInput('')
        
            }else{

                setErrorShow('Please enter Email ID')

            }
        
      
        }else{
            setTitleError("Please Enter Title")
        }
       
    }
    const addPeopleHandler = () => {
        setShowResults(true)
        setEmailInput('')


    }



    const addEmailHandler =(event) => {
        if(emailInput  && validator.isEmail(emailInput)){
            userList.push(emailInput)
        setUserList([...userList])

        console.log(userList,"eeee")
        setErrorShow('')
    

        // props.addUser()
        }else{
            setErrorShow('Invalid Email ID!')
        }
        
        

    }

    const removeUserHndler = (user) => {
        userList.pop(user)
        setUserList([...userList])

    }
    return (
        <div>
           <Modal show={props.show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>
              <input placeholder="Add Title" value={titleInput} onChange ={(e) => setTitleInput(e.target.value) }/>
          </Modal.Title>
          <span className="error-text">{titleError}</span>

        </Modal.Header>
        <Modal.Body>
            <div className="meeting-time">
                <div className="meeting-month">{props.dataProb.selectedMeetingMonth}, {props.dataProb.selectedDay} {props.dataProb.selectedMeetingYear}</div>
                <div className="meeting-startTime">1.30pm</div>
            </div>
            <div className="meeting-time">
                <div className="meeting-month">{props.dataProb.selectedMeetingMonth}, {props.dataProb.selectedDay} {props.dataProb.selectedMeetingYear}</div>
                <div className="meeting-startTime">1.30pm</div>
            </div>
            <p>India Standard Time</p>
            <div className="add-people" onClick={addPeopleHandler}>
                <p><i className="fa fa-user-plus"></i> Add People</p>
                <div id="addEmailInfo" className={showResults ? 'block' : 'hidden'}>
                    <p><input type="text" value={emailInput} onChange ={(e) => setEmailInput(e.target.value) } /> <button onClick= {(e) => addEmailHandler(e)}>Done</button></p>
                    <span className="error-text">{errorShow}</span>
                </div>
                <ul >
                   {userList.map((user,key) => (
                       <li key={key}>  <i className="fa fa-user"></i>  <span>{user}</span> <i className="fa fa-close" onClick={() => removeUserHndler(user)}></i></li>
                   ))}
                </ul>

            </div>
            
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleShow}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      )
}

const mapStateToProps = (state) => {
    return {
      meetings: state.meetings,
    };
  };

const mapDispatchToProps = (dispatch) => ({
    addUser: (meeting) => dispatch(addUser(meeting))
    

})

export default connect(mapStateToProps, mapDispatchToProps)(MeetingModal);
