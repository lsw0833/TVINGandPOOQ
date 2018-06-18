module.exports = {
  server_port: 8080,
  route_info: [{
      file: './datashop',
      path: '/',
      method: 'home',
      type: 'get'
    },
    {
      file: './datashop',
      path: '/dataList',
      method: 'dataList',
      type: 'get'
    },
    {
      file: './datashop',
      path: '/download',
      method: 'download',
      type: 'post'
    }
  ]
};
