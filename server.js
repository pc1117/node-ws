const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 3000 });

// 当有客户端连接时触发
server.on('connection', (socket) => {

  // 处理收到的消息
  socket.on('message', (data) => {
    console.log(`Received: ${data}`);
    socket.send(`收到消息: ${data}`);
  });

  // 处理连接关闭
  socket.on('close', () => {
    console.log('服务连接关闭！');
  });
  socket.on('pong', () => {
    console.log('服务连接正常！');
  });
  socket.on('ping', () => {
    console.log('服务连接正常！');
  });
  socket.on('open', () => {
    console.log('服务连接成功！');
  });
  socket.on('error', (error) => {
    console.error('服务连接错误:', error);
  });
});