"use strict";
exports.__esModule = true;
var react_1 = require("react");
var styles_1 = require("@material-ui/core/styles");
var Card_1 = require("@material-ui/core/Card");
var CardContent_1 = require("@material-ui/core/CardContent");
var Typography_1 = require("@material-ui/core/Typography");
var Avatar_1 = require("@material-ui/core/Avatar");
var FormEdit_1 = require("./FormEdit");
var types_1 = require("../../types");
var useStyles = styles_1.makeStyles(function (theme) { return ({
    root: {
        display: 'flex',
        height: '100%',
        padding: '2rem',
        borderTop: '2rem solid',
        borderTopColor: types_1.COLORS.GRAY_MEDIUM,
        borderBottom: '2rem solid',
        borderBottomColor: types_1.COLORS.GRAY_MEDIUM
    },
    details: {
        display: 'flex',
        flexDirection: 'column'
    },
    buttonEdit: {
        borderColor: 'black',
        border: 'solid 1px',
        textalign: 'center',
        width: '100%',
        background: 'transparent',
        borderRadius: '19pt',
        paddingTop: '0.2rem',
        cursor: 'pointer',
        paddingBottom: '0.2rem',
        '&:hover': {
            background: '#eeee'
        }
    },
    large: {
        width: theme.spacing(15),
        height: theme.spacing(15),
        marginBottom: '1rem'
    }, editButton: {
        fontSize: 10,
        padding: '2rem'
    }
}); });
var EditUser = function (_a) {
    var type = _a.type;
    var classes = useStyles();
    return (react_1["default"].createElement(Card_1["default"], { className: classes.root },
        react_1["default"].createElement("div", { className: classes.details },
            react_1["default"].createElement(CardContent_1["default"], null,
                react_1["default"].createElement(Avatar_1["default"], { alt: "Remy Sharp", className: classes.large }),
                react_1["default"].createElement("button", { className: classes.buttonEdit }, "Edit Avatar"),
                react_1["default"].createElement(Typography_1["default"], { variant: "subtitle1", color: "textSecondary" }))),
        react_1["default"].createElement(FormEdit_1["default"], { type: type })));
};
exports["default"] = EditUser;
