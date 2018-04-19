export function BAIDUMP() {
          return new Promise(function (resolve, reject) {
               window.initMap = function () {
            	   resolve(BMap);
         }
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "http://api.map.baidu.com/api?v=2.0&ak=jRaeqEmDgGTvH3EjzigGdiil&callback=initMap";
        script.onerror = reject;
        document.head.appendChild(script);
      });
}