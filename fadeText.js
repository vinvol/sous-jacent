// fadeText.js
(function ($) {
    "use strict";
    var FadeText = function (element, textList) {
            var elem = $(element),
                obj = this,
                hasRollOver = false,
                settings = $.extend({
                    param: 'defaultValue'
                }, textList || ["no text"]),
                textArray = [],
                index = 0,
                transition = $.browser.webkit ? "webkitTransitionEnd" : ($.browser.opera ? "oTransitionEnd" : ($.browser.msie ? "MSTransitionEnd" : "transitionend")),
                // Private method - can only be called from within this object
                privateMethod = function () {
                    console.log('private method called!');
                },
                textCleared = function () {
                    //console.log('textCleared');
                    elem.one("mouseenter", function () {
                        console.log('mouse enter : ' + index);
                        elem.addClass("fading");
                        elem.one(transition, textBlurred);
                    });
                },
                textBlurred = function () {
                    //console.log('textBlurred');
                    elem.unbind(transition);
                    index = index + 1;
                    elem.trigger("fadeText" + index);
                    elem.text(textArray[index]);
                    elem.removeClass("fading");
                    elem.one(transition, textCleared);
                };


            // Public method - can be called from client code
            this.publicMethod = function () {
                console.log('public method called!');
            };

            this.stopRollOver = function () {
                if (hasRollOver === true) {
                    elem.unbind("mouseenter");
                    hasRollOver = false;
                }
            };

            this.startRollOver = function () {
                if (hasRollOver === false) {
                    elem.unbind("mouseenter");
                    hasRollOver = true;
                }
            };

            this.toggleRollOver = function () {
                if (hasRollOver === true) {
                    this.stopRollOver();
                } else {
                    this.startRollOver();
                }
            };

            if (typeof (textList) === "object") {
                textArray = textList;
            }
            elem.text(textArray[index]);
            elem.addClass("fadeText");
            textCleared();
        };

    $.fn.FadeText = function (options) {
        
        if ($(this).length !== 1) {
            console.warn("Unique object only");
        }
        
        // return this.each(function () {
            var element = $($(this)[0]),
                ft;

            // Return early if this element already has a plugin instance
            if (element.data('fadeText')) {
                return element;
            }

            // pass options to plugin constructor
            ft = new FadeText(this, options);

            // Store plugin object in this element's data
            element.data('fadeText', ft);
            return element;
        // });
    };
}(jQuery));