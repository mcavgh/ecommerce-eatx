
export const GET_DARCK_MODE = "GET_DARCK_MODE";


export const switchDark= (darckmode) => {
       return (dispatch) => {
        dispatch({type: GET_DARCK_MODE, payload:darckmode})
      }
    };
