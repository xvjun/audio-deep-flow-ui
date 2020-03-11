import React from 'react'

export default class Child extends React.Component{
	constructor(props) {
	    super(props);
		this.state = {
			name:props.name
		};
	}
	
	componentWillMount(){
		console.log('will mount');
	}
	
	componentDidMount(){
		console.log('did mount');
	}
	
	componentWillReceiveProps=(newProps)=>{
		console.log('will props' + newProps.name);
		this.setState({
			name:newProps.name
		})
	}
	
	shouldComponentUpdate(){
		console.log('should update')
		return true;
	}
	
	componentWillUpdate(){
		console.log('will update');
		
		
	}
	
	componentDidUpdate(){
		console.log('did update');
		
	}
	
	render(){
		return (
			<div>
				<p>{this.state.name}</p>
			</div>
		)
	}
}