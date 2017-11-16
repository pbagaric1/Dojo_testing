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

/* App.Global Dojo Module
 ------------------------------------------------------------------------------------------------------------*/

/**
 * NOTE:
 * This dojo module is NOT application specific.
 */

/** @BEFORE */
/** @namespace
    dojo.provide("App.Global");*/
/** @using
 dojo.require("App.Constants"); */

define([
        "dojo/_base/lang",
        "App/Constants"
    ],
    function(lang) {

        /* AppUtils Class
         --------------------------------------------------------------*/

        /**
         * Application global/helpers utilities class.
         * NOTE:
         * This class uses mixed JavaScript libraries and server side utility methods.
         */
        AppUtils = (function() {

            /**
             * Checks if jQuery library is loaded.
             * @return {boolean}
             * @private
             */
            var _isJQueryLoaded = function() {
                try {
                    return isDef(jQuery);
                } catch (err) {
                    console.error("AppUtils._isJQueryLoaded::jQuery library is not loaded!", err);
                    return false;
                }
            };

            /**
             * Checks if Underscore library is loaded.
             * @return {boolean}
             * @private
             */
            var _isUnderscoreLoaded = function() {
                try {
                    return isDef(_);
                } catch (err) {
                    console.error("AppUtils._isUnderscoreLoaded::Underscore library is not loaded!", err);
                    return false;
                }
            };

            /* Public Interface
             --------------------------------------------------------------*/

            return {

                /* Methods
                 --------------------------------------------------------------*/

                /**
                 * Gets the number of values in the list.
                 * NOTE:
                 * Uses Underscore library!
                 * @param {Object|Array} list
                 * @return {number}
                 */
                getListSize: function(list) {
                    if (!_isUnderscoreLoaded() || !list)
                        return null;

                    return _.size(list);
                },

                /**
                 * Checks if the object is a Object type.
                 * @param {number} obj
                 * @return {boolean}
                 */
                isObject: function(obj) {
                    return obj && typeof obj === JsType.OBJECT;
                },

                /**
                 * Checks if the object is null or empty.
                 * NOTE:
                 * Uses jQuery and/or utilities-jquery.js!
                 * @param {Object} obj
                 * @return {boolean}
                 */
                isObjNoE: function(obj) {
                    if (!_isJQueryLoaded() || !obj)
                        return true;

                    return $.isEmptyObject(obj);
                },

                /**
                 * Checks if the object is a String type.
                 * @param {number} obj
                 * @return {boolean}
                 */
                isString: function(obj) {
                    return typeof obj === JsType.STRING;
                },

                /**
                 * Checks if the string is a String object, null, blank or empty.
                 * @param {string} str
                 * @return {boolean}
                 */
                isStrNoE: function(str) {
                    /** @BEFORE return !(str && dojo.isString(str) && !str.isBlank() && !str.isEmpty()); **/
                    return !(str && lang.isString(str) && !str.isBlank() && !str.isEmpty());
                }
            };
        })();
    });