!function(v){v.gfV1Countdown=function(e,t){var c,h,u,n={time:"2010/12/31 00:00:00",type:"default",precision:1e3,elapse:!1,id:null,idSlug:null,onTimeChange:function(e){},stoped:function(e){},finish:function(e){}},f=(this.settings={},this),p=v(e),g={Y:"years",m:"months",n:"daysToMonth",d:"daysToWeek",w:"weeks",W:"weeksToMonth",H:"hours",M:"minutes",S:"seconds",D:"totalDays",I:"totalHours",N:"totalMinutes",T:"totalSeconds"},i=null,m=null,r=null,a=!1;this.evergreenLoop=void 0!==p.data("evergreenloop")?p.data("evergreenloop"):"0",this.evergreenGlobal=void 0!==p.data("evergreenglobal")?p.data("evergreenglobal"):"0",this.init=function(){return this.settings=v.extend({},n,t),a=p.attr("data-auto-hide"),f.setTemplate(),f.setFinalDate(f.settings.time),f.start(),!1},this.setTemplate=function(){var e,t,n,i,a,s,r,o,l,d,u,g;f.settings.idSlug&&(h=v(".gryffeditor").hasClass("editing")?"dev":"production",u=p.data("week"),g=p.data("day"),e=p.data("hour"),t=p.data("minute"),n=p.data("second"),i=p.data("type"),0==p.find(".count-down-inner").length&&(d=p.data("weeklabel"),a=p.data("daylabel"),s=p.data("hourlabel"),r=p.data("minutelabel"),o=p.data("secondlabel"),l='<div class="count-down-wrap"><div class="count-down-inner">',"1"==u&&(l+='<div class="week-left time-left"><span class="num">00</span><span class="count-label">'+d+"</span></div>"),"1"==g&&(l+='<div class="day-left time-left"><span class="num">00</span><span class="count-label">'+a+"</span></div>"),"1"==e&&(l+='<div class="hour-left time-left"><span class="num">00</span><span class="count-label">'+s+"</span></div>"),"1"==t&&(l+='<div class="minute-left time-left"><span class="num">00</span><span class="count-label">'+r+"</span></div>"),"1"==n&&(l+='<div class="second-left time-left"><span class="num">00</span><span class="count-label">'+o+"</span></div>"),p.html(l+="</div></div>")),c=p.find(".count-down-inner"),"2010/12/31 00:00:00"==(u=p.data("end"))&&((d=new Date).setDate(d.getDate()+8),d.setSeconds(d.getSeconds()),u=f.formatDate(d)),"daily"==i?u=p.data("daily"):"evergreen"==i&&(u=p.data("evergreen")),f.settings.type=i,f.settings.time=u,"dev"==h&&f.settings.id.toString().replace(/-/g,"")==f.settings.idSlug&&(g="getCountdown"+f.settings.idSlug,window[g]=function(){return p.data("gfv1countdown")}))},this.start=function(){null!==i&&clearInterval(i),f.update(),i=setInterval(function(){f.update()},f.settings.precision)},this.stop=function(){clearInterval(i),i=null,f.dispatchEvent("stoped")},this.toggle=function(){i?f.stop():f.start()},this.setCookie=function(e,t,n){var i=new Date,n=(i.setTime(i.getTime()+24*n*60*60*1e3),"expires="+i.toUTCString());document.cookie=e+"="+t+";"+n+";path=/"},this.getCookie=function(e){for(var t=e+"=",n=document.cookie.split(";"),i=0;i<n.length;i++){for(var a=n[i];" "==a.charAt(0);)a=a.substring(1);if(0==a.indexOf(t))return a.substring(t.length,a.length)}return""},this.deleteCookie=function(e){document.cookie=e+"=; expires=Thu, Jan 01 1970 00:00:00 UTC;path=/"},this.refeshCookie=function(e,t){key="gp-evergreen-"+f.settings.id+e,f.deleteCookie(key),u=t},this.setFinalDate=function(e){if("daily"==f.settings.type){var t=new Date,n={day:t.getDate(),month:t.getMonth()+1,year:t.getFullYear(),hour:t.getHours(),minute:t.getMinutes(),second:t.getSeconds()};if(f.settings.time&&""!=f.settings.time){var i=["1"];f.settings.time=f.settings.time.toString(),d=(d=f.settings.time).toLowerCase();for(var i=-1!==f.settings.time.indexOf(",")?d.split(","):[d],a=0;a<i.length;a++){var s=i[a].trim();-1===s.indexOf("h")||isNaN(parseInt(s))||(n.hour=parseInt(s)),-1===s.indexOf("m")||isNaN(parseInt(s))||(n.minute=parseInt(s)),-1===s.indexOf("s")||isNaN(parseInt(s))||(n.second=parseInt(s))}var r=[n.year,n.month,n.day].join("/")+" "+[n.hour,n.minute,n.second].join(":"),o=new Date(r);o.setDate(o.getDate()+1),(n.hour<t.getHours()||n.hour==t.getHours()&&n.minute<t.getMinutes()||n.hour==t.getHours()&&n.minute==t.getMinutes()&&n.second<t.getSeconds())&&(n.year=o.getFullYear(),n.month=o.getMonth()+1,n.day=o.getDate())}r=[n.year,n.month,n.day].join("/")+" "+[n.hour,n.minute,n.second].join(":");m=f.parseDateString(r)}else if("evergreen"==f.settings.type){if("1"==f.evergreenGlobal||1==f.evergreenGlobal){t=f.getCookie("gp-evergreen-global-key");if(t)return void(m=new Date(t))}u="",f.settings.idSlug&&(u=void 0!==p.data("cookietime")?p.data("cookietime"):"");var l,o=function(){var e=0,t=["1"];f.settings.time&&""!=f.settings.time&&(f.settings.time=f.settings.time.toString(),t=-1!==f.settings.time.indexOf(",")?f.settings.time.split(","):[f.settings.time]);for(var n=0;n<t.length;n++){var i=t[n];-1!=(i=i.toLowerCase(i).trim()).indexOf("d")?isNaN(parseInt(i))||(e+=86400*parseInt(i)):-1!=i.indexOf("h")?isNaN(parseInt(i))||(e+=3600*parseInt(i)):-1!=i.indexOf("m")?isNaN(parseInt(i))||(e+=60*parseInt(i)):-1==i.indexOf("s")||isNaN(parseInt(i))||(e+=parseInt(i))}return 1e3*e}(),t=(key="gp-evergreen-"+f.settings.id+u,f.getCookie(key));m=t&&null!=t&&parseInt(t)+o<=Date.now()?(l=new Date,f.parseDateString(l)):((t=t)&&""!=t||(t=(new Date).getTime(),f.setCookie(key,t,30)),d=parseInt(t)+o,l=new Date(d),r=f.formatDate(l),f.parseDateString(r)),"1"!=f.evergreenGlobal&&1!=f.evergreenGlobal||f.setCookie("gp-evergreen-global-key",m,30)}else{m=f.parseDateString(e);var d,t=p.attr("data-timezone");null!=t&&""!=t&&(o=parseInt(t)?parseInt(t):parseInt(t.slice(3)))&&(d=(new Date).getTimezoneOffset(),m=new Date(m.getTime()-60*d*1e3-60*o*60*1e3))}},this.update=function(){var e,t=new Date,n=m.getTime()-t.getTime();n=Math.ceil(n/1e3),e!==(n=!f.settings.elapse&&n<0?0:Math.abs(n))&&(e=n,f.settings.elapsed=m<=t,r={seconds:e%60,minutes:Math.floor(e/60)%60,hours:Math.floor(e/60/60)%24,days:Math.floor(e/60/60/24)%7,daysToWeek:Math.floor(e/60/60/24)%7,daysToMonth:Math.floor(e/60/60/24%30.4368),weeks:Math.floor(e/60/60/24/7),weeksToMonth:Math.floor(e/60/60/24/7)%4,months:Math.floor(e/60/60/24/30.4368),years:Math.abs(m.getFullYear()-t.getFullYear()),totalDays:Math.floor(e/60/60/24),totalHours:Math.floor(e/60/60),totalMinutes:Math.floor(e/60),totalSeconds:e},0===e?("daily"==f.settings.type&&(f.setFinalDate(f.settings.time),f.dispatchEvent("update"),f.dispatchEvent("redirect")),"evergreen"==f.settings.type&&("1"==f.evergreenLoop||1==f.evergreenLoop?(key="gp-evergreen-"+f.settings.id+u,f.deleteCookie(key),f.setFinalDate(f.settings.time),f.dispatchEvent("update")):(f.stop(),f.dispatchEvent("finish"),f.dispatchEvent("redirect"))),"standard"==f.settings.type&&(f.stop(),f.dispatchEvent("finish"),f.dispatchEvent("redirect")),"1"==a&&f.hide()):f.dispatchEvent("update"))},this.hide=function(){var e=p.find(".count-down-wrap"),t=e.find(".count-down-inner");e.addClass("countdown-hide"),t.addClass("hide")},this.getTimeLeft=function(){var e=new Date,e=m.getTime()-e.getTime(),e=Math.ceil(e/1e3);return e=!f.settings.elapse&&e<0?0:Math.abs(e)},this.formatDate=function(e){return e&&e.constructor==Date?[e.getFullYear(),e.getMonth()+1,e.getDate()].join("/")+" "+[e.getHours(),e.getMinutes(),e.getSeconds()].join(":"):""},this.dispatchEvent=function(e){var t,n,i,a,s={finalDate:"",elapsed:"",offset:"",strftime:""};s.finalDate=m,s.elapsed=f.settings.elapsed,s.offset=v.extend({},r),s.strftime=f.strftime(r),f.settings.idSlug&&(a=p.data("week"),t=p.data("day"),n=p.data("hour"),i=p.data("minute"),p.data("second"),c.children(".week-left").children(".num").text(s.strftime("%w")),"1"==a?c.children(".day-left").children(".num").text(s.strftime("%d")):c.children(".day-left").children(".num").text(s.strftime("%D")),"0"==a&&"0"==t?c.children(".hour-left").children(".num").text(s.strftime("%I")):c.children(".hour-left").children(".num").text(s.strftime("%H")),"0"==a&&"0"==t&&"0"==n?c.children(".minute-left").children(".num").text(s.strftime("%N")):c.children(".minute-left").children(".num").text(s.strftime("%M")),"0"==a&&"0"==t&&"0"==n&&"0"==i?c.children(".second-left").children(".num").text(s.strftime("%T")):c.children(".second-left").children(".num").text(s.strftime("%S"))),h&&"production"==h&&"redirect"==e&&f.settings.idSlug&&(a=p.data("redirect"))&&"#"!=a&&""!=a&&(window.location.href=a),f.settings.onTimeChange(s)},this.parseDateString=function(e){if(e instanceof Date)return e;var t=[];if(t.push(/^[0-9]*$/.source),t.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),t.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),t=new RegExp(t.join("|")),String(e).match(t))return String(e).match(/^[0-9]*$/)&&(e=Number(e)),String(e).match(/\-/)&&(e=String(e).replace(/\-/g,"/")),new Date(e);throw new Error("Couldn't cast `"+e+"` to a date object.")},this.escapedRegExp=function(e){e=e.toString().replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1");return new RegExp(e)},this.strftime=function(d){return function(e){var t=e.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);if(t)for(var n=0,i=t.length;n<i;++n){var a=t[n].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),s=f.escapedRegExp(a[0]),r=a[1]||"",o=a[3]||"",l=null,a=a[2];g.hasOwnProperty(a)&&(l=g[a],l=Number(d[l])),null!==l&&("!"===r&&(l=f.pluralize(o,l)),""===r&&l<10&&(l="0"+l.toString()),e=e.replace(s,l.toString()))}return e=e.replace(/%%/,"%")}},this.pluralize=function(e,t){var n="s",i="";return e&&(n=1===(e=e.replace(/(:|;|\s)/gi,"").split(/\,/)).length?e[0]:(i=e[0],e[1])),1<Math.abs(t)?n:i},this.init()},v.fn.gfV1Countdown=function(t){return this.each(function(){var e;null==v(this).data("gfv1countdown")&&(e=new v.gfV1Countdown(this,t),v(this).data("gfv1countdown",e))})}}(window.GemQuery||jQuery);
