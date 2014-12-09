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
                data[id] = {
                    define: constructor,
                    instance: null
                };
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
                if (module && module.instance) {
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
                    //console.log('----');
                    for (mod in data) {
                        //console.log(data[mod].id);
                        if (data.hasOwnProperty(mod)) {
                            mod = data[mod];
                            if (mod.events && mod.events[events.type]) {
                                //console.log(mod.events[events.type], events.data);
                                mod.events[events.type](events.data);
                            }
                        }
                    }
                },
                remove: function() {}
            },
            dom: {
                animate: function(el, props, duration) {},
                css: function(el, props) {

                    var q = null;
                    props = props || el;

                    //chaining
                    if (this._elements != undefined) {
                        el = this._elements;
                    }

                    // jQuery object
                    if (el instanceof jQuery) {
                        q = el.css(props);
                    } else {
                        // string selector
                        if (app.utils.typeEqual(el, 'string')) {
                            q = app.core.dom.$(el).css(props);
                        }
                        // array
                        else if (app.utils.typeEqual(el, 'array')) {
                            q = app.core.dom.$(el).css(props);
                        } else {
                            q = el;
                        }
                    }

                    this._elements = q;
                    return this;

                },
                bind: function(el, evt, fn) {
                    if (el && evt) {
                        app.core.dom.$(el).bind(evt, fn);
                    }
                },
                unbind: function(el, evt, fn) {
                    app.core.dom.$(el).unbind(evt, fn);
                },
                query: function(selector, context) {
                    var ret = {},
                        that = this, jqEls,
                        i = 0;

                    if (context && context.find) {
                        jqEls = context.find(selector);
                    } else {

                        jqEls = app.core.dom.$(selector);
                    }

                    ret = jqEls.get();
                    ret.length = jqEls.length;
                    ret.query = function(sel) {
                        return that.query(sel, jqEls);
                    }

                    this._elements = ret;
                    return this;
                },
                $: function(args) {
                    return $(args);
                },
                createElement: function(el) {
                    return document.createElement(el);
                },
                attr: function(el, attribs) {
                    app.core.dom.$(el).attr(attribs);
                },
                isArray: function(arr) {
                    return jQuery.isArray(arr);
                }
            }
        };
    })();
})(app);