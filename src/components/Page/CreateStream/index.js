import React from 'react'
import './index.less'
import {Button,message,Input,Form,InputNumber,Col,Row,Switch} from 'antd'
import ServingTable from './ServingTable'
import Axios from './../../../axios'

export default class CreateStream extends React.Component{
	constructor() {
	    super();
		this.state = {
			kafkaSwitch: true,
		};
	}
	
	getChildData=()=>{
			console.log(this.refs['children'].state)
			
	}
	
	createJob = (values) => {
		var servingName = this.refs['children'].state.servingName
		console.log(servingName)
		console.log(values)
		if(servingName == null ){
			message.warning("请先选择应用")
		}else{
			var url = "/api/v1/stream-data-predictor/stream"
			var params = {
				"servingName":servingName,
				"instance":values.instance,
				"cpu":values.cpu,
				"memory":values.memory,
				"kafkaAddress":values.kafkaAddress,
				"receiverTopics":values.receiverTopics,
				"sendTopics":values.sendTopics,
				"nodePort":values.nodePort
			}
			Axios.post(url,params).then((res) => {
				if(res.data.resultCode.code < 300){
					message.success(res.data.resultCode.message);
				}else{
					message.error(res.data.resultCode.message);
				}
			})
		}
		
	}
	
	render(){
		const layout = {
		  labelCol: {
		    span: 12,
		  },
		  wrapperCol: {
		    span: 12,
		  },
		};
		const onFinish = values => {
		    console.log('Success:', values);
		};
		
		const onFinishFailed = errorInfo => {
		    console.log('Failed:', errorInfo);
		};

		const onChange = () => {
			console.log("asd")
			this.setState({
				kafkaSwitch:!this.state.kafkaSwitch
			})
			
		}
		
		return (
			<div>
				<ServingTable ref="children" />
				<div className="create-job-from">
					<Form
					  // layout="inline"
					  {...layout}
					  name="createJob"
					  initialValues={{
						"cpu":1,
						"memory":1000,
						"instance":1,
						"nodePort":30281,
						"kafkaAddress":"",
						"receiverTopics":"",
						"sendTopics":"",
					  }}
					  onFinish={this.createJob}
					  onFinishFailed={onFinishFailed}
					>
						<Row>
							<Col span={12}>
								<Form.Item
								    label="CPU数"
								    name="cpu"
								    rules={[{
								        required: true,
								        message: 'Please input cpu!',
								    }]}
								>
								    <InputNumber min={0} max={100}  defaultValue={1} formatter={value => `${value} core`}
										parser={value => value.replace(' core', '')}/>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
								    label="内存数"
								    name="memory"
								    rules={[{
								        required: true,
								        message: 'Please input memory!',
								    }]}
								>
								    <InputNumber min={0} max={100000}  defaultValue={2000} formatter={value => `${value} M`}
										parser={value => value.replace(' M', '')}/>
								</Form.Item>
							</Col>
							
							
						</Row>
						<Row>
							<Col span={12}>
								<Form.Item
								    label="实例数"
								    name="instance"
								    rules={[{
								        required: true,
								        message: 'Please input instance!',
								    }]}
								>
								    <InputNumber min={1} max={100} defaultValue={1}/>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
								    label="端口"
								    name="nodePort"
								    rules={[{
								        required: true,
								        message: 'Please input nodePort!',
								    }]}
								>
								    <InputNumber min={30000} max={32000} defaultValue={30281}/>
								</Form.Item>
							</Col>
						</Row>
						<Row className="from-row">
							<Col span={4} offset={3}>
								<span style={{marginRight:"5"}}>是否开启kafka</span>
							</Col>
							<Col span={10}><Switch defaultChecked onChange={onChange} defaultChecked={this.state.kafkaSwitch}/></Col>
						</Row>
						
						<Row>
							<Col>
								<Form.Item
								    label="kafka地址"
								    name="kafkaAddress"
								    rules={[{
								        required: this.state.kafkaSwitch,
								        message: 'Please input kafkaAddress!',
								    }]}
								>
								    <Input disabled={!this.state.kafkaSwitch} className="from-input" placeholder="input with kafkaAddress" allowClear />
    
								</Form.Item>
							</Col>
						</Row>
						<Row>
							<Col>
								<Form.Item
								    label="接收Topic"
								    name="receiverTopics"
								    rules={[{
								        required: this.state.kafkaSwitch,
								        message: 'Please input receiverTopics!',
								    }]}
								>
								    <Input disabled={!this.state.kafkaSwitch} className="from-input" placeholder="input with receiverTopics" allowClear />
								    
								</Form.Item>
							</Col>
						</Row>
						<Row>
							<Col>
								<Form.Item
								    label="发送Topic"
								    name="sendTopics"
								    rules={[{
								        required: this.state.kafkaSwitch,
								        message: 'Please input sendTopics!',
								    }]}
								>
								    <Input disabled={!this.state.kafkaSwitch} className="from-input" placeholder="input with sendTopics" allowClear />
								    
								</Form.Item>
							</Col>
						</Row>
						
						<div className="submit">
							<Form.Item noStyle={true} >
								<Button className="submitbutton" type="primary" htmlType="submit">
								  创建任务
								</Button>
							</Form.Item>
						</div>
						
					</Form>
				</div>
				
			</div>
			
		)
	}
	
}