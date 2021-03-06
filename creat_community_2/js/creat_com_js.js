
var jsonData = {};
window.onload = function() {
    function $id(id) {
        return (typeof(id) == 'string') ? document.getElementById(id) : id;
    }
    function $class(Class) {
        return (typeof(Class) == 'string') ? document.getElementsByClassName(Class) : Class;
    }

// 获取各项元素
    var errSpan = document.getElementsByClassName('err-text');


//  各部分具体操作
    // -----  社团名称  -----
    jsonData.commName = '';
    var jsonDataName = {};
    var commName = $id('input-comName');
    commName.onblur = function(){
        // 空
        if(this.value == ""){
            errSpan[0].style.display = 'block';
            errSpan[0].innerHTML = '<i>*社团名称不能为空！</i>';
        }
        else{
            jsonDataName.commName = this.value;
            // 前后端交互
            xmlPost(jsonDataName,'http://localhost:8080/undactweb/controll/testCommunityName',function(d){
                d = result.d;
                if(d == 'false'){
                    errSpan[0].style.display = 'block';
                    errSpan[0].innerHTML = '<i>*社团名已注册！</i>';
                }else{
                    errSpan[0].style.display = 'none';
                }
            })
        }
    };





    // -----  社团头像  -----
    var cutDiv = $id('cutBox');
    var minDiv = document.getElementsByClassName('minDiv')[0];
    var img1 = $id('img1');
    var img2 = $id('img2');
    var img3 = $id('img3');
    var commImg = $id('img-comImg');  // 上传页面的图片
    var commImg1 = $id('img-comImg1');  //
    var commImg2 = $id('img-comImg2');  // 预览图片
    var btnUpload1 = $id('btn-uploadBtn1');  // 转到上传页面
    var btnUpload2 = $id('btn-uploadBtn2');  // 选择文件
    var btnSave = $id('btn-saveImg');  // 保存
    var imgLoad = $class('imgLoad')[0];
    var imgUpload = $class('imgUpload')[0];


    // 点击上传头像，转到上传页面
    btnUpload1.onclick = function () {
        imgLoad.style.display = 'none';
        imgUpload.style.display = 'block';
        var imgBig = document.getElementsByClassName('imgBig')[0];
        imgBig.style.width = 200 + 'px';
    };


    document.onselectstart=new Function('event.returnValue=false;');
    //获取元素相对于屏幕左边的距离 利用offsetLeft
    function getPosition(node){
        var left = node.offsetLeft;
        var top = node.offsetTop;
        var parent = node.offsetParent;
        while(parent != null){
            left += parent.offsetLeft;
            top += parent.offsetTop;
            parent=parent.offsetParent;
        }
        return {"left":left,"top":top};
    }
    var rightDiv = $id('right');
    var upDiv = $id('up');
    var leftDiv = $id('left');
    var downDiv = $id('down');
    var rightDownDiv = $id('right-down');
    var ifKeyDown = '';
    var contact = '';
    //鼠标按下事件
    rightDiv.onmousedown = function(e){
        e.stopPropagation();
        ifKeyDown = true;
        contact = "right";
    };
    upDiv.onmousedown = function(e){
        e.stopPropagation();
        ifKeyDown = true;
        contact = "up";
    };
    leftDiv.onmousedown = function(e){
        e.stopPropagation();
        ifKeyDown = true;
        contact = "left";
    };
    downDiv.onmousedown = function(e){
        e.stopPropagation();
        ifKeyDown = true;
        contact = "down";
    };
    var cutX = '';
    var cutY = '';
    var cutLeft = '';
    var cutTop = '';
    var cutLeft1 ='';
    var cutTop1 ='';
    var cutLeft2 ='';
    var cutTop2 ='';
    var cutWidth='';
    cutDiv.onmousedown = function(ev){
        ev.stopPropagation();
        var e = ev || window.event;
        ifKeyDown = true;
        contact = "cut";
        cutX = e.clientX;
        cutY = e.clientY;
        cutLeft = this.offsetLeft;
        cutTop = this.offsetTop;
    };
    rightDownDiv.onmousedown = function(e){
        e.stopPropagation();
        ifKeyDown = true;
        contact = "right-down";
    };
    window.onmouseup = function(){
        ifKeyDown = false;
    };
    window.onmousemove = function(ev){
        var e = ev || window.event;
        var imgWidth = img1.offsetWidth-2;
            if(ifKeyDown == true){
                //if(contact == 'right'){
                //    var x = e.clientX;
                //    var widthBefore = cutDiv.offsetWidth - 2;
                //    var addWidth = x - (getPosition(cutDiv).left + widthBefore);
                //    cutDiv.style.width = addWidth + widthBefore + 'px';
                //}else if(contact == 'up'){
                //    var y = e.clientY;
                //    var yBefore = getPosition(cutDiv).top - document.body.scrollTop;
                //    var addHeight = yBefore - y;
                //    var heightBefore = cutDiv.offsetHeight - 2;
                //    cutDiv.style.height = addHeight + heightBefore + 'px';
                //    cutDiv.style.top = cutDiv.offsetTop - addHeight + 'px';
                //}
                //else if(contact == 'down'){
                //    var y = e.clientY;//鼠标纵坐标
                //    var heightBefore = cutDiv.offsetHeight-2;  //原来的高度
                //    var mainY = getPosition(cutDiv).top - document.body.scrollTop;
                //    var addHeight = y - (heightBefore + mainY);//增加的高度
                //    cutDiv.style.height = addHeight + heightBefore + "px";
                //}else if(contact == 'left'){
                //    var x = e.clientX;//鼠标横坐标
                //    var mainX  = getPosition(cutDiv).left;
                //    var addWidth = 	mainX - x;//增加的宽度
                //    var widthBefore = cutDiv.offsetWidth -2;//原来的宽度
                //    cutDiv.style.width = widthBefore + addWidth +"px";
                //    cutDiv.style.left = cutDiv.offsetLeft - addWidth + "px";
                //}
                if(contact == 'right-down'){
                    var x = e.clientX;
                    if((cutDiv.offsetTop+cutDiv.offsetHeight)>200){
                        cutDiv.style.width = 200-cutDiv.offsetTop + 'px';
                        cutDiv.style.height = 200-cutDiv.offsetTop + 'px';
                    }else{
                        var widthBefore = cutDiv.offsetWidth - 2;
                        var addWidth = x - (getPosition(cutDiv).left + widthBefore);
                        cutDiv.style.width = addWidth + widthBefore + 'px';
                        cutDiv.style.height = addWidth + widthBefore + 'px';
                    }
                }
                else if(contact == 'cut'){
                    var xx = e.clientX - cutX; // 相对于原来移动的宽度
                    var yy = e.clientY - cutY; // 相对于原来移动的高度
                    if(cutDiv.offsetTop < 0){
                        cutDiv.style.top = 0 + 'px';
                    }else if(cutDiv.offsetLeft < 0){
                        cutDiv.style.left = 0 + 'px';
                    }
                    else if((cutDiv.offsetTop+cutDiv.offsetHeight)>200){
                        cutDiv.style.top = 200-cutDiv.offsetHeight + 'px';
                    }else if((cutDiv.offsetLeft+cutDiv.offsetWidth)>imgWidth){
                        cutDiv.style.left = imgWidth-cutDiv.offsetWidth + 'px';
                    }
                    else{
                        cutDiv.style.top =  yy + cutTop + "px";
                        cutDiv.style.left = xx + cutLeft + "px";
                    }
                }
            }
        cutLeft1 = cutDiv.offsetLeft/200;
        cutTop1 =  cutDiv.offsetTop/200;
        cutLeft2 = (cutDiv.offsetLeft + cutDiv.offsetWidth)/200;
        cutTop2 =  (cutDiv.offsetTop + cutDiv.offsetWidth)/200;
        cutWidth= cutDiv.offsetWidth;
        setChoice();
        setPreview();
    };

    // 设置选取区域高亮可见
    function setChoice(){
        var top = cutDiv.offsetTop;
        var right = cutDiv.offsetLeft+cutDiv.offsetWidth;
        var bottom = cutDiv.offsetTop+cutDiv.offsetHeight;
        var left = cutDiv.offsetLeft;
        var img2 = document.getElementById("img2");
        img2.style.clip = "rect("+top+"px,"+right+"px,"+bottom+"px,"+left+"px)";
    }
    //预览函数
    function setPreview(){
        img3.style.display = 'block';
        var top = cutDiv.offsetTop;
        var right = cutDiv.offsetLeft+cutDiv.offsetWidth;
        var bottom = cutDiv.offsetTop+cutDiv.offsetHeight;
        var left = cutDiv.offsetLeft;
        img3.style.top = -top+"px";
        img3.style.left = -left+"px";
        img3.style.clip = "rect("+top+"px,"+right+"px,"+bottom+"px,"+left+"px)";
    }

    // 设置按钮点击事件
    // 点击上传头像，转到上传页面
    btnUpload1.onclick = function () {
        imgLoad.style.display = 'none';
        imgUpload.style.display = 'block';
    };

    // 点击点此上传，传送头像文件
    btnUpload2.onchange = function () {
        document.getElementById("imgFile1").submit();
        cutDiv.style.display = 'block';
        minDiv.style.display ='block';
            //img1.src = 'd4399f477ffaced972d2ee3fcb8d130d.jpg';
            //img2.src = 'd4399f477ffaced972d2ee3fcb8d130d.jpg';
            //img3.src = 'd4399f477ffaced972d2ee3fcb8d130d.jpg';
    };
    var doc1='';
    var frameFile1 = $id('frameFile1');
    frameFile1.onload=function(){
        if(btnUpload2.value == undefined) return;
        doc1=frameFile1.contentWindow.document.body.textContent;
        img1.src = doc1;
        img2.src = doc1;
        img3.src = doc1;
        cutDiv.style.display = 'block';
        minDiv.style.display ='block';
        console.log(doc1)
    };
    console.log(doc1)
    var jsonFile1={};
    // 点击保存 二次提交
    btnSave.onclick = function(){
        //  这里的坐标需要后端分别乘以图片的实际高度并取整
         jsonFile1 = {
            src : doc1,
            x1 : cutLeft1,
            y1: cutTop1,
            x2: cutLeft2,
            y2: cutTop2
        };
        console.log(JSON.stringify(jsonFile1));
        imgLoad.style.display = 'block';
        imgUpload.style.display = 'none';
        // 前后端交互
        xmlPost(jsonFile1,'http://localhost:8080/undactweb/controll/CommityimageCutFileUpload',function(d){
            d = d.result;
            commImg2.src = d;
        })
    };

    // -----  社团属性  ------
    jsonData.commProperty = '';
    var commProperty = document.getElementsByClassName('commProperty');

    // -----  所在学校  -----
    var commSchool = $id('input-comSchool');
    jsonData.commSchool = '';
    commSchool.onchange = function(){
        jsonData.commSchool = commSchool.value;
    };

    // -----  社团类别  -----
    var commClass1 = $id('input-comClass1');
    var commClass2 = $id('input-comClass2');
    jsonData.commClass = [];
    commClass1.onchange = function(){
            var jsonClass = {
                academy: ['自然科学', '信息科技', '法律研究', '天文地理', '历史研究', '经济管理', '文学研究', '媒体传播', '哲学理论', '军事国防', '外语学习', '工程技术'],
                entertain: ['动漫', '摄影', '舞蹈', '益智', '手工', '音乐', '礼仪文化', '交际交友', '书法美术', '美食文化', '影视表演', '创新创意', '演讲口才','其他'],
                sport: ['篮球', '足球', '排球', '乒乓球', '羽毛球', '网球', '台球', '户外', '游泳', '桌游', '武术', '健美', '电子竞技', '轮滑滑板', '其他球类','其他'],
                welfare: ['手语', '环保', '心理健康', '支教助学', '红十字会','其他'],
                practice: ['创业', '企业俱乐部', '模拟联合国', '职业发展', '国际大学生组织','其他'],
                assoc: ['团委', '学生会', '研究生会', '社团联合会','其他']
            };
            var uValue = commClass1.value;
            var lValue;
            switch (uValue) {
                case '专业学术':
                    lValue = jsonClass.academy;
                    break;
                case '文化娱乐':
                    lValue = jsonClass.entertain;
                    break;
                case '体育健身':
                    lValue = jsonClass.sport;
                    break;
                case '社会公益':
                    lValue = jsonClass.welfare;
                    break;
                case '职业实践':
                    lValue = jsonClass.practice;
                    break;
                case '团学组织':
                    lValue = jsonClass.assoc;
                    break;
                default:
                    lValue = jsonClass.academy;
            }
            var sel = '';
            for(var i=0;i<lValue.length;i++){
                sel += '<option>'+ lValue[i] + '</option>';
            }
            commClass2.innerHTML = sel;
    };


    // -----  手机号码  -----
    jsonData.commLeaderPhoneNumber = '';
    var commLeaderPhoneNumber = $id('input-phone');
    var commLeaderPhoneNumberTest = '';
    commLeaderPhoneNumber.onblur = function(){
        var re = /(^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+)|(^1(3[0-9]|5[7-9]|53|56|8[0-9])[0-9]{8}$)/ig;
        // 空
        if(this.value == ""){
            errSpan[2].style.display = 'block';
            errSpan[2].innerHTML = '<i>手机号码不能为空！</i>';
        }
        // 不是正确格式
        else if(!re.test(this.value)){
            errSpan[2].style.display = 'block';
            errSpan[2].innerHTML = '<i>请输入正确格式的号码！</i>';
        }
        // 合格
        else{
            errSpan[2].style.display = 'none';
            commLeaderPhoneNumberTest = true;
            jsonData.commLeaderPhoneNumber = this.value;
        }
    };

    // -----  短信验证  -----
    jsonData.commMsgCode = '';
    var MsgCode = $id('input-MsgCode');
    var btnMsgCode = $id('btn-getCode');
    //短信发送验证码倒计时
    btnMsgCode.onclick=function(){
        if( commLeaderPhoneNumberTest != true){
            errSpan[3].style.display = 'block';
            errSpan[3].innerHTML = '<i>请确认手机号码正确！</i>';
        }else{
            errSpan[3].style.display = 'none';
            var i=60;
            var t=setInterval(function(){
                btnMsgCode.innerHTML=i+"秒重新发送";
                if(i==0){
                    clearInterval(t);
                    btnMsgCode.innerHTML="发送验证码";
                    btnMsgCode.disabled=false;
                }else{
                    btnMsgCode.disabled=true;
                }
                i--;
            },1000)
        }
    };
    MsgCode.onblur = function(){
        jsonData.commMsgCode = MsgCode.value;
    };


    // -----  身份核验  -----
    var commLeaderImg = $id('img-comIdCheck');
    var btnUpload3 = $id('btn-uploadBtn3');
    btnUpload3.onchange = function () {
        document.getElementById("imgFile2").submit();
    };
    var frameFile2 = $id('frameFile2');
    var doc2='';
    frameFile2.onload=function(){
        if(btnUpload3.value == undefined) return;
        doc2=frameFile2.contentWindow.document.body.textContent;
        commLeaderImg.src = doc2;
    };


    // -----  提交  -----
    var submitBtn = $id('submitBtn');
    submitBtn.onclick = function(){
        var theCheck = '';
        // 验证社团名称
        if(commName.value == ""){
            errSpan[0].style.display = 'block';
            errSpan[0].innerHTML = '<i>*社团名称不能为空！</i>';
            theCheck = '0';
        }else{
            errSpan[0].style.display = 'none';
            jsonData.commName = commName.value;
        }
        // 验证学校
        if(commSchool.value == "") {
            errSpan[1].style.display = 'block';
            errSpan[1].innerHTML = '<i>*所在学校不能为空！</i>';
            theCheck = '0';
        }else{
            errSpan[1].style.display = 'none';
            jsonData.commSchool = commSchool.value;
        }
        // 验证手机号
        if(commLeaderPhoneNumber.value == ""){
            errSpan[2].style.display = 'block';
            errSpan[2].innerHTML = '<i>*手机号码不能为空！</i>';
            theCheck = '0';
        }else{
            errSpan[2].style.display = 'none';
            jsonData.commLeaderPhoneNumber = commLeaderPhoneNumber.value;
        }
        // 验证验证码
        if(MsgCode.value == ""){
            errSpan[3].style.display = 'block';
            errSpan[3].innerHTML = '<i>*请填写验证码！</i>';
            theCheck = '0';
        }else{
            errSpan[3].style.display = 'none';
            jsonData.commMsgCode = MsgCode.value;
        }
        if(theCheck != '0'){
            if(commProperty[0].checked){
                jsonData.commProperty = '0';
            }else{
                jsonData.commProperty = '1';
            }
            jsonData.commClass[0] = commClass1.value;
            jsonData.commClass[1] = commClass2.value;
            jsonData.commHeadUrl = doc1;
            jsonData.commLeaderCertifyUrl= doc2;
            console.log(JSON.stringify(jsonData))
            // 前后端交互
            xmlPost(jsonData,'http://localhost:8080/undactweb/controll/createComm',function(d){
                d = d.result;
                if(d == 'false'){
                    errSpan[5].style.display = 'block';
                    errSpan[5].innerHTML = '<i>*注册失败，请重新注册</i>';
                }else{
                    errSpan[5].style.display = 'none';
                    window.open("http://localhost:8080/undactweb/pages/register/register.html","_self","");
                    return false;
                }
            })
        }

        console.log(jsonFile1);
    };




    // -------  AJAX部分  ------ //
    function createXMLHttp() {
        var XmlHttp;
        if (window.ActiveXObject) {
            var arr = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.5.0", "MSXML2.XMLHttp.4.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp", "Microsoft.XMLHttp"];
            for (var i = 0; i < arr.length; i++) {
                try {
                    XmlHttp = new ActiveXObject(arr[i]);
                    return XmlHttp;
                }
                catch (error) { }
            }
        }
        else {
            try {
                XmlHttp = new XMLHttpRequest();
                return XmlHttp;
            }
            catch (otherError) { }
        }
    }

    // 定义发送数据请求
      var xmlPost = function (jsonData,url,callback) {
        var xmlHttp = createXMLHttp();
        var queryStr = JSON.stringify(jsonData);
        xmlHttp.open('post', url, true);
        xmlHttp.setRequestHeader("Content-Type", "application/json");
        xmlHttp.send(queryStr);
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                var data = JSON.parse(xmlHttp.responseText); // 获取服务端JSON数据
                callback(data);
            }
        }
    };

};
