import {createReducer} from 'redux-create-reducer'

export default (initialState, handlers, sk) => {
	var myHandler = {}
	if(typeof sk !== 'string'){
		throw new TypeError('argument slice-key is not a string')
	}

	Object.keys(handlers).map(key => {
		myHandler[sk + '_' + key] = handlers[key]
	})

	return createReducer(initialState, myHandler)
}
