import React from 'react'
import {HashRouter,Route,Switch,Redirect} from 'react-router-dom'
import App from './App'
import Admin from './admin'
import ModelInfo from './modelInfo'

import Home from './components/Page/Home'
import Data from './components/Page/Data'
import Models from './components/Page/Models'
import Serving from './components/Page/Serving'
import Stream from './components/Page/Stream'
import Moniter from './components/Page/Moniter'
import K8sMoniter from './components/Page/K8sMoniter'
import CreateModel from './components/Page/CreateModel'
import CreateServing from './components/Page/CreateServing'
import CreateStream from './components/Page/CreateStream'

export default class IRouter extends React.Component{
	
	render(){
		return(
			<HashRouter>
				<App>
					<Admin>
						<div style={{width:"100%"}}>
							<Switch>
							<Route exact path="/Home" component={Home} />
							<Route exact path="/Data" component={Data} />
							<Route exact path="/Models" component={Models} />
							<Route exact path="/Serving" component={Serving} />
							<Route exact path="/Stream" component={Stream} />
							<Route exact path="/Moniter" component={Moniter} />
							<Route exact path="/K8sMoniter" component={K8sMoniter} />
							
							<Route exact path="/CreateModel" component={CreateModel} />
							<Route exact path="/CreateServing" component={CreateServing} />
							<Route exact path="/CreateStream" component={CreateStream} />
							
							{/* 匹配所有错误路径默认页面 */}
							<Route path="/" render={() => {
							return <Redirect to="/Home" />
							}} />
							</Switch>
						</div>
					</Admin>
				</App>
			</HashRouter>
		)
	}
	
}
