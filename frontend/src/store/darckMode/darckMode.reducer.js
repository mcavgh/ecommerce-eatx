// import { DARCK_MODE } from "./darckMode.action";

// var initialState = {
//     darckModeState: ""
// };

// const DarckModeReducer = (state = initialState, action) => {

//     switch (action.type) {
//         case DARCK_MODE:
//             return {
//                 darckModeState:action.payload,
//             }
//          default:
//          return state.darckModeState;

//     }
// }

// export default DarckModeReducer;

import {
    GET_DARCK_MODE
  } from "./darckMode.action";
  
  var initialState = {
  
    darckModeState:"true"
  };
  
  const darckModeReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_DARCK_MODE:
        return {
          ...state,
          darckModeState:action.payload
        };
      default:
        return state;
    }
  };
  
  export default darckModeReducer;
  