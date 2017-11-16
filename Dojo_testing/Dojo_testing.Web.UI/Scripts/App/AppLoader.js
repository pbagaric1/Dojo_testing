/** @BEFORE
 /** @namespace
 dojo.provide("App.AppLoader");

 /** @using
 dojo.require("App.Constants");
 dojo.require("App.Global");

 dojo.declare("App.AppLoader",
 null,
 {});

 /* App.AppLoader Class
 --------------------------------------------------------------*/

/**
 * App loader, main script for starting up the application UI/page. Handles loading of dojo,
 * esri and application/map modules.
 * @sealed
 */

require([
        "dojo/_base/declare",
        "dojo/parser",
        "dojo/topic",
        "dojo/Deferred",
        "dojo/_base/lang",
        "dojo/on",
        "dojo/_base/array",
        "dojo/dom",
        "dojo/ready",
        "App/MapWidget",
        "App/Constants",
        "App/Global"
    ],
    function(declare, parser, topic, Deferred, lang, on, array, dom, ready) {
        return declare(null,
            {
                /* Properties
                         --------------------------------------------------------------*/

                /* Constructor
                 --------------------------------------------------------------*/

                /** @constructor */
                constructor: function () {
                    var someNumber = 15;
                    var someString = "asd";
                    var emptyString = "";

                    console.log('value = ' + someNumber + ' '+AppUtils.isString(someNumber));
                    console.log('value = ' + someString + ' ' + AppUtils.isString(someString));

                    //console.log("Is String NoE \n");
                    //console.log('value = ' + string + ' ' + AppUtils.isStrNoE(string));
                    //console.log('value = ' + emptyString + ' ' + AppUtils.isStrNoE(emptyString));
                    //console.log(string + AppUtils.isString(string));

                    this.loadRequirements();
                },

                /* Public Methods
                 --------------------------------------------------------------*/

                /**
                 * Loads all the requirements needed for application startup.
                 */
                /** @BEFORE
                 loadRequirements: function() {
                // General.
                dojo.require("dojo.cookie");
                dojo.require("dijit.dijit");
    
                // Form Widgets.
                dojo.require("dijit.form.Form");
                dojo.require("dijit.form.Button");
                dojo.require("dijit.form.CheckBox");
                dojo.require("dijit.form.DropDownButton");
                dojo.require("dijit.form.TextBox");
                dojo.require("dijit.form.TimeTextBox");
                dojo.require("dijit.form.ValidationTextBox");
                dojo.require("dijit.form.SimpleTextarea");
                dojo.require("dijit.form.ComboBox");
                dojo.require("dijit.form.Select");
                //dojo.require("dijit.form.FilteringSelect");
    
                // Menu Widgets.
                dojo.require("dijit.Menu");
                dojo.require('dijit.MenuItem');
                dojo.require('dijit.MenuSeparator');
    
                // Data Classes.
                dojo.require("dojo.data.ItemFileReadStore");
                dojo.require("dojo.data.ItemFileWriteStore");
    
                // ESRI Classes.
                dojo.require("esri.map");
                dojo.require("esri.tasks.route");
                dojo.require("esri.layers.osm");
                dojo.require("esri.virtualearth.VETiledLayer");
                dojo.require("esri.dijit.OverviewMap");
                dojo.require("esri.dijit.Scalebar");
    
                // App Main Classes (widgets placed on main master page/s).
                dojo.require("App.MapController");
                dojo.require("App.Core");
                dojo.require("App.MapManager");
                dojo.require("App.Map");
                dojo.require("App.MapMenu");
                dojo.require("App.MapMenu2");
                dojo.require("App.WidgetDefs");
    
                // Startup. */
                loadRequirements: function () {
                    /** @BEFORE
                    dojo.addOnLoad(this, this.onPageLoad);
                    }, */
                    ready(this, this.onPageLoad);
                },

                /**
                 * Setup the app loader.
                 */
                setup: function() {
                    // Subscribe - events.
                    /** @BEFORE dojo.subscribe("mapContainerResizeEvent", this, this.onMapContainerResize); **/
                    //topic.subscribe("mapContainerResizeEvent", this, this.onMapContainerResize);

                    //// Wait for map container to resize.
                    ///** @BEFORE this.mapContainerResizeDef = new dojo.Deferred(); **/
                    //this.mapContainerResizeDef = new Deferred();

                    //// When map container is resized parse page.
                    ///** @BEFORE this.mapContainerResizeDef.then(dojo.hitch(this, function() { **/
                    //this.mapContainerResizeDef.then(lang.hitch(this, function() {
                    //    // Parse page.
                    //    this._parsePage();

                    //    // Connect resize event.
                    //    /** @BEFORE dojo.connect(window, "onresize", this, "onPageResize"); **/
                    //    on(window, "onresize", this, "onPageResize");
                    //}));

                    this._parsePage();
                },

                /* Private Methods
                 --------------------------------------------------------------*/

                /**
                 * Parses (dojo.parser) the current page.
                 * WARNING:
                 * This method only parses widgets that are specified in the djConfig.widgetIDs
                 * array inside Config/Scripts.config xml file. Because dojo layout widgets are
                 * used, all other widgets (except app main classes) are automatically parsed.
                 * @private
                 */
                _parsePage: function() {
                    // Parse DOM for specified dojo widgets (improved perfomance).
                    /** @BEFORE  dojo.forEach(djConfig.widgetIDs, function(id) { **/
                    array.forEach(dojoConfig.widgetIDs,
                        function(id) {
                            /** @BEFORE  dojo.parser.parse(dojo.byId(id)); **/
                            parser.parse(dom.byId(id));
                        });
                },

                /* Event Handlers
                 --------------------------------------------------------------*/

                /**
                 * Called when the map container is resized.
                 * @event
                 */
                onMapContainerResize: function() {
                    // Unsubscribe from event and fire deferred chain defined in setup.
                    /** @BEFORE dojo.unsubscribe("mapContainerResizeEvent"); **/
                    handle.remove("mapContainerResizeEvent");
                    this.mapContainerResizeDef.callback([]);
                },

                /**
                 * Called when the map is loaded.
                 * @param {esri.Map} map
                 * @param {esri.layers.Layer} activeBaseMap
                 * @event
                 */
                onMapLoad: function(map, activeBaseMap) {
                    this.hidePreloader();
                },

                /**
                 * Called when the page is loaded.
                 * @event
                 */
                onPageLoad: function() {
                    this.setup();
                },

                /**
                 * Called when the page (window) is resized.
                 * @event
                 */
                onPageResize: function() {
                    clearTimeout(this.pageResizeTimer);

                    /** @BEFORE this.pageResizeTimer = setTimeout(dojo.hitch(this, function() { **/
                    this.pageResizeTimer = setTimeout(lang.hitch(this,
                            function() {
                                // Publish event.
                                /** @BEFORE dojo.publish("pageResizeRequestEvent"); **/
                                topic.publish("pageResizeRequestEvent");

                                try {
                                    // Resize reports map and chart.
                                    if (resizeReportsMap)
                                        resizeReportsMap();

                                    if (resizeReportsChart)
                                        resizeReportsChart();
                                } catch (err) {
                                    // Swallow error.
                                }
                            }),
                        100);
                }

            })();
    });