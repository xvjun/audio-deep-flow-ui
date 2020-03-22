import React from 'react'
import BarSearchTypeByTime from './BarSearchTypeByTime'
import PieSearchTypeByTime from './PieSearchTypeByTime'
import LineLocationByTime from './LineLocationByTime'
import LineSearchTypeByTime from './LineSearchTypeByTime'
import ScatterByAll from './ScatterByAll'

export default class Moniter extends React.Component{
	
	render(){
		return (
			<div style={{minWidth: 1150}}>
				<div className="charts1">
					<BarSearchTypeByTime />
				</div>
				<div className="charts2">
					<PieSearchTypeByTime />
				</div>
				<div className="charts3">
					<LineLocationByTime />
				</div>
				<div className="charts4">
					<LineSearchTypeByTime />
				</div>
				<div className="charts1">
					<ScatterByAll />
				</div>
			</div>
		)
	}
	
}