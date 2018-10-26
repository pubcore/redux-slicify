Helper functions to create reducers and actions, which can be re-used multiple times within a state. The action-types will be prefixed by slice key (sk), where the slices has to be stored in.

## Prerequisite
Knowledge of redux-actions and -reducers

## Example

#### state

	{
		a:{},
		table:{
			page:0
		},
		anOtherTable:{
			page:0
		}
		b:{
			m:{
				page:0
			}
		}
	}

#### reducer

	import {createReducerSk, combineReducerSk} from '@pubcore/redux-slicify'

	//example slice reducer
	const page = (sk, initState=0) => createReducerSk(
		initState,
		{
			NEXT: (s, action) => s + action.step,
			BACK: (s, action) => s - action.step
		},
		sk
	)

	//slicified combined reducer, beware returning array
	const table = [sk => combineReducerSk(
		{
			page
		},
		sk
	)]

	//slicified root reducer
	export default combineReducerSk({
		a: s => s||{},     //trivial reducer
		table,
		anOtherTable: table,
		b:{
			m: table //table some where in state
		}
	})

#### action
	import slicify from '@pubcore/redux-slicify'


	const next = step => ({type:'NEXT', step})
	const back = step => ({type:'BACK', step})

	//let there be the redux "dispatch" function

	//this will change to next page of table in state.b.m
	dispatch( slicify('b.m', next(1)) )

	//and this will change to previous page of anOtherTable:
	dispatch( slicify('anOtherTable', back(1)) )
