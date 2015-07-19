(function($W,$D,$){
	$W.Modernizr=function(a,b,c){function z(a){j.cssText=a}function A(a,b){return z(m.join(a+";")+(b||""))}function B(a,b){return typeof a===b}function C(a,b){return!!~(""+a).indexOf(b)}function D(a,b){for(var d in a){var e=a[d];if(!C(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function E(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:B(f,"function")?f.bind(d||b):f}return!1}function F(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+o.join(d+" ")+d).split(" ");return B(b,"string")||B(b,"undefined")?D(e,b):(e=(a+" "+p.join(d+" ")+d).split(" "),E(e,b,c))}var d="2.8.3",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n="Webkit Moz O ms",o=n.split(" "),p=n.toLowerCase().split(" "),q={},r={},s={},t=[],u=t.slice,v,w=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},x={}.hasOwnProperty,y;!B(x,"undefined")&&!B(x.call,"undefined")?y=function(a,b){return x.call(a,b)}:y=function(a,b){return b in a&&B(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=u.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(u.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(u.call(arguments)))};return e}),q.csstransforms=function(){return!!F("transform")},q.csstransforms3d=function(){var a=!!F("perspective");return a&&"webkitPerspective"in g.style&&w("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a};for(var G in q)y(q,G)&&(v=G.toLowerCase(),e[v]=q[G](),t.push((e[v]?"":"no-")+v));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)y(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},z(""),i=k=null,e._version=d,e._prefixes=m,e._domPrefixes=p,e._cssomPrefixes=o,e.testProp=function(a){return D([a])},e.testAllProps=F,e.testStyles=w,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+t.join(" "):""),e}(this,this.document);
	jQuery.fn.reverse = function(){
		return $(Array.prototype.reverse.call(this));
	};
	/**
     * @name TextSpinner
     * @constructor 
     * @param places {number} initial number of spinnable places 
     * @param charSet {string|Array<string>} the character set provided as either a string or an array. 
     * @description constructs a new TextSpinner widget instance 
     */ 
	var TextSpinner = function(places,charSet){
		/**
         * @name TextSpinner#places
         * @type property
         * @propertyOf TextSpinner
         * @description the number of spinnable places 
         */ 
		this.places = places; 
		/**
         * @name TextSpinner#charSet
         * @type property
         * @propertyOf TextSpinner
         * @description the character set to use
         * @type {Array<string>}
         */ 
		this.charSet = (typeof charSet === "string")?charSet.split(''):charSet;
		/**
         * @name TextSpinner#el
         * @type property
         * @propertyOf TextSpinner
         * @description a reference to the DOM element of the widget 
         * @type {DOMElement}
         */
		this.el = null;
		/**
         * @name TextSpinner#viewportEl 
         * @type property
         * @propertyOf TextSpinner
         * @description a reference to the viewport DOM element 
         * @type {DOMElement}
         */
		this.viewportEl = null;
	};

	TextSpinner.prototype = {
		/**
         * @name TextSpinner#setText
         * @param {number|string} the new text to transition to
         * @description smoothly transitions the text spinner from the old value to the 
         * provided value. 
         * @methodOf TextSpinner
         */
		setText:function(num){
			var txt = (num+''),
				itm,
				n = txt.split('').reverse(),
				clz = 'char-',idx,i,l; 
			if (n.length !== this.places){
				this.render(null,n.length);
				this.places = n.length;
			}
			for(i=0,l=this.places;i<l;i++){
				idx = this.charSet.indexOf(n[i]); 
				itm = this.items
					.eq(i)
					.children();
				if (idx !== -1){
					if (Modernizr.csstransforms && Modernizr.csstransforms3d){
						itm.css('transform','translateZ(0) translateY('+(-idx*1.4)+'em)');
					}else {
						itm.css('margin-top',(-idx*1.4)+'em');
					}
				}else {
					if (Modernizr.csstransforms && Modernizr.csstransforms3d){
						itm.css('transform','translateZ(0)');
					}else {
						itm.css('margin-top','0'); 
					}
				}
			}
		},
		/**
         * @name TextSpinner#addChar
         * @description Adds a new spinnable place, this method is called every time a new 
         * spinnable place is required. 
         * @methodOf TextSpinner
         */
		addChar:function(){
			var charEl = $('<div>')
				.attr('class','text-spinner-char char-0')
				.prepend($('<div>')
					.addClass('text-spinner-char-viewport'))
			this.addCharSetToChar(charEl);
			charEl.appendTo(this.el);
			return charEl;
		},
		/**
         * @name TextSpinner#removeChar
         * @description Removes a single spinnable place from the widget, this method is called
         * to remove spinnable places when not in use.  
         * @methodOf TextSpinner
         */
		removeChar:function(){
			this.el.find('.text-spinner-char').first().remove();
		},
		/**
         * @name TextSpinner
         * @description Adds DOMElements for each charset to the given spinnable place. 
         * The method is called every time a new spinnable place is inserted. 
         * @param {DOMElement} charEl the new spinnable place element. 
         * @methodOf TextSpinner
         */
		addCharSetToChar:function(charEl){
			var viewportEl = charEl.children('.text-spinner-char-viewport'); 
			for(i=0,l=this.charSet.length;i<l;i++){
				viewportEl.append($('<div>')
					.addClass('single-char char-'+i)
					.css('top',(1.4*i)+'em')
					.html(this.charSet[i]));
			}
		},
		/**
         * @name TextSpinner#render
         * @description Renders the @link{TextSpinner}[TextSpinner] widget.
         * The first call to this method must pass a DOMElement to add the widget to. 
         * All subsequent calls do not need a parentEl. Also note if no parent container
         * is passed during the first call, the widget will be added to the body of the page. 
         * @param {DOMElement} parentEl the element to add the widget to. 
         * @param {number} the number of places to render
         * @methodOf TextSpinner
         */
		render:function(parentEl,places){
			var charEl,i,l,viewportEl,
			par = parentEl || $('body');
			this.places = places || this.places;
			if (!this.el){
				this.el = $('<div>')
					.addClass('vs-text-spinner')
					.appendTo(parentEl); 
				for(i=0,l=this.places;i<l;i++){
					this.addChar();
				}
			}else if (places && (places !== this.places)){
				var dif = places - this.places;
				if (dif > 0){
					//add places
					for(i=this.places;i<places;i++){
						this.addChar();					
					}
				}else {
					//remove places
					for(i=0,l=Math.abs(dif);i<l;i++){
						this.removeChar();
					}
				}
			}
			this.items = this.el.find('.text-spinner-char').reverse();
		},
		/**
         * @name TextSpinner#removeClass
         * @methodOf TextSpinner
         * @param {string} clz the class to remove from the widget's element
         * @description provides a way to remove custom CSS classes from the widget
         */
		removeClass:function(clz){
			this.el.removeClass(clz); 
		},
		/**     
         * @name TextSpinner#adClass
         * @methodOf TextSpinner
         * @param {string} clz the class to add to the widget's element
         * @description provides a way to add own CSS classes.
         * The method is intended for users to add their own style to the 
         * widget. 
         */
		addClass:function(clz){
			this.el.addClass(clz); 
		}

	};

	$W.vs = $W.vs || {};
	$W.vs.TextSpinner = TextSpinner;
})(window,document,jQuery); 