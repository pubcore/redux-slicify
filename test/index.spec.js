import {expect} from 'chai'
import slicify, {createReducerSk, combineReducerSk} from '../src/index'
var skReducer = sk => createReducerSk(0, {ADD:(s, {val}) => s + val}, sk)
var combinedSkRed = [sk => combineReducerSk({
	m:{
		x:[skReducer],
		y:[skReducer]
	}
}, sk)]

var rootReducer = combineReducerSk({
	a:s => s||{},
	b:combinedSkRed
})

const add = x => ({
	type:'ADD',
	val:x
})

describe('slicify', () => {
	it('creates reducers to work relative to defined slicekey', () => {
		expect(skReducer('foo')(0, slicify('foo', add(1)))).to.deep.equal(1)
	})
	it('combines reducers in order to work relative to defined slice', () => {
		expect(rootReducer({}, slicify('b.m.x', add(1)))).to.deep.equal({
			a:{},
			b:{
				m:{
					x:1,
					y:0
				}
			}
		})
	})
	it('throws type error, if slice-key is not a string', () =>{
		expect(() => skReducer(null)).to.throw(TypeError)
		expect(() => combineReducerSk({}, null)).to.throw(TypeError)
	})
})
