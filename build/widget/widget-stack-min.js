YUI.add("widget-stack",function(D){var K=D.Lang,R=D.UA,b=D.Node,E=D.Widget,Z="zIndex",N="shim",W="visible",d="boundingBox",U="renderUI",F="bindUI",Q="syncUI",O="offsetWidth",C="offsetHeight",G="width",T="height",J="px",M="shimdeferred",e="shimresize",V="visibleChange",B="widthChange",I="heightChange",X="shimChange",A="zIndexChange",a="contentUpdated",P="stacked",c="show-scrollbars",H="hide-scrollbars";function S(L){this._stackNode=this.get(d);this._stackHandles={};this.HTML_PARSER=D.merge(this.HTML_PARSER,S.prototype.HTML_PARSER);D.after(this._renderUIStack,this,U);D.after(this._syncUIStack,this,Q);D.after(this._bindUIStack,this,F);}S.ATTRS={shim:{value:(R.ie==6)},zIndex:{value:0,set:function(L){return this._setZIndex(L);}}};S.SHIM_CLASS=E.getClassName(N);S.STACKED_CLASS=E.getClassName(P);S.SHIM_TEMPLATE='<iframe class="'+S.SHIM_CLASS+'" frameborder="0" title="Widget Stacking Shim" src="javascript:false"></iframe>';S.prototype={_syncUIStack:function(){this._uiSetShim(this.get(N));this._uiSetZIndex(this.get(Z));},_bindUIStack:function(){this.after(X,this._onShimChange);this.after(A,this._onZIndexChange);},_renderUIStack:function(){this._stackNode.addClass(S.STACKED_CLASS);var L=navigator.userAgent.toLowerCase().indexOf("macintosh")!=-1;if(L&&R.gecko&&R.gecko<=1.9){this._fixMacGeckoScrollbars();}},_setZIndex:function(L){if(K.isString(L)){L=parseInt(L,10);}if(!K.isNumber(L)){L=0;}return L;},_onShimChange:function(L){this._uiSetShim(L.newVal);},_onZIndexChange:function(L){this._uiSetZIndex(L.newVal);},_uiSetZIndex:function(L){this._stackNode.setStyle(Z,L);},_uiSetShim:function(L){if(L){if(this.get(W)){this._renderShim();}else{this._renderShimDeferred();}}else{this._destroyShim();}},_renderShimDeferred:function(){this._stackHandles[M]=this._stackHandles[M]||[];var Y=this._stackHandles[M],L=function(f){if(f.newVal){this._renderShim();}};Y.push(this.on(V,L));},_addShimResizeHandlers:function(){this._stackHandles[e]=this._stackHandles[e]||[];var Y=this.sizeShim,L=this._stackHandles[e];this.sizeShim();L.push(this.after(V,Y));L.push(this.after(B,Y));L.push(this.after(I,Y));L.push(this.after(a,Y));},_detachStackHandles:function(L){var f=this._stackHandles[L];if(f){for(var Y=f.length;Y<=0;--Y){f[Y].detach();delete f[Y];}}},_renderShim:function(){var L=this._shimNode,Y=this._stackNode;if(!L){L=this._shimNode=this._getShimTemplate();Y.insertBefore(L,Y.get("firstChild"));if(R.ie==6){this._addShimResizeHandlers();}this._detachStackHandles(M);}},_destroyShim:function(){if(this._shimNode){this._shimNode.get("parentNode").removeChild(this._shimNode);this._shimNode=null;this._detachStackHandles(M);this._detachStackHandles(e);}},_fixMacGeckoScrollbars:function(){this._toggleMacGeckoScrollbars();this.after(V,this._toggleMacGeckoScrollbars);},_toggleMacGeckoScrollbars:function(){if(this.get(W)){this._showMacGeckoScrollbars();}else{this._hideMacGeckoScrollbars();}},_hideMacGeckoScrollbars:function(){this._stackNode.replaceClass(E.getClassName(c),E.getClassName(H));},_showMacGeckoScrollbars:function(){this._stackNode.replaceClass(E.getClassName(H),E.getClassName(c));},sizeShim:function(){var Y=this._shimNode,L=this._stackNode;if(Y&&R.ie===6&&this.get(W)){Y.setStyle(G,L.get(O)+J);Y.setStyle(T,L.get(C)+J);}},_getShimTemplate:function(){if(!S._SHIM_TEMPLATE){S._SHIM_TEMPLATE=b.create(S.SHIM_TEMPLATE);}return S._SHIM_TEMPLATE.cloneNode(true);},HTML_PARSER:{zIndex:function(L){return L.getStyle(Z);}}};D.WidgetStack=S;},"@VERSION@",{requires:["widget"]});