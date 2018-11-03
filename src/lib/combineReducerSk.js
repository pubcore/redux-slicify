import {combineReducers} from 'redux'

const combineSk = (reducers, sk='') => {
	var combined = {}
	if(typeof sk !== 'string'){
		throw new TypeError('argument slice-key is not a string')
	}
	sk = sk && sk + '.' || ''

	Object.keys(reducers).forEach(key => {
		var value = reducers[key]
		if(typeof value === 'function'){
			//created reducer function
			combined[key] = value
		}else if(Array.isArray(value)){
			//reducer to be created by slice-key and optinal initialState
			//(sk, initState) => createReducerSk(...)
			combined[key] = value[0](
				sk + key,
				value[1] || undefined
			)
		}else{
			combined[key] = combineSk(value, sk + key)
		}
	})

	return combineReducers(combined)
}

export default combineSk
