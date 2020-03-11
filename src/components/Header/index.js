import React from 'react'
import {Row,Col,Badge} from 'antd'
import './index.less'
import Util from '../../utils/utils'
import Axios from '../../axios'
import {Link} from 'react-router-dom';

export default class Header extends React.Component{
	constructor(props){
	    super(props);
	    this.state={
	        serviceStatus: true,
			systemTime:""
	    }
	}
	
	componentWillMount(){
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
	
	showServiceStatus = () => {
		if(this.state.serviceStatus){
			return(
			<div>
				<span>服务状态</span>
				<Link to="/ADF/Moniter" style={{color:'green',fontSize:20}}>正常</Link>
				<Badge status='processing' />
			</div>
			)
		}else{
			return(
			<div>
				<span>服务状态</span>
				<Link to="/ADF/Moniter" style={{color:'red',fontSize:20}}>异常</Link>
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
						首页
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