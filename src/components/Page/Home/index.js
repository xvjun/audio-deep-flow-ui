import React from 'react'
import './index.less'
import {AudioTwoTone,WifiOutlined} from '@ant-design/icons';
import {Carousel} from 'antd'

import Icon from '@ant-design/icons';
import Pipeline from './../../../icon/pipeline.svg';
import Audio from './../../../icon/audio.svg'; 
import Guangqian from './../../../icon/guangqian.svg'; 
import Model from './../../../icon/model.svg'; 
import Stream from './../../../icon/stream.svg'; 
import Predict from './../../../icon/predict.svg'; 
import Alarm from './../../../icon/alarm.svg'; 

// import { createFromIconfontCN } from '@ant-design/icons';



export default class Home extends React.Component{
	
	// const IconFont = createFromIconfontCN({
	//   scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
	// });
	
	render(){
		return (
			<div className="home-warp">
				<Carousel autoplay className="home-carousel">
				    <div className="carousels">
					<div className="card1">
				      <Icon className="svg" component={Pipeline} />
					  <span>管道光纤传感器获得信号</span>
					</div>
				    </div>
				    <div className="carousels">
					<div className="card1">
				      <Icon className="svg" component={Audio}  />
					  <span>音频信号数字化</span>
				    </div>
					</div>
				    <div className="carousels">
					<div className="card1">
				      <Icon className="svg" component={Guangqian} />
					  <span>光纤传输数据</span>
				    </div>
					</div>
				    <div className="carousels">
					<div className="card1">
				      <Icon className="svg" component={Model} />
					  <span>样本数据建模</span>
				    </div>
					</div>
					<div className="carousels">
					<div className="card1">
					  <Icon className="svg" component={Stream} />
					  <span>流式数据读取</span>
					</div>
					</div>
					<div className="carousels">
					<div className="card1">
					  <Icon className="svg" component={Predict}  />
					  <span>数据处理模型预估</span>
					</div>
					</div>
					<div className="carousels">
					<div className="card1">
					  <Icon className="svg" component={Alarm}  />
					  <span>数据统计告警和监控</span>
					</div>
					</div>
				  </Carousel>
				
				<div className="home-text">
					<br />
					<span className="span1">Audio Deep Flow</span>
					<br /><br />
					实时音频信号智能预警平台
					<br />
					<span className="span2">------机器学习全流程一站式处理平台</span>
					
					
				</div>
			</div>
		)
	}
	
}