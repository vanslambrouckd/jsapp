define(['./base'], function(base) {
    console.log(base);
    function App(config) {
        app = this;
        var baseSandbox = Object.create(base);
        console.log(baseSandbox);
        app.facade = baseSandbox;
    }

    return App;
});