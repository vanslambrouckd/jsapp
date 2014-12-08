/*
using AMD / Object literals / Module pattern

modules = independent blocks of functionality for your application

modules have a very limited knowlegde of what's going on in the rest of the system.
Instead, we delegate this responsibility to a mediator via a facade

modules should not rely on other modules in order to function correctly: loose coupling


 Within the module pattern, 
 variables or methods declared are only available inside the module itself thanks to closure. 
 Variables or methods defined within the returning object however are available to everyone. 

- modules subscribe to notifications of interest,
rapidly react to changes

- module notifies the app when something interesting happens (publish)
 */
(function(app) {
    app.core.define('#status-widget', function(f) {
    	var counter = null, currentCount = 0;
        return {
            init: function() {
            	console.log('init executed');

            	f.subscribe('new entry', this.updateStatus);
            },
            destroy: function() {
            	console.log('destroy executed');
            },
            updateStatus: function(data) {
            	currentCount++;
            	f.publish({
            		type: 'counter-updated'
            	});
            }
        };
    });

    console.log(this);
    app.core.startAll();
})(app);