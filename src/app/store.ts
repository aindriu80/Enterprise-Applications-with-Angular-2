import { IAppState } from './store';
import { INCREMENT } from './actions';
import { tassign } from 'tassign';
import { Map } from 'immutable';

export interface IAppState {
counter: number;
 
}

export const INITIAL_STATE: IAppState = {
    counter: 0,
    
}

export function rootReducer(state: Map<string, any>, action): Map<string, any>{
    switch (action.type){
        case INCREMENT: 
        state.set('isOnline', true);
        return state.set('counter', state.get('counter')+ 1);
       
    }
    return state;

}