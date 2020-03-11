import React from 'react'
import {Menu} from 'antd'
import {Link} from 'react-router-dom';
import'./index.less'
import Icon from '@ant-design/icons';


import Alarm from './../../icon/alarmb.svg'; 
import Predict from './../../icon/predictb.svg'; 
import Home from './../../icon/home.svg'; 
import TableIcon from './../../icon/table.svg'; 
import Model from './../../icon/modelb.svg'; 
import Pipeline from './../../icon/pipeline.svg';
import Stream from './../../icon/streamb.svg'; 
import PieIcon from './../../icon/pie.svg'; 
import K8s from './../../icon/k8s.svg'; 





const { SubMenu } = Menu;
export default class NavLeft extends React.Component{
	constructor(props){
	    super(props);
	    // this.state={
	    //     currentHash: window.location.hash,
	    //     navFlag: '',
	    // }
	    // this.handleClick = this.handleClick.bind(this);
		// this.toggleCollapsed = this.toggleCollapsed.bind(this);
	}
	
	// handleClick(arg) {
	// 	console.log(arg);
	//     this.setState(prevState => ({
	//         navFlag: arg,
	//         currentHash:''
	//     }));
		
	//   }
	  
	componentWillMount(){
		// const menuTreeNode = this.renderMenu(MenuConfig);
		// this.setState({
		// 	menuTreeNode:menuTreeNode
		// })
	}
	
	// renderMenu = (data) => {
	// 	return data.map((item) => {
	// 		if(item.children){
	// 			return (
	// 				<SubMenu title={item.title} key={item.key}>
	// 					{this.renderMenu(item.children)}
	// 				</SubMenu>
	// 			)
	// 		}
	// 		return <Menu.Item title={item.title} key={item.key} />
	// 	})
	// }
	
	render(){
		return (
			<div >
				<div className="logo">
				<Icon className="icon1" component={Pipeline} style={{fontSize: 30}} />
					<h3>AUDIO DEEP FLOW</h3>
				</div>
				<div className="">
					    <Menu 
							mode="inline"
							theme="dark"
							defaultSelectedKeys={['1']}
							defaultOpenKeys={['sub1']}
					    > 
						
							<Menu.Item title="首页" key="1" >
							  <Icon component={Home} />
							  <span>首页</span>
							  <Link to="/ADF/Home"></Link>
							</Menu.Item>
							
							<Menu.Item title="数据中心" key="2">
							  <Icon component={TableIcon} />
							  <span>数据中心</span>
							  <Link to="/ADF/Data"></Link>
							</Menu.Item>
							
							<Menu.Item title="建模中心" key="3">
							<Icon component={Model} />
							  <span>建模中心</span>
							  <Link to="/ADF/Models"></Link>
							</Menu.Item>
							
							<Menu.Item title="模型应用中心" key="4">
							<Icon component={Stream} />
							  <span>模型应用中心</span>
							  <Link to="/ADF/Serving"></Link>
							</Menu.Item>
							
							<Menu.Item title="数据接入中心" key="5">
							<Icon component={Predict} />
							  <span>数据接入中心</span>
							  <Link to="/ADF/Stream"></Link>
							</Menu.Item>
							
						
							<SubMenu
							  key="sub1"
							  title={
								<span>
								  <Icon component={Alarm} />
								  <span>监控中心</span>
								</span>
							  }
							>
							 <Menu.Item key="7">
							 <Icon component={PieIcon} />
							  <Link to="/ADF/Moniter">告警监控</Link>
							  </Menu.Item>
							
							  <Menu.Item key="8">
							  <Icon component={K8s} />
							  <Link to="/ADF/Moniter">集群监控</Link>
							  </Menu.Item>
							
							</SubMenu>
						</Menu>
				</div>
				
				
				
			</div>
		)
	}
	
}