YUI.add("node-base",function(a){var m=".",d="nodeName",i="nodeType",n="ownerDocument",l="tagName",h="_yuid",o={},b=Array.prototype.slice,r=a.DOM,e=function(t){if(!a.instanceOf(this,e)){return new e(t);}if(typeof t=="string"){t=e._fromString(t);if(!t){return null;}}var s=(t.nodeType!==9)?t.uniqueID:t[h];if(s&&e._instances[s]&&e._instances[s]._node!==t){t[h]=null;}s=s||a.stamp(t);if(!s){s=a.guid();}this[h]=s;this._node=t;if(this._initPlugins){}try{return this;}finally{t=null;}},c=function(t){var s=null;if(t){s=(typeof t=="string")?function(u){return a.Selector.test(u,t);}:function(u){return t(a.one(u));};}return s;};e._fromString=function(s){if(s){if(s.indexOf("doc")===0){s=a.config.doc;}else{if(s.indexOf("win")===0){s=a.config.win;}else{s=a.Selector.query(s,null,true);}}}return s||null;};e.NAME="node";e.re_aria=/^(?:role$|aria-)/;e.SHOW_TRANSITION="fadeIn";e.HIDE_TRANSITION="fadeOut";e.DOM_EVENTS={abort:1,beforeunload:1,blur:1,change:1,click:1,close:1,command:1,contextmenu:1,dblclick:1,DOMMouseScroll:1,drag:1,dragstart:1,dragenter:1,dragover:1,dragleave:1,dragend:1,drop:1,error:1,focus:1,key:1,keydown:1,keypress:1,keyup:1,load:1,message:1,mousedown:1,mouseenter:1,mouseleave:1,mousemove:1,mousemultiwheel:1,mouseout:1,mouseover:1,mouseup:1,mousewheel:1,orientationchange:1,reset:1,resize:1,select:1,selectstart:1,submit:1,scroll:1,textInput:1,unload:1};a.mix(e.DOM_EVENTS,a.Env.evt.plugins);e._instances={};e.getDOMNode=function(s){if(s){return(s.nodeType)?s:s._node||null;}return null;};e.scrubVal=function(t,s){if(t){if(typeof t=="object"||typeof t=="function"){if(i in t||r.isWindow(t)){t=a.one(t);}else{if((t.item&&!t._nodes)||(t[0]&&t[0][i])){t=a.all(t);}}}}else{if(typeof t==="undefined"){t=s;}else{if(t===null){t=null;}}}return t;};e.addMethod=function(s,u,t){if(s&&u&&typeof u=="function"){e.prototype[s]=function(){var w=b.call(arguments),x=this,v;if(w[0]&&a.instanceOf(w[0],e)){w[0]=w[0]._node;}if(w[1]&&a.instanceOf(w[1],e)){w[1]=w[1]._node;}w.unshift(x._node);v=u.apply(x,w);if(v){v=e.scrubVal(v,x);}(typeof v!="undefined")||(v=x);return v;};}else{}};e.importMethod=function(u,s,t){if(typeof s=="string"){t=t||s;e.addMethod(t,u[s],u);}else{a.Array.each(s,function(v){e.importMethod(u,v);});}};e.one=function(v){var s=null,u,t;if(v){if(typeof v=="string"){v=e._fromString(v);if(!v){return null;}}else{if(a.instanceOf(v,e)){return v;}}if(v.nodeType||a.DOM.isWindow(v)){t=(v.uniqueID&&v.nodeType!==9)?v.uniqueID:v._yuid;u=s?s._node:null;if(!s||(u&&v!==u)){s=new e(v);}}}try{return s;}finally{v=null;s=null;}};e.create=function(s,t){if(t&&t._node){t=t._node;}return a.one(r.create(s,t));};e.ATTRS={text:{getter:function(){return r.getText(this._node);},setter:function(s){r.setText(this._node,s);return s;}},"for":{getter:function(){return r.getAttribute(this._node,"for");},setter:function(s){r.setAttribute(this._node,"for",s);return s;}},"options":{getter:function(){return this._node.getElementsByTagName("option");}},"children":{getter:function(){var v=this._node,u=v.children,w,t,s;if(!u){w=v.childNodes;u=[];for(t=0,s=w.length;t<s;++t){if(w[t][l]){u[u.length]=w[t];}}}return a.all(u);}},value:{getter:function(){return r.getValue(this._node);},setter:function(s){r.setValue(this._node,s);return s;}}};e.DEFAULT_SETTER=function(s,u){var t=this._stateProxy,v;if(s.indexOf(m)>-1){v=s;s=s.split(m);a.Object.setValue(t,s,u);}else{if(typeof t[s]!="undefined"){t[s]=u;}}return u;};e.DEFAULT_GETTER=function(s){var t=this._stateProxy,u;if(s.indexOf&&s.indexOf(m)>-1){u=a.Object.getValue(t,s.split(m));}else{if(typeof t[s]!="undefined"){u=t[s];}}return u;};var g,k={};(function(){g=function(s){k[s]=window[s];window[s]=null;};})();a.mix(e.prototype,{dom:function(s){if(s){g(s);}return this._node;},toString:function(){var v=this[h]+": not bound to a node",u=this._node,s,w,t;if(u){s=u.attributes;w=(s&&s.id)?u.getAttribute("id"):null;t=(s&&s.className)?u.getAttribute("className"):null;v=u[d];if(w){v+="#"+w;}if(t){v+="."+t.replace(" ",".");}v+=" "+this[h];}return v;},get:function(s){var t;if(this._getAttr){t=this._getAttr(s);}else{t=this._get(s);}if(t){t=e.scrubVal(t,this);}else{if(t===null){t=null;}}return t;},_get:function(s){var t=e.ATTRS[s],u;if(t&&t.getter){u=t.getter.call(this);}else{if(e.re_aria.test(s)){u=this._node.getAttribute(s,2);}else{u=e.DEFAULT_GETTER.apply(this,arguments);}}return u;},set:function(s,u){var t=e.ATTRS[s];if(this._setAttr){this._setAttr.apply(this,arguments);}else{if(t&&t.setter){t.setter.call(this,u,s);}else{if(e.re_aria.test(s)){this._node.setAttribute(s,u);}else{e.DEFAULT_SETTER.apply(this,arguments);}}}return this;},setAttrs:function(s){if(this._setAttrs){this._setAttrs(s);}else{a.Object.each(s,function(t,u){this.set(u,t);},this);}return this;},getAttrs:function(t){var s={};if(this._getAttrs){this._getAttrs(t);}else{a.Array.each(t,function(u,w){s[u]=this.get(u);},this);}return s;},create:e.create,compareTo:function(s){var t=this._node;if(a.instanceOf(s,e)){s=s._node;}return t===s;},inDoc:function(t){var s=this._node;t=(t)?t._node||t:s[n];if(t.documentElement){return r.contains(t.documentElement,s);}},getById:function(u){var t=this._node,s=r.byId(u,t[n]);if(s&&r.contains(t,s)){s=a.one(s);}else{s=null;}return s;},ancestor:function(s,t){return a.one(r.ancestor(this._node,c(s),t));},ancestors:function(s,t){return a.all(r.ancestors(this._node,c(s),t));},previous:function(t,s){return a.one(r.elementByAxis(this._node,"previousSibling",c(t),s));},next:function(t,s){return a.one(r.elementByAxis(this._node,"nextSibling",c(t),s));},siblings:function(s){return a.all(r.siblings(this._node,c(s)));},one:function(s){return a.one(a.Selector.query(s,this._node,true));},all:function(s){var t=a.all(a.Selector.query(s,this._node));t._query=s;t._queryRoot=this._node;return t;},test:function(s){return a.Selector.test(this._node,s);},remove:function(s){var t=this._node;if(t&&t.parentNode){t.parentNode.removeChild(t);}if(s){this.destroy();}return this;},replace:function(s){var t=this._node;if(typeof s=="string"){s=e.create(s);}t.parentNode.replaceChild(e.getDOMNode(s),t);
return this;},replaceChild:function(t,s){if(typeof t=="string"){t=r.create(t);}return a.one(this._node.replaceChild(e.getDOMNode(t),e.getDOMNode(s)));},appendChild:function(s){return e.scrubVal(this._insert(s));},insertBefore:function(t,s){return a.Node.scrubVal(this._insert(t,s));},purge:function(t,s){a.Event.purgeElement(this._node,t,s);return this;},destroy:function(u){var t=a.config.doc.uniqueID?"uniqueID":"_yuid",s;this.purge();if(this.unplug){this.unplug();}this.clearData();if(u){a.NodeList.each(this.all("*"),function(v){s=e._instances[v[t]];if(s){s.destroy();}});}this._node=null;this._stateProxy=null;delete e._instances[this[t]];},invoke:function(z,t,s,y,x,w){var v=this._node,u;if(t&&a.instanceOf(t,e)){t=t._node;}if(s&&a.instanceOf(s,e)){s=s._node;}u=v[z](t,s,y,x,w);return e.scrubVal(u,this);},insert:function(t,s){this._insert(t,s);return this;},_insert:function(v,t){var u=this._node,s=null;if(typeof t=="number"){t=this._node.childNodes[t];}else{if(t&&t._node){t=t._node;}}if(v&&typeof v!="string"){v=v._node||v._nodes||v;}s=r.addHTML(u,v,t);return s;},prepend:function(s){return this.insert(s,0);},append:function(s){return this.insert(s,null);},appendTo:function(s){a.one(s).append(this);return this;},setContent:function(s){this._insert(s,"replace");return this;},getContent:function(s){return this.get("innerHTML");},swap:a.config.doc.documentElement.swapNode?function(s){this._node.swapNode(e.getDOMNode(s));}:function(s){s=e.getDOMNode(s);var u=this._node,t=s.parentNode,v=s.nextSibling;if(v===u){t.insertBefore(u,s);}else{if(s===u.nextSibling){t.insertBefore(s,u);}else{u.parentNode.replaceChild(s,u);r.addHTML(t,u,v);}}return this;},getData:function(t){var s;this._data=this._data||{};if(arguments.length){s=this._data[t];}else{s=this._data;}return s;},setData:function(s,t){this._data=this._data||{};if(arguments.length>1){this._data[s]=t;}else{this._data=s;}return this;},clearData:function(s){if("_data" in this){if(s){delete this._data[s];}else{delete this._data;}}return this;},hasMethod:function(t){var s=this._node;return !!(s&&t in s&&typeof s[t]!="unknown"&&(typeof s[t]=="function"||String(s[t]).indexOf("function")===1));},SHOW_TRANSITION:null,HIDE_TRANSITION:null,show:function(s){s=arguments[arguments.length-1];this.toggleView(true,s);return this;},_show:function(){this.setStyle("display","");},_isHidden:function(){return a.DOM.getStyle(this._node,"display")==="none";},toggleView:function(s,t){this._toggleView.apply(this,arguments);},_toggleView:function(s,t){t=arguments[arguments.length-1];if(typeof s!="boolean"){s=(this._isHidden())?1:0;}if(s){this._show();}else{this._hide();}if(typeof t=="function"){t.call(this);}return this;},hide:function(s){s=arguments[arguments.length-1];this.toggleView(false,s);return this;},_hide:function(){this.setStyle("display","none");},isFragment:function(){return(this.get("nodeType")===11);},empty:function(){this.get("childNodes").remove().destroy(true);return this;}},true);a.Node=e;a.one=a.Node.one;var q=function(s){var t=[];if(s){if(typeof s==="string"){this._query=s;s=a.Selector.query(s);}else{if(s.nodeType||r.isWindow(s)){s=[s];}else{if(s._nodes){s=s._nodes;}else{if(s._node){s=[s._node];}else{if(s[0]&&s[0]._node){a.Array.each(s,function(u){if(u._node){t.push(u._node);}});s=t;}else{s=a.Array(s,0,true);}}}}}}this._nodes=s||[];};q.NAME="NodeList";q.getDOMNodes=function(s){return(s&&s._nodes)?s._nodes:s;};q.each=function(s,v,u){var t=s._nodes;if(t&&t.length){a.Array.each(t,v,u||s);}else{}};q.addMethod=function(s,u,t){if(s&&u){q.prototype[s]=function(){var w=[],v=arguments;a.Array.each(this._nodes,function(B){var A=(B.uniqueID&&B.nodeType!==9)?"uniqueID":"_yuid",y=a.Node._instances[B[A]],z,x;if(!y){y=q._getTempNode(B);}z=t||y;x=u.apply(z,v);if(x!==undefined&&x!==y){w[w.length]=x;}});return w.length?w:this;};}else{}};q.importMethod=function(u,s,t){if(typeof s==="string"){t=t||s;q.addMethod(s,u[s]);}else{a.Array.each(s,function(v){q.importMethod(u,v);});}};q._getTempNode=function(t){var s=q._tempNode;if(!s){s=a.Node.create("<div></div>");q._tempNode=s;}s._node=t;s._stateProxy=t;return s;};a.mix(q.prototype,{item:function(s){return a.one((this._nodes||[])[s]);},each:function(u,t){var s=this;a.Array.each(this._nodes,function(w,v){w=a.one(w);return u.call(t||w,w,v,s);});return s;},batch:function(t,s){var u=this;a.Array.each(this._nodes,function(x,w){var v=a.Node._instances[x[h]];if(!v){v=q._getTempNode(x);}return t.call(s||v,v,w,u);});return u;},some:function(u,t){var s=this;return a.Array.some(this._nodes,function(w,v){w=a.one(w);t=t||w;return u.call(t,w,v,s);});},toFrag:function(){return a.one(a.DOM._nl2frag(this._nodes));},indexOf:function(s){return a.Array.indexOf(this._nodes,a.Node.getDOMNode(s));},filter:function(s){return a.all(a.Selector.filter(this._nodes,s));},modulus:function(u,t){t=t||0;var s=[];q.each(this,function(w,v){if(v%u===t){s.push(w);}});return a.all(s);},odd:function(){return this.modulus(2,1);},even:function(){return this.modulus(2);},destructor:function(){},refresh:function(){var v,t=this._nodes,u=this._query,s=this._queryRoot;if(u){if(!s){if(t&&t[0]&&t[0].ownerDocument){s=t[0].ownerDocument;}}this._nodes=a.Selector.query(u,s);}return this;},_prepEvtArgs:function(v,u,t){var s=a.Array(arguments,0,true);if(s.length<2){s[2]=this._nodes;}else{s.splice(2,0,this._nodes);}s[3]=t||this;return s;},on:function(u,t,s){return a.on.apply(a,this._prepEvtArgs.apply(this,arguments));},once:function(u,t,s){return a.once.apply(a,this._prepEvtArgs.apply(this,arguments));},after:function(u,t,s){return a.after.apply(a,this._prepEvtArgs.apply(this,arguments));},size:function(){return this._nodes.length;},isEmpty:function(){return this._nodes.length<1;},toString:function(){var v="",u=this[h]+": not bound to any nodes",s=this._nodes,t;if(s&&s[0]){t=s[0];v+=t[d];if(t.id){v+="#"+t.id;}if(t.className){v+="."+t.className.replace(" ",".");}if(s.length>1){v+="...["+s.length+" items]";}}return v||u;}},true);q.importMethod(a.Node.prototype,["append","destroy","detach","detachAll","empty","insert","prepend","remove","set","setContent","show","hide","toggleView"]);
q.prototype.get=function(t){var w=[],v=this._nodes,u=false,x=q._getTempNode,s,y;if(v[0]){s=a.Node._instances[v[0]._yuid]||x(v[0]);y=s._get(t);if(y&&y.nodeType){u=true;}}a.Array.each(v,function(z){s=a.Node._instances[z._yuid];if(!s){s=x(z);}y=s._get(t);if(!u){y=a.Node.scrubVal(y,s);}w.push(y);});return(u)?a.all(w):w;};a.NodeList=q;a.all=function(s){return new q(s);};a.Node.all=a.all;a.Array.each(["removeChild","hasChildNodes","cloneNode","hasAttribute","removeAttribute","scrollIntoView","getElementsByTagName","focus","blur","submit","reset","select","createCaption"],function(s){a.Node.prototype[s]=function(w,u,t){var v=this.invoke(s,w,u,t);return v;};});a.Node.importMethod(a.DOM,["contains","setAttribute","getAttribute","wrap","unwrap","generateID"]);a.NodeList.importMethod(a.Node.prototype,["getAttribute","setAttribute","removeAttribute","unwrap","wrap","generateID"]);(function(t){var s=["hasClass","addClass","removeClass","replaceClass","toggleClass"];t.Node.importMethod(t.DOM,s);t.NodeList.importMethod(t.Node.prototype,s);})(a);if(!a.config.doc.documentElement.hasAttribute){a.Node.prototype.hasAttribute=function(s){if(s==="value"){if(this.get("value")!==""){return true;}}return !!(this._node.attributes[s]&&this._node.attributes[s].specified);};}a.Node.prototype.focus=function(){try{this._node.focus();}catch(s){}return this;};a.Node.ATTRS.type={setter:function(t){if(t==="hidden"){try{this._node.type="hidden";}catch(s){this.setStyle("display","none");this._inputType="hidden";}}else{try{this._node.type=t;}catch(s){}}return t;},getter:function(){return this._inputType||this._node.type;},_bypassProxy:true};if(a.config.doc.createElement("form").elements.nodeType){a.Node.ATTRS.elements={getter:function(){return this.all("input, textarea, button, select");}};}a.mix(a.Node.ATTRS,{offsetHeight:{setter:function(s){a.DOM.setHeight(this._node,s);return s;},getter:function(){return this._node.offsetHeight;}},offsetWidth:{setter:function(s){a.DOM.setWidth(this._node,s);return s;},getter:function(){return this._node.offsetWidth;}}});a.mix(a.Node.prototype,{sizeTo:function(s,t){var u;if(arguments.length<2){u=a.one(s);s=u.get("offsetWidth");t=u.get("offsetHeight");}this.setAttrs({offsetWidth:s,offsetHeight:t});}});var j=a.NodeList,f=Array.prototype,p=["concat","pop","push","shift","slice","splice","unshift"];a.Array.each(p,function(s){j.prototype[s]=function(){var u=[],v=0,t;while(typeof(t=arguments[v++])!="undefined"){u.push(t._node||t._nodes||t);}return a.Node.scrubVal(f[s].apply(this._nodes,u));};});},"@VERSION@",{requires:["dom-base","selector","event-base"]});