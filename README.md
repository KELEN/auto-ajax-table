# auto-ajax-table
通过配置自动生成搜索表单和数据表格

使用范围: 报表类数据表格生成

例如返回的数据类型是这样:

``` javascript
var data = {
    items: [
        { label: '标签1', name: 'name1', time: new Date() },
        { label: '标签2', name: 'name2', time: new Date() },
        { label: '标签3', name: 'name3', time: new Date() }
    ],
    nowPage: 1,
    totalPage: 20
}
```

效果是这样的:
![alt 效果](https://raw.githubusercontent.com/KELEN/auto-ajax-table/master/img/effect.jpg)

### 表单配置

#### html

```css
<link href="//cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.css" rel="stylesheet">
<link rel="stylesheet" href="./searchForm.css" />
```

``` js
<!-- 依赖jquery -->
<script src="./jquery.js"></script>
<script src="./searchForm.js"></script>
```

``` html
<div class="container">
    <div id="searchForm"></div>
    <div class="pagination"></div>
</div>
```

#### javascript

```javascript
var options = [
    { value: 1, text: '男' }, {value: 0, text: '女'}
]
$("#searchForm").searchForm({
    action: "http://localhost/admin/admin-test",
    method: "post",
    inputGroup: [
        { label: '标签', name: 'label', type: 'text'},
        { label: '姓名', name: 'name', type: 'text'},
        { label: '日期', name: 'time', type: 'date' },
        { label: '条码', name: 'card', type: 'select', options: options },
    ],
    paginationSelector: '.pagination',  // 加载分页到当前元素
    // 对应的数据键
    dataKey: {
        nowPage: "nowPage",
        totalPage: "totalPage",
        data: "items"
    },
    thTitle: ["图片", "商品名", "日期"],
    tdKey: [
        { type: 'html', template: '<h3>{{ label }}</h3>' },
        { key: "name", type: "string" },
        { key: 'time', type: "time" }
    ],
    success: function(data) {
        // 自己处理结果
        console.log(JSON.stringify(data));
    }
});
```

#### 效果
![alt 效果](https://raw.githubusercontent.com/KELEN/auto-ajax-table/master/img/effect.jpg)

#### 说明

| 选项       | 类型           | 说明  |
| ------------- |:-------------:| -----:|
| action      | 字符串 | 调用的地址 |
| method      | 字符串      |   方法：post, get |
| inputGroup | 数组      | 对应的表单，例如 { label: "名字", type: "text" } ， 支持时间选择 ，select选项卡|
| paginationSelector | 字符串 | 显示分页元素 |
| thTitle | 数组 | 表格对应的标题 |
| tdKey | 对象数组 | 生成的数据对应的键 |
| dataKey | 对象 | 返回的数据获取分页，总页码，分页数据对应的json键 |
| success | 函数 | 成功返回的数据 |
| error | 函数 | 失败返回的结果 |


##### inputGroup：input表单
支持的类型：
* email
* url
* number
* range
* Date pickers (date, month, week, time, datetime, datetime-local)
* search
* color

select选择器：
```
var options = [
    { value: 1, text: '男' }, {value: 0, text: '女'}
]
inputGroup: [{ label: '性别', name: 'sex', type: 'select', options: options }]
```

##### paginationSelector：string 分页显示元素选择器 '#pageEle'
##### thTitle: array 单头
##### tdKey：array 数据生成配置
* 可以生成html
* 格式化时间
* 条件选择生成对应值
```
tdKey: [
    { key: "image", type: 'html', template: '<img src="/upload/{{ image }}" width="50" height="50"/>' },
    { key: "name", type: "string" },
    { key: "hot", type: 'cond', cond: { 1: '开启', 0: '关闭' } },
    { key: "time", type: 'timie' }
]
```
##### dataKey: 匹配数据键
nowPage:  string 当前页
totalPage:  string 总页
data: string 列表数据
##### success: function 成功回调函数
##### error: function 成功回调函数


