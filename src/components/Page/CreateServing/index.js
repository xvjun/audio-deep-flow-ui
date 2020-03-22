import React from 'react'
import './index.less'
import {Button,message,Input,Form,InputNumber,Col,Row} from 'antd'
import ModelTable from './ModelTable'
import Axios from './../../../axios'

export default class CreateServing extends React.Component{
	
	getChildData=()=>{
			console.log(this.refs['children'].state)
			
	}
	
	createJob = (values) => {
		var hdfsPath = this.refs['children'].state.hdfsPath
		// console.log(hdfsPath)
		// console.log(values)
		if(hdfsPath == null ){
			message.warning("请先选择模型")
		}else{
			var url = "/api/v1/modelapp/serving"
			var params = {
				"modelHdfsPath":hdfsPath,
				"instance":values.instance,
				"cpu":values.cpu,
				"memory":values.memory
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
		const tailLayout = {
		  wrapperCol: {
		    offset: 8,
		    span: 16,
		  },
		};
		const onFinish = values => {
		    console.log('Success:', values);
		};
		
		const onFinishFailed = errorInfo => {
		    console.log('Failed:', errorInfo);
		};

		return (
			<div>
				<ModelTable ref="children" />
				<div className="create-job-from">
					<Form
					  // layout="inline"
					  {...layout}
					  name="createJob"
					  initialValues={{
						"cpu":1,
						"memory":1000,
						"instance":1
					  }}
					  onFinish={this.createJob}
					  onFinishFailed={onFinishFailed}
					>
						<Row>
							<Col span={8}>
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
							<Col span={8}>
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
							
							<Col span={8}>
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