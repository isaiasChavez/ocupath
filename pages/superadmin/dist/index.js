"use strict";
exports.__esModule = true;
var core_1 = require("@material-ui/core");
var react_1 = require("react");
var types_1 = require("../../src/types");
var EditUser_1 = require("../../src/components/general/EditUser");
var TableSuperAdmin_1 = require("../../src/components/superadmin/TableSuperAdmin");
var drawerWidth = 240;
var PROFILE = 0;
var USER = 1;
var Admin = function () {
    var classes = useStyles();
    var _a = react_1.useState(0), currentTab = _a[0], setCurrentTab = _a[1];
    return (React.createElement("div", { className: classes.root },
        React.createElement("div", { className: classes.inner },
            React.createElement(core_1.AppBar, null,
                React.createElement(core_1.Toolbar, { className: classes.toolbar },
                    React.createElement(core_1.Typography, { component: "h1", variant: "h6", color: "inherit", noWrap: true, className: classes.title }, "OCUPATH"))),
            React.createElement(core_1.Drawer, { variant: "permanent", classes: {
                    paper: classes.drawerPaper
                } },
                React.createElement(core_1.List, null,
                    React.createElement(core_1.ListItem, { button: true, selected: currentTab === PROFILE, onClick: function () {
                            setCurrentTab(PROFILE);
                        } },
                        React.createElement(core_1.ListItemText, { primary: "Profile" })),
                    React.createElement(core_1.ListItem, { button: true, selected: currentTab === USER, onClick: function () {
                            setCurrentTab(USER);
                        } },
                        React.createElement(core_1.ListItemText, { primary: "User" }))),
                React.createElement(core_1.List, null,
                    React.createElement(core_1.ListItem, { button: true },
                        React.createElement(core_1.Link, { href: "/" },
                            React.createElement(core_1.ListItemText, { primary: "Logout" }))))),
            React.createElement("main", { className: classes.content },
                React.createElement(core_1.Grid, { justify: "center", alignItems: "center", direction: "row", container: true, style: { height: '85%' } },
                    React.createElement(core_1.Grid, { item: true, xs: 12, md: 6, lg: 11, style: { height: '10%' } },
                        React.createElement(core_1.Typography, { component: "h1", variant: "h3", color: "textSecondary" }, "Profile")),
                    React.createElement(core_1.Grid, { item: true, xs: 12, md: 6, lg: 11, style: { height: '100%' } },
                        currentTab === PROFILE && React.createElement(EditUser_1["default"], { type: types_1.USERS.SUPER }),
                        currentTab === USER && React.createElement(TableSuperAdmin_1["default"], null)))))));
};
var useStyles = core_1.makeStyles(function (theme) { return ({
    root: {
        display: 'flex',
        height: '100vh',
        overflow: 'hidden'
    },
    inner: {
        display: 'flex',
        paddingTop: '4.1rem',
        height: '100%',
        width: '100%'
    },
    toolbar: {
        paddingRight: 24
    },
    titleSection: {
        height: '8%',
        color: 'black',
        backgroundColor: 'red'
    },
    title: {
        flexGrow: 1
    },
    drawerPaper: {
        position: 'static',
        width: drawerWidth,
        height: '100%',
        justifyContent: 'space-between'
    },
    content: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        overflowX: 'hidden',
        width: '100%',
        backgroundColor: types_1.COLORS.gray
    }
}); });
exports["default"] = Admin;
