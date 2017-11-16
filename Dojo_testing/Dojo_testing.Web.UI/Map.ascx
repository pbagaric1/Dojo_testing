<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Map.ascx.cs" Inherits="Dojo_testing.Web.UI.Map" %>

<style>
    .mapDiv {
        height: 100%;
        min-height: 100%;
    }
</style>
<%-- Map Dojo Class --%>
<div id="map" class="mapDiv">
    <div id="map-controller" data-dojo-type="MapWidget"></div>
</div>