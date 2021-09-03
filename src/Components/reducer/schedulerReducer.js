let initialState = [
    {
        title:"PROJECT DEMO MEETING",
                    inputEmailList:["sathya@gmail.com","xy@gmail.com"],
                    id:1,
                    meetingMonth:"SEPTEMBER",
                    meetingYear:"2021",
                    meetingDate:5,
                    meetingOnTime:"4 AM"
    },{
        title:"PROJECT DISCUSSION",
        inputEmailList:["sathya@gmail.com","xy@gmail.com"],
        id:2,
        meetingMonth:"SEPTEMBER",
        meetingYear:"2021",
        meetingDate:5,
        meetingOnTime:"7 AM"
}

];

const SchedulerReducer =(state = initialState,action) => {
    const newState = [...state]
    switch(action.type){
        case "ADD_MEETING":
            return [...newState.concat(action.value)]
        case "REMOVE_MEETING":
            return newState.filter( (meeting) => {
                   return meeting.id !== action.value
                })
        default:
            return newState;

    }
    

}
export default SchedulerReducer;