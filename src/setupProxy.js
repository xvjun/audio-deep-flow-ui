const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
	app.use(createProxyMiddleware('/api/v1', {
	    target: 'http://172.27.233.58:30086',
	    secure: false,
		changeOrigin: true,
	   }));
	
  // app.use(createProxyMiddleware('/api/v1/dataprocess', {
  //     target: 'http://172.27.233.58:30081',
  //     secure: false,
  // 	changeOrigin: true,
  //    }));
     
  // app.use(createProxyMiddleware('/api/v1/modelbuild', {
  //     target: 'http://172.27.233.58:30082',
  //     secure: false,
  // 	changeOrigin: true,
  //    }));

  // app.use(createProxyMiddleware('/api/v1/modelapp', {
  //     target: 'http://172.27.233.58:30083',
  //     secure: false,
  // 	changeOrigin: true,
  //    }));
	 
  // app.use(createProxyMiddleware('/api/v1/stream-data-predictor', {
  //     target: 'http://172.27.233.58:30084',
  //     secure: false,
  // 	changeOrigin: true,
  //    }));
	 
  // app.use(createProxyMiddleware('/api/v1/k8smonitor', {
  //     target: 'http://172.27.233.58:30085',
  //     secure: false,
  // 	changeOrigin: true,
  //    }));
	 
  // app.use(createProxyMiddleware('/api/v1/monitor', {
  //     target: 'http://172.27.233.58:30085',
  //     secure: false,
  // 	changeOrigin: true,
  //    }));
};