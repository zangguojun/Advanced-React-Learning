## Vue和React的组件化更新的区别

### Vue

> 一个值更新了，会引起其他**关联的组件**更新，剩余的组件不受影响，**代价是需要监听**，优势是更新速度快



### React

> 全量比较，从根节点开始全量比较，该更新的更新，不该更新的不更新，所有组件都会涉及到，但是不需要`watcher`，因为如果页面的组件太多，一气呵成就显得不合时宜，所以需要引入fiber，把大的比较任务拆成许多小任务，可能暂停执行放在浏览器空闲的时候，见缝插针的执行，这样的话就不会阻塞优先级比较高的任务，比如渲染，响应用户操作等

