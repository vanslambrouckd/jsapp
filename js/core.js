(function(app) {
    app.core = (function() {
        return {
            define: function() {
                /* define module */
            },
            start: function() {
                /* start module */
            },
            stop: function() {},
            startAll: function() {
                /*
                start all modules
                */
                console.log('starting all modules');
            },
            stopAll: function() {}
        };
    })();
})(app)