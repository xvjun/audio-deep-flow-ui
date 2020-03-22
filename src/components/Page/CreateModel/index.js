import React from 'react'
import './index.less'
import {Button,message,Input,Form,InputNumber,Col,Row} from 'antd'
import DataTable from './DataTable'
import Axios from './../../../axios'

export default class CreateModel extends React.Component{
	
	getChildData=()=>{
			console.log(this.refs['children'].state)
			
	}
	
	createJob = (values) => {
		var hdfsPathList = this.refs['children'].state.hdfsPathList
		if(hdfsPathList.length == 0 ){
			message.warning("样本数据不能为空,请先选择样本数据")
		}else{
			var url = "/api/v1/modelbuild/job"
			var params = {
				"dataHdfsPathList":hdfsPathList,
				"hiddenLayers":values.hiddenLayers,
				"layersSize":values.layersSize,
				"learningRate":values.learningRate,
				"epochs":values.epochs,
				"dropoutRate":values.dropoutRate,
				"classSum":values.classSum,
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
				<DataTable ref="children" />
				<div className="create-job-from">
					<Form
					  // layout="inline"
					  {...layout}
					  name="createJob"
					  initialValues={{
						"hiddenLayers":20,
						"layersSize":100,
						"learningRate":0,
						"epochs":100,
						"dropoutRate":0.5,
						"classSum":4,
						"cpu":1,
						"memory":2000
					  }}
					  onFinish={this.createJob}
					  onFinishFailed={onFinishFailed}
					>
						<Row>
							<Col span={8}>
								<Form.Item
								    label="隐藏层数"
								    name="hiddenLayers"
								    rules={[
								      {
								        required: true,
								        message: 'Please input hiddenLayers!',
								      },
								    ]}
								>
								    <InputNumber min={0} max={1000} defaultValue={20}/>
								</Form.Item>
							</Col>
							
							<Col span={8}>
								<Form.Item
								    label="隐藏层节点个数"
								    name="layersSize"
								    rules={[{
								        required: true,
								        message: 'Please input layersSize!',
								    }]}
								>
								    <InputNumber min={0} max={1000} defaultValue={100}/>
								</Form.Item>
							</Col>
							
							<Col span={8}>
								<Form.Item
								    label="学习率"
								    name="learningRate"
								    rules={[{
								        required: true,
								        message: 'Please input learningRate!',
								    }]}
								>
								    <InputNumber min={0} max={1} step={0.01} defaultValue={0}/>
								</Form.Item>
							</Col>
						</Row>
					    
						<Row>
							<Col span={8}>
								<Form.Item
								    label="训练轮次"
								    name="epochs"
								    rules={[{
								        required: true,
								        message: 'Please input epochs!',
								    }]}
								>
								    <InputNumber min={0} max={1000}  defaultValue={100}/>
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item
								    label="随机丢弃率"
								    name="dropoutRate"
								    rules={[{
								        required: true,
								        message: 'Please input dropoutRate!',
								    }]}
								>
								    <InputNumber min={0} max={1} step={0.01} defaultValue={0.5}/>
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item
								    label="分类数"
								    name="classSum"
								    rules={[{
								        required: true,
								        message: 'Please input classSum!',
								    }]}
								>
								    <InputNumber min={0} max={10}  defaultValue={4}/>
								</Form.Item>
							</Col>
						</Row>
						
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