"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Typography_1 = require("@material-ui/core/Typography");
var Grid_1 = require("@material-ui/core/Grid");
var List_1 = require("@material-ui/core/List");
var ListItem_1 = require("@material-ui/core/ListItem");
var ListItemText_1 = require("@material-ui/core/ListItemText");
var Paper_1 = require("@material-ui/core/Paper");
var TextField_1 = require("@material-ui/core/TextField");
var moment_1 = require("@date-io/moment");
var pickers_1 = require("@material-ui/pickers");
var styles_1 = require("@material-ui/core/styles");
var Modal_1 = require("@material-ui/core/Modal");
var user_context_1 = require("../../context/user/user.context");
var UserDetailModal = function (_a) {
    var handleClose = _a.handleClose, isOpen = _a.isOpen;
    var selectedUser = react_1.useContext(user_context_1["default"]).selectedUser;
    var classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    var _b = react_1.useState(new Date()), startDate = _b[0], setStartDate = _b[1];
    var _c = react_1.useState(new Date()), finishDate = _c[0], setFinishDate = _c[1];
    var handleDateChange = function (e) {
        console.log({ e: e }, e.format());
    };
    var body = (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("main", { className: classes.layout },
            react_1["default"].createElement(Paper_1["default"], { className: classes.paper },
                react_1["default"].createElement(Typography_1["default"], { variant: 'h6', gutterBottom: true }, "USER DETAIL"),
                react_1["default"].createElement(Grid_1["default"], { container: true, spacing: 3 },
                    react_1["default"].createElement(Grid_1["default"], { item: true, xs: 12, sm: 6 },
                        react_1["default"].createElement(TextField_1["default"], { disabled: true, defaultValue: selectedUser.name, id: 'firstName', name: 'firstName', label: 'First name', fullWidth: true, autoComplete: 'given-name' })),
                    react_1["default"].createElement(Grid_1["default"], { item: true, xs: 12, sm: 6 },
                        react_1["default"].createElement(TextField_1["default"], { defaultValue: selectedUser.lastname, disabled: true, id: 'lastName', name: 'lastName', label: 'Last name', fullWidth: true, autoComplete: 'family-name' })),
                    react_1["default"].createElement(Grid_1["default"], { item: true, xs: 12 },
                        react_1["default"].createElement(TextField_1["default"], { defaultValue: selectedUser.name, disabled: true, required: true, id: 'company', name: 'company', label: 'Company' })),
                    react_1["default"].createElement(Grid_1["default"], { item: true, xs: 12 },
                        react_1["default"].createElement(TextField_1["default"], { disabled: true, defaultValue: selectedUser.email, id: 'email', name: 'email', label: 'Email' }))),
                react_1["default"].createElement(Grid_1["default"], { container: true, spacing: 2 },
                    react_1["default"].createElement(Grid_1["default"], { item: true, xs: 12, sm: 12 },
                        react_1["default"].createElement(Typography_1["default"], { variant: 'h6', gutterBottom: true, className: classes.title }, "Plan Information"),
                        react_1["default"].createElement(Grid_1["default"], { container: true, spacing: 3 },
                            react_1["default"].createElement(Grid_1["default"], { item: true, xs: 12 },
                                react_1["default"].createElement(TextField_1["default"], { defaultValue: selectedUser.lastSuscription.invitations, required: true, disabled: true, id: 'invitations', name: 'invitations', label: 'No. of invitations:' })),
                            react_1["default"].createElement(Grid_1["default"], { item: true, xs: 12, sm: 3, direction: 'row' },
                                react_1["default"].createElement(pickers_1.MuiPickersUtilsProvider, { utils: moment_1["default"] },
                                    react_1["default"].createElement(pickers_1.DatePicker, { disabled: true, value: selectedUser.lastSuscription.startedAt, onChange: handleDateChange }))),
                            react_1["default"].createElement(Grid_1["default"], { item: true, xs: 12, sm: 3 },
                                react_1["default"].createElement(pickers_1.MuiPickersUtilsProvider, { utils: moment_1["default"] },
                                    react_1["default"].createElement(pickers_1.DatePicker, { disabled: true, value: selectedUser.lastSuscription.finishedAt, contentEditable: false, onChange: handleDateChange }))),
                            react_1["default"].createElement(Grid_1["default"], { item: true, xs: 8 },
                                react_1["default"].createElement(TextField_1["default"], { disabled: true, defaultValue: selectedUser.lastSuscription.cost, id: 'totalCost', name: 'totalCost', label: 'Total Cost' })),
                            react_1["default"].createElement(Grid_1["default"], { item: true, xs: 12 },
                                react_1["default"].createElement(List_1["default"], { disablePadding: true },
                                    react_1["default"].createElement(ListItem_1["default"], { className: classes.listItem },
                                        react_1["default"].createElement(ListItemText_1["default"], { primary: 'Grand Total' }),
                                        react_1["default"].createElement(Typography_1["default"], { variant: 'subtitle1', className: classes.total }, "$34.06")))))))))));
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(Modal_1["default"], { open: isOpen, onClose: handleClose, style: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }, "aria-labelledby": 'simple-modal-title', "aria-describedby": 'simple-modal-description' }, body)));
};
var useStyles = styles_1.makeStyles(function (theme) {
    var _a;
    return styles_1.createStyles({
        listItem: {
            padding: theme.spacing(1, 0)
        },
        total: {
            fontWeight: 700
        },
        title: {
            marginTop: theme.spacing(2)
        },
        paper: {
            margin: '0 auto 0 auto',
            height: '50%',
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(2, 4, 3)
        },
        layout: (_a = {
                width: 'auto',
                marginLeft: theme.spacing(2),
                marginRight: theme.spacing(2)
            },
            _a[theme.breakpoints.up(600 + theme.spacing(2) * 2)] = {
                width: '50%',
                marginLeft: 'auto',
                marginRight: 'auto'
            },
            _a)
    });
});
exports["default"] = UserDetailModal;
