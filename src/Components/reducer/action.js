export const addUser =(meeting) => {
    return {
        type:"ADD_MEETING",
        value:meeting
    }
}

export const removeMeeting = (id) => {
    console.log(id,"rem vvvvvvvv")
    return {
        type:"REMOVE_MEETING",
        value:id
    }
}