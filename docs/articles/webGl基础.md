<!--
 * @Autor: zt
 * @Description: 
 * @Date: 2022-10-01 12:29:16
-->
# 什么是WebGL
——WebGL（Web 图形库）是一个 JavaScript API，可在任何兼容的 Web 浏览器中渲染高性能的交互式 3D 和 2D 图形，而无需使用插件。WebGL 通过引入一个与 OpenGL ES 2.0 非常一致的 API 来做到这一点，该 API 可以在 HTML5 &#60;canvas&#62;元素中使用 

—这种一致性使 API 可以利用用户设备提供的硬件图形加速。WebGL使得网页在支持 HTML &#60;canvas&#62; 标签的浏览器中，不需要使用任何插件，便可以使用基于 OpenGL ES 2.0 的 API 在 canvas 中进行 3D 渲染. WebGL 程序由 javascript 的控制代码，和在计算机的图形处理单元（GPU, Graphics Processing Unit）中执行的特效代码 (shader code，渲染代码) 组成. WebGL 元素可以和其他 HTML 元素混合，并且会和页面的其他部分或页面背景相合成。
#准备3D渲染
首先需要一个 canvas 元素,下面的 HTML 片段用来建立一个 canvas 元素并设置一个 onload 事件处理程序来初始化我们的 WebGL 上下文 。
````
<body onload="main()">
  <canvas id="glcanvas" width="640" height="480">
    你的浏览器似乎不支持或者禁用了 HTML5 <code>&lt;canvas&gt;</code> 元素。
  </canvas>
</body>
````
其次准备webGL上下文
我们的 JavaScript 代码中的 main() 函数将会在文档加载完成之后被调用。它的任务是设置 WebGL 上下文并开始渲染内容。
````
// 从这里开始
function main() {
    //获取canvas元素
  const canvas = document.querySelector("#glcanvas");
  // 初始化 WebGL 上下文 意思就是获取3D画布
  const gl = canvas.getContext("webgl");

  // 确认 WebGL 支持性
  if (!gl) {
    alert("无法初始化 WebGL，你的浏览器、操作系统或硬件等可能不支持 WebGL。");
    return;
  }

  // 使用完全不透明的黑色清除所有图像  RGBA
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // 用上面指定的颜色清除缓冲区
  gl.clear(gl.COLOR_BUFFER_BIT);
}
````
名词解释
[getContext](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/getContext)
[WebGLRenderingContext](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext)
# 使用 WebGL 创建 2D 内容
