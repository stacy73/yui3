YUI.add("autocomplete-list",function(b,k){var i=b.Lang,w=b.Node,m=b.Array,h=b.UA.ie&&b.UA.ie<7,q=9,t="_CLASS_ITEM",u="_CLASS_ITEM_ACTIVE",d="_CLASS_ITEM_HOVER",v="_SELECTOR_ITEM",f="activeItem",l="alwaysShowList",p="circular",s="hoveredItem",n="id",e="item",c="list",x="result",j="results",r="visible",g="width",o="select",a=b.Base.create("autocompleteList",b.Widget,[b.AutoCompleteBase,b.WidgetPosition,b.WidgetPositionAlign],{ARIA_TEMPLATE:"<div/>",ITEM_TEMPLATE:"<li/>",LIST_TEMPLATE:"<ul/>",UI_EVENTS:(function(){var y=b.merge(b.Node.DOM_EVENTS);delete y.valuechange;delete y.valueChange;return y;}()),initializer:function(){var y=this.get("inputNode");if(!y){b.error("No inputNode specified.");return;}this._inputNode=y;this._listEvents=[];this.DEF_PARENT_NODE=y.get("parentNode");this[t]=this.getClassName(e);this[u]=this.getClassName(e,"active");this[d]=this.getClassName(e,"hover");this[v]="."+this[t];this.publish(o,{defaultFn:this._defSelectFn});},destructor:function(){while(this._listEvents.length){this._listEvents.pop().detach();}if(this._ariaNode){this._ariaNode.remove().destroy(true);}},bindUI:function(){this._bindInput();this._bindList();},renderUI:function(){var D=this._createAriaNode(),A=this.get("boundingBox"),z=this.get("contentBox"),C=this._inputNode,B=this._createListNode(),y=C.get("parentNode");C.addClass(this.getClassName("input")).setAttrs({"aria-autocomplete":c,"aria-expanded":false,"aria-owns":B.get("id")});y.append(D);if(h){A.plug(b.Plugin.Shim);}A.setStyle("position","absolute");this._ariaNode=D;this._boundingBox=A;this._contentBox=z;this._listNode=B;this._parentNode=y;},syncUI:function(){this._syncResults();this._syncVisibility();},hide:function(){return this.get(l)?this:this.set(r,false);},selectItem:function(z,y){if(z){if(!z.hasClass(this[t])){return this;}}else{z=this.get(f);if(!z){return this;}}this.fire(o,{itemNode:z,originEvent:y||null,result:z.getData(x)});return this;},_activateNextItem:function(){var z=this.get(f),y;if(z){y=z.next(this[v])||(this.get(p)?null:z);}else{y=this._getFirstItemNode();}this.set(f,y);return this;},_activatePrevItem:function(){var z=this.get(f),y=z?z.previous(this[v]):this.get(p)&&this._getLastItemNode();this.set(f,y||null);return this;},_add:function(y){var z=[];m.each(i.isArray(y)?y:[y],function(A){z.push(this._createItemNode(A).setData(x,A));},this);z=b.all(z);this._listNode.append(z.toFrag());return z;},_ariaSay:function(A,y){var z=this.get("strings."+A);this._ariaNode.set("text",y?i.sub(z,y):z);},_bindInput:function(){var B=this._inputNode,z,A,y;if(this.get("align")===null){y=this.get("tokenInput");z=(y&&y.get("boundingBox"))||B;this.set("align",{node:z,points:["tl","bl"]});if(!this.get(g)&&(A=z.get("offsetWidth"))){this.set(g,A);}}this._listEvents=this._listEvents.concat([B.after("blur",this._afterListInputBlur,this),B.after("focus",this._afterListInputFocus,this)]);},_bindList:function(){this._listEvents=this._listEvents.concat([b.one("doc").after("click",this._afterDocClick,this),b.one("win").after("windowresize",this._syncPosition,this),this.after({mouseover:this._afterMouseOver,mouseout:this._afterMouseOut,activeItemChange:this._afterActiveItemChange,alwaysShowListChange:this._afterAlwaysShowListChange,hoveredItemChange:this._afterHoveredItemChange,resultsChange:this._afterResultsChange,visibleChange:this._afterVisibleChange}),this._listNode.delegate("click",this._onItemClick,this[v],this)]);},_clear:function(){this.set(f,null);this._set(s,null);this._listNode.get("children").remove(true);},_createAriaNode:function(){var y=w.create(this.ARIA_TEMPLATE);return y.addClass(this.getClassName("aria")).setAttrs({"aria-live":"polite",role:"status"});},_createItemNode:function(y){var z=w.create(this.ITEM_TEMPLATE);return z.addClass(this[t]).setAttrs({id:b.stamp(z),role:"option"}).setAttribute("data-text",y.text).append(y.display);},_createListNode:function(){var y=this.get("listNode")||w.create(this.LIST_TEMPLATE);y.addClass(this.getClassName(c)).setAttrs({id:b.stamp(y),role:"listbox"});this._set("listNode",y);this.get("contentBox").append(y);return y;},_getFirstItemNode:function(){return this._listNode.one(this[v]);},_getLastItemNode:function(){return this._listNode.one(this[v]+":last-child");},_syncPosition:function(){this._syncUIPosAlign();this._syncShim();},_syncResults:function(y){if(!y){y=this.get(j);}this._clear();if(y.length){this._add(y);this._ariaSay("items_available");}this._syncPosition();if(this.get("activateFirstItem")&&!this.get(f)){this.set(f,this._getFirstItemNode());}},_syncShim:h?function(){var y=this._boundingBox.shim;if(y){y.sync();}}:function(){},_syncVisibility:function(y){if(this.get(l)){y=true;this.set(r,y);}if(typeof y==="undefined"){y=this.get(r);}this._inputNode.set("aria-expanded",y);this._boundingBox.set("aria-hidden",!y);if(y){this._syncPosition();}else{this.set(f,null);this._set(s,null);this._boundingBox.get("offsetWidth");}if(b.UA.ie===7){b.one("body").addClass("yui3-ie7-sucks").removeClass("yui3-ie7-sucks");}},_afterActiveItemChange:function(B){var A=this._inputNode,y=B.newVal,C=B.prevVal,z;if(C&&C._node){C.removeClass(this[u]);}if(y){y.addClass(this[u]);A.set("aria-activedescendant",y.get(n));}else{A.removeAttribute("aria-activedescendant");}if(this.get("scrollIntoView")){z=y||A;if(!z.inRegion(b.DOM.viewportRegion(),true)||!z.inRegion(this._contentBox,true)){z.scrollIntoView();}}},_afterAlwaysShowListChange:function(y){this.set(r,y.newVal||this.get(j).length>0);},_afterDocClick:function(A){var y=this._boundingBox,z=A.target;if(z!==this._inputNode&&z!==y&&z.ancestor("#"+y.get("id"),true)){this.hide();}},_afterHoveredItemChange:function(z){var y=z.newVal,A=z.prevVal;if(A){A.removeClass(this[d]);}if(y){y.addClass(this[d]);}},_afterListInputBlur:function(){this._listInputFocused=false;if(this.get(r)&&!this._mouseOverList&&(this._lastInputKey!==q||!this.get("tabSelect")||!this.get(f))){this.hide();}},_afterListInputFocus:function(){this._listInputFocused=true;},_afterMouseOver:function(y){var z=y.domEvent.target.ancestor(this[v],true);
this._mouseOverList=true;if(z){this._set(s,z);}},_afterMouseOut:function(){this._mouseOverList=false;this._set(s,null);},_afterResultsChange:function(y){this._syncResults(y.newVal);if(!this.get(l)){this.set(r,!!y.newVal.length);}},_afterVisibleChange:function(y){this._syncVisibility(!!y.newVal);},_onItemClick:function(y){var z=y.currentTarget;this.set(f,z);this.selectItem(z,y);},_defSelectFn:function(y){var z=y.result.text;this._inputNode.focus();this._updateValue(z);this._ariaSay("item_selected",{item:z});this.hide();}},{ATTRS:{activateFirstItem:{value:false},activeItem:{setter:b.one,value:null},alwaysShowList:{value:false},circular:{value:true},hoveredItem:{readOnly:true,value:null},listNode:{writeOnce:"initOnly",value:null},scrollIntoView:{value:false},strings:{valueFn:function(){return b.Intl.get("autocomplete-list");}},tabSelect:{value:true},visible:{value:false}},CSS_PREFIX:b.ClassNameManager.getClassName("aclist")});b.AutoCompleteList=a;b.AutoComplete=a;},"@VERSION@",{"after":["autocomplete-sources"],"lang":["en"],"requires":["autocomplete-base","event-resize","node-screen","selector-css3","shim-plugin","widget","widget-position","widget-position-align"],"skinnable":true});