"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.StyledTableRow = exports.StyledTableCell = exports.getDataStatus = void 0;
var core_1 = require("@material-ui/core");
var react_1 = require("react");
var AskModal_1 = require("../general/AskModal");
var UserDetailModal_1 = require("./UserDetailModal");
var types_1 = require("../../types");
var moment_1 = require("moment");
var EditOutlined_1 = require("@material-ui/icons/EditOutlined");
var DeleteOutlineOutlined_1 = require("@material-ui/icons/DeleteOutlineOutlined");
var user_context_1 = require("../../context/user/user.context");
var antd_1 = require("antd");
exports.getDataStatus = function (status) {
    if (status === 1) {
        return {
            color: '#8DC811',
            name: 'Active'
        };
    }
    if (status === 2) {
        return {
            color: '#9A9A9A',
            name: 'Inactive'
        };
    }
    if (status === 3) {
        return {
            color: '#E29583',
            name: 'Expired'
        };
    }
    if (status === 4) {
        return {
            color: '#E2CA64',
            name: 'Paused'
        };
    }
    return {
        color: 'default',
        name: 'Error'
    };
};
var TableCompanies = function () {
    var _a = react_1.useContext(user_context_1["default"]), childrens = _a.childrens, selectUser = _a.selectUser, selectedUser = _a.selectedUser, suspendUserAdm = _a.suspendUserAdm, deleteUserAdm = _a.deleteUserAdm, getAdminChildDetail = _a.getAdminChildDetail, loading = _a.loading;
    var _b = react_1.useState(5), rowsPerPage = _b[0], setRowsPerPage = _b[1];
    var _c = react_1["default"].useState(0), page = _c[0], setPage = _c[1];
    var _d = react_1.useState(false), isOpenUserDetailModal = _d[0], setIsOpenUserDetailModal = _d[1];
    var _e = react_1.useState(false), isOpenDeleteUserModal = _e[0], setIsOpenDeleteUserModal = _e[1];
    var _f = react_1.useState(false), isOpenSuspendUserModal = _f[0], setIsOpenSuspendUserModal = _f[1];
    var rows = childrens.admins;
    var handleToggleDetailModal = function () {
        setIsOpenUserDetailModal(!isOpenUserDetailModal);
    };
    var toggleDeleteUserModal = function () {
        setIsOpenDeleteUserModal(!isOpenDeleteUserModal);
    };
    var toggleSuspendUserModal = function () {
        setIsOpenSuspendUserModal(!isOpenSuspendUserModal);
    };
    var onSuspend = function (dataUser) {
        setIsOpenSuspendUserModal(true);
        selectUser(dataUser, types_1.USERS.ADMIN);
    };
    var onDelete = function (dataUser) {
        toggleDeleteUserModal();
        selectUser(dataUser, types_1.USERS.ADMIN);
    };
    var onEdit = function (dataUser) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            selectUser(dataUser, types_1.USERS.ADMIN);
            getAdminChildDetail(dataUser.uuid);
            handleToggleDetailModal();
            return [2 /*return*/];
        });
    }); };
    var handleChangePage = function (event, newPage) {
        setPage(newPage);
    };
    var handleChangeRowsPerPage = function (event) {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    var costFormated = function (cost) {
        var costNumber = parseInt(cost);
        if (costNumber % 1 === 0) {
            return cost + ".00";
        }
        return cost;
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(UserDetailModal_1["default"], { isOpen: isOpenUserDetailModal, handleClose: handleToggleDetailModal, type: types_1.USERS_TYPES.ADMIN }),
        react_1["default"].createElement(AskModal_1["default"], { isOpen: isOpenDeleteUserModal, handleClose: toggleDeleteUserModal, handleOk: function () {
                toggleDeleteUserModal();
                deleteUserAdm();
            }, okText: "Sure", cancelText: "Cancel", title: "Delete User", subtitle: "Are you sure you want to delete " + (selectedUser ? selectedUser.name : 'this user') + " " }),
        react_1["default"].createElement(AskModal_1["default"], { isOpen: isOpenSuspendUserModal, handleOk: function () {
                suspendUserAdm();
                toggleSuspendUserModal();
            }, handleClose: toggleSuspendUserModal, okText: "Sure", cancelText: "Cancel", title: selectedUser.isActive ? 'Suspend User' : 'Activate user', subtitle: "Are you sure you want to  " + (selectedUser.isActive ? 'suspend' : 'activate') + " " + (selectedUser ? 'to ' + selectedUser.name + '?' : 'this user?') }),
        react_1["default"].createElement(core_1.Table, { size: "medium" },
            react_1["default"].createElement(core_1.TableHead, null,
                react_1["default"].createElement(core_1.TableRow, null,
                    react_1["default"].createElement(exports.StyledTableCell, { align: "center" }, "Name"),
                    react_1["default"].createElement(exports.StyledTableCell, { align: "center" }, "Email"),
                    react_1["default"].createElement(exports.StyledTableCell, { align: "center" }, "Number of Invitations"),
                    react_1["default"].createElement(exports.StyledTableCell, { align: "center" }, "Total Cost"),
                    react_1["default"].createElement(exports.StyledTableCell, { align: "center" }, "Period"),
                    react_1["default"].createElement(exports.StyledTableCell, { align: "center" }, "Time Remaining"),
                    react_1["default"].createElement(exports.StyledTableCell, { align: "center" }, "Status"),
                    react_1["default"].createElement(exports.StyledTableCell, { align: "center" }, "Registration Date"),
                    react_1["default"].createElement(exports.StyledTableCell, { align: "center" }, "Suspend"),
                    react_1["default"].createElement(exports.StyledTableCell, { align: "center" }, "Edit"),
                    react_1["default"].createElement(exports.StyledTableCell, { align: "center" }, "Delete"))),
            react_1["default"].createElement(core_1.TableBody, null,
                rows.map(function (user) { return (react_1["default"].createElement(exports.StyledTableRow, { key: user.email },
                    react_1["default"].createElement(exports.StyledTableCell, { align: "center", component: "th", scope: "user" }, user.name),
                    react_1["default"].createElement(exports.StyledTableCell, { align: "center" }, user.email),
                    react_1["default"].createElement(exports.StyledTableCell, { align: "center" }, user.lastSuscription.invitations),
                    react_1["default"].createElement(exports.StyledTableCell, { align: "center" },
                        react_1["default"].createElement(core_1.Box, { display: "flex", justifyContent: "space-between" },
                            react_1["default"].createElement("div", null, "$"),
                            costFormated(user.lastSuscription.cost))),
                    react_1["default"].createElement(exports.StyledTableCell, { align: "center" }, moment_1["default"](user.lastSuscription.startedAt).format('L') + " to " + moment_1["default"](user.lastSuscription.finishedAt).format('L')),
                    react_1["default"].createElement(exports.StyledTableCell, { align: "center" }, moment_1["default"](user.lastSuscription.finishedAt).from(moment_1["default"]())),
                    react_1["default"].createElement(exports.StyledTableCell, { align: "center" },
                        react_1["default"].createElement(core_1.Box, { fontWeight: "fontWeightBold", style: {
                                color: exports.getDataStatus(user.status).color
                            } }, exports.getDataStatus(user.status).name)),
                    react_1["default"].createElement(exports.StyledTableCell, { align: "center" }, moment_1["default"](user.lastSuscription.createdAt).format('L')),
                    react_1["default"].createElement(exports.StyledTableCell, { align: "right" },
                        react_1["default"].createElement(core_1.Switch, { disabled: loading, checked: user.isActive, onChange: function () { return onSuspend(user); }, name: "checkedA", color: "secondary", inputProps: { 'aria-label': 'secondary checkbox' } })),
                    react_1["default"].createElement(exports.StyledTableCell, { align: "center" },
                        react_1["default"].createElement(EditOutlined_1["default"], { style: {
                                color: '#A6ABAF',
                                opacity: user.isActive ? 1 : 0.5,
                                cursor: user.isActive ? 'pointer' : 'default'
                            }, onClick: function () {
                                if (user.isActive) {
                                    onEdit(user);
                                }
                            } })),
                    react_1["default"].createElement(exports.StyledTableCell, { align: "center" },
                        react_1["default"].createElement(DeleteOutlineOutlined_1["default"], { style: {
                                color: '#A6ABAF',
                                cursor: 'pointer'
                            }, onClick: function () { return onDelete(user); } })))); }),
                rows.length === 0 && (react_1["default"].createElement(core_1.Box, { position: "absolute", bottom: 0, display: "flex", width: "100%", height: "80%", justifyContent: "center", alignItems: "center" },
                    react_1["default"].createElement(antd_1.Empty, { description: "You have not added any user yet" })))),
            rows.length > 8 && react_1["default"].createElement(core_1.TablePagination, { align: "center", rowsPerPageOptions: [5, 10, 25], count: rows.length, rowsPerPage: rowsPerPage, page: page, onChangePage: handleChangePage, onChangeRowsPerPage: handleChangeRowsPerPage }))));
};
exports.StyledTableCell = core_1.withStyles(function (theme) {
    return core_1.createStyles({
        root: {
            height: '1rem'
        },
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white
        },
        body: {
            fontSize: 14
        }
    });
})(core_1.TableCell);
exports.StyledTableRow = core_1.withStyles(function (theme) {
    return core_1.createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover
            }
        }
    });
})(core_1.TableRow);
exports["default"] = TableCompanies;
