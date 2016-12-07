(function($){var lang={en:{days:["Su","Mo","Tu","We","Th","Fr","Sa"],months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],sep:"-",format:"YYYY-MM-DD hh:mm",prevMonth:"Previous month",nextMonth:"Next month",today:"Today"},ro:{days:["Dum","Lun","Mar","Mie","Joi","Vin","Sâm"],months:["Ian","Feb","Mar","Apr","Mai","Iun","Iul","Aug","Sep","Oct","Nov","Dec"],sep:".",format:"DD.MM.YYYY hh:mm",prevMonth:"Luna precedentă",nextMonth:"Luna următoare",today:"Azi"},ja:{days:["日","月","火","水","木","金","土"],months:["01","02","03","04","05","06","07","08","09","10","11","12"],sep:"/",format:"YYYY/MM/DD hh:mm"},ru:{days:["Вс","Пн","Вт","Ср","Чт","Пт","Сб"],months:["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"],format:"DD.MM.YYYY hh:mm"},br:{days:["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],months:["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],format:"DD/MM/YYYY hh:mm"},pt:{days:["dom","seg","ter","qua","qui","sex","sáb"],months:["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"]},cn:{days:["日","一","二","三","四","五","六"],months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]},de:{days:["So","Mo","Di","Mi","Do","Fr","Sa"],months:["Jan","Feb","März","Apr","Mai","Juni","Juli","Aug","Sept","Okt","Nov","Dez"],format:"DD.MM.YYYY hh:mm"},sv:{days:["Sö","Må","Ti","On","To","Fr","Lö"],months:["Jan","Feb","Mar","Apr","Maj","Juni","Juli","Aug","Sept","Okt","Nov","Dec"]},id:{days:["Min","Sen","Sel","Rab","Kam","Jum","Sab"],months:["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"]},it:{days:["Dom","Lun","Mar","Mer","Gio","Ven","Sab"],months:["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"],format:"DD/MM/YYYY hh:mm"},tr:{days:["Pz","Pzt","Sal","Çar","Per","Cu","Cts"],months:["Ock","Şub","Mar","Nis","May","Haz","Tem","Agu","Eyl","Ekm","Kas","Arlk"]},es:{days:["dom","lun","mar","miér","jue","vié","sáb"],months:["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"],format:"DD/MM/YYYY hh:mm"},ko:{days:["일","월","화","수","목","금","토"],months:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"]},nl:{days:["zo","ma","di","wo","do","vr","za"],months:["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"],format:"DD-MM-YYYY hh:mm"},cz:{days:["Ne","Po","Út","St","Čt","Pá","So"],months:["Led","Úno","Bře","Dub","Kvě","Čer","Čvc","Srp","Zář","Říj","Lis","Pro"],format:"DD.MM.YYYY hh:mm"},fr:{days:["Dim","Lun","Mar","Mer","Jeu","Ven","Sam"],months:["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],format:"DD-MM-YYYY hh:mm"},pl:{days:["N","Pn","Wt","Śr","Cz","Pt","So"],months:["Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"],sep:"-",format:"YYYY-MM-DD hh:mm",prevMonth:"Poprzedni miesiąc",nextMonth:"Następny miesiąc",today:"Dzisiaj"},gr:{days:["Κυ","Δε","Τρ","Τε","Πε","Πα","Σα"],months:["Ιαν","Φεβ","Μαρ","Απρ","Μαϊ","Ιουν","Ιουλ","Αυγ","Σεπ","Οκτ","Νοε","Δεκ"],sep:"-",format:"DD-MM-YYYY hh:mm",prevMonth:"Προηγ. μήνας",nextMonth:"Επόμ. μήνας",today:"Σήμερα"}};var PickerHandler=function($picker,$input){this.$pickerObject=$picker;this.$inputObject=$input};PickerHandler.prototype.getPicker=function(){return this.$pickerObject};PickerHandler.prototype.getInput=function(){return this.$inputObject};PickerHandler.prototype.isShow=function(){var is_show=true;if(this.$pickerObject.css("display")=="none"){is_show=false}return is_show};PickerHandler.prototype.show=function(){var $picker=this.$pickerObject;var $input=this.$inputObject;$picker.show();ActivePickerId=$input.data("pickerId");if($input!=null&&$picker.data("isInline")===false){this._relocate()}};PickerHandler.prototype.hide=function(){var $picker=this.$pickerObject;var $input=this.$inputObject;$picker.hide()};PickerHandler.prototype.getDate=function(){var $picker=this.$pickerObject;var $input=this.$inputObject;return getPickedDate($picker)};PickerHandler.prototype.setDate=function(date){var $picker=this.$pickerObject;var $input=this.$inputObject;if(!isObj("Date",date)){date=new Date(date)}draw_date($picker,{"isAnim":true,"isOutputToInputObject":true},date)};PickerHandler.prototype.destroy=function(){var $picker=this.$pickerObject;var picker_id=$picker.data("pickerId");PickerObjects[picker_id]=null;$picker.remove()};PickerHandler.prototype._relocate=function(){var $picker=this.$pickerObject;var $input=this.$inputObject;if($input!=null&&$picker.data("isInline")===false){var input_outer_height=$input.outerHeight({"margin":true});if(!isObj("Number",input_outer_height)){input_outer_height=$input.outerHeight()}var picker_outer_height=$picker.outerHeight({"margin":true});if(!isObj("Number",picker_outer_height)){picker_outer_height=$picker.outerHeight()}if(parseInt($(window).height())<=($input.offset().top-$(document).scrollTop()+input_outer_height+picker_outer_height)){$picker.parent().css("top",($input.offset().top-(input_outer_height/2)-picker_outer_height)+"px")
}else{$picker.parent().css("top",($input.offset().top+input_outer_height)+"px")}$picker.parent().css("left",$input.offset().left+"px");$picker.parent().css("z-index",100000)}};var PickerObjects=[];var InputObjects=[];var ActivePickerId=-1;var getParentPickerObject=function(obj){return $(obj).closest(".datepicker")};var getPickersInputObject=function($obj){var $picker=getParentPickerObject($obj);if($picker.data("inputObjectId")!=null){return $(InputObjects[$picker.data("inputObjectId")])}return null};var setToNow=function($obj){var $picker=getParentPickerObject($obj);var date=new Date();draw($picker,{"isAnim":true,"isOutputToInputObject":true},date.getFullYear(),date.getMonth(),date.getDate(),date.getHours(),date.getMinutes())};var beforeMonth=function($obj){var $picker=getParentPickerObject($obj);if($picker.data("stateAllowBeforeMonth")===false){return}var date=getPickedDate($picker);var targetMonth_lastDay=new Date(date.getFullYear(),date.getMonth(),0).getDate();if(targetMonth_lastDay<date.getDate()){date.setDate(targetMonth_lastDay)}draw($picker,{"isAnim":true,"isOutputToInputObject":true},date.getFullYear(),date.getMonth()-1,date.getDate(),date.getHours(),date.getMinutes());var todayDate=new Date();var isCurrentYear=todayDate.getFullYear()==date.getFullYear();var isCurrentMonth=isCurrentYear&&todayDate.getMonth()==date.getMonth();if(!isCurrentMonth||!$picker.data("futureOnly")){if(targetMonth_lastDay<date.getDate()){date.setDate(targetMonth_lastDay)}draw($picker,{"isAnim":true,"isOutputToInputObject":true},date.getFullYear(),date.getMonth()-1,date.getDate(),date.getHours(),date.getMinutes())}};var nextMonth=function($obj){var $picker=getParentPickerObject($obj);var date=getPickedDate($picker);var targetMonth_lastDay=new Date(date.getFullYear(),date.getMonth()+1,0).getDate();if(targetMonth_lastDay<date.getDate()){date.setDate(targetMonth_lastDay)}if(getLastDate(date.getFullYear(),date.getMonth()+1)<date.getDate()){date.setDate(getLastDate(date.getFullYear(),date.getMonth()+1))}draw($picker,{"isAnim":true,"isOutputToInputObject":true},date.getFullYear(),date.getMonth()+1,date.getDate(),date.getHours(),date.getMinutes())};var getLastDate=function(year,month){var date=new Date(year,month+1,0);return date.getDate()};var getDateFormat=function(format,locale,is_date_only){if(format=="default"){format=translate(locale,"format");if(is_date_only){format=format.substring(0,format.search(" "))}}return format};var normalizeYear=function(year){if(year<99){var date=new Date();return parseInt(year)+parseInt(date.getFullYear().toString().substr(0,2)+"00")}return year};var parseDate=function(str,opt_date_format){var re,m,date;if(opt_date_format!=null){var df=opt_date_format.replace(/(-|\/)/g,"[-/]").replace(/YYYY/gi,"(\\d{2,4})").replace(/(YY|MM|DD|hh|mm)/g,"(\\d{1,2})").replace(/(M|D|h|m)/g,"(\\d{1,2})");re=new RegExp(df);m=re.exec(str);if(m!=null){var formats=[];var format_buf="";var format_before_c="";var df_=opt_date_format;while(df_!=null&&0<df_.length){var format_c=df_.substring(0,1);df_=df_.substring(1,df_.length);if(format_before_c!=format_c){if(/(YYYY|YY|MM|DD|mm|dd|M|D|h|m)/.test(format_buf)){formats.push(format_buf);format_buf=""}else{format_buf=""}}format_buf+=format_c;format_before_c=format_c}if(format_buf!==""&&/(YYYY|YY|MM|DD|mm|dd|M|D|h|m)/.test(format_buf)){formats.push(format_buf)}var year,month,day,hour,min;var is_successful=false;for(var i=0;i<formats.length;i++){if(m.length<i){break}var f=formats[i];var d=m[i+1];if(f=="YYYY"){year=normalizeYear(d);is_successful=true}else{if(f=="YY"){year=parseInt(d)+2000;is_successful=true}else{if(f=="MM"||f=="M"){month=parseInt(d)-1;is_successful=true}else{if(f=="DD"||f=="D"){day=d;is_successful=true}else{if(f=="hh"||f=="h"){hour=d;is_successful=true}else{if(f=="mm"||f=="m"){min=d;is_successful=true}}}}}}}date=new Date(year,month,day,hour,min);if(is_successful===true&&isNaN(date)===false&&isNaN(date.getDate())===false){return date}}}re=/^(\d{2,4})[-\/](\d{1,2})[-\/](\d{1,2}) (\d{1,2}):(\d{1,2})$/;m=re.exec(str);if(m!==null){m[1]=normalizeYear(m[1]);date=new Date(m[1],m[2]-1,m[3],m[4],m[5])}else{re=/^(\d{2,4})[-\/](\d{1,2})[-\/](\d{1,2})$/;m=re.exec(str);if(m!==null){m[1]=normalizeYear(m[1]);date=new Date(m[1],m[2]-1,m[3])}}if(isNaN(date)===false&&isNaN(date.getDate())===false){return date}return false};var getFormattedDate=function(date,date_format){if(date==null){date=new Date()}var y=date.getFullYear();var m=date.getMonth()+1;var d=date.getDate();var hou=date.getHours();var min=date.getMinutes();date_format=date_format.replace(/YYYY/gi,y).replace(/YY/g,y-2000).replace(/MM/g,zpadding(m)).replace(/M/g,m).replace(/DD/g,zpadding(d)).replace(/D/g,d).replace(/hh/g,zpadding(hou)).replace(/h/g,hou).replace(/mm/g,zpadding(min)).replace(/m/g,min);return date_format};var outputToInputObject=function($picker){var $inp=getPickersInputObject($picker);if($inp==null){return}var date=getPickedDate($picker);var locale=$picker.data("locale");var format=getDateFormat($picker.data("dateFormat"),locale,$picker.data("dateOnly"));
    var old=$inp.val();$inp.val(getFormattedDate(date,format));if(old!=$inp.val()){$inp.trigger("change")}};var getPickedDate=function($obj){var $picker=getParentPickerObject($obj);return $picker.data("pickedDate")};var zpadding=function(num){num=("0"+num).slice(-2);return num};var draw_date=function($picker,option,date){draw($picker,option,date.getFullYear(),date.getMonth(),date.getDate(),date.getHours(),date.getMinutes())};var translate=function(locale,s){if(typeof lang[locale][s]!=="undefined"){return lang[locale][s]}return lang.en[s]};var draw=function($picker,option,year,month,day,hour,min){var date=new Date();if(hour!=null){date=new Date(year,month,day,hour,min,0)}else{if(year!=null){date=new Date(year,month,day)}else{date=new Date()}}var isTodayButton=$picker.data("todayButton");var isScroll=option.isAnim;if($picker.data("timelistScroll")===false){isScroll=false}var isAnim=option.isAnim;if($picker.data("animation")===false){isAnim=false}var isFutureOnly=$picker.data("futureOnly");var minDate=$picker.data("minDate");var maxDate=$picker.data("maxDate");var isOutputToInputObject=option.isOutputToInputObject;var minuteInterval=$picker.data("minuteInterval");var firstDayOfWeek=$picker.data("firstDayOfWeek");var allowWdays=$picker.data("allowWdays");if(allowWdays==null||isObj("Array",allowWdays)===false||allowWdays.length<=0){allowWdays=null}var minTime=$picker.data("minTime");var maxTime=$picker.data("maxTime");var todayDate=new Date();if(isFutureOnly){if(date.getTime()<todayDate.getTime()){date.setTime(todayDate.getTime())}}if(allowWdays!=null&&allowWdays.length<=6){while(true){if($.inArray(date.getDay(),allowWdays)==-1){date.setDate(date.getDate()+1)}else{break}}}var locale=$picker.data("locale");if(!lang.hasOwnProperty(locale)){locale="en"}var firstWday=new Date(date.getFullYear(),date.getMonth(),1).getDay()-firstDayOfWeek;var lastDay=new Date(date.getFullYear(),date.getMonth()+1,0).getDate();var beforeMonthLastDay=new Date(date.getFullYear(),date.getMonth(),0).getDate();var dateBeforeMonth=new Date(date.getFullYear(),date.getMonth(),0);var dateNextMonth=new Date(date.getFullYear(),date.getMonth()+2,0);var isCurrentYear=todayDate.getFullYear()==date.getFullYear();var isCurrentMonth=isCurrentYear&&todayDate.getMonth()==date.getMonth();var isCurrentDay=isCurrentMonth&&todayDate.getDate()==date.getDate();var isPastMonth=false;if(date.getFullYear()<todayDate.getFullYear()||(isCurrentYear&&date.getMonth()<todayDate.getMonth())){isPastMonth=true}var $header=$picker.children(".datepicker_header");var $inner=$picker.children(".datepicker_inner_container");var $calendar=$picker.children(".datepicker_inner_container").children(".datepicker_calendar");var $table=$calendar.children(".datepicker_table");var $timelist=$picker.children(".datepicker_inner_container").children(".datepicker_timelist");var changePoint="";var oldDate=getPickedDate($picker);if(oldDate!=null){if(oldDate.getMonth()!=date.getMonth()||oldDate.getDate()!=date.getDate()){changePoint="calendar"}else{if(oldDate.getHours()!=date.getHours()||oldDate.getMinutes()!=date.getMinutes()){if(date.getMinutes()===0||date.getMinutes()%minuteInterval===0){changePoint="timelist"}}}}$($picker).data("pickedDate",date);if(isAnim===true){if(changePoint=="calendar"){$calendar.stop().queue([]);$calendar.fadeTo("fast",0.8)}else{if(changePoint=="timelist"){$timelist.stop().queue([]);$timelist.fadeTo("fast",0.8)}}}var drawBefore_timeList_scrollTop=$timelist.scrollTop();var timelist_activeTimeCell_offsetTop=-1;$header.children().remove();var cDate=new Date(date.getTime());cDate.setMinutes(59);cDate.setHours(23);cDate.setSeconds(59);cDate.setDate(0);var $link_before_month=null;if((!isFutureOnly||!isCurrentMonth)&&((minDate==null)||(minDate<cDate.getTime()))){$link_before_month=$("<a>");$link_before_month.text("<");$link_before_month.prop("alt",translate(locale,"prevMonth"));$link_before_month.prop("title",translate(locale,"prevMonth"));$link_before_month.click(function(){beforeMonth($picker)});$picker.data("stateAllowBeforeMonth",true)}else{$picker.data("stateAllowBeforeMonth",false)}cDate.setMinutes(0);cDate.setHours(0);cDate.setSeconds(0);cDate.setDate(1);cDate.setMonth(date.getMonth()+1);var $now_month=$("<span>");$now_month.text(date.getFullYear()+" "+translate(locale,"sep")+" "+translate(locale,"months")[date.getMonth()]);var $link_next_month=null;if((maxDate==null)||(maxDate>cDate.getTime())){$link_next_month=$("<a>");$link_next_month.text(">");$link_next_month.prop("alt",translate(locale,"nextMonth"));$link_next_month.prop("title",translate(locale,"nextMonth"));$link_next_month.click(function(){nextMonth($picker)})}if(isTodayButton){var $link_today=$("<a/>");$link_today.html(decodeURIComponent("%3c%3fxml%20version%3d%221%2e0%22%20encoding%3d%22UTF%2d8%22%20standalone%3d%22no%22%3f%3e%3csvg%20%20xmlns%3adc%3d%22http%3a%2f%2fpurl%2eorg%2fdc%2felements%2f1%2e1%2f%22%20%20xmlns%3acc%3d%22http%3a%2f%2fcreativecommons%2eorg%2fns%23%22%20xmlns%3ardf%3d%22http%3a%2f%2fwww%2ew3%2eorg%2f1999%2f02%2f22%2drdf%2dsyntax%2dns%23%22%20%20xmlns%3asvg%3d%22http%3a%2f%2fwww%2ew3%2eorg%2f2000%2fsvg%22%20xmlns%3d%22http%3a%2f%2fwww%2ew3%2eorg%2f2000%2fsvg%22%20%20version%3d%221%2e1%22%20%20width%3d%22100%25%22%20%20height%3d%22100%25%22%20viewBox%3d%220%200%2010%2010%22%3e%3cg%20transform%3d%22translate%28%2d5%2e5772299%2c%2d26%2e54581%29%22%3e%3cpath%20d%3d%22m%2014%2e149807%2c31%2e130932%20c%200%2c%2d0%2e01241%200%2c%2d0%2e02481%20%2d0%2e0062%2c%2d0%2e03721%20L%2010%2e57723%2c28%2e153784%207%2e0108528%2c31%2e093719%20c%200%2c0%2e01241%20%2d0%2e0062%2c0%2e02481%20%2d0%2e0062%2c0%2e03721%20l%200%2c2%2e97715%20c%200%2c0%2e217084%200%2e1798696%2c0%2e396953%200%2e3969534%2c0%2e396953%20l%202%2e3817196%2c0%200%2c%2d2%2e38172%201%2e5878132%2c0%200%2c2%2e38172%202%2e381719%2c0%20c%200%2e217084%2c0%200%2e396953%2c%2d0%2e179869%200%2e396953%2c%2d0%2e396953%20l%200%2c%2d2%2e97715%20m%201%2e383134%2c%2d0%2e427964%20c%200%2e06823%2c%2d0%2e08063%200%2e05582%2c%2d0%2e210882%20%2d0%2e02481%2c%2d0%2e279108%20l%20%2d1%2e358324%2c%2d1%2e128837%200%2c%2d2%2e530576%20c%200%2c%2d0%2e111643%20%2d0%2e08683%2c%2d0%2e198477%20%2d0%2e198477%2c%2d0%2e198477%20l%20%2d1%2e190859%2c0%20c%20%2d0%2e111643%2c0%20%2d0%2e198477%2c0%2e08683%20%2d0%2e198477%2c0%2e198477%20l%200%2c1%2e209467%20%2d1%2e513384%2c%2d1%2e265289%20c%20%2d0%2e2605%2c%2d0%2e217083%20%2d0%2e682264%2c%2d0%2e217083%20%2d0%2e942764%2c0%20L%205%2e6463253%2c30%2e42386%20c%20%2d0%2e080631%2c0%2e06823%20%2d0%2e093036%2c0%2e198476%20%2d0%2e024809%2c0%2e279108%20l%200%2e3845485%2c0%2e458976%20c%200%2e031012%2c0%2e03721%200%2e080631%2c0%2e06203%200%2e1302503%2c0%2e06823%200%2e055821%2c0%2e0062%200%2e1054407%2c%2d0%2e01241%200%2e1488574%2c%2d0%2e04342%20l%204%2e2920565%2c%2d3%2e578782%204%2e292058%2c3%2e578782%20c%200%2e03721%2c0%2e03101%200%2e08063%2c0%2e04342%200%2e13025%2c0%2e04342%200%2e0062%2c0%200%2e01241%2c0%200%2e01861%2c0%200%2e04962%2c%2d0%2e0062%200%2e09924%2c%2d0%2e03101%200%2e130251%2c%2d0%2e06823%20l%200%2e384549%2c%2d0%2e458976%22%20%2f%3e%3c%2fg%3e%3c%2fsvg%3e"));
    $link_today.addClass("icon-home");$link_today.prop("alt",translate(locale,"today"));$link_today.prop("title",translate(locale,"today"));$link_today.click(function(){setToNow($picker)});$header.append($link_today)}if($link_before_month!=null){$header.append($link_before_month)}$header.append($now_month);if($link_next_month!=null){$header.append($link_next_month)}$table.children().remove();var $tr=$("<tr>");$table.append($tr);var firstDayDiff=7+firstDayOfWeek;var daysOfWeek=translate(locale,"days");var $td;for(var i=0;i<7;i++){$td=$("<th>");$td.text(daysOfWeek[((i+firstDayDiff)%7)]);$tr.append($td)}var cellNum=Math.ceil((firstWday+lastDay)/7)*7;i=0;if(firstWday<0){i=-7}var realDayObj=new Date(date.getTime());realDayObj.setHours(0);realDayObj.setMinutes(0);realDayObj.setSeconds(0);for(var zz=0;i<cellNum;i++){var realDay=i+1-firstWday;var isPast=isPastMonth||(isCurrentMonth&&realDay<todayDate.getDate());if(i%7===0){$tr=$("<tr>");$table.append($tr)}$td=$("<td>");$td.data("day",realDay);$tr.append($td);if(firstWday>i){$td.text(beforeMonthLastDay+realDay);$td.addClass("day_another_month");$td.data("dateStr",dateBeforeMonth.getFullYear()+"/"+(dateBeforeMonth.getMonth()+1)+"/"+(beforeMonthLastDay+realDay));realDayObj.setDate(beforeMonthLastDay+realDay);realDayObj.setMonth(dateBeforeMonth.getMonth());realDayObj.setYear(dateBeforeMonth.getFullYear())}else{if(i<firstWday+lastDay){$td.text(realDay);$td.data("dateStr",(date.getFullYear())+"/"+(date.getMonth()+1)+"/"+realDay);realDayObj.setDate(realDay);realDayObj.setMonth(date.getMonth());realDayObj.setYear(date.getFullYear())}else{$td.text(realDay-lastDay);$td.addClass("day_another_month");$td.data("dateStr",dateNextMonth.getFullYear()+"/"+(dateNextMonth.getMonth()+1)+"/"+(realDay-lastDay));realDayObj.setDate(realDay-lastDay);realDayObj.setMonth(dateNextMonth.getMonth());realDayObj.setYear(dateNextMonth.getFullYear())}}var wday=((i+firstDayDiff)%7);if(allowWdays!=null){if($.inArray(wday,allowWdays)==-1){$td.addClass("day_in_unallowed");continue}}else{if(wday===0){$td.addClass("wday_sun")}else{if(wday==6){$td.addClass("wday_sat")}}}if(realDay==date.getDate()){$td.addClass("active")}if(isCurrentMonth&&realDay==todayDate.getDate()){$td.addClass("today")}var realDayObjMN=new Date(realDayObj.getTime());realDayObjMN.setHours(23);realDayObjMN.setMinutes(59);realDayObjMN.setSeconds(59);if(((minDate!=null)&&(minDate>realDayObjMN.getTime()))||((maxDate!=null)&&(maxDate<realDayObj.getTime()))){$td.addClass("out_of_range")}else{if(isFutureOnly&&isPast){$td.addClass("day_in_past")}else{$td.click(function(){if($(this).hasClass("hover")){$(this).removeClass("hover")}$(this).addClass("active");var $picker=getParentPickerObject($(this));var targetDate=new Date($(this).data("dateStr"));var selectedDate=getPickedDate($picker);draw($picker,{"isAnim":false,"isOutputToInputObject":true},targetDate.getFullYear(),targetDate.getMonth(),targetDate.getDate(),selectedDate.getHours(),selectedDate.getMinutes());if($picker.data("dateOnly")===true&&$picker.data("isInline")===false&&$picker.data("closeOnSelected")){ActivePickerId=-1;$picker.hide()}});$td.hover(function(){if(!$(this).hasClass("active")){$(this).addClass("hover")}},function(){if($(this).hasClass("hover")){$(this).removeClass("hover")}})}}}if($picker.data("dateOnly")===true){$timelist.css("display","none")}else{$timelist.children().remove();if($calendar.innerHeight()>0){$timelist.css("height",$calendar.innerHeight()-10+"px")}realDayObj=new Date(date.getTime());$timelist.css("height",$calendar.innerHeight()-10+"px");var hour_=minTime[0];var min_=minTime[1];while(hour_*100+min_<maxTime[0]*100+maxTime[1]){var $o=$("<div>");var is_past_time=hour_<todayDate.getHours()||(hour_==todayDate.getHours()&&min_<todayDate.getMinutes());var is_past=isCurrentDay&&is_past_time;$o.addClass("timelist_item");$o.text(zpadding(hour_)+":"+zpadding(min_));$o.data("hour",hour_);$o.data("min",min_);$timelist.append($o);realDayObj.setHours(hour_);realDayObj.setMinutes(min_);if(((minDate!=null)&&(minDate>realDayObj.getTime()))||((maxDate!=null)&&(maxDate<realDayObj.getTime()))){$o.addClass("out_of_range")}else{if(isFutureOnly&&is_past){$o.addClass("time_in_past")}else{$o.click(function(){if($(this).hasClass("hover")){$(this).removeClass("hover")}$(this).addClass("active");var $picker=getParentPickerObject($(this));var date=getPickedDate($picker);var hour=$(this).data("hour");var min=$(this).data("min");draw($picker,{"isAnim":false,"isOutputToInputObject":true},date.getFullYear(),date.getMonth(),date.getDate(),hour,min);if($picker.data("isInline")===false&&$picker.data("closeOnSelected")){ActivePickerId=-1;$picker.hide()}});$o.hover(function(){if(!$(this).hasClass("active")){$(this).addClass("hover")}},function(){if($(this).hasClass("hover")){$(this).removeClass("hover")}})}}if(hour_==date.getHours()&&min_==date.getMinutes()){$o.addClass("active");timelist_activeTimeCell_offsetTop=$o.offset().top}min_+=minuteInterval;if(min_>=60){min_=min_-60;hour_++}}if(isScroll===true){$timelist.scrollTop(timelist_activeTimeCell_offsetTop-$timelist.offset().top)
}else{$timelist.scrollTop(drawBefore_timeList_scrollTop)}}if(isAnim===true){if(changePoint=="calendar"){$calendar.fadeTo("fast",1)}else{if(changePoint=="timelist"){$timelist.fadeTo("fast",1)}}}if(isOutputToInputObject===true){outputToInputObject($picker)}};var isObj=function(type,obj){var clas=Object.prototype.toString.call(obj).slice(8,-1);return obj!==undefined&&obj!==null&&clas===type};var init=function($obj,opt){var $picker=$("<div>");$picker.destroy=function(){window.alert("destroy!")};$picker.addClass("datepicker");$obj.append($picker);if(!opt.current){opt.current=new Date()}else{var format=getDateFormat(opt.dateFormat,opt.locale,opt.dateOnly);var date=parseDate(opt.current,format);if(date){opt.current=date}else{opt.current=new Date()}}if(opt.inputObjectId!=null){$picker.data("inputObjectId",opt.inputObjectId)}$picker.data("dateOnly",opt.dateOnly);$picker.data("pickerId",PickerObjects.length);$picker.data("dateFormat",opt.dateFormat);$picker.data("locale",opt.locale);$picker.data("firstDayOfWeek",opt.firstDayOfWeek);$picker.data("animation",opt.animation);$picker.data("closeOnSelected",opt.closeOnSelected);$picker.data("timelistScroll",opt.timelistScroll);$picker.data("calendarMouseScroll",opt.calendarMouseScroll);$picker.data("todayButton",opt.todayButton);$picker.data("futureOnly",opt.futureOnly);$picker.data("onShow",opt.onShow);$picker.data("onHide",opt.onHide);$picker.data("onInit",opt.onInit);$picker.data("allowWdays",opt.allowWdays);var minDate=Date.parse(opt.minDate);if(isNaN(minDate)){$picker.data("minDate",null)}else{$picker.data("minDate",minDate)}var maxDate=Date.parse(opt.maxDate);if(isNaN(maxDate)){$picker.data("maxDate",null)}else{$picker.data("maxDate",maxDate)}$picker.data("state",0);if(5<=opt.minuteInterval&&opt.minuteInterval<=30){$picker.data("minuteInterval",opt.minuteInterval)}else{$picker.data("minuteInterval",30)}opt.minTime=opt.minTime.split(":");opt.maxTime=opt.maxTime.split(":");if(!((opt.minTime[0]>=0)&&(opt.minTime[0]<24))){opt.minTime[0]="00"}if(!((opt.maxTime[0]>=0)&&(opt.maxTime[0]<24))){opt.maxTime[0]="23"}if(!((opt.minTime[1]>=0)&&(opt.minTime[1]<60))){opt.minTime[1]="00"}if(!((opt.maxTime[1]>=0)&&(opt.maxTime[1]<24))){opt.maxTime[1]="59"}opt.minTime[0]=parseInt(opt.minTime[0]);opt.minTime[1]=parseInt(opt.minTime[1]);opt.maxTime[0]=parseInt(opt.maxTime[0]);opt.maxTime[1]=parseInt(opt.maxTime[1]);$picker.data("minTime",opt.minTime);$picker.data("maxTime",opt.maxTime);var $header=$("<div>");$header.addClass("datepicker_header");$picker.append($header);var $inner=$("<div>");$inner.addClass("datepicker_inner_container");$picker.append($inner);var $calendar=$("<div>");$calendar.addClass("datepicker_calendar");var $table=$("<table>");$table.addClass("datepicker_table");$calendar.append($table);$inner.append($calendar);var $timelist=$("<div>");$timelist.addClass("datepicker_timelist");$inner.append($timelist);$picker.hover(function(){ActivePickerId=$(this).data("pickerId")},function(){ActivePickerId=-1});if(opt.calendarMouseScroll){if(window.sidebar){$calendar.bind("DOMMouseScroll",function(e){var $picker=getParentPickerObject($(this));var delta=e.originalEvent.detail;if(delta>0){nextMonth($picker)}else{beforeMonth($picker)}return false})}else{$calendar.bind("mousewheel",function(e){var $picker=getParentPickerObject($(this));if(e.originalEvent.wheelDelta/120>0){beforeMonth($picker)}else{nextMonth($picker)}return false})}}PickerObjects.push($picker);draw_date($picker,{"isAnim":true,"isOutputToInputObject":opt.autodateOnStart},opt.current)};var getDefaults=function(){return{"current":null,"dateFormat":"default","locale":"en","animation":true,"minuteInterval":30,"firstDayOfWeek":0,"closeOnSelected":false,"timelistScroll":true,"calendarMouseScroll":true,"todayButton":true,"dateOnly":false,"futureOnly":false,"minDate":null,"maxDate":null,"autodateOnStart":true,"minTime":"00:00","maxTime":"23:59","onShow":null,"onHide":null,"allowWdays":null}};$.fn.dtpicker=function(config){var date=new Date();var defaults=getDefaults();defaults.inputObjectId=undefined;var options=$.extend(defaults,config);return this.each(function(i){init($(this),options)})};$.fn.appendDtpicker=function(config){var date=new Date();var defaults=getDefaults();defaults.inline=false;var options=$.extend(defaults,config);return this.each(function(i){var input=this;if(0<$(PickerObjects[$(input).data("pickerId")]).length){console.log("dtpicker - Already exist appended picker");return}var inputObjectId=InputObjects.length;InputObjects.push(input);options.inputObjectId=inputObjectId;var date,strDate,strTime;if($(input).val()!=null&&$(input).val()!==""){options.current=$(input).val()}var $d=$("<div>");if(options.inline){$d.insertAfter(input)}else{$d.css("position","absolute");$("body").append($d)}var pickerId=PickerObjects.length;var $picker_parent=$($d).dtpicker(options);var $picker=$picker_parent.children(".datepicker");$(input).data("pickerId",pickerId);$(input).keyup(function(){var $input=$(this);var $picker=$(PickerObjects[$input.data("pickerId")]);
    if($input.val()!=null&&($input.data("beforeVal")==null||($input.data("beforeVal")!=null&&$input.data("beforeVal")!=$input.val()))){var format=getDateFormat($picker.data("dateFormat"),$picker.data("locale"),$picker.data("dateOnly"));var date=parseDate($input.val(),format);if(date){draw_date($picker,{"isAnim":true,"isOutputToInputObject":false},date)}}$input.data("beforeVal",$input.val())});$(input).change(function(){$(this).trigger("keyup")});var handler=new PickerHandler($picker,$(input));if(options.inline===true){$picker.data("isInline",true)}else{$picker.data("isInline",false);$picker_parent.css({"zIndex":100});$picker.css("width","auto");$picker.hide();$(input).on("click, focus",function(){var $input=$(this);var $picker=$(PickerObjects[$input.data("pickerId")]);var handler=new PickerHandler($picker,$input);var is_showed=handler.isShow();if(!is_showed){handler.show();var func=$picker.data("onShow");if(func!=null){console.log("dtpicker- Call the onShow handler");func(handler)}}});(function(handler){$(window).resize(function(){handler._relocate()});$(window).scroll(function(){handler._relocate()})})(handler)}$(input).bind("destroyed",function(){var $input=$(this);var $picker=$(PickerObjects[$input.data("pickerId")]);var handler=new PickerHandler($picker,$input);handler.destroy()});var func=$picker.data("onInit");if(func!=null){console.log("dtpicker- Call the onInit handler");func(handler)}})};var methods={show:function(){var $input=$(this);var $picker=$(PickerObjects[$input.data("pickerId")]);if($picker!=null){var handler=new PickerHandler($picker,$input);handler.show()}},hide:function(){var $input=$(this);var $picker=$(PickerObjects[$input.data("pickerId")]);if($picker!=null){var handler=new PickerHandler($picker,$input);handler.hide()}},setDate:function(date){var $input=$(this);var $picker=$(PickerObjects[$input.data("pickerId")]);if($picker!=null){var handler=new PickerHandler($picker,$input);handler.setDate(date)}},getDate:function(){var $input=$(this);var $picker=$(PickerObjects[$input.data("pickerId")]);if($picker!=null){var handler=new PickerHandler($picker,$input);return handler.getDate()}},destroy:function(){var $input=$(this);var $picker=$(PickerObjects[$input.data("pickerId")]);if($picker!=null){var handler=new PickerHandler($picker,$input);handler.destroy()}}};$.fn.handleDtpicker=function(method){if(methods[method]){return methods[method].apply(this,Array.prototype.slice.call(arguments,1))}else{if(typeof method==="object"||!method){return methods.init.apply(this,arguments)}else{$.error("Method "+method+" does not exist on jQuery.handleDtpicker")}}};if(!window.console){window.console={};window.console.log=function(){}}$.event.special.destroyed={remove:function(o){if(o.handler){o.handler.apply(this,arguments)}}};$(function(){$("body").click(function(){for(var i=0;i<PickerObjects.length;i++){var $picker=$(PickerObjects[i]);if(ActivePickerId!=i){if($picker.data("inputObjectId")!=null&&$picker.data("isInline")===false&&$picker.css("display")!="none"){var $input=InputObjects[$picker.data("inputObjectId")];var handler=new PickerHandler($picker,$input);handler.hide();var func=$picker.data("onHide");if(func!=null){console.log("dtpicker- Call the onHide handler");func(handler)}}}}})})})(jQuery);
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
            searchCarDefault: {},    // 选择的车型,
            data: {},
            success: $.noop,
            error: $.noop,
            complete: $.noop,
            paginationSelector: '',  //  显示分页的元素
            searchCarLevel: 4,      // 默认全部显示, 车牌, 车系, 排量, 年款
            thTitle: [],
            tdKey: []
        };

        var opts = $.extend(defaultOptions, options);
        var instance = this;        // 实例对象

        instance.id = Math.random().toString().replace('.', '_');
        instance.tbodyId = instance.id + "tbody";

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

            if (!$.fn.appendDtpicker) {
                throw new Error('must include simple-dtpicker plugin')
            }
            $(".time-selector").appendDtpicker({
                locale: 'cn',
                minuteInterval: 15,
                autodateOnStart: false,
            });
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
            // 搜索车型
            if (opts.searchCar) {
                generateCarSelect();
            }
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
                        $(opts.paginationSelector).html(loadPageAjax(data.GetNowPage, data.GetPageCount));  // 添加分页
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
            var list = data.GetDataSource;
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
                case 'time': {
                    if (inputItem.range) {
                        // 时间范围
                        inputElem = document.createElement("span");
                        for (var i = 0; i < 2; i++) {
                            var input = document.createElement("input");
                            input.className = "form-control time-selector";
                            input.type = "text";
                            input.name = inputItem['name'];
                            inputElem.appendChild(input);
                        }
                    } else {
                        inputElem = document.createElement("input");
                        inputElem.className = "form-control time-selector";
                        inputElem.type = "text";
                        inputElem.name = inputItem['name'];
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