/**
 *   URL:
 *   说明:
 *   负责人: kelen
 *   日期:  8/3 0003.
 *
 *      <div id="searchForm"></div>
        <div class="pagination"></div>
        <table class="table table-bordered">
            <thead>
            <tr>
                <th width="20"><input type="radio" disabled="disabled"></th>
                <th width="200">微信昵称</th>
                <th width="100">手机</th>
                <th width="100">一级人脉</th>
                <th width="100">一级返利</th>
                <th width="100">二级人脉</th>
                <th width="100">二级返利</th>
                <th width="100">三级人脉</th>
                <th width="100">三级返利</th>
                <th width="100">剩余返利</th>
                <th width="100">已充值到会员卡的返利</th>
                <th width="100">已提取到现金的返利</th>
                <th width="100">注册时间</th>
            </tr>
        </thead>
        <tbody id="userConnectionList"></tbody>
        </table>
 *
 *      var options = [{ value: 1, text: '男' }, {value: 0, text: '女'}]
        $(".searchForm").searchForm({
           action: "/admin/admin-car-library",
           method: "post",
           inputGroup: [
               { label: '姓名', name: 'name', type: 'text'},
               { label: '年龄', name: 'age', type: 'text'},
               { label: '类型', name: 'type', type: 'select', options: options }
               { label: '预约开始时间', name: 'orderStartTime', type: 'time' },
           ],
           searchCar: true
        });
 *
 */
(function($) {
    $.fn.searchForm = function(options) {
        var defaultOptions = {
            action: "",             // 必选 提交URL
            searchCar: false,       // 默认不显示汽车查询
            method: 'get',          // 默认’get‘方法
            inputGroup: [],          // input组,
            defaultInputType: "text",
            data: {},
            success: $.noop,
            error: $.noop,
            complete: $.noop,
            paginationSelector: '',  //  显示分页的元素
            thTitle: [],
            tdKey: [],
            dataKey: {
                nowPage: "",
                totalPage: "",
                data: "",
            }
        };

        var opts = $.extend(defaultOptions, options);
        var instance = this;        // 实例对象

        instance.id = Math.random().toString().replace('.', '_');
        instance.tbodyId = instance.id + "tbody";

        var dataKey = opts.dataKey;

        var form = document.createElement("form");      // 表单
        form.id = "searchForm" + instance.id;
        // form.method = opts.method;
        // form.action = opts.action;
        form.className = "form-inline cio-search-form";
        form.onsubmit = function() {
            return false;
        }

        if (!opts.action) {
            throw new Error('表单action必须设置');
        }

        initForm();
        initTable();
        initEvent();

        function initForm() {
            instance.append(generateForm(opts.inputGroup));
            sendForm($("#searchForm" + instance.id).serializeArray());
        }

        // 初始化表格体
        function initTable() {
            var thTitles = opts.thTitle;
            if (thTitles.length) {
                var table = document.createElement("table");
                table.className = "table table-bordered";
                var thead = document.createElement("thead");
                var tr = document.createElement("tr");
                for (var i = 0; i < thTitles.length; i++) {
                    var th = document.createElement("th");
                    th.className = "text-center";
                    th.innerText = thTitles[i];
                    tr.appendChild(th);
                }
                thead.appendChild(tr);
                var tbody = document.createElement("tbody");
                tbody.id = instance.tbodyId;    // 唯一id
                table.appendChild(thead);
                table.appendChild(tbody);
                instance.append(table);
            }
        }

        function initEvent() {
            bindSubmitEvent();      // 绑定提交事件
            bindPaginationEvent();  // 绑定分页按钮点击事件
        }

        // 生成表单
        function generateForm(inputGroup) {
            // <div class="form-group">
            //     <label for="">标题</label>
            //     <input class="form-control" name="title" type="text" value="">
            // </div>
            if (inputGroup && inputGroup.length) {
                for (var i = 0; i < inputGroup.length; i++) {
                    var inputItem = inputGroup[i];
                    var div = document.createElement("div");
                    div.className = "form-group";
                    var label = document.createElement("label");
                    label.innerText = inputItem['label'];
                    div.appendChild(label);
                    div.appendChild(generateInput(inputItem));
                    form.appendChild(div);
                }
                // 生成搜索按钮
                var searchBtn = document.createElement("button");
                searchBtn.type = "button";
                searchBtn.id = "searchFormSubmitBtn" + instance.id
                searchBtn.innerText = "搜索";
                searchBtn.className = "btn btn-primary";
                form.appendChild(searchBtn);
            }
            return form;
        }

        // 注册提交事件
        function bindSubmitEvent() {
            if (document.getElementById("searchFormSubmitBtn" + instance.id)) {
                document.getElementById("searchFormSubmitBtn" + instance.id).onclick = function() {
                    sendForm($("#searchForm" + instance.id).serializeArray());
                }
            }
        }

        /**
         *  格式化数据
         * @param sendData
         * @returns {{}}
         */
        function formateData(sendData) {
            var formateData = {};
            if (sendData) {
                if (sendData.constructor == String) {
                    var dataArr = sendData.split('&');
                    for (var i = 0; i < dataArr.length; i++) {
                        var keyval = dataArr[i].split('=');
                        formateData[keyval[0]] = keyval[1];
                    }
                }
                if (sendData.constructor == Object) {
                    formateData = sendData;
                }
                if (sendData.constructor == Array) {
                    for (var i = 0, len = sendData.length; i < len; i++) {
                        formateData[sendData[i].name] = sendData[i].value;
                    }
                }
            }
            return formateData;
        }

        // 表单提交
        function sendForm(data) {
            data = $.extend({}, opts.data, formateData(data));
            $.ajax({
                url: opts.action,
                type: opts.method,
                data: data,
                processData: true,
                success: function (data) {
                    opts.success.call(instance, data);

                    dealData(data);

                    if (opts.paginationSelector) {
                        $(opts.paginationSelector).html(loadPageAjax(data[dataKey.nowPage], data[dataKey.totalPage]));  // 添加分页
                    }
                },
                error: function(data) {
                    opts.error.call(instance, data);
                },
                complete: function(data) {
                    opts.complete.call(instance, data);
                }
            })
        }

        // 处理返回的数据
        function dealData(data) {
            var list = data[dataKey.data];
            var tbody = document.getElementById(instance.tbodyId);
            tbody.innerHTML = ''
            if (tbody) {
                var docFrag = document.createDocumentFragment();
                var keys = opts.tdKey;  // 数据对应的键
                for (var i = 0; i < list.length; i++) {
                    var tr = document.createElement("tr");
                    for (var n = 0; n < keys.length; n++) {
                        // 遍历键赋值
                        var td = document.createElement("td");
                        var key = keys[n].key;
                        var type = keys[n].type;
                        switch (type) {
                            case "time":
                                td.innerText = instance.resolveTime(getDotVal(list[i], keys[n]['key']), "yyyy-MM-dd hh:mm:ss");
                                break;
                            case "html":
                                var tpl = keys[n]['template'];
                                td.innerHTML = replaceTpl(tpl, list[i]);
                                break;
                            case 'cond':
                                var cond = keys[n]['cond'];
                                console.log(getDotVal(list[i], key, 0));
                                td.innerText = cond[getDotVal(list[i], key, 0)];
                                break;
                            default:
                                td.innerText = instance.resolveString(getDotVal(list[i], key), '');

                        }
                        tr.appendChild(td)
                    }
                    docFrag.appendChild(tr);
                }
                tbody.appendChild(docFrag);
            }
        }

        /**
         *  var obj = { a: { b: 2} }
         *
         *  getSubVal(obj, "a");    // {b: 2}
         *  getSubVal(obj, "a.b");  //  2
         *
         * @param obj
         * @param key
         * @param def  默认返回值, 找不到
         * @returns {*}
         */
        function getDotVal(obj, key, def) {
            if (key) {
                var keys = key.split(".");    // 多少个小数点
                var len = 0;
                while (len < keys.length) {
                    if (!obj[keys[len]]) {
                        // undefine
                        return def;
                    }
                    obj = obj[keys[len]];
                    len ++;
                }
                return obj;
            } else
                return def;
        }

        /**
         *  模板数据匹配
         * @param tpl
         * @param data
         * @returns {*}
         */
        function replaceTpl(tpl, data) {
            var re = /\{\{(?:.|\n)+?}}/g;
            while (r =  re.exec(tpl)) {
                var matchStr = r[0];
                var key = matchStr.substring(2, matchStr.length - 2).trim();
                tpl = tpl.replace(matchStr, getDotVal(data, key));
            }
            return tpl;
        }

        // 加载ajax分页
        function loadPageAjax (nowPage,pageCount){
            var nowPage = parseInt(nowPage);
            var pageCount = parseInt(pageCount);
            var pageHtml = '';
            var start, end, pageOffset = 5;
            if (nowPage > 1) {
                pageHtml += '<li data-page="'+ 1 +'"><span aria-hidden="true">&laquo;&laquo;</span></li>';
                pageHtml += '<li data-page="'+ (nowPage - 1) +'"><span aria-hidden="true">&laquo;</span></li>';
            } else {
                pageHtml += '<li class="disabled"><span aria-hidden="true">&laquo;&laquo;</span></li>';
                pageHtml += '<li class="disabled"><span aria-hidden="true">&laquo;</span></li>';
            }
            if (pageCount <= pageOffset) {
                start = 1;
                end = pageCount;
            } else {
                if (nowPage < pageOffset) {
                    start = 1;
                    end = pageOffset;
                } else if (nowPage > pageCount - 2) {
                    start = pageCount - 4;
                    end = pageCount;
                } else {
                    start = nowPage - 2;
                    end = nowPage + 2;
                }
            }
            for (var i = start; i <= end; ++i) {
                pageHtml += '<li ' + (i == nowPage ? 'class="active"': "") + ' data-page="'+ i +'"><span aria-hidden="true">' + i + '</span></li>';
            }
            if (nowPage < pageCount) {
                pageHtml += '<li data-page="'+ (nowPage + 1) +'"><span aria-hidden="true">&raquo;</span></li>';
                pageHtml += '<li data-page="'+ pageCount +'"><span aria-hidden="true">&raquo;&raquo;</span></li>';
            } else {
                pageHtml += '<li class="disabled"><span aria-hidden="true">&raquo;</span></li>';
                pageHtml += '<li class="disabled"><span aria-hidden="true">&raquo;&raquo;</span></li>';
            }
            pageHtml += '<li><span>' + nowPage + '/' + pageCount + '</span></li>'
            return pageHtml;
        }

        // 分页按钮点击事件
        function bindPaginationEvent() {
            if (opts.paginationSelector) {
                $(opts.paginationSelector).on('click', 'li', function() {
                    // 分页按钮点击事件
                    var nowPage = $(this).attr('data-page');
                    if (nowPage) {
                        var params = $("#searchForm"  + instance.id).serializeArray();
                        params.push({
                            name: "nowPage",
                            value: nowPage
                        })
                        sendForm(params)
                    }
                })
            }
        }
        // 打印控制台
        function log(msg) {
            console.log(msg);
        }

        // 生成input
        function generateInput (inputItem) {
            var inputElem = null;
            switch (inputItem.type) {
                case 'select': {
                    inputElem = document.createElement("select");
                    inputElem.className = "form-control";
                    inputElem.name = inputItem['name'];
                    for (var i = 0; i < inputItem.options.length; i++) {
                        var option = document.createElement('option');
                        option.value = inputItem.options[i].value;
                        option.innerText = inputItem.options[i].text;
                        if (inputItem.options[i].value == inputItem['default'])
                            option.selected = true;
                        inputElem.appendChild(option);
                    }
                    break;
                }
                default: {
                    inputElem = document.createElement("input");
                    inputElem.className = "form-control";
                    inputElem.type = inputItem['type'] || opts.defaultInputType;
                    inputElem.name = inputItem['name'];
                    inputElem.value = inputItem['default'] || '';
                }
            }
            return inputElem;
        }

        this.refresh = function(sendData) {
            sendForm(sendData);
        }

        // 把字符串转为数字
        this.resolveInt = function (num) {
            return parseInt(num) ? parseInt(num): 0;
        }
        // 转为浮点
        this.resolveFloat = function (num) {
            return parseFloat(num) ? parseFloat(num).toFixed(2): 0.00;
        }
        this.resolveString = function (str, def) {
            return (typeof str == 'object' ? JSON.stringify(str) : str) || def;
        }
        this.resolveTime = function (timeStr, fmt) {
            var res = '';
            fmt = fmt || "yyyy-MM-dd hh:mm:ss";
            if (new Date(timeStr) != 'Invalid Date') {
                var time = new Date(timeStr);
                var o = {
                    "M+": time.getMonth() + 1, //月份
                    "d+": time.getDate(), //日
                    "h+": time.getHours(), //小时
                    "m+": time.getMinutes(), //分
                    "s+": time.getSeconds(), //resolveInt
                    "q+": Math.floor((time.getMonth() + 3) / 3), //季度
                    "S": time.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                res = fmt;
            }
            return res;
        }
        return this;
    }
})(jQuery)