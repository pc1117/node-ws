import { useEffect } from 'react';
import './index.less';

export default function HomePage() {

  /**
   * 渲染消息到页面上
   * @param msg 要显示的消息内容
   * @param isMyself 是否是当前用户发送的消息，默认为false
   */
  function renderMsg(msg: string, isMyself?: boolean) {
    // 获取消息列表容器
    const msgListCon = document.querySelector("#msg-list");
    // 创建消息项元素
    const item = document.createElement("div");
    // 设置消息项的类名，如果是自己发送的消息则添加myself样式
    item.classList = isMyself ? "item myself" : "item";
    // 创建消息内容元素
    const content = document.createElement("div");
    // 设置消息内容的类名
    content.classList = "content";
    // 设置消息内容的HTML
    content.innerHTML = msg;
    // 将消息内容添加到消息项中
    item.appendChild(content);
    // 如果消息列表容器存在，则将消息项添加到容器中
    msgListCon && msgListCon.appendChild(item);
  }

  useEffect(() => {
    try {
      const ws = new WebSocket("ws://localhost:3000");
      ws.onopen = function () {
        console.log("连接成功！", arguments);
      };
      ws.onmessage = function (e) {
        renderMsg(e.data)
      };
      ws.onclose = function () {
        console.log("连接关闭！");
      };
      ws.onerror = function () {
        return alert("连接错误！");
      };
      const send: HTMLButtonElement | null = document.querySelector("#send");
      if (send) {
        send.onclick = function () {
          const textarea: HTMLTextAreaElement | null = document.querySelector("#textarea");
          if (textarea) {
            const msg = textarea.value;
            if (!msg) {
              alert("请输入内容！");
              return
            }
            renderMsg(msg, true)
            ws.send(msg);
            textarea.value = "";
          }
        };
      }
      window.close = function () {
        ws.close();
      };

    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div className="body">
      <div className="header">聊天窗口</div>
      <div className="main">
        <div className="list" id="msg-list"></div>
      </div>
      <div className="footer">
        <textarea id="textarea" placeholder="请输入内容！"></textarea>
        <div className='button'>
          <button id="send">发送</button>
        </div>
      </div>
    </div>
  );
}
