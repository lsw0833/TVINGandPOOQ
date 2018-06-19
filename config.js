module.exports = {
  server_port: 8080,
  route_info: [{
      file: './webTV',
      path: '/',
      method: 'home',
      type: 'get'
    },
    {
      file: './webTV',
      path: '/onair',
      method: 'onair',
      type: 'get'
    }
  ]
};
