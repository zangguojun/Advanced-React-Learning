## Babel转义

一、将`<h1 class="title" style="color:red;">你好</h1>`转译成

```js
React.createElement(
  'h1',
  {
    className: 'title',
    style: { color: 'blue' }
  },
  '你好'
)
```

，即将JSX转译成ES5，不会执行代码



二、但是`createElement`函数将虚拟DOM转换成真实DOM是在浏览器中进行执行后的结果



