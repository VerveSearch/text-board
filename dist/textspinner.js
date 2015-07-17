(function($W,$D,$){
	jQuery.fn.reverse = function(){
		return $(Array.prototype.reverse.call(this));
	};
	var TextSpinner = function(places,charSet){
		this.places = places; 
		this.charSet = (typeof charSet === "string")?charSet.split(''):charSet;
		this.el = null;
		this.viewportEl = null;
	};

	TextSpinner.prototype = {
		setText:function(num){
			var n = (num+'').split('').reverse(),
				clz = 'char-',idx,i,l; 
			if (n.length !== this.places){
				this.render(null,n.length);
				this.places = n.length;
			}
			for(i=0,l=this.places;i<l;i++){
				idx = this.charSet.indexOf(n[i]); 
				if (idx !== -1){
					this.items
						.eq(i)
						.attr('class','text-board-char')
						.addClass(clz+idx);
				}else {
					this.items
						.eq(i)
						.attr('class','text-board-char')
						.addClass('char-0');
				}
			}
		},
		addChar:function(){
			var charEl = $('<div>')
				.addClass('text-board-char')
				.append($('<div>')
					.addClass('text-board-char-viewport'))
				.appendTo(this.el);
			this.addCharSetToChar(charEl);
			return charEl;
		},
		removeChar:function(){
			this.el.find('.text-board-char').first().remove();
		},
		addCharSetToChar:function(charEl){
			var viewportEl = charEl.children('.text-board-char-viewport'); 
			for(i=0,l=this.charSet.length;i<l;i++){
				viewportEl.append($('<div>')
							.addClass('single-char char-'+i)
							.html(this.charSet[i]));
			}
		},
		render:function(parentEl,places){
			var charEl,i,l,viewportEl;
			if (!this.el){
				this.el = $('<div>')
					.addClass('vs-text-board')
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
			this.items = this.el.find('.text-board-char').reverse();
		},
		removeClass:function(clz){
			this.el.removeClass(clz); 
		},
		addClass:function(clz){
			this.el.addClass(clz); 
		}

	};

	$W.vs = $W.vs || {};
	$W.vs.TextSpinner = TextSpinner;
})(window,document,jQuery); 