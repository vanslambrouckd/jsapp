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
                //todo: check if instance methos exists
                //console.log(module.instance);
                module.instance.init();
                console.log(id + ' initialized');
            },
            stop: function(id) {
                var module = data[id];
                if(module && module.instance) {
                    module.instance.destroy();
                }
            },
            startAll: function() {
                /*
                start all modules
                */
                console.log('starting all modules');
                var id;                 
                for (id in data) {
                    //console.log(data['#todo-counter']);    
                    if (data.hasOwnProperty(id)) {
                        this.start(id);
                    }
                }
            },
            stopAll: function() {},

            events: {
                register: function(events, module) { //=facade.subscribe
                    if (module) {
                        if (data[module]) {
                            //console.log(events);
                            data[module].events = events;
                        }
                    }

                    //console.log(data[module].events);
                },
                trigger: function(events) { //=facade.publish
                    //console.log('trigger', events, data);
                    //console.log(data['#status-widget']);
                    var mod;
                    console.log('----');
                    for (mod in data) {
                        //console.log(data[mod].id);
                        if (data.hasOwnProperty(mod)) {                            
                            mod = data[mod];
                            if (mod.events && mod.events[events.type]) {
                                console.log(mod.events[events.type], events.data);
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