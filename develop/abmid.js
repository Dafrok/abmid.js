/**
 * Created by AMAI on 3/12/2015.
 */

//polyfill-queryselector
(function () {
    var style;
    var select = function (selector, maxCount) {
        var all = document.all,
            l = all.length,
            i,
            resultSet = [];

        style.addRule(selector, "foo:bar");
        for (i = 0; i < l; i += 1) {
            if (all[i].currentStyle.foo === "bar") {
                resultSet.push(all[i]);
                if (resultSet.length > maxCount) {
                    break;
                }
            }
        }
        style.removeRule(0);
        return resultSet;
    };
    if (document.querySelectorAll || document.querySelector) {
        return;
    }
    style = document.createStyleSheet();

    document.querySelectorAll = document.body.querySelectorAll = function (selector) {
        return select(selector, Infinity);
    };
    document.querySelector = document.body.querySelector = function (selector) {
        return select(selector, 1)[0] || null;
    };
}());

//Abmid
(function Abmid(){
    var abmids = document.querySelectorAll("[abmid]")
    var getCss = function(o,key){
        return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o,false)[key];
    }
    var getSize=function(el,size){
        return  parseFloat(getCss(el,size))
    }
    var setTransform=function(){
        for(var abmid=0;abmid<abmids.length;abmid++){
            var m=abmids[abmid]
            var pm= m.parentElement
            if(getCss(pm,"position")=="static" && m.parentElement.tagName!="BODY"){
                pm.style.position="relative"
            }
            m.style.position="absolute"
            m.style.top="50%"
            m.style.left="50%"
            m.style.transform="translate(-50%,-50%)"
        }
    }
    var setListener=function(){
        for(var abmid=0;abmid<abmids.length;abmid++){
            var m=abmids[abmid]
            var pm= m.parentElement
            if(getCss(pm,"position")=="static" && m.parentElement.tagName!="BODY"){
                pm.style.position="relative"
            }
            var innerSize=new Object(),outerSize=new Object()
            innerSize.height = m.offsetHeight
            innerSize.width = m.offsetWidth
            outerSize.height = pm.clientHeight
            outerSize.width = pm.clientWidth
            pm.style.zoom="1"
            m.style.position="absolute"
            m.style.top=(outerSize.height-innerSize.height)/2+"px"
            m.style.left=(outerSize.width-innerSize.width)/2+"px"
        }
    }
    switch(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")){
        case "MSIE6.0":
        case "MSIE7.0":
        case "MSIE8.0":
        case "MSIE9.0":
            setInterval(setListener,200);break;
        default :
            setTransform();break;
    }
})()
