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

/* App.Core Dojo Module
 ------------------------------------------------------------------------------------------------------------*/

/**
 * NOTE:
 * This dojo module is NOT application specific.
 */

/** @namespace */
dojo.provide("App.Core");

/** @using */
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dojo.DeferredList");
dojo.require("App.Constants");
dojo.require("App.Global");

/* App.Core Class
 --------------------------------------------------------------*/

/**
 * Core class, handles retrieving of config data and global resources data.
 * @sealed
 */
dojo.declare("App.Core",
    [dijit._Widget, dijit._Templated],
    {
        /* Properties
         --------------------------------------------------------------*/

        /** @type {Object} */
        cfgData: null,
        /** @type {Object} */
        gResData: null,
        /** @type {string} */
        templateString: "<div style='display: none;'></div>",

        /* Constructor
         --------------------------------------------------------------*/

        /** @constructor */
        constructor: function() {
            // console.log("Core::constructor");
        },

        /* Widget Lifecycle Events
         --------------------------------------------------------------*/

        /**
         * Handles processing after any DOM fragments have been actually added to the document.
         * It's not fired until after any child widgets have been created and started.
         * WARNING:
         * If instantiating a widget programmatically, always call the widget's startup() method.
         */
        startup: function() {
            // console.log("Core::startup");

            // Call parent method/implementation.
            this.inherited("startup", arguments);

            // Setup widget.
            this.setup();
        },

        /* Public Methods
         --------------------------------------------------------------*/

        /**
         * Setup the core widget.
         */
        setup: function() {
            // Wait for both config and global resources data to load and create deferred
            // for core data loading.
            var cfgDataDef = this._loadConfigData(),
                gResDataDef = this._loadGResData(),
                defList = new dojo.DeferredList([cfgDataDef, gResDataDef]);

            /**
             * Called when the core data is loaded.
             * @param {Array<Object>} response
             */
            var onCoreDataLoad = dojo.hitch(this, function(response) {
                if (!response)
                    return;

                // Publish event.
                dojo.publish("coreDataLoadedEvent", [this.cfgData, this.gResData]);
            });

            // Add callback function.
            defList.addCallback(onCoreDataLoad);
        },

        /* Private Methods
         --------------------------------------------------------------*/

        /**
         * Load the config data from the server.
         * @return {dojo.Deferred}
         * @private
         */
        _loadConfigData: function() {
            if (ctrlCfgDataProxy) {
                // Create deferred for config data loading.
                var def = new dojo.Deferred();
                def.addCallback(dojo.hitch(this, this.onConfigLoad));
                def.addErrback(dojo.hitch(this, this.onLoadError));

                // Call "GetConfigData" server method.
                ctrlCfgDataProxy.GetConfigData(function(response) {
                    def.callback(response);
                }, function(response) {
                    def.errback(response);
                });

                return def;
            } else {
                AppUtils.showErrMsg("Core._loadConfigData::Error retrieving config data proxy!");
                return null;
            }
        },

        /**
         * Load the global resources data from the server.
         * @return {dojo.Deferred}
         * @private
         */
        _loadGResData: function() {
            if (ctrlGResDataProxy) {
                // Create deferred for global resources data loading.
                var def = new dojo.Deferred();
                def.addCallback(dojo.hitch(this, this.onGResLoad));
                def.addErrback(dojo.hitch(this, this.onLoadError));

                // Call "GetGResData" server method.
                ctrlGResDataProxy.GetGResData(function(response) {
                    def.callback(response);
                }, function(response) {
                    def.errback(response);
                });

                return def;
            } else {
                AppUtils.showErrMsg("Core._loadGResData::Error retrieving global resources data proxy!");
                return null;
            }
        },

        /* Event Handlers
         --------------------------------------------------------------*/

        /**
         * Called when the config data is loaded.
         * @param {Object} response
         * @return {Object}
         * @event
         */
        onConfigLoad: function(response) {
            if (AppUtils.isObjNoE(response))
                AppUtils.showErrMsg("Core.onConfigLoad::Config data is null or empty!");

            // Set config data and return response object for deferreds.
            this.cfgData = response;
            return response;
        },

        /**
         * Called when the global resources data is loaded.
         * @param {Object} response
         * @return {Object}
         * @event
         */
        onGResLoad: function(response) {
            if (AppUtils.isObjNoE(response))
                AppUtils.showErrMsg("Core.onGResLoad::Global resources data is null or empty!");

            // Set global resources data and return response object for deferreds.
            this.gResData = response;
            return response;
        },

        /**
         * Called when the core data load error has occured.
         * @param {Object} response
         * @return {Object}
         * @event
         */
        onLoadError: function(response) {
            AppUtils.showErrMsg("Core.onLoadError::Error retrieving core data from the server!", response);

            // Return response object for deferreds.
            return response;
        }
    }
);