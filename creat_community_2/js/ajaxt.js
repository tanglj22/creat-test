function loadXMLDoc(jsonData,url,callback) { 
        var xmlhttp;
        if(window.XMLHttpRequest){
            xmlhttp = new XMLHttpRequest();
        }else{
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");//IE5,IE6
        }
        var queryStr  = JSON.stringify(jsonData);
        xmlhttp.open("POST", url,true);
        xmlhttp.setRequestHeader("Content-type","application/json");
        xmlhttp.send(queryStr);
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState===4 &&xmlhttp.status===200) {
                var data=JSON.parse(xmlhttp.responseText);
                callback(data);
            } 
        }
    }
