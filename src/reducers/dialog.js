import ACTION from "../actions";

const initialState = {
  confirmDialog: false,
  infoDialog: false,
  dialogInfo: "",
  dialogAction: ()=>{},
};

const dialogReducer = (state=initialState, action) => {
  switch(action.type){
    case ACTION.types.infoDialog:
      return {
        ...state,
        infoDialog: true,
        confirmDialog: false,
        dialogInfo: action.info,
      };
    case ACTION.types.confirmDialog:
      return {
        ...state,
        infoDialog: false,
        confirmDialog: false,
        dialogInfo: action.info,
        dialogAction: action.dialogAction,
      };
    case ACTION.types.closeDialog:
      return {
        ...state,
        infoDialog: false,
        confirmDialog: false,
      };

    default:
      return state;
  }
};

export default dialogReducer; 
