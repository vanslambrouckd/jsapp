/*
using the facade pattern

THE SANDBOX

interface for ensuring modules don't directly access the core / libraries

the sandbox (facade) has publish() and subscribe() methods
which the mediator implements

-an abstraction of the core that's an API for common tasks, used by modules

higher level interface for a larger body of code, hiding it's true underlying complexity
(think of it as simplifying the API being presented to other developers)

The reason the facade is of interest is because it's ability to hide implementation-specific details
about a body of functionality contained in individual modules.
The implementation of a module can be changed without the clients really knowing about it.

By maintaining a consistent facade (simplified API), the worry about whether a module extensively uses doyo, jQuery, zepto, YUI or something else
becomes significantly less important.

2) the sandbox is permissions manager: securing what modules can / can't access

facade is an abstraction of the application core (core.js) which sites between the mediator and our modules
facade should ideally be the only other part of the system, the modules are aware of

facade also should act as security guard, determining which parts of the app a module can access.
 
 ----------
 Although the architecture outlined uses a facade to implement security features,
it's entirely possible to get by using a mediator and pub/sub to communicate events of interest throughout the application without using a facade.
This lighter version would offer a similar level of decoupling, but ensure you're comfortable with modules directly touching the application core (mediator) if opting for this variation.
 */
(function(app) {
    app.facade = {
        define: function(core, module) {
        	var events = core.events;
        	var dom = core.dom;

            return {
            	publish:function(e) {
            		events.trigger(e);
            	},
            	subscribe: function(e) {
            		events.register(e, module);
            	},
                getRandomColor: function() {
                    return app.getRandomColor();
                },
                animate: function() {
                	return dom.animate(el, props, duration);
                },
                css: function(el, props) {
                	dom.css(el, props);
                },
                bind: function(el, evt, fn) {

                },
                unbind:function(el, evt, fn) {
                	dom.unbind(el, evt, fn);
                }
            };
        }
    };
})(app);