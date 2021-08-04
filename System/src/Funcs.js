const fs = {
    getRandom(min, max) {
        return Math.random() * (max - min) + min;
    },
    getRandomMax(max) {
        return Math.floor(Math.random() * max);
    },
    chkPpt:function(obj,prop){
        for(var o in obj){
            if(o == prop){ return true; }
        }
        return false;
    },
    isEmpty:function(obj){
        if ( typeof(obj) == "undefined" || obj == null || obj == undefined) {
            return true;
        }
        if ( obj == ""|| obj ==''||obj ==" "||obj ==' '||obj.length<=0) {
            return true;
        }
        if (obj ==[] || obj == {}) { return true; }
        if(typeof(obj)=="object"&&Object.keys(obj).length==0){ return true; }
        return false;
    },
    getColors:function(colorTone,datalength = 0){
        var colors = [];
        var totalColors = colorTone.length;
        for(var i = 0;i<datalength;i++){
            colors.push(colorTone[i % totalColors]);
        }
        return colors
    },
    setCookie:function(dataName,dataContent,effectTime = (1000*60*60*9)){
        var d = new Date();
        d.setTime(d.getTime()+(effectTime));
        var expires = "expires="+d.toUTCString();
        document.cookie = dataName + "=" + dataContent + ";domain=localhost;" + expires + ";";
        //window.location = ""; 
    },
    getCookie:function(dataName){
        var name = dataName + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },
    delCookie:function(dataName){
        document.cookie = dataName + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT";
        //window.location = ""; 
    },
    clnCookie:function(){
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++){   
            var spcook =  cookies[i].split("=");
            document.cookie = spcook[0] + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT";
        }
        //window.location = ""; 
    },
    getTime:function(date = null){
        if(date=null){ return new Date().format("yyyy-MM-dd hh:mm:ss") }
        else{ return new Date(date).format("yyyy-MM-dd hh:mm:ss") }
    },
    getTimeStamp:function(date = null){
        if(date=null){ return new Date().parse(date); }
        else{ return Date.now(); }
    },
    jsonTstr:function(json){
        return JSON.stringify(json);
    },
    strTjson:function(str){
        return JSON.parse(str);
    },
    new:function(targetObj){
        return Object.assign({}, targetObj)
    },
    msg:{
        info:function(config){
            var message = config;
            $('body').toast({class: 'info',displayTime: 0,closeIcon: true,message: message});
        },
        infoA:function(config){
            var message = config;
            $('body').toast({class: 'info',displayTime: 6000,message: message});
        },
        warning:function(config){
            var message = config;
            $('body').toast({class: 'warning',displayTime: 0,closeIcon: true,message: message});
        },
        warningA:function(config){
            var message = config;
            $('body').toast({class: 'warning',displayTime: 6000,message: message
            });
        },
        error:function(config){
            var message = config;
            $('body').toast({class: 'error',closeIcon: true,displayTime: 0,message: message});
        },
        errorA:function(config){
            var message = config;
            $('body').toast({class: 'error',displayTime: 6000,message: message});
        },
        attached:function(config){
            var message = config.msg;
            var actions = config.actions;
            $('body').toast({
                message: message,
                displayTime: 0,
                class: 'black',
                classActions: 'top attached',
                actions:actions
            });
        }
        
    },
    popup:function(data){
        var elm = data.elm;
        var config = data.config;
        $(elm).popup(config);
    },
    array:{
        insert:function(index, item,array){
            array.splice( index, 0, item );
            return array;
        }
    },
    DegTDMS:function(data){
        var d = parseInt(data);
        var m = parseInt((data-d)*60);
        var s = parseFloat((data-d-(m/60))*3600);
        return [d,m,s];
    },
    DMSTDeg:function(data){
        var d = data[0];var m = data[1];var s = data[2];
        var deg=  (parseFloat(d) + parseFloat(m/60) + parseFloat(s/3600));
        return deg;
    },
    Split:function(data){
        var str  = data.str;
        var paras= fs.isEmpty(data.paras)?/[.\*+-/_]/:data.paras;
        newStr = str.split(sep);
    }

}

const Conn = {
    ajax:function(data){
        var returnData = null;
        $.ajax({
            async:(data.async)?true:false,
            type: "POST",
            url: data.url,
            data: data.param,
            success:function(result){
                returnData = result;
            },
            error:function(result){
                returnData = result;
            }
        });
        return returnData;
    }
}