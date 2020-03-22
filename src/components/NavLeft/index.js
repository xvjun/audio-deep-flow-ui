import React from 'react'
import {Menu} from 'antd'
import {Link} from 'react-router-dom';
import'./index.less'
import Icon from '@ant-design/icons';
import {connect} from 'react-redux'
import {switchMenu} from './../../redux/action'

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
class NavLeft extends React.Component{
	constructor(props){
	    super(props);
	    this.state={
	        selectedKeys: ['1'],
	    }
	}
	
	componentWillMount(){
		// const menuTreeNode = this.renderMenu(MenuConfig);
		// this.setState({
		// 	menuTreeNode:menuTreeNode
		// })
	}
	
	componentWillReceiveProps(nextProps){
		console.log("componentWillReceiveProps")
		// console.log(nextProps)
		this.setState({
			selectedKeys:nextProps.selectedKeys
		})
	}
	
	menuClick = (item) => {
		const {dispatch} = this.props;
		dispatch(switchMenu(item.item.props.title))
		this.setState({
			selectedKeys:item.keyPath
		})
	}
	
	render(){
		return (
			<div >
				<div className="logo">
				<Icon className="icon1" component={Pipeline} style={{fontSize: 30}} />
					<h3>AUDIO DEEP FLOW</h3>
				</div>
				<div className="">
					    <Menu 
							selectedKeys={this.state.selectedKeys}
							mode="inline"
							theme="dark"
							defaultSelectedKeys={['1']}
							defaultOpenKeys={['sub1']}
							onClick={this.menuClick}
					    > 
						
							<Menu.Item title="首页" key="1" >
							  <Icon component={Home} />
							  <span>首页</span>
							  <Link to="/Home"></Link>
							</Menu.Item>
							
							<Menu.Item title="数据中心" key="2">
							  <Icon component={TableIcon} />
							  <span>数据中心</span>
							  <Link to="/Data"></Link>
							</Menu.Item>
							
							<Menu.Item title="建模中心" key="3">
							<Icon component={Model} />
							  <span>建模中心</span>
							  <Link to="/Models"></Link>
							</Menu.Item>
							
							<Menu.Item title="模型应用中心" key="4">
							<Icon component={Stream} />
							  <span>模型应用中心</span>
							  <Link to="/Serving"></Link>
							</Menu.Item>
							
							<Menu.Item title="数据接入中心" key="5">
							<Icon component={Predict} />
							  <span>数据接入中心</span>
							  <Link to="/Stream"></Link>
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
							 <Menu.Item title="告警监控" key="7">
							 <Icon component={PieIcon} />
							  <Link to="/Moniter">告警监控</Link>
							  </Menu.Item>
							
							  <Menu.Item title="集群监控" key="8">
							  <Icon component={K8s} />
							  <Link to="/K8sMoniter">集群监控</Link>
							  </Menu.Item>
							
							</SubMenu>
						</Menu>
				</div>
				
				
				
			</div>
		)
	}
	
}

const mapStateToProps = state =>{
	return{
		selectedKeys: state.selectedKeys
	}
};
export default connect(mapStateToProps)(NavLeft);