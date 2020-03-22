import React from 'react'
import './index.less'
import { Table ,Tabs,Tag,Popconfirm,message} from 'antd';
import DeployTable from './DeployTable'
import JobTable from './JobTable'
import PodTable from './PodTable'
import ServiceTable from './ServiceTable'
import Axios from './../../../axios'


const { TabPane } = Tabs;


export default class K8sMoniter extends React.Component{
	constructor() {
	    super();
		this.state = {
			dynamicdeployDataSource:[],
			dynamicpodDataSource:[],
			dynamicjobDataSource:[],
			dynamicsvcDataSource:[],
			
			nativedeployDataSource:[],
			nativepodDataSource:[],
			nativesvcDataSource:[],
			dynamicstatus: true,
			nativestatus: true,
			
		};
	}
	
	componentWillMount(){
		let dynamicurl="/api/v1/k8smonitor/status/dynamiccomponent"
		let nativeurl="/api/v1/k8smonitor/status/nativecomponent"
		Axios.get(dynamicurl,"").then((res)=>{
			if(res.data.resultCode.code < 300){
				Axios.get(nativeurl,"").then((res1)=>{
					if(res.data.resultCode.code < 300){
						this.setState({
							nativedeployDataSource:res1.data.data.deploymentInformationList,
							nativepodDataSource:res1.data.data.podInformationList,
							nativesvcDataSource:res1.data.data.serviceInformationList,
							nativestatus:false,
							
							dynamicdeployDataSource:res.data.data.deploymentInformationList,
							dynamicpodDataSource:res.data.data.podInformationList,
							dynamicjobDataSource:res.data.data.jobInformationList,
							dynamicsvcDataSource:res.data.data.serviceInformationList,
							dynamicstatus:false,
						})
					}else{
						message.error(res.data.resultCode.message);
					}
				})
				
			}else{
				message.error(res.data.resultCode.message);
			}
		})
		
	}
	
	render(){
		return (
			<div className="model">
				<Tabs size={'large'} defaultActiveKey="s1" >
					<TabPane tab="基础服务组件" key="s1">
						<Tabs className="subtabs" type="card" tabPosition={"left"} size={'small'} defaultActiveKey="s1_1" >
							<TabPane tab="Deployment" key="s1_1">
								<DeployTable key="d1" status={this.state.nativestatus} dataSource={this.state.nativedeployDataSource} />
							</TabPane>
							<TabPane tab="Pod" key="s1_2">
								<PodTable key="p1" status={this.state.nativestatus} dataSource={this.state.nativepodDataSource} />
							</TabPane>
							<TabPane tab="Service" key="s1_4">
								<ServiceTable key="s1" status={this.state.nativestatus} dataSource={this.state.nativesvcDataSource} />
							</TabPane>
						</Tabs>
					</TabPane>
					<TabPane size={'large'} tab="动态服务组件" key="s2">
						<Tabs className="subtabs" type="card" tabPosition={"left"} size={'small'} defaultActiveKey="s2_1" >
							<TabPane tab="Deployment" key="s2_1">
								<DeployTable key="d2" status={this.state.dynamicstatus} dataSource={this.state.dynamicdeployDataSource} />
							</TabPane>
							<TabPane tab="Pod" key="s2_2">
								<PodTable key="p2" status={this.state.dynamicstatus} dataSource={this.state.dynamicpodDataSource} />
							</TabPane>
							<TabPane tab="Job" key="s2_3">
								<JobTable key="j2" status={this.state.dynamicstatus} dataSource={this.state.dynamicjobDataSource} />
							</TabPane>
							<TabPane tab="Service" key="s2_4">
								<ServiceTable key="s2" status={this.state.dynamicstatus} dataSource={this.state.dynamicsvcDataSource} />
							</TabPane>
						</Tabs>
					</TabPane>
				    
				  </Tabs>
			</div>
		)
	}
	
}