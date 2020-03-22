import React from 'react'
import {Pagination,Checkbox,Tag,Table,Popconfirm,Button,Modal,Form ,Input,Upload, message} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import './index.less'
import Axios from './../../../axios'

const CheckboxGroup = Checkbox.Group;
const { Search } = Input;
const { Dragger } = Upload; 
export default class Data extends React.Component{
	
	constructor() {
	    super();
		this.state = {
		    dataSource:[],
			status: true,
			confirmLoading: false,
			displayName:"",
			current:1,
			pageSize:10,
			visiblelocal:false,
			visiblehdfs:false,
			fileList:[],
		};
	}
	
	componentWillMount(){
		let url="/api/v1/dataprocess/data/list/page?displayName=&offset=1&limit=10"
		Axios.get(url,"").then((res)=>{
			if(res.data.resultCode.code < 300){
				console.log(res.data.data.list)
				let list = res.data.data.list;
				var data = []
				for(let item in list){
					// console.log(list[item])
					if(list[item].isCompleted === 1){
						var isCompleted = "导入成功";
					}else if(list[item].isCompleted === 0){
						var isCompleted = "正在导入";
					}else if(list[item].isCompleted === -1){
						var isCompleted = "导入失败";
					}
					var danwei = "KB"
					var capacity = list[item].capacity;
					if(capacity > 10240){
						var capacity = capacity/1024;
						danwei = "MB";
						if(capacity > 10240){
							var capacity = capacity/1024;
							danwei = "GB";
						}
					}
					
					var dataItem = {
						'key':list[item].dataId,
						'dataName':list[item].dataName,
						'length':list[item].length,
						'incapacity':list[item].capacity,
						'capacity':capacity.toFixed(2)+" "+danwei,
						'importTime':list[item].importTime,
						'isCompleted':isCompleted,
					}
					data.push(dataItem);
				}
				this.setState({
					totle:res.data.data.total,
					dataSource:data,
					status: false,
				})
			}else{
				message.error(res.data.resultCode.message);
			}
		})
	}
	
	getlist=(displayName, current, pageSize)=>{
		let url="/api/v1/dataprocess/data/list/page?displayName="+displayName+"&offset="+current+"&limit="+pageSize
		Axios.get(url,"").then((res)=>{
			if(res.data.resultCode.code < 300){
				console.log(res.data.data.list)
				let list = res.data.data.list;
				var data = []
				for(let item in list){
					// console.log(list[item])
					if(list[item].isCompleted === 1){
						var isCompleted = "导入成功";
					}else if(list[item].isCompleted === 0){
						var isCompleted = "正在导入";
					}else if(list[item].isCompleted === -1){
						var isCompleted = "导入失败";
					}
					var danwei = "KB"
					var capacity = list[item].capacity;
					if(capacity > 10240){
						var capacity = capacity/1024;
						danwei = "MB";
					}
					if(capacity > 10240){
						var capacity = capacity/1024;
						danwei = "GB";
					}
					var dataItem = {
						'key':list[item].dataId,
						'dataName':list[item].dataName,
						'length':list[item].length,
						'incapacity':list[item].capacity,
						'capacity':capacity.toFixed(2)+" "+danwei,
						'importTime':list[item].importTime,
						'isCompleted':isCompleted,
					}
					data.push(dataItem);
				}
				this.setState({
					status: false,
					dataSource:data,
					current:current,
					pageSize:pageSize,
					totle:res.data.data.total,
				})
			}else{
				message.error(res.data.resultCode.message);
			}
		})
	}
	
	handleDelete = key => {
		console.log(key)
		let url="/api/v1/dataprocess/data?dataId="+key
		Axios.delete(url,"").then((res)=>{
			console.log(res)
			if(res.data.resultCode.code < 300){
				message.success('删除成功');
				const dataSource = [...this.state.dataSource];
				this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
			}else{
				message.error('删除失败 : '+res.data.resultCode.message);
			}
		})
	    
	  };
	
	// const { count, dataSource } = this.state;
	// const newData = {
	//   key: count,
	//   name: `Edward King ${count}`,
	//   age: 32,
	//   address: `London, Park Lane no. ${count}`,
	// };
	// this.setState({
	//   dataSource: [...dataSource, newData],
	//   count: count + 1,
	// });
	
	uploadDatalocal = () => {
		this.setState({
			visiblelocal:true,
			modaltitle:"本地数据上传",
		})
	};
	
	uploadDatahdfs = () => {
		this.setState({
			visiblehdfs:true,
			modaltitle:"HDFS数据上传",
		})
	};
	  
	handleOkhdfs = (value) => {
		
		   this.setState({
		     confirmLoading: true,
		   });
		console.log(value)
		let url="/api/v1/dataprocess/hdfs/data?hdfsUrl=hdfs://"+value.HDFS路径
		Axios.post(url,"").then((res)=>{
			console.log(res)
			this.setState({
			  confirmLoading: false,
			  visiblehdfs: false,
			});
			this.getlist("", 1, 10);
		})
	  };
	
	handleOklocal = (value) => {
		this.setState({
		  visiblelocal: false,
		});
		this.getlist("", 1, 10);
		// console.log(this.state.fileList)
		
	  };
	  
	  //    this.setState({
	  //      confirmLoading: true,
	  //    });
	  //    setTimeout(() => {
	  //      this.setState({
	  //        visible: false,
	  //        confirmLoading: false,
	  //      });
	  //    }, 2000);
	
	  handleCancel = () => {
	    console.log('Clicked cancel button');
	    this.setState({
	      visiblehdfs: false,
		  visiblelocal: false,
	    });
	  };
	
	onSearch = (value) =>{
		this.setState({
		  displayName: value,
		},function(){
			this.getlist(value, this.state.current, this.state.pageSize)
		});
	}
	
	render(){
		const columns = [
			{
			  title: '名称',
			  dataIndex: 'dataName',
			  key: 'dataName',
			},
			{
			  title: '行数',
			  dataIndex: 'length',
			  key: 'length',
			  defaultSortOrder: 'descend',
			  sorter: (a, b) => a.length - b.length,
			},
			{
			  title: '容量',
			  dataIndex: 'capacity',
			  key: 'capacity',
			  defaultSortOrder: 'descend',
			  sorter: (a, b) => a.incapacity - b.incapacity,
			},
			{
			  title: '导入时间',
			  dataIndex: 'importTime',
			  key: 'importTime',
			  defaultSortOrder: 'descend',
			  sorter: (a, b) => {
			  	let a_ts = new Date(a.importTime)
			  	let b_ts = new Date(b.importTime)
			  	a_ts = a_ts.getTime()
			  	b_ts = b_ts.getTime()
			  	return  a_ts - b_ts;
			  }
			},
			{
			  title: '状态',
			  dataIndex: 'isCompleted',
			  key: 'isCompleted',
			  render: isCompleted => {
				  let color = 'green';
				  if(isCompleted === '导入失败'){
					  color='red';
				  }else if(isCompleted === '正在导入'){
					  color= 'blue'
				  }
			  	return(
			  		<Tag color={color} >{isCompleted}</Tag>
			  	)
			  },
			  filters: [{ text: '导入成功', value: '导入成功'},{ text: '正在导入', value: '正在导入'},{ text: '导入失败', value: '导入失败'}],
			  onFilter: (value, record) => record.isCompleted.includes(value)
			},
			{
				title: '操作',
				dataIndex: 'operation',
				render: (text, record) =>
				  this.state.dataSource.length >= 1 ? (
					<Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.key)}>
					  <a>Delete</a>
					</Popconfirm>
				) : null,
			},
			
		];
		const tablechange=(current, pageSize)=>{
			this.getlist(this.state.displayName, current, pageSize)
		}
		const pagination = {
			defaultCurrent:1,
			onChange:tablechange,
			onShowSizeChange:tablechange,
			showSizeChanger:true,
			total:this.state.totle,
		}
		
		const CollectionCreateFormHdfs = ({ confirmLoading,title,visible, onCreate, onCancel }) => {
		  const [form] = Form.useForm();
		  return (
		    <Modal
			  confirmLoading={confirmLoading}
		      visible={visible}
		      title={title}
		      okText="上传"
		      cancelText="退出"
		      onCancel={onCancel}
			  width={600}
		      onOk={() => {
		        form
		          .validateFields()
		          .then(values => {
		            form.resetFields();
		            onCreate(values);
		          })
		          .catch(info => {
		            console.log('Validate Failed:', info);
		          });
		      }}
		    >
		      <Form
		        form={form}
		      >
		       <Form.Item
		         label="HDFS路径"
		         name="HDFS路径"
		         rules={[{ required: true, message: 'Please input HDFS path!' }]}
		       >
		         <Input addonBefore="hdfs://" style={{ width: 500 }}/>
		       </Form.Item>
		      </Form>
		    </Modal>
		  );
		};
		
		const CollectionCreateFormLocal = ({ confirmLoading,title,visible, onCreate, onCancel }) => {
		  const [form] = Form.useForm();
		  const props = {
		    name: 'formatData',
			accept:".csv",
		    multiple: true,
		    action: '/api/v1/dataprocess/local/data',
		    onChange(info) {
		      const { status } = info.file;
		      if (status !== 'uploading') {
		        console.log(info.file, info.fileList);
		      }
		      if (status === 'done') {
		        message.success(`${info.file.name} file uploaded successfully.`);
		      } else if (status === 'error') {
		        message.error(`${info.file.name} file upload failed.`);
		      }
		    },
			showUploadList: {
			    showRemoveIcon: false,
			  },
		  };
		  
			
		  return (
		    <Modal
			  confirmLoading={confirmLoading}
		      visible={visible}
		      title={title}
		      okText="完成"
		      cancelText="退出"
		      onCancel={onCancel}
			  width={600}
		      onOk={() => {
		        form
		          .validateFields()
		          .then(values => {
		            form.resetFields();
		            onCreate(values);
		          })
		          .catch(info => {
		            console.log('Validate Failed:', info);
		          });
		      }}
		    >
			
		      <Form
		        form={form}
		      >
			  <div className="from">
		       <Form.Item
			     className="from"
		         label="支持csv格式文件,小于100MB"
		         name="csv"
		         
		       >
			   <div className='dragger'>
		         <Dragger className='dragger' {...props}>
		             <p className="ant-upload-drag-icon">
		               <InboxOutlined />
		             </p>
		             <p className="ant-upload-text">点击上传文件</p>
		             <p className="ant-upload-hint">
					 支持拖拽文件到此处
		             </p>
		           </Dragger>
				</div>
		       </Form.Item>
			   </div>
		      </Form>
			 
		    </Modal>
		  );
		};
		
		return(
			<div>
				<div className="upload">
					<div className="left">
						<Search className="uploadinput" placeholder="按照名称查询" onSearch={this.onSearch} enterButton />
						
					</div>
					<div className="right">
						<Button className="uploadbutton" type="primary" shape="round" onClick={this.uploadDatalocal}>本地数据上传</Button>
						<Button className="uploadbutton" type="primary" shape="round" onClick={this.uploadDatahdfs}>HDFS数据上传</Button>
										
					</div>
						
				</div>
				<Table bordered loading={this.state.status} columns={columns} pagination={pagination} dataSource={this.state.dataSource} />
				
				<CollectionCreateFormLocal
					title={this.state.modaltitle}
					visible={this.state.visiblelocal}
					onCreate={this.handleOklocal}
					onCancel={this.handleCancel}
					confirmLoading={this.state.confirmLoading}
				/>
				
				<CollectionCreateFormHdfs
					title={this.state.modaltitle}
					visible={this.state.visiblehdfs}
					onCreate={this.handleOkhdfs}
					onCancel={this.handleCancel}
					confirmLoading={this.state.confirmLoading}
				/>
				
			</div>
		)
	}
}