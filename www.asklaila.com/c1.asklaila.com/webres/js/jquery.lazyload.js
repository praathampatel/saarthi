(function(e, t, n, r) {
    var i = e(t);
    e.fn.lazyload = function(s) {
        function f() {
            var t = 0;
            o.each(function() {
                var n = e(this);
                if (a.skip_invisible && !n.is(":visible")) {
                    return
                }
                if (e.abovethetop(this, a) || e.leftofbegin(this, a)) {} else if (!e.belowthefold(this, a) && !e.rightoffold(this, a)) {
                    n.trigger("appear");
                    t = 0
                } else {
                    if (++t > a.failure_limit) {
                        return false
                    }
                }
            })
        }
        var o = this;
        var u;
        var a = {
            threshold: 0,
            failure_limit: 0,
            event: "scroll",
            effect: "show",
            container: t,
            data_attribute: "original",
            skip_invisible: true,
            appear: null,
            load: null,
            placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
        };
        if (s) {
            if (r !== s.failurelimit) {
                s.failure_limit = s.failurelimit;
                delete s.failurelimit
            }
            if (r !== s.effectspeed) {
                s.effect_speed = s.effectspeed;
                delete s.effectspeed
            }
            e.extend(a, s)
        }
        u = a.container === r || a.container === t ? i : e(a.container);
        if (0 === a.event.indexOf("scroll")) {
            u.bind(a.event, function() {
                return f()
            })
        }
        this.each(function() {
            var t = this;
            var n = e(t);
            t.loaded = false;
            if (n.attr("src") === r || n.attr("src") === false) {
                if (n.is("img")) {
                    n.attr("src", a.placeholder)
                }
            }
            n.one("appear", function() {
                if (!this.loaded) {
                    if (a.appear) {
                        var r = o.length;
                        a.appear.call(t, r, a)
                    }
                    e("<img />").bind("load", function() {
                        var r = n.attr("data-" + a.data_attribute);
                        n.hide();
                        if (n.is("img")) {
                            n.attr("src", r)
                        } else {
                            n.css("background-image", "url('" + r + "')")
                        }
                        n[a.effect](a.effect_speed);
                        t.loaded = true;
                        var i = e.grep(o, function(e) {
                            return !e.loaded
                        });
                        o = e(i);
                        if (a.load) {
                            var s = o.length;
                            a.load.call(t, s, a)
                        }
                    }).attr("src", n.attr("data-" + a.data_attribute))
                }
            });
            if (0 !== a.event.indexOf("scroll")) {
                n.bind(a.event, function() {
                    if (!t.loaded) {
                        n.trigger("appear")
                    }
                })
            }
        });
        i.bind("resize", function() {
            f()
        });
        if (/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)) {
            i.bind("pageshow", function(t) {
                if (t.originalEvent && t.originalEvent.persisted) {
                    o.each(function() {
                        e(this).trigger("appear")
                    })
                }
            })
        }
        e(n).ready(function() {
            f()
        });
        return this
    };
    e.belowthefold = function(n, s) {
        var o;
        if (s.container === r || s.container === t) {
            o = (t.innerHeight ? t.innerHeight : i.height()) + i.scrollTop()
        } else {
            o = e(s.container).offset().top + e(s.container).height()
        }
        return o <= e(n).offset().top - s.threshold
    };
    e.rightoffold = function(n, s) {
        var o;
        if (s.container === r || s.container === t) {
            o = i.width() + i.scrollLeft()
        } else {
            o = e(s.container).offset().left + e(s.container).width()
        }
        return o <= e(n).offset().left - s.threshold
    };
    e.abovethetop = function(n, s) {
        var o;
        if (s.container === r || s.container === t) {
            o = i.scrollTop()
        } else {
            o = e(s.container).offset().top
        }
        return o >= e(n).offset().top + s.threshold + e(n).height()
    };
    e.leftofbegin = function(n, s) {
        var o;
        if (s.container === r || s.container === t) {
            o = i.scrollLeft()
        } else {
            o = e(s.container).offset().left
        }
        return o >= e(n).offset().left + s.threshold + e(n).width()
    };
    e.inviewport = function(t, n) {
        return !e.rightoffold(t, n) && !e.leftofbegin(t, n) && !e.belowthefold(t, n) && !e.abovethetop(t, n)
    };
    e.extend(e.expr[":"], {
        "below-the-fold": function(t) {
            return e.belowthefold(t, {
                threshold: 0
            })
        },
        "above-the-top": function(t) {
            return !e.belowthefold(t, {
                threshold: 0
            })
        },
        "right-of-screen": function(t) {
            return e.rightoffold(t, {
                threshold: 0
            })
        },
        "left-of-screen": function(t) {
            return !e.rightoffold(t, {
                threshold: 0
            })
        },
        "in-viewport": function(t) {
            return e.inviewport(t, {
                threshold: 0
            })
        },
        "above-the-fold": function(t) {
            return !e.belowthefold(t, {
                threshold: 0
            })
        },
        "right-of-fold": function(t) {
            return e.rightoffold(t, {
                threshold: 0
            })
        },
        "left-of-fold": function(t) {
            return !e.rightoffold(t, {
                threshold: 0
            })
        }
    })
})(jQuery, window, document)