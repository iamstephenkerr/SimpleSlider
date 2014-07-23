;(function( $, window, document, undefined ){

	var SimpleSlider = function( elem, options ){
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options;
		this.images = (this.$elem.attr('data-set').length > 0)? 
							this.$elem.attr('data-set').split(',') : [];
		this.slideCount = this.$elem.find('[data-slide]').length;
		this.current = -1;

		this.metadata = this.$elem.data( "SimpleSlider-options" );

	};

	// the SimpleSlider prototype
	SimpleSlider.prototype = {
		defaults: {
			message: "Hello world!"
		},
		init: function() {
			var self = this;

			this.config = $.extend({}, this.defaults, this.options,
			this.metadata);

			this.$elem.on('click', '.next', function(){
				self.nextSlide();
			});
			this.$elem.on('click', '.back', function(){
				self.previousSlide();
			});

			return this;
		},

		nextSlide: function() {
			
			this.current = this.current + 1;

			if(this.current >= this.slideCount){

				this.current = 0;

			}

			if(this.current < this.slideCount){

				this.$elem.find("[data-slide]").hide();
				this.$elem.find("[data-slide='"+(this.current+1)+"']").fadeIn();

				if(typeof this.images[this.current] !== 'undefined'){
					this.$elem.css({
						'background-image': 'url('+this.images[this.current]+')'
					})
				}
			}
		},

		previousSlide: function(){
			
			if(0 >= this.current){
				this.current = this.slideCount;
			}

			this.current = this.current - 1;

			if(0 <= this.current){
				
				this.$elem.find("[data-slide]").hide();
				this.$elem.find("[data-slide='"+(this.current+1)+"']").fadeIn();
				
				if(typeof this.images[this.current] !== 'undefined'){
					this.$elem.css({
						'background-image': 'url('+this.images[this.current]+')'
					})
				}

			}
		}
	}

	SimpleSlider.defaults = SimpleSlider.prototype.defaults;

	$.fn.SimpleSlider = function(options) {

		return this.each(function() {
			new SimpleSlider(this, options).init();
		});
	};

})( jQuery, window , document );