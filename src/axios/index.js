import JsonP from 'jsonp'
import axios from 'axios'
import { Modal } from 'antd'

export default class Axios{
	static jsonp(options){
		return new Promise((resolve,reject)=>{
			JsonP(options.url,{
				param:'callback'
			},function (err,response) {
				//to-do
				if(response.status === 'success'){
					resolve(response);
				}else{
					reject(response);
				}
			})
		})
	}
	
	static get(url,params){
		return new Promise((resolve,reject)=>{
			axios.get(url,params).then((response)=>{
				// if(response.data.resultCode.code < 300){
					resolve(response);
				// }else{
				// 	reject(response);
				// }
			})
		});
	}
	
	static delete(url,params){
		return new Promise((resolve,reject)=>{
			axios.delete(url,params).then((response)=>{
				// if(response.data.resultCode.code < 300){
					resolve(response);
				// }else{
				// 	reject(response);
				// }
			})
		});
	}
	
	static post(url,params){
		return new Promise((resolve,reject)=>{
			axios.post(url,params).then((response)=>{
				// if(response.data.resultCode.code < 300){
					resolve(response);
				// }else{
				// 	reject(response);
				// }
			})
		});
	}
	
	static ajax(options){
	        let loading;
	        if (options.data && options.data.isShowLoading !== false){
	            loading = document.getElementById('ajaxLoading');
	            loading.style.display = 'block';
	        }
	        let baseApi = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';
	        return new Promise((resolve,reject)=>{
	            axios({
	                url:options.url,
	                method:'get',
	                baseURL:baseApi,
	                timeout:5000,
	                params: (options.data && options.data.params) || ''
	            }).then((response)=>{
	                if (options.data && options.data.isShowLoading !== false) {
	                    loading = document.getElementById('ajaxLoading');
	                    loading.style.display = 'none';
	                }
	                if (response.status == '200'){
	                    let res = response.data;
	                    if (res.code == '0'){
	                        resolve(res);
	                    }else{
	                        Modal.info({
	                            title:"提示",
	                            content:res.msg
	                        })
	                    }
	                }else{
	                    reject(response.data);
	                }
	            })
	        });
	    }
}