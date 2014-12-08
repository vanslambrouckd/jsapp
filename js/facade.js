(function(app) {
    app.facade = {
        define: function(core, module) {
            return {
                getRandomColor: function() {
                    return app.getRandomColor();
                }
            }
        }
    };
})(app);