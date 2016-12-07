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
    var options = [
        { value: 1, text: '男' }, {value: 0, text: '女'}
    ]
    $("#ajt").searchForm({
        action: "/admin/admin-product",
        method: "post",
        inputGroup: [
            { label: '名字', name: 'name', type: 'text'},
            { label: '出生日期', name: 'born', type: 'time'},
            { label: '性别', name: 'card', type: 'select', options: options },
        ],
        success: function(data) {
            // 自己处理结果
            console.log(data);
        }
    });
```

#### 效果
