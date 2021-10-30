import createDataContext from "./createDataContext";

const dataAPIreducer = (state,action) => {
    switch(action.type)
    {
        case "userinfo": return {...state,userData:action.userData}
        case "ticketinfo": return {...state,ticketData:action.ticketData}
        default: return state;
    }
}

const userInfo = (dispatch) => {
    return async(email) => {
        var user_info;
        try {
            await fetch(`http://IPADDRESSS/passenger/ticket/userinfo?email=${email}`).then(
                (res) => {return res.json();}
            ).then(
               (data) => {
                       user_info = data;
                } 
            ).catch((err) => {console.error(err)});
            console.log("USER INFOOOOOOOOOOOOOOOO:::::::::::::::",user_info);
            dispatch({type:"userinfo",userData:user_info});
        } catch (error) {
            console.error(error);
        }
    }
}

const ticketInfo = (dispatch) => {
    return async(email) => {
        var ticketInfo = [];
        try {
            await fetch(`http://IPADDRESS/passenger/ticket/history?email=${email}`).then(
                (res) => {return res.json();}
            ).then(
               (data) => {
                       ticketInfo = data;
                } 
            ).catch((err) => {console.error(err)});
            dispatch({type:"ticketinfo",ticketData:ticketInfo.reverse()});
        } catch (error) {
            console.error(error);
        }
    }
}
export const {Provider,Context} = createDataContext(
    dataAPIreducer,
    {userInfo,ticketInfo},
    {userData: {},ticketData: []}
);