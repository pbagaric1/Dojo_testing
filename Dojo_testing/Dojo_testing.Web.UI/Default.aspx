<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="Dojo_testing.Web.UI._Default" %>

<%@ Register Src="~/Map.ascx" TagPrefix="uc" TagName="Map" %>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style>
        html, body, form {
            padding: 0;
            margin: 0;
            height: 100%;
            min-height: 100%;
        }
    </style>
    <asp:PlaceHolder runat="server">
        <%-- Dijit Theme (body class) --%>
        <link rel="stylesheet" href="https://js.arcgis.com/3.22/dijit/themes/claro/claro.css">
        <link rel="stylesheet" href="https://js.arcgis.com/3.22/esri/css/esri.css">

        <%-- Main Styles Bundle --%>
        <%--<%: Styles.Render("~/Bundles/MainStyles") %>--%>
    </asp:PlaceHolder>
    <asp:PlaceHolder runat="server">
        <%-- Dojo Config --%>
        <script type="text/javascript">
            dojoConfig = {
                parseOnLoad: true,
                //baseUrl: "./",
                isDebug: true,
                async: true,
                packages: [
                    {
                        name: "App",
                        location: "/Scripts/App"
                    }
                ],
                widgetIDs: ['map']
            };
        </script>
        <%-- Dojo Config END --%>

        <%-- Esri ArcGIS JavaScript API --%>
        <script src="https://js.arcgis.com/3.22/" type="text/javascript"></script>

        <%-- Main Scripts Bundle --%>
        <%: Scripts.Render("~/Bundles/MainScripts") %>
    </asp:PlaceHolder>
</head>
<body>
    <form id="form1" runat="server">
    <uc:Map runat="server" id="ctrlMap" />
    </form>
</body>
</html>