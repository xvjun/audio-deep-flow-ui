import React from 'react'
import {Row,Col,Badge,message} from 'antd'
import './index.less'
import Util from '../../utils/utils'
import Axios from '../../axios'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {switchMenu,selectedKeys} from './../../redux/action'

class Header extends React.Component{
	constructor(props){
	    super(props);
	    this.state={
	        serviceStatus: true,
			systemTime:"",
			menuName:"首页"
	    }
	}
	
	componentWillMount(){
		let nativeurl="/api/v1/k8smonitor/status/nativecomponent"
		Axios.get(nativeurl,"").then((res)=>{
			if(res.data.resultCode.code < 300){
				var list = res.data.data.deploymentInformationList
				for(var item in list){
					if(list[item].status != "正常"){
						this.setState({
							serviceStatus:false,
						})
					}
				}
				if(list.length < 8){
					this.setState({
						serviceStatus:false,
					})
				}
				
			}else{
				message.error(res.data.resultCode.message);
			}
		})
		setInterval(()=>{
			let systemTime = Util.formateDate(new Date().getTime());
			this.setState({
				systemTime:systemTime
			})
		},1000)
		this.getWeatherApiData()
	}
	getWeatherApiData(){
		let city="北京";
		Axios.jsonp({
			url:"http://api.map.baidu.com/telematics/v3/weather?location="+encodeURIComponent(city)+"&output=json&ak=3p49MVra6urFRGOT9s8UBWr2"
		}).then((res)=>{
			if(res.status === 'success'){
				let data = res.results[0].weather_data[0]; 
				this.setState({
					dayPictureUrl:data.dayPictureUrl,
					weather:data.weather
				})
			}
		})
	}
	
	menuClick = (item) => {
		const {dispatch} = this.props;
		dispatch(switchMenu("集群监控"))
		dispatch(selectedKeys(["8"]))
		// console.log(item)
	}
	
	showServiceStatus = () => {
		if(this.state.serviceStatus){
			return(
			<div>
				<span>服务状态</span>
				<Link onClick={this.menuClick} to="/K8sMoniter" style={{color:'green',fontSize:20}}>正常</Link>
				<Badge status='processing' />
			</div>
			)
		}else{
			return(
			<div>
				<span>服务状态</span>
				<Link onClick={this.menuClick} to="/K8sMoniter" style={{color:'red',fontSize:20}}>异常</Link>
				<Badge status='error' />
			</div>
			) 
		}
	}
	
	render(){
		return (
			<div className="header">
				<Row className="header-top">
					<Col span="24">
						{this.showServiceStatus()}
					</Col>
				</Row>
				<Row className="breadcrumb">
					<Col span="4" className="breadcrumb-title">
						{this.props.menuName}
					</Col>
					<Col span="20" className="weather">
						<span className="date">{this.state.systemTime}</span>
						<span className="weather-img">
							<img src={this.state.dayPictureUrl} alt="" />
						</span>
						<span className="weather-detail">{this.state.weather}</span>
					</Col>
				</Row>
			</div>
		)
	}
	
}

const mapStateToProps = state =>{
	return{
		menuName: state.menuName
	}
};
export default connect(mapStateToProps)(Header);