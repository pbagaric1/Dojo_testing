define([
        "dojo/_base/declare",
        "dojo/on",
        "dijit/_WidgetBase",
        "dijit/_TemplatedMixin",
        "esri/map",
        "dojo/text!App/Templates/MapController.html"
    ],
    function(declare, on, _WidgetBase, _TemplatedMixin, Map, template) {

        /**
         * dijit._WidgetBase is the base class for all widgets in dijit, and in general
         * is the base class for all dojo based widgets.
         *
         * It provide life cycle method which get called at diffrent stages
         *
         */
        return declare("MapWidget",
            [_WidgetBase, _TemplatedMixin],
            {
                map: null,
                templateString: template,
                /**
                 * constructor method will be called before the parameters are mixed into the widget,
                 * and can be used to initialize arrays
                 */
                constructor: function() {
                    //this.topics = [];
                    this.setup();
                },

                setup: function() {

                    this.map = new Map("map",
                        {
                            basemap: "hybrid",
                            center: [-120.80566406246835, 47.41322033015946],
                            zoom: 7
                        });
                },

                startup: function() {
                    // console.log("Map::startup");

                    // Call parent method/implementation.
                    this.inherited("startup", arguments);
                },
                /**
                 * Most used life cycle method of _WidgetBase.
                 * At this stage, widget has been rendered but not attached to node.
                 */
                postCreate: function() {
                    console.log("in postCreate");

                }
            });
    });