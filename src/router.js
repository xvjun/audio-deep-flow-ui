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

export default class IRouter extends React.Component{
	
	render(){
		return(
			<HashRouter>
				<App>
					<Route path="/ADF" render={()=>
						<Admin>
							<div style={{width:"100%"}}>
							    <Switch>
							    <Route exact path="/ADF/Home" component={Home} />
								<Route exact path="/ADF/Data" component={Data} />
								<Route exact path="/ADF/Models" component={Models} />
								<Route exact path="/ADF/Serving" component={Serving} />
								<Route exact path="/ADF/Stream" component={Stream} />
								<Route exact path="/ADF/Moniter" component={Moniter} />
								
								{/* 匹配所有错误路径默认页面 */}
							    <Route path="/" render={() => {
							    return <Redirect to="/ADF/Home" />
							    }} />
							    </Switch>
							</div>
						</Admin>
					}></Route>
					<Route path="/modelinfo" component={ModelInfo}></Route>
				</App>
			</HashRouter>
		)
	}
	
}
