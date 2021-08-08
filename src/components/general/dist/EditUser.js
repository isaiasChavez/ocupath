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
var react_1 = require("react");
var styles_1 = require("@material-ui/core/styles");
var Card_1 = require("@material-ui/core/Card");
var CardContent_1 = require("@material-ui/core/CardContent");
var ArrowBack_1 = require("@material-ui/icons/ArrowBack");
var Avatar_1 = require("@material-ui/core/Avatar");
var FormEdit_1 = require("./FormEdit");
var types_1 = require("../../types");
var user_context_1 = require("../../context/user/user.context");
var core_1 = require("@material-ui/core");
var AskModal_1 = require("./AskModal");
var axios_1 = require("axios");
var EditUser = function (_a) {
    var type = _a.type;
    var getUserDetail = react_1.useContext(user_context_1["default"]).getUserDetail;
    var classes = useStyles();
    react_1.useEffect(function () {
        getUserDetail();
    }, []);
    var _b = react_1.useState(false), isEditingAvatar = _b[0], setIsEditingAvatar = _b[1];
    var toggleEditAvatar = function () {
        setIsEditingAvatar(!isEditingAvatar);
    };
    return (react_1["default"].createElement(Card_1["default"], { className: classes.root },
        !isEditingAvatar && react_1["default"].createElement(EditCard, { toggleEditAvatar: toggleEditAvatar, type: type }),
        isEditingAvatar && react_1["default"].createElement(EditAvatar, { toggleEditAvatar: toggleEditAvatar })));
};
var EditCard = function (_a) {
    var type = _a.type, toggleEditAvatar = _a.toggleEditAvatar;
    var classes = useStyles();
    var profile = react_1.useContext(user_context_1["default"]).profile;
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(CardContent_1["default"], null,
            react_1["default"].createElement(Avatar_1["default"], { src: profile.thumbnail, alt: "Remy Sharp", className: classes.large }),
            react_1["default"].createElement("button", { onClick: toggleEditAvatar, className: classes.buttonEdit }, "Edit Avatar")),
        react_1["default"].createElement(FormEdit_1["default"], { type: type })));
};
var EditAvatar = function (_a) {
    var toggleEditAvatar = _a.toggleEditAvatar;
    var iframeUrl = "https://ocupath.readyplayer.me/";
    var thumbnailUrl = "https://render.readyplayer.me/render";
    var classes = useStyles();
    var _b = react_1.useState(false), isModalVisible = _b[0], setIsModalVisible = _b[1];
    var updateUser = react_1.useContext(user_context_1["default"]).updateUser;
    var _c = react_1.useState(null), urlAvatar = _c[0], setUrlAvatar = _c[1];
    var handleUrlAvatar = function (event) {
        if (iframeUrl.includes(event.origin)) {
            setUrlAvatar(event.data);
            setIsModalVisible(true);
        }
    };
    var onCancelAvatar = function () {
        setIsModalVisible(false);
    };
    var onSaveAvatar = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, updateUserDto;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsModalVisible(false);
                    return [4 /*yield*/, axios_1["default"].post(thumbnailUrl, {
                            "model": urlAvatar,
                            "scene": "halfbody-portrait-v1"
                        })];
                case 1:
                    data = (_a.sent()).data;
                    updateUserDto = new user_context_1.UpdateUserDTO({
                        avatar: urlAvatar,
                        name: null,
                        thumbnail: data.renders[0]
                    });
                    return [4 /*yield*/, updateUser(updateUserDto)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        window.addEventListener("message", handleUrlAvatar, false);
        return function () {
            window.removeEventListener("message", handleUrlAvatar);
        };
    }, []);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(AskModal_1["default"], { cancelText: "Cancel", okText: "Sure", isOpen: isModalVisible, title: "SAVE AVATAR", handleClose: onCancelAvatar, handleOk: onSaveAvatar, subtitle: "Are you sure you want to save these changes?" }),
        react_1["default"].createElement("div", { className: classes.rootIframe },
            react_1["default"].createElement("div", { className: classes.header },
                react_1["default"].createElement(core_1.IconButton, { onClick: toggleEditAvatar, "aria-label": "delete" },
                    react_1["default"].createElement(ArrowBack_1["default"], null))),
            react_1["default"].createElement("iframe", { className: classes.iframe, src: iframeUrl }),
            react_1["default"].createElement("div", { className: classes.button }, urlAvatar !== null && react_1["default"].createElement(core_1.Button, { onClick: function () { return setIsModalVisible(true); }, variant: "contained", href: "#contained-buttons" }, "Save Changes")))));
};
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
    rootIframe: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        height: '100%'
    },
    iframe: {
        width: '100%',
        height: '82%'
    },
    header: {
        height: '8%'
    },
    button: {
        height: '10%',
        display: 'flex',
        paddingRight: '1rem',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    buttonEdit: {
        borderColor: 'black',
        border: 'solid 1px',
        textalign: 'center',
        width: '100%',
        background: 'transparent',
        borderRadius: '19pt',
        paddingTop: '0.12rem',
        cursor: 'pointer',
        paddingBottom: '0.12rem',
        '&:hover': {
            background: '#eeee'
        }
    },
    large: {
        width: theme.spacing(12),
        height: theme.spacing(12),
        marginBottom: '0.5rem',
        marginTop: '3rem'
    }
}); });
exports["default"] = EditUser;
