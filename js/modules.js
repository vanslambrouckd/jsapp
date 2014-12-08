(function(app) {
    app.core.define('#test', function() {
        return {
            init: function() {},
            destroy: function() {}
        }
    });

    console.log(this);
    app.core.startAll();
})(app);