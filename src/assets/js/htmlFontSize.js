// 定义最大的fontSize大小
const Max_FONT_SIZE = 42;

// 监听HTML文档被解析完成的事件
document.addEventListener("DOMContentLoaded", () => {
  // 获取html标签
  const html = document.getElementsByTagName("html")[0];
  // 获取根元素fontSize标准,屏幕宽度/10
  let fontSize = window.innerWidth / 10;
  //获取到的fontSize大小不许超过我们定义的最大值
  fontSize = fontSize > Max_FONT_SIZE ? Max_FONT_SIZE : fontSize;
  //定义根元素(html)fontSize大小(rem)
  html.style.fontSize = fontSize + "px";
});
