import createReducerSk from './lib/createReducerSk'
import combineReducerSk from './lib/combineReducerSk'

export {createReducerSk, combineReducerSk}

export default (sk, action) => ({...action, type:sk + '_' + action.type})
