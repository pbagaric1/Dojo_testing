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

/* App.Constants Dojo Module
 ------------------------------------------------------------------------------------------------------------*/

/**
 * NOTE:
 * This dojo module is PARTIALLY application specific.
 * Specific parts:
 * 1. Some constants and application specific enums
 */

/** @namespace */

/** @BEFORE  dojo.provide("App.Constants"); */
define([],
    function() {

        /* Constants Class
         --------------------------------------------------------------*/

        /**
         * Application constants class.
         */
        Constants = (function() {

            /* Public Interface
             --------------------------------------------------------------*/

            return {

                /* Constants
                 --------------------------------------------------------------*/
                Demo1: 10,
                Demo2: true
            };
        })();

        /* Enums Class
         --------------------------------------------------------------*/

        /**
         * Application enums class.
         */
        Enums = (function() {

            /* Public Interface
             --------------------------------------------------------------*/

            return {

                /* App Shared Enums
                 --------------------------------------------------------------*/
                Enum1: {
                    DISABLED: 0,
                    ENABLED: 1
                },
                Enum2: {
                    PARAM1: true,
                    PARAM2: "param2"
                }
            };
        })();

    });