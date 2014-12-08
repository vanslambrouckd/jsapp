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

modules do NOT directly communicate with one another.

mediator:
-decouples modules by introducing intermediary as central point of control.
It allosw modules to broadcast (publish) or listen (subscribe) for messages 
without being concerned with the rest of the system.
Messages can be handles by any number of modules at once.
 */
(function(app) {
	app.core.define('#todo-counter', function(f) {
		return {
			init: function() {
			}
		};
	});

	app.core.define('#status-widget', function(f) {
    	var counter = null, currentCount = 0;
        return {
            init: function() {
            	f.subscribe({ 'new-entry': this.updateStatus});
            },
            destroy: function() {
            	console.log('destroy executed');
            },
            updateStatus: function(data) {
            	currentCount++;
            	console.log('updateStatus called');
            	f.publish({
            		type: 'counter-updated'
            	});
            }
        };
    });

	app.core.define('#todo-entry', function(f) {
		return {
			init: function() {
				f.publish({
					type: 'new-entry',
					data: 'entry value'
				});
			}
		};
	});
    
    app.core.startAll();
})(app);