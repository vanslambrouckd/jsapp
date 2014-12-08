(function() {
    define(['jquery'], function($) {
        var base = {};
        base.$ = $;

        base.util = {
            utilFunc: function() {
                console.log('this is an utility function');
            }
        }
        return base;
    });
})();