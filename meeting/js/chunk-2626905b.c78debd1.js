(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2626905b"],{"1a25":function(t,e,i){},"4c39":function(t,e){var i,n,s=t.exports={};function c(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function o(t){if(i===setTimeout)return setTimeout(t,0);if((i===c||!i)&&setTimeout)return i=setTimeout,setTimeout(t,0);try{return i(t,0)}catch(e){try{return i.call(null,t,0)}catch(e){return i.call(this,t,0)}}}function A(t){if(n===clearTimeout)return clearTimeout(t);if((n===r||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(t);try{return n(t)}catch(e){try{return n.call(null,t)}catch(e){return n.call(this,t)}}}(function(){try{i="function"===typeof setTimeout?setTimeout:c}catch(t){i=c}try{n="function"===typeof clearTimeout?clearTimeout:r}catch(t){n=r}})();var a,l=[],u=!1,h=-1;function d(){u&&a&&(u=!1,a.length?l=a.concat(l):h=-1,l.length&&m())}function m(){if(!u){var t=o(d);u=!0;var e=l.length;while(e){a=l,l=[];while(++h<e)a&&a[h].run();h=-1,e=l.length}a=null,u=!1,A(t)}}function f(t,e){this.fun=t,this.array=e}function g(){}s.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var i=1;i<arguments.length;i++)e[i-1]=arguments[i];l.push(new f(t,e)),1!==l.length||u||o(m)},f.prototype.run=function(){this.fun.apply(null,this.array)},s.title="browser",s.browser=!0,s.env={},s.argv=[],s.version="",s.versions={},s.on=g,s.addListener=g,s.once=g,s.off=g,s.removeListener=g,s.removeAllListeners=g,s.emit=g,s.prependListener=g,s.prependOnceListener=g,s.listeners=function(t){return[]},s.binding=function(t){throw new Error("process.binding is not supported")},s.cwd=function(){return"/"},s.chdir=function(t){throw new Error("process.chdir is not supported")},s.umask=function(){return 0}},"4f45":function(t,e,i){(function(t){var n="undefined"!==typeof t&&t||"undefined"!==typeof self&&self||window,s=Function.prototype.apply;function c(t,e){this._id=t,this._clearFn=e}e.setTimeout=function(){return new c(s.call(setTimeout,n,arguments),clearTimeout)},e.setInterval=function(){return new c(s.call(setInterval,n,arguments),clearInterval)},e.clearTimeout=e.clearInterval=function(t){t&&t.close()},c.prototype.unref=c.prototype.ref=function(){},c.prototype.close=function(){this._clearFn.call(n,this._id)},e.enroll=function(t,e){clearTimeout(t._idleTimeoutId),t._idleTimeout=e},e.unenroll=function(t){clearTimeout(t._idleTimeoutId),t._idleTimeout=-1},e._unrefActive=e.active=function(t){clearTimeout(t._idleTimeoutId);var e=t._idleTimeout;e>=0&&(t._idleTimeoutId=setTimeout(function(){t._onTimeout&&t._onTimeout()},e))},i("de8a"),e.setImmediate="undefined"!==typeof self&&self.setImmediate||"undefined"!==typeof t&&t.setImmediate||this&&this.setImmediate,e.clearImmediate="undefined"!==typeof self&&self.clearImmediate||"undefined"!==typeof t&&t.clearImmediate||this&&this.clearImmediate}).call(this,i("66fa"))},"84b0":function(t,e,i){"use strict";var n=i("1a25"),s=i.n(n);s.a},d68a:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("ul",{staticClass:"flex-center-warp"},t._l(t.list,function(e,n){return i("li",{key:n,staticClass:"w95 flex-around lis"},[i("div",{staticClass:"flex-start w70"},[i("img",{staticClass:"icon",attrs:{src:e.src,alt:""}}),i("div",{staticClass:"mg-l-5"},[i("p",{staticClass:"fz-2rem co-12 t-l fw-700"},[t._v(t._s(e.name))]),i("p",{staticClass:"fz-133 co-99 t-l pad"},[t._v(t._s(e.present))])])]),i("div",[i("div",{staticClass:"flex-around"},[i("img",{class:e.stempSrcFlag?"icon":"icon disableds",attrs:{src:e.stempSrc,alt:"开始"},on:{click:function(i){return t.confirm(n,e.stempSrcFlag)}}})])])])}),0)])},s=[],c=(i("612f"),i("4f45"),i("5c2d")),r={data:function(){return{router:["/voteCount"],imgList:[i("00f7"),i("f159"),i("e16b"),i("369c")],list:c["a"].list}},computed:{states:function(){return this.$store.state.meeting_status.data}},watch:{states:function(t){this.recover(t)}},methods:{recover:function(t){var e=this;t.forEach(function(t,i,n){e.controlProcessStart(t.status,i,!1)})},routerFn:function(t){var e=this.list[t].router,i={flow_step:this.list[t].flow_step};this.$router.push({path:e,query:i})},controlProcessStart:function(t,e,i){switch(t){case 1:0!==e?(this.list[e].stempSrcFlag=!1,this.list[e].stempSrc=this.imgList[0],i&&this.statusBus(2,e)):(this.routerLoading(e),i&&this.statusBus(2,e));break;case 2:this.list[e].stempSrc=this.imgList[1],this.list[e].stempSrcFlag=!0,this.routerFn(e),i&&this.statusBus(3,e);break;case 3:this.list[e].stempSrc=this.imgList[2],this.list[e].stempSrcFlag=!1,e==this.list.length-1&&this.routerLoading(e);break;case 4:this.list[e].stempSrc=this.imgList[3],this.list[e].stempSrcFlag=!0,i&&this.statusBus(2,e),this.routerLoading(e);break;default:break}},routerLoading:function(t){var e={flow_step:this.list[t].flow_step};this.$router.push({path:"/loading",query:e})},statusBus:function(t,e){var i=JSON.stringify({meeting_id:this.meeting_id,flow_step:e+1,status:t,compere_id:this.host_id});this.$ws.send(i)},nextFn:function(t,e){var i=this.$store.state.meeting_status;if(0===t&&2==i.data[0].status){var n=i.required,s=i.sign.length;if(s/n<.8)return this.$message({message:"签到人数低于80% 无法进行下一步",type:"warning"}),!0}if(7===t&&2==i.data[7].status){var c=i.party.length,r=i.secretary_gain.length+i.deputy_secretary_gain.length+i.commissioner_gain.length;if(r/c<.8)return this.$message({message:"签到人数低于80% 无法进行下一步",type:"warning"}),!0}return!1},confirm:function(t,e){var i=this;if(!e)return!0;if(!this.nextFn(t)){var n=this.$store.state.meeting_status.data[t].status;this.$confirm("此操作不可恢复, 是否继续?","警告 ! ! !",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){i.controlProcessStart(n,t,!0)}).catch(function(){i.$message({type:"info",message:"已取消操作"})})}}}},o=r,A=(i("84b0"),i("17cc")),a=Object(A["a"])(o,n,s,!1,null,"4ed0c4fd",null);e["default"]=a.exports},de8a:function(t,e,i){(function(t,e){(function(t,i){"use strict";if(!t.setImmediate){var n,s=1,c={},r=!1,o=t.document,A=Object.getPrototypeOf&&Object.getPrototypeOf(t);A=A&&A.setTimeout?A:t,"[object process]"==={}.toString.call(t.process)?d():m()?f():t.MessageChannel?g():o&&"onreadystatechange"in o.createElement("script")?w():p(),A.setImmediate=a,A.clearImmediate=l}function a(t){"function"!==typeof t&&(t=new Function(""+t));for(var e=new Array(arguments.length-1),i=0;i<e.length;i++)e[i]=arguments[i+1];var r={callback:t,args:e};return c[s]=r,n(s),s++}function l(t){delete c[t]}function u(t){var e=t.callback,n=t.args;switch(n.length){case 0:e();break;case 1:e(n[0]);break;case 2:e(n[0],n[1]);break;case 3:e(n[0],n[1],n[2]);break;default:e.apply(i,n);break}}function h(t){if(r)setTimeout(h,0,t);else{var e=c[t];if(e){r=!0;try{u(e)}finally{l(t),r=!1}}}}function d(){n=function(t){e.nextTick(function(){h(t)})}}function m(){if(t.postMessage&&!t.importScripts){var e=!0,i=t.onmessage;return t.onmessage=function(){e=!1},t.postMessage("","*"),t.onmessage=i,e}}function f(){var e="setImmediate$"+Math.random()+"$",i=function(i){i.source===t&&"string"===typeof i.data&&0===i.data.indexOf(e)&&h(+i.data.slice(e.length))};t.addEventListener?t.addEventListener("message",i,!1):t.attachEvent("onmessage",i),n=function(i){t.postMessage(e+i,"*")}}function g(){var t=new MessageChannel;t.port1.onmessage=function(t){var e=t.data;h(e)},n=function(e){t.port2.postMessage(e)}}function w(){var t=o.documentElement;n=function(e){var i=o.createElement("script");i.onreadystatechange=function(){h(e),i.onreadystatechange=null,t.removeChild(i),i=null},t.appendChild(i)}}function p(){n=function(t){setTimeout(h,0,t)}}})("undefined"===typeof self?"undefined"===typeof t?this:t:self)}).call(this,i("66fa"),i("4c39"))},e16b:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ODYzOGYyNC03OGEwLTI5NGItOGQyNS0wNDBjMTQyOWU4NWUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RUM5QkU3NDY2RkEwMTFFOTk0MjM4OTIzMzJCRkFEMDYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RUM5QkU3NDU2RkEwMTFFOTk0MjM4OTIzMzJCRkFEMDYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTBhNjdmZjYtNDI5Yy1jNzQ3LTljMzMtODIzNzRlMzE1MDhiIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQ4NjM4ZjI0LTc4YTAtMjk0Yi04ZDI1LTA0MGMxNDI5ZTg1ZSIv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"},f159:function(t,e){t.exports="data:image/gif;base64,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"}}]);