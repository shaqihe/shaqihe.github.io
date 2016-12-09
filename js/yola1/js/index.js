
/**
 * Created by xumingyu on 2016/12/9.
 */
document.documentElement.style.fontSize = window.innerWidth/3.75 + 'px';
window.onload=function () {
    var href=GetQueryString("href");
    document.getElementById("download").onclick=function () {
        location.href=href
    }

    function GetQueryString(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }
}
