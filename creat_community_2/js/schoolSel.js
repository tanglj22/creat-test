
var eventUtil = {
    // 添加句柄
    addHandler: function(element,type,handler){
        // DOM2
        if(element.addEventListener){
            element.addEventListener(type,handler,false);
        }
        // DOM0
        else if(element.attachEvent){
            element.attachEvent('on'+type,handler);
        }
        // HTML
        else{
            element['on'+type]=handler;
        }
    },

    // 删除句柄
    removeHandler: function(element,type,handler){
        // DOM2
        if(element.removeEventListener){
            element.removeEventListener(type,handler,false);
        }
        // DOM0
        else if(element.detachEvent){
            element.detachEvent('on'+type,handler);
        }
        // HTML
        else{
            element['on'+type] = null;
        }
    }
};

//弹出学校信息选择框
    var btnChoose = document.getElementById('btn-schoolCho');
    var sch = document.getElementById("input-comSchool");
    var bodyb=document.getElementById('bodyb');
    var close=document.getElementById('close');
    var schoolSel=document.getElementById('school_sel');
    var schlis= schoolSel.getElementsByTagName('li');

// 获取页面宽度，高度
var sWidth = document.documentElement.scrollWidth;
var sHeight = document.documentElement.scrollHeight;
// 获取可视区宽度，高度
var vWidth = document.documentElement.clientWidth;
var vHeight = document.documentElement.clientHeight;

    btnChoose.onclick=function(){
        bodyb.style.display="block";
        bodyb.style.width= sWidth +'px';
        bodyb.style.height= sHeight + 'px';
        schoolSel.style.backgroundColor="#fff";
        var lWidth = schoolSel.offsetWidth;
        var lHeight = schoolSel.offsetHeight;
        schoolSel.style.left = (vWidth-lWidth)/2 +'px';
        schoolSel.style.top = (vHeight-lHeight)/2 + 50 + document.body.scrollTop + 'px';
    }

    close.onclick=function(){
       bodyb.style.display="none";
    }


var optionps='<option>省份</option>';
var province = ["河北省","山西省","吉林省","辽宁省","黑龙江省","陕西省","甘肃省","青海省","山东省","福建省","浙江省","河南省","湖北省","湖南省","江西省","江苏省","安徽省","广东省","海南省","四川省","贵州省","云南省","北京市","天津市","上海市","重庆市","内蒙古","新疆","宁夏","广西","西藏","香港","澳门","台湾"];

 for(var i=0,len=province.length;i<len;i++){
   optionps +='<option value="'+province[i]+'">'+province[i]+'</option>';
 }

     //学校数据处理
         var citys=document.getElementById("citys");
         var schoolList=document.getElementById("schools_lists");
         var searchs=document.getElementById("searchs");
         var txt=document.getElementById("txt");
          
         citys.innerHTML=optionps;

     //首页大学显示
     var college0=["北京大学","清华大学","复旦大学","武汉大学","浙江大学","中国人民大学","上海交通大学","南京大学","解放军国防科学技术大学","中山大学","吉林大学","中国科学技术大学","华中科技大学","四川大学","北京师范大学","南开大学","西安交通大学","中南大学","同济大学","天津大学","哈尔滨工业大学","山东大学","厦门大学","东南大学","北京航空航天大学","西安电子科技大学大学","河南科技大学","西北工业大学","成都电子科技大学","西安石油大学"];
     var list0='<li>'+college0[0]+'</li>';
         for(var j=1,len=college0.length;j<len;j++){
            
             list0+='<li>'+college0[j]+'</li>';
            
         }
         schoolList.innerHTML=list0;
      //发送城市，请求大学信息
         citys.onchange=function(){
             var jsonData={
                 'province':this.value
             }
             var url='http://localhost:8080/undactweb/controll/getSchool';
             loadXMLDoc(jsonData,url,function(d){
                 var college=[];
                 for(var i=0,len=d.length;i<len;i++){
                   college.push(d[i].name);
                 }
                
                 //学校列表呈现
                 var lists='<li>'+college[0]+'</li>';
                 for(var j=1,len=college.length;j<len;j++){
                    
                     lists+='<li>'+college[j]+'</li>';
                    
                 }
                 schoolList.innerHTML=lists;

                 //快速查找
                 searchs.onkeyup=function(){
                        var regval=eval('/^'+searchs.value+'[\u4e00-\u9fa5]*/');
                        var collArr=[];
                        for(var i=0,colen=college.length;i<colen;i++){
                           if(college[i].match(regval)){
                               collArr.push(college[i]);
                           }
                        }
                        var opt='';
                        if(collArr!='null'){
                           for(var i=0,len=collArr.length;i<len;i++){
                              opt += '<div class="item" id="items">' + collArr[i] + '</div>';
                           }
                           txt.innerHTML=opt;
                           txt.style.display='block';
                        }
                        var items=txt.getElementsByTagName("div");
                             for(var i=0,len=items.length;i<len;i++){
                                 items[i].onclick=function () {
                                     school.value=this.innerHTML;
                                     bodyb.style.display="none";
                                     txt.style.display='none';
                                 }
                          }
                           
                   }
             })
             //点击选择学校
             for(var i=0,len=schlis.length;i<len;i++){
                 schlis[i].onclick=function () {
                     sch.value=this.innerHTML;
                     bodyb.style.display="none";
                 }
             }
         }


     //点击选择学校
         for(var i=0,len=schlis.length;i<len;i++){
             schlis[i].onclick=function () {
                 sch.value=this.innerHTML;
                 bodyb.style.display="none";
             }
         }
