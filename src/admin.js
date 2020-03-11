import React from 'react'
import {Row, Col} from 'antd'
import Header from './components/Header'
import Footer from './components/Footer'
import NavLeft from './components/NavLeft'
import './style/common.less'
import { HashRouter, Switch, Route, Redirect} from 'react-router-dom';

import Home from './components/Page/Home'
import Data from './components/Page/Data'
import Models from './components/Page/Models'
import Serving from './components/Page/Serving'
import Stream from './components/Page/Stream'
import Moniter from './components/Page/Moniter'

export default class Admin extends React.Component{
	
	render(){
		return(
			<div>
				<Row className="container">
					<Col span="3" className="nav-left">
						<NavLeft></NavLeft>
					</Col>
					<Col span="21" className="main">
						<Header></Header>
						<Row className="content">
							{this.props.children}
						</Row>
						<Footer></Footer>
					</Col>
				</Row>
			</div>
		);
	}
	
}