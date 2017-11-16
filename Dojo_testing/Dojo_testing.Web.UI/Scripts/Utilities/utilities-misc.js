/* Copyright/Author
 ------------------------------------------------------------------------------------------------------------*/

/*
 * Project Title:      FMS.Web.UI (Web Application)
 * Project Version:    10.0.0.2406
 * Company:            NETSinapsa & GDi Gisdata d.o.o.
 * Authors:            Petar Maletić (NETSinapsa)
 * Contributors:       ----------------------------------
 * Copyright/TM:       Copyright (C) 2015, GDi Gisdata d.o.o., All rights reserved.
 * Information:        http://www.gisdata.hr, http://www.netsinapsa.hr
 * Contact:            petar.maletic@netsinapsa.hr
 */

/* utilities-misc.js Script
 ------------------------------------------------------------------------------------------------------------*/

/**
 * Misc global utilities and helpers.
 * NOTE:
 * This script is NOT application specific.
 */
(function() {

    /* Helpers
     --------------------------------------------------------------*/

    /**
     * The list of JavaScript types.
     * @enum {string}
     */
    this.JsType = {
        UNDEFINED: "undefined",
        NUMBER: "number",
        STRING: "string",
        BOOLEAN: "boolean",
        FUNCTION: "function",
        OBJECT: "object"
    };

    /**
     * DelayedTask class used to provide a convenient way to buffer the execution of a method.
     * NOTE:
     * A new timeout cancels the old timeout and when called, the task will wait the specified
     * time period before executing. If during that time period, the task is called again, the
     * original call will be cancelled.
     * @param {Function} func
     * @param {Object} scope
     * @param {Array<*>} args
     * @param {boolean} cancelOnDelay
     * @constructor
     */
    this.DelayedTask = function(func, scope, args, cancelOnDelay) {
        var THIS = this,
            delay,
            call = function() {
                clearInterval(THIS.id);
                THIS.id = null;
                func.apply(scope, args || []);
            };

        cancelOnDelay = typeof cancelOnDelay === 'boolean' ? cancelOnDelay : true;

        // Currently pending invocation ID, set to null if there is no invocation pending.
        THIS.id = null;

        /**
         * By default, cancels any pending timeout and queues a new one.
         * NOTE:
         * If the cancelOnDelay parameter was specified as false in the constructor, this does
         * not cancel and reschedule, but just updates the call settings, newDelay, newFn, newScope
         * or newArgs, whichever are passed.
         * @param {number} newDelay The milliseconds to delay
         * @param {Function} newFunc (optional) Overrides function passed to constructor
         * @param {Object} newScope (optional) Overrides scope passed to constructor
         * @param {Array} newArgs (optional) Overrides args passed to constructor
         */
        THIS.delay = function(newDelay, newFunc, newScope, newArgs) {
            if (cancelOnDelay)
                THIS.cancel();

            if (typeof newDelay === 'number')
                delay = newDelay;

            func = newFunc || func;
            scope = newScope || scope;
            args = newArgs || args;

            if (!THIS.id)
                THIS.id = setInterval(call, delay);
        };

        /**
         * Cancels the last queued timeout.
         */
        THIS.cancel = function() {
            if (THIS.id) {
                clearInterval(THIS.id);
                THIS.id = null;
            }
        };
    };

    /**
     * EventUtil class that contains misc helper methods for JavaScript events.
     */
    this.EventUtil = {

        /**
         * Adds the event handler to the specified element.
         * @param {Element} el
         * @param {string} type
         * @param {Function} handler
         */
        addHandler: function(el, type, handler) {
            if (el.addEventListener)
                el.addEventListener(type, handler, false);
            else if (el.attachEvent)
                el.attachEvent("on" + type, handler);
            else
                el["on" + type] = handler;
        },

        /**
         * Gets the event button.
         * @param {Event} evt
         * @return {number}
         */
        getButton: function(evt) {
            if (document.implementation.hasFeature("MouseEvents", "2.0"))
                return evt.button;
            else {
                switch (evt.button) {
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;
                case 2:
                case 6:
                    return 2;
                case 4:
                    return 1;
                }
            }

            return null;
        },

        /**
         * Gets the event char code.
         * @param {Event} evt
         * @return {string}
         */
        getCharCode: function(evt) {
            if (typeof evt.charCode == "number")
                return evt.charCode;
            else
                return evt.keyCode;
        },

        /**
         * Gets the clipboard text.
         * @param {Event} evt
         * @return {string}
         */
        getClipboardText: function(evt) {
            var clipboardData = (evt.clipboardData || window.clipboardData);
            return clipboardData.getData("text");
        },

        /**
         * Gets the event.
         * @param {Event} evt
         * @return {Event}
         */
        getEvent: function(evt) {
            return evt ? evt : window.event;
        },

        /**
         * Get the event related target.
         * @param {Event} evt
         * @return {Object}
         */
        getRelatedTarget: function(evt) {
            if (evt.relatedTarget)
                return evt.relatedTarget;
            else if (evt.toElement)
                return evt.toElement;
            else if (evt.fromElement)
                return evt.fromElement;
            else
                return null;
        },

        /**
         * Gets the event target.
         * @param {Event} evt
         * @return {Object}
         */
        getTarget: function(evt) {
            return evt.target || evt.srcElement;
        },

        /**
         * Gets the wheel data.
         * @param {Event} evt
         * @return {number}
         */
        getWheelDelta: function(evt) {
            if (evt.wheelDelta)
                return (client.engine.opera && client.engine.opera < 9.5 ? -evt.wheelDelta : evt.wheelDelta);
            else
                return -evt.detail * 40;
        },

        /**
         * Prevents any default action associated with the event.
         * @param {Event} evt
         */
        preventDefault: function(evt) {
            if (evt.preventDefault)
                evt.preventDefault();
            else
                evt.returnValue = false;
        },

        /**
         * Removes the event handler from the specified element.
         * @param {Element} el
         * @param {string} type
         * @param {Function} handler
         */
        removeHandler: function(el, type, handler) {
            if (el.removeEventListener)
                el.removeEventListener(type, handler, false);
            else if (el.detachEvent)
                el.detachEvent("on" + type, handler);
            else
                el["on" + type] = null;
        },

        /**
         * Sets the clipboard text.
         * @param {Event} evt
         * @param {string} value
         */
        setClipboardText: function(evt, value) {
            if (evt.clipboardData)
                evt.clipboardData.setData("text/plain", value);
            else if (window.clipboardData)
                window.clipboardData.setData("text", value);
        },

        /**
         * Stops the event from bubbling.
         * @param {Event} evt
         */
        stopPropagation: function(evt) {
            if (evt.stopPropagation)
                evt.stopPropagation();
            else
                evt.cancelBubble = true;
        }
    };

    /**
     * Formats the number with specified decimal digit places and thousand separator.
     * @param {string} value
     * @param {number} decimalDigits
     * @param {string} thousandSeparator
     * @return {string}
     */
    this.formatNumber = function(value, decimalDigits, thousandSeparator) {
        if (!value)
            return null;

        var separatorLength = 3;
        var tmpValue = "" + value;
        var newValue = "";
        var beforeDecimal;
        var afterDecimal;

        if (tmpValue.indexOf(".") == -1)
            tmpValue += ".";

        beforeDecimal = tmpValue.substr(0, tmpValue.indexOf("."));
        afterDecimal = tmpValue.substr(tmpValue.indexOf("."));

        while (afterDecimal.length - 1 < decimalDigits) {
            afterDecimal += "0";
        }

        if (afterDecimal == ".")
            afterDecimal = "";

        if (beforeDecimal.length > separatorLength) {
            while (beforeDecimal.length > separatorLength) {
                newValue = thousandSeparator + beforeDecimal.substr(beforeDecimal.length - separatorLength) + newValue;
                beforeDecimal = beforeDecimal.substr(0, beforeDecimal.length - separatorLength);
            }

            newValue = beforeDecimal + newValue;
        } else
            newValue = beforeDecimal;

        newValue = newValue + afterDecimal;
        return newValue;
    };

    /**
     * Get the integer from the specified value.
     * @param {string} value
     * @return {number}
     */
    this.getInt = function(value) {
        if (!isDef(value) || value == "")
            return 0;

        var tempInt = parseInt(value);

        if (!(tempInt <= 0 || tempInt > 0))
            return 0;

        return tempInt;
    };

    /**
     * Gets the querystring, returns default if empty.
     * @param {string} key
     * @param {string} defaultVal
     * @return {string}
     */
    this.getQuerystring = function(key, defaultVal) {
        if (defaultVal == null)
            defaultVal = "";

        key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
        var qs = regex.exec(window.location.href);

        if (qs == null)
            return defaultVal;
        else
            return qs[1];
    };

    /**
     * Gets the random integer.
     * @param {number} min
     * @param {number} max
     * @return {number}
     */
    this.getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    /**
     * Gets the random string.
     * @param {number} length
     * @return {string}
     */
    this.getRandomString = function(length) {
        var validChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

        if (!length)
            length = Math.floor(Math.random() * validChars.length);

        var str = "";

        for (var i = 0; i < length; i++) {
            str += validChars[Math.floor(Math.random() * validChars.length)];
        }

        return str;
    };

    /**
     * Gets the window size.
     * @return {Object}
     */
    this.getWindowSize = function() {
        var windowSize = { w: 0, h: 0 };

        if (window.innerHeight) {
            windowSize.w = window.innerWidth;
            windowSize.h = window.innerHeight;
        } else if (document.documentElement.clientHeight) {
            windowSize.w = document.documentElement.clientWidth;
            windowSize.h = document.documentElement.clientHeight;
        } else if (document.body.clientHeight) {
            windowSize.w = document.body.clientWidth;
            windowSize.h = document.body.clientHeight;
        }

        return windowSize;
    };

    /**
     * Improved augment function.
     * @param {Object} receivingClass
     * @param {Object} givingClass
     */
    this.impAugment = function(receivingClass, givingClass) {
        if (arguments[2]) {
            // Only give certain methods.
            for (var i = 2, il = arguments.length; i < il; i++) {
                receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
            }
        } else {
            // Give all methods.
            for (var methodName in givingClass.prototype) {
                if (!receivingClass.prototype[methodName])
                    receivingClass.prototype[methodName] = givingClass.prototype[methodName];
            }
        }
    };

    /**
     * Improved extend function.
     * @param {Object} subClass
     * @param {Object} superClass
     */
    this.impExtend = function(subClass, superClass) {
        var F = function() {
        };

        F.prototype = superClass.prototype;
        subClass.prototype = new F();
        subClass.prototype.constructor = subClass;
        subClass.superclass = superClass.prototype;

        if (superClass.prototype.constructor == Object.prototype.constructor)
            superClass.prototype.constructor = superClass;
    };

    /**
     * Checks if the specified object is checkbox.
     * @param {Object} obj
     * @return {boolean}
     */
    this.isCheckBox = function(obj) {
        if (isNull(obj))
            return false;

        return (obj.tagName == "INPUT" && obj.type == "checkbox");
    };

    /**
     * Checks if the specified object is not "undefined".
     * WARNING:
     * Do not use this to test if an object has a property. Use the in operator instead.
     * @param {Object} obj
     * @return {boolean}
     */
    this.isDef = function(obj) {
        return typeof(obj) != JsType.UNDEFINED;
    };

    /**
     * Checks if the specified object is div.
     * @param {Object} obj
     * @return {boolean}
     */
    this.isDiv = function(obj) {
        if (isNull(obj))
            return false;

        return (obj.tagName == "DIV");
    };

    /**
     * Checks if the specified object is link.
     * @param {Object} obj
     * @return {boolean}
     */
    this.isLink = function(obj) {
        if (isNull(obj))
            return false;

        return (obj.tagName == "A");
    };

    /**
     * Checks if the specified object is list.
     * @param {Object} obj
     * @return {boolean}
     */
    this.isList = function(obj) {
        if (isNull(obj))
            return false;

        return (obj.tagName == "UL" || obj.tagName == "OL");
    };

    /**
     * Checks if the specified object is list item.
     * @param {Object} obj
     * @return {boolean}
     */
    this.isListItem = function(obj) {
        if (isNull(obj))
            return false;

        return (obj.tagName == "LI");
    };

    /**
     * Checks if the specified object is list item.
     * @param {Object} obj
     * @return {boolean}
     */
    this.isNull = function(obj) {
        return (obj == null);
    };
}());