import React from 'react';
import './App.css';

export default class App extends React.Component{
	render(){
		return (
		  <div>
		    {this.props.children}
		  </div>
		);
	}
}

