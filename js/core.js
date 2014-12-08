/*
using the mediator pattern

app.core manages modules life:
starts, stpos, restarts if necessary

- reacts to actions passed back from a sandbox (facade)
- handles logic
- enables adding and removing modules without causing breaks
- handles error detection and management
 */
(function(app) {
    app.core = (function() {
        var data = {};

        return {
            define: function(id, constructor) {
                /* define module */
                temp = constructor(app.facade.define(this, id));
                data[id] = { define: constructor, instance: null };
            },
            start: function(id) {
                /* start module */
                var module = data[id];
                module.instance = module.define(app.facade.define(this, id));
                module.instance.init();
            },
            stop: function(id) {
                var module = data[id],
                if(module.instance) {
                    module.instance.destroy();
                }
            },
            startAll: function() {
                /*
                start all modules
                */
                console.log('starting all modules');
            },
            stopAll: function() {},

            events: {
                register: function(events, module) {
                    if (module) {
                        if (data[module]) {
                            data.module.events = events;
                        }
                    }
                },
                trigger: function(events) {
                    var mod;
                    for (mod in data) {
                        if (data.hasOwnProperty(mod)) {
                            mod = data[mod];
                            if (mod.events && mod.events[events.type]) {
                                mod.events[events.type](events.data);
                            }
                        }
                    }
                },
                remove: function() {

                }
            },
            dom: {
                animate: function(el, props, duration) {

                },
                css: function(el, props) {

                },
                bind: function(el, evt, fn) {

                },
                unbind: function(el, evt, fn) {

                }
            }
        };
    })();
})(app);