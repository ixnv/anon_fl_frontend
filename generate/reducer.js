import {} from './../constants/ActionTypes';

const initialState = {

};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FOO': {
      return {
        ...state,

      };
    }
    default:
      return {
        ...state
      };
  }
}
