# auto-ajax-table
通过配置自动生成搜索表单和数据表格


### 表单配置

#### html

```html
    <link href="//cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.css" rel="stylesheet">
    <link rel="stylesheet" href="./auto_ajax_table.css" />
    <div id="ajt"></div>
    
    <!-- 依赖jquery -->
    <script src="./jquery.js"></script>
    <script src="./auto_ajax_table.js"></script>
```

#### javascript

```javascript
    $("#ajt").searchForm({
        action: "/admin/admin-product",
        method: "post",
        inputGroup: [
            { label: '名字', name: 'name', type: 'text'},
            { label: '出生日期', name: 'born', type: 'time'},
            { label: '性别', name: 'card', type: 'select', options: options },
        ],
        paginationSelector: '#pagination',  // 加载分页到当前元素
        thTitle: ["图片", "商品名", "条码", "型号", "规格", "销售价", "原价", "厂牌", "尾货", "热卖", "新品上市", "折扣"],
        tdKey: [
            { key: "image", type: 'html', template: '<img src="/upload/{{ image }}" width="50" height="50"/>' },
            { key: "name", type: "string" },
            { key: "card" },
            { key: "model" },
            { key: "spec" },
            { key: "price" },
            { key: "marketPrice"},
            { key: "factory" },
            { key: "hot", type: 'cond', cond: { 1: '开启', 0: '关闭' } },
            { key: "new" }, {key: "sale"}
        ],
        success: function(data) {
            // 自己处理结果
            console.log(data);
        },
        error: function (data) {
            console.log(data);
        }
    });
```

#### 说明

| 选项       | 类型           | 说明  |
| ------------- |:-------------:| -----:|
| action      | 字符串 | 调用的地址 |
| method      | 字符串      |   方法：post, get |
| inputGroup | 数组      | 对应的表单，例如 { label: "名字", type: "text" } ， 支持时间选择 ，select选项卡|
| paginationSelector | 字符串 | 显示分页元素 |
| thTitle | 数组 | 表格对应的标题 |
| tdKey | 对象数组 | 生成的数据对应的键 | 
| success | 函数 | 成功返回的数据 |
| error | 函数 | 失败返回的结果 |


#### 效果
