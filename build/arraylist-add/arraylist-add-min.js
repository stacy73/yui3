YUI.add("arraylist-add",function(b,a){b.mix(b.ArrayList.prototype,{add:function(e,d){var c=this._items;if(b.Lang.isNumber(d)){c.splice(d,0,e);}else{c.push(e);}return this;},remove:function(f,e,c){c=c||this.itemsAreEqual;for(var d=this._items.length-1;d>=0;--d){if(c.call(this,f,this.item(d))){this._items.splice(d,1);if(!e){break;}}}return this;},itemsAreEqual:function(d,c){return d===c;}});},"@VERSION@",{"requires":["arraylist"]});