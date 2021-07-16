"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var styles_1 = require("@material-ui/core/styles");
var Paper_1 = require("@material-ui/core/Paper");
var Tabs_1 = require("@material-ui/core/Tabs");
var Tab_1 = require("@material-ui/core/Tab");
var GridList_1 = require("@material-ui/core/GridList");
var GridListTile_1 = require("@material-ui/core/GridListTile");
var types_1 = require("../../types");
var Grid_1 = require("@material-ui/core/Grid");
var core_1 = require("@material-ui/core");
var img_uno = 'https://images.unsplash.com/photo-1623835255306-868c63d9335e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80';
var img_dos = 'https://images.unsplash.com/photo-1624548955817-e2d68f404137?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=670&q=80';
var img_tres = 'https://images.unsplash.com/photo-1624541478061-2a3b39b3d725?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80';
var TableFiles = function () {
    var _a = react_1.useState(0), currentTab = _a[0], setCurrentTab = _a[1];
    var handleChange = function (event, newValue) {
        setCurrentTab(newValue);
    };
    var classes = useStyles();
    var tileData = [
        {
            img: 'https://fotografiamejorparavendermas.com/wp-content/uploads/2017/06/La-importancia-de-la-imagen.jpg',
            title: 'Image',
            author: 'author',
            cols: 2
        },
    ];
    var IMG_360_DATA = [
        {
            img: img_uno,
            title: 'Image',
            author: 'author',
            cols: 2
        },
    ];
    var VIDEO_DATA = [
        {
            img: img_dos,
            title: 'Image',
            author: 'author',
            cols: 2
        }
    ];
    react_1.useEffect(function () {
        setCurrentImages(currentTab);
    }, [currentTab]);
    var _b = react_1.useState([]), currentData = _b[0], setCurrentData = _b[1];
    var _c = react_1.useState(null), video360 = _c[0], setvideo360 = _c[1];
    var setCurrentImages = function (tab) {
        if (tab === types_1.FILES.IMG) {
            setCurrentData(tileData);
        }
        if (tab === types_1.FILES.IMG_360) {
            setCurrentData(IMG_360_DATA);
        }
        if (tab === types_1.FILES.VIDEO) {
            setCurrentData(tileData);
        }
        if (tab === types_1.FILES.VIDEO_360) {
            setCurrentData(IMG_360_DATA);
        }
    };
    var uploadVideo = function (data) {
        console.log({ data: data });
    };
    var uploadImg = function (data) {
        console.log({ data: data });
    };
    var uploadImg360 = function (data) {
        console.log({ data: data });
    };
    return (react_1["default"].createElement(Grid_1["default"], { container: true, className: classes.root },
        react_1["default"].createElement(Grid_1["default"], { item: true, xs: 12 },
            react_1["default"].createElement(Paper_1["default"], { className: classes.paper },
                react_1["default"].createElement(AntTabs, { value: currentTab, onChange: handleChange, "aria-label": "ant example" },
                    react_1["default"].createElement(AntTab, { label: "Images" }),
                    react_1["default"].createElement(AntTab, { label: "360 Images" }),
                    react_1["default"].createElement(AntTab, { label: "Video" }),
                    react_1["default"].createElement(AntTab, { label: "360 Videos" })),
                currentTab === types_1.FILES.IMG && react_1["default"].createElement(GridList_1["default"], { cellHeight: 100, className: classes.gridList, cols: 7 }, tileData.map(function (tile) { return (react_1["default"].createElement(GridListTile_1["default"], { key: tile.img, cols: 1, style: { height: 180 } },
                    react_1["default"].createElement("img", { src: tile.img, alt: tile.title }))); })),
                currentTab === types_1.FILES.IMG_360 && react_1["default"].createElement(GridList_1["default"], { cellHeight: 100, className: classes.gridList, cols: 7 }, IMG_360_DATA.map(function (tile) { return (react_1["default"].createElement(GridListTile_1["default"], { key: tile.img, cols: 1, style: { height: 180 } },
                    react_1["default"].createElement("img", { src: tile.img, alt: tile.title }))); })),
                currentTab === types_1.FILES.VIDEO && react_1["default"].createElement(GridList_1["default"], { cellHeight: 100, className: classes.gridList, cols: 7 }, VIDEO_DATA.map(function (tile) { return (react_1["default"].createElement(GridListTile_1["default"], { key: tile.img, cols: 1, style: { height: 180 } },
                    react_1["default"].createElement("img", { src: tile.img, alt: tile.title }))); })),
                currentTab === types_1.FILES.VIDEO_360 &&
                    react_1["default"].createElement(Video360, null)))));
};
exports["default"] = TableFiles;
var Video360 = function () {
    var VIDEO_360_DATA = [
        {
            img: img_tres,
            title: 'Image',
            author: 'author',
            cols: 2
        },
    ];
    var uploadVideo360 = function (data) {
        console.log({ data: data });
    };
    var classes = useStyles();
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(GridList_1["default"], { cellHeight: 100, className: classes.gridList, cols: 7 }, VIDEO_360_DATA.map(function (tile) { return (react_1["default"].createElement(GridListTile_1["default"], { key: tile.img, cols: 1, style: { height: 180 } },
            react_1["default"].createElement("img", { src: tile.img, alt: tile.title }))); })),
        react_1["default"].createElement(Paper_1["default"], null,
            react_1["default"].createElement(core_1.Box, { display: "flex", justifyContent: "flex-end", alignItems: "center", className: classes.containerUpload },
                react_1["default"].createElement("input", { onChange: function (e) { return uploadVideo360(e.target.files); }, accept: "image/*", id: "video360_uploader", type: "file" }),
                react_1["default"].createElement("label", { htmlFor: "video360_uploader" },
                    react_1["default"].createElement(core_1.Button, { variant: "contained", color: "primary", className: classes.uploadButton, component: "span" }, "Upload"))))));
};
var useStyles = styles_1.makeStyles(function (theme) { return ({
    root: {
        display: 'flex',
        height: '100%'
    },
    paper: {
        height: '100%'
    },
    containerUpload: {
        padding: '1rem'
    },
    uploadButton: {
        marginLeft: '1rem'
    },
    padding: {
        padding: theme.spacing(3)
    },
    demo1: {
        backgroundColor: theme.palette.background.paper,
        width: '100%'
    },
    demo2: {
        backgroundColor: '#2e1534'
    },
    gridList: {
        width: '100%',
        height: '92%'
    }
}); });
var AntTabs = styles_1.withStyles({
    root: {
        borderBottom: '1px solid #e8e8e8'
    },
    indicator: {
        backgroundColor: '#1890ff'
    }
})(Tabs_1["default"]);
var AntTab = styles_1.withStyles(function (theme) {
    return styles_1.createStyles({
        root: {
            textTransform: 'none',
            minWidth: 72,
            fontWeight: theme.typography.fontWeightRegular,
            marginRight: theme.spacing(4),
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            '&:hover': {
                color: '#40a9ff',
                opacity: 1
            },
            '&$selected': {
                color: '#1890ff',
                fontWeight: theme.typography.fontWeightMedium
            },
            '&:focus': {
                color: '#40a9ff'
            }
        },
        selected: {}
    });
})(function (props) { return react_1["default"].createElement(Tab_1["default"], __assign({ disableRipple: true }, props)); });
