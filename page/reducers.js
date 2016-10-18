//reducer就是个function,名字随便你起，功能就是在action触发后，返回一个新的state(就是个对象)
import { AC } from './actions';
import {combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'




const initD = {
    form:{
        firstName: 'Jane',
        lastName: 'Doe'
    }
};

const reducer_1 = (state = {}, action) => {
  switch (action.type) {
    case AC.REINIT:
        return {
            data: action.data
        }
    case AC.CONFIRMLOCATION:
        return Object.assign(state,{values:{location:'zzz'},fields:{location:"zzzggg"}})
    default:
        return state
  }
}

export default combineReducers({
    // form:formReducer.plugin({
    //     Form1: (state, action) => {   // <----- 'login' is name of form given to reduxForm()
    //         switch(action.type) {
    //             case AC.CONFIRMLOCATION:
    //                 return Object.assign(state,{values:{location:'zzz'},fields:{location:"zzzggg"}})
    //             default:
    //                 return state
    //         }
    //     }
    // }),
    form:formReducer,
    reducer_1
});
// export default change;