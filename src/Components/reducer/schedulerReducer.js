let initialState = [];

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