require.config({
    //baseUrl: 'js',
    paths: {
        jquery: 'components/jquery/dist/jquery.min'
    }
});

require(['app'], function(App) {
    console.log(App);
    var app = new App();
    //alert('ja');
});