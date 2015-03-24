;(function( $, window, document, undefined ){
    'use strict';

    var SimpleSlider = function( elem, options ){
        this.elem = elem;
        this.$elem = $(elem);
        this.options = options;
        this.images = (this.$elem.attr('data-set').length > 0)? 
                            this.$elem.attr('data-set').split(',') : [];
        this.slideCount = this.$elem.find('[data-slide]').length;
        this.current = -1;

        this.metadata = this.$elem.data( 'SimpleSlider-options' );
        this.$elem.addClass('simple-slider');
        this.nextSlide(0);
    };

    // the SimpleSlider prototype
    SimpleSlider.prototype = {
        defaults: {
            resizeSpeed: 400
        },
        init: function() {
            var self = this,
                waitTillStop;

            this.defaults = $.extend({}, this.defaults, this.options, this.metadata);

            this.$elem.on('click', '.next', function(){
                self.nextSlide();
            });
            this.$elem.on('click', '.back', function(){
                self.previousSlide();
            });

            $(window).resize(function(){
                clearTimeout(waitTillStop);
                waitTillStop = setTimeout(function(){
                    self.updateHeight();
                }, 500);
            });

            return this;
        },

        updateHeight: function(resizeSpeed){
            
            var img = document.createElement('img'),
                self = this.$elem,
                ratio = 1;

            $(img).load(function(){
                var maxHeight = parseInt(self.css('max-height'));

                ratio = this.width / this.height;
                ratio = self.width() / ratio;

                if(ratio > maxHeight){
                    ratio = maxHeight;
                }

                self.animate({
                    'min-height': (ratio) + 'px'
                }, resizeSpeed);
            });

            img.src = this.images[this.current];

        },

        nextSlide: function() {
            var current = this.current;

            current = current + 1;

            if(current >= this.slideCount){

                current = 0;

            }

            if(current < this.slideCount){

                this.$elem.find('[data-slide]').hide();
                this.$elem.find('[data-slide=' + (current + 1) + ']').fadeIn();

                if(typeof this.images[current] !== 'undefined'){
                    this.$elem.css({
                        'background-image': 'url('+this.images[this.current]+')'
                    });
                }
            }

            this.updateHeight(this.defaults.resizeSpeed);
        },

        previousSlide: function(){
            var current = this.current;

            if(current <= 0){
                current = this.slideCount;
            }

            current = current - 1;

            if(current){
                
                this.$elem.find('[data-slide]').hide();
                this.$elem.find('[data-slide=' + (this.current + 1) + ']').fadeIn();
                
                if(typeof this.images[current] !== 'undefined'){
                    this.$elem.css({
                        'background-image': 'url(' + this.images[current] + ')'
                    });
                }

            }

            this.updateHeight(this.defaults.resizeSpeed);
        };
    }

    SimpleSlider.defaults = SimpleSlider.prototype.defaults;

    $.fn.SimpleSlider = function(options) {

        return this.each(function() {
            new SimpleSlider(this, options).init();
        });
    };

})( jQuery, window , document );
