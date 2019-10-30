"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_dom_1 = tslib_1.__importDefault(require("react-dom"));
var react_helmet_1 = require("react-helmet");
var animejs_1 = tslib_1.__importDefault(require("animejs"));
/* assets */
var index_1 = require("../../src/index");
var Container = function (_a) {
    var children = _a.children, _b = _a.position, position = _b === void 0 ? '' : _b;
    return (react_1.default.createElement("div", { className: "demo__container " + position }, children));
};
var ImageFrame = function (_a) {
    var active = _a.active, image = _a.image, position = _a.position, color = _a.color, theme = _a.theme;
    var containerClasses = [
        'demo__imageFrame_container',
        position === 'right' ? 'right' : 'left',
        active ? 'active' : '',
    ].join(' ');
    var decorContainerClasses = [
        'demo__imageFrame_decorative',
        theme,
    ].join(' ');
    var backgroundColorStyle = {
        backgroundColor: "" + (color ? color : 'transparent'),
    };
    return (react_1.default.createElement("div", { className: containerClasses },
        react_1.default.createElement("figure", null,
            react_1.default.createElement("img", { className: "demo__imageFrame_image", src: image, alt: "" })),
        react_1.default.createElement("div", { className: decorContainerClasses })));
};
/* ================
 *    Plant demo
 * ================*/
var SplashSection = function () {
    return (react_1.default.createElement("section", { className: "demo__splash_container" },
        react_1.default.createElement(Container, { position: "center" },
            react_1.default.createElement("span", { className: "demo__splash_title" }, "Scroll Down"),
            react_1.default.createElement("img", { src: "assets/arrow.svg", alt: "" }))));
};
var PlantSection = function (_a) {
    var isActive = _a.isActive, backdropValue = _a.backdropValue, backdropTheme = _a.backdropTheme;
    return (react_1.default.createElement("section", { className: "demo__plant_container" },
        react_1.default.createElement(Container, { position: "center" },
            react_1.default.createElement("div", { className: "demo__plant_textBox" },
                react_1.default.createElement("h4", { className: "demo__plant_smallHeader" }, "Small header"),
                react_1.default.createElement("h1", { className: "demo__plant_title" }, "Header"),
                react_1.default.createElement("h3", { className: "demo__plant_subtitle" }, "subtitle"),
                react_1.default.createElement("p", { className: "demo__plant_body" }, "Bacon ipsum dolor amet buffalo nisi andouille ball tip kielbasa pork loin, exercitation jerky filet mignon excepteur doner do pork chop."),
                react_1.default.createElement("div", { className: "demo__plant_button" }, "Learn more"))),
        react_1.default.createElement("img", { className: "demo__plant_img", src: "assets/plant.svg", alt: "" })));
};
var PinkBricks = function (_a) {
    var isActive = _a.isActive, backdropValue = _a.backdropValue, backdropTheme = _a.backdropTheme;
    return (react_1.default.createElement("section", { className: "demo__pinkBricks_container" },
        react_1.default.createElement(Container, { position: 'center' },
            react_1.default.createElement("div", { className: "demo__pinkBricks_textBox" },
                react_1.default.createElement("h1", { className: "demo__pinkBricks_title" }, "The outside view is better"),
                react_1.default.createElement("p", { className: "demo__pinkBricks_body" }, "...But you already know that")),
            react_1.default.createElement(ImageFrame, { active: isActive, image: "assets/pinkBricks.jpg", position: 'left', color: backdropValue.value, theme: backdropTheme }))));
};
var GraySkies = function (_a) {
    var isActive = _a.isActive, backdropValue = _a.backdropValue, backdropTheme = _a.backdropTheme;
    return (react_1.default.createElement("section", { className: "demo__graySkies_container" },
        react_1.default.createElement(Container, { position: 'center' },
            react_1.default.createElement("div", { className: "demo__graySkies_textBox" },
                react_1.default.createElement("h1", { className: "demo__graySkies_title" }, "The outside view is better"),
                react_1.default.createElement("p", { className: "demo__graySkies_body" }, "...But you already know that")),
            react_1.default.createElement(ImageFrame, { active: isActive, image: "assets/cloudCover.jpg", position: 'right', color: backdropValue.value, theme: backdropTheme }))));
};
var RedHands = function (_a) {
    var isActive = _a.isActive, backdropValue = _a.backdropValue, backdropTheme = _a.backdropTheme;
    return (react_1.default.createElement("section", { className: "demo__redHands_container" },
        react_1.default.createElement(Container, { position: "center" },
            react_1.default.createElement("div", { className: "demo__redHands_textBox" },
                react_1.default.createElement("h1", { className: "demo__redHands_title" }, "The outside view is better"),
                react_1.default.createElement("p", { className: "demo__redHands_body" }, "...But you already know that")),
            react_1.default.createElement(ImageFrame, { active: isActive, image: "assets/hands.jpg", position: 'left', color: backdropValue.value, theme: backdropTheme }))));
};
var Bridge = function (_a) {
    var isActive = _a.isActive, backdropValue = _a.backdropValue, backdropTheme = _a.backdropTheme;
    var textClassNames = [
        'demo__bridge_text',
        isActive ? 'active' : '',
    ].join(' ');
    var textNode = react_1.useRef(null);
    var _b = react_1.useState(false), loaded = _b[0], declareLoaded = _b[1];
    if (!loaded)
        declareLoaded(true);
    if (loaded && textNode.current) {
        var el = textNode.current;
        el.innerHTML = el
            .textContent
            .replace(/\S/g, "<span class='letter'>$&</span>");
        animejs_1.default.timeline({ loop: false })
            .add({
            targets: '.demo__bridge_text .letter',
            translateX: [40, 0],
            translateZ: 0,
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 1200,
            delay: function (el, i) { return 500 + 30 * i; }
        }).add({
            targets: '.demo__bridge_text .letter',
            translateX: [0, -30],
            opacity: [1, 1],
            easing: "easeInExpo",
            duration: 1100,
            delay: function (el, i) { return 100 + 30 * i; }
        });
    }
    return (react_1.default.createElement("section", { className: "demo__bridge_container" },
        react_1.default.createElement(Container, { position: "center" },
            react_1.default.createElement("div", { ref: textNode, className: textClassNames }, "The outside view is better..."))));
};
var Layout = /** @class */ (function (_super) {
    tslib_1.__extends(Layout, _super);
    function Layout(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            hasLoaded: false,
        };
        return _this;
    }
    Layout.prototype.componentDidMount = function () {
        this.setState({ hasLoaded: true });
    };
    Layout.prototype.render = function () {
        var children = this.props.children;
        return (react_1.default.createElement(index_1.BackdropContainer, { defaultValue: { value: "transparent", type: 'color' }, fromTop: 350, animationDuration: 800 },
            react_1.default.createElement("div", { className: 'layout' },
                react_1.default.createElement(react_helmet_1.Helmet, null,
                    react_1.default.createElement("link", { href: "https://fonts.googleapis.com/css?family=Playfair+Display:400,700|Ramaraja&display=swap", rel: "stylesheet" }),
                    react_1.default.createElement("link", { href: "https://fonts.googleapis.com/css?family=Permanent+Marker&display=swap", rel: "stylesheet" })),
                children)));
    };
    return Layout;
}(react_1.default.Component));
var Content = function () {
    return (react_1.default.createElement(Layout, null,
        react_1.default.createElement(index_1.BackdropZone, { color: "#252629", instant: true },
            react_1.default.createElement(SplashSection, null)),
        react_1.default.createElement(index_1.BackdropZone, { color: "#CD9CAE", theme: "dark" }, function (active, currentTheme, currentValue) {
            return react_1.default.createElement(PinkBricks, { isActive: active, backdropValue: currentValue, backdropTheme: currentTheme });
        }),
        react_1.default.createElement(index_1.BackdropZone, { color: "#414953", theme: "light" }, function (active, currentTheme, currentValue) {
            return react_1.default.createElement(GraySkies, { isActive: active, backdropValue: currentValue, backdropTheme: currentTheme });
        }),
        react_1.default.createElement(index_1.BackdropZone, { color: "#BB1702", theme: "light" }, function (active, currentTheme, currentValue) {
            return react_1.default.createElement(RedHands, { isActive: active, backdropValue: currentValue, backdropTheme: currentTheme });
        }),
        react_1.default.createElement(index_1.BackdropZone, { image: 'assets/bridge.jpg', theme: "dark" }, function (active, currentTheme, currentValue) {
            return react_1.default.createElement(Bridge, { isActive: active, backdropValue: currentValue, backdropTheme: currentTheme });
        })));
};
/*  */
react_dom_1.default.render(react_1.default.createElement(Content, null), document.getElementById('app'));

//# sourceMappingURL=data:application/json;charset=utf8;base64,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SyxFQUFDLE9BQU8sSUFDeEMsVUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFlBQVk7WUFDbkMsT0FBQSw4QkFBQyxRQUFRLElBQ1AsUUFBUSxFQUFFLE1BQU0sRUFDaEIsYUFBYSxFQUFFLFlBQVksRUFDM0IsYUFBYSxFQUFFLFlBQVksR0FDM0I7UUFKRixDQUlFLENBQ1M7UUFFZiw4QkFBQyxvQkFBWSxJQUFDLEtBQUssRUFBRSxtQkFBbUIsRUFBRSxLQUFLLEVBQUMsTUFBTSxJQUNuRCxVQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsWUFBWTtZQUNuQyxPQUFBLDhCQUFDLE1BQU0sSUFDTCxRQUFRLEVBQUUsTUFBTSxFQUNoQixhQUFhLEVBQUUsWUFBWSxFQUMzQixhQUFhLEVBQUUsWUFBWSxHQUMzQjtRQUpGLENBSUUsQ0FDUyxDQUVWLENBQ1YsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQUNELE1BQU07QUFDTixtQkFBUSxDQUFDLE1BQU0sQ0FBQyw4QkFBQyxPQUFPLE9BQUUsRUFBRSxRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoiZGVtby9zcmMvbWFya3VwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHtIZWxtZXR9IGZyb20gJ3JlYWN0LWhlbG1ldCc7XG5pbXBvcnQgYW5pbWUgZnJvbSAnYW5pbWVqcyc7XG5cbi8qIGFzc2V0cyAqL1xuaW1wb3J0IHsgQmFja2Ryb3BDb250YWluZXIsIEJhY2tkcm9wWm9uZSwgQmFja2Ryb3BDb250ZXh0IH0gZnJvbSAnLi4vLi4vc3JjL2luZGV4JztcblxuLyogPT09PT09PT09PT09PT09PT09PT09XG4gKiAgIGxheW91dCBjb21wb25lbnRzXG4gKiA9PT09PT09PT09PT09PT09PT09PT0qL1xuXG5pbnRlcmZhY2UgSU1Qcm9wcyB7XG4gIGFjdGl2ZT86IGJvb2xlYW47XG4gIGltYWdlOiBzdHJpbmc7XG4gIGNvbG9yPzogc3RyaW5nO1xuICBwb3NpdGlvbjogJ3JpZ2h0JyB8ICdsZWZ0J1xuICB0aGVtZTogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgQ1Byb3BzIHtcbiAgY2hpbGRyZW46IGFueTtcbiAgcG9zaXRpb246ICcnIHwgJ2NlbnRlcic7XG59XG5cbmludGVyZmFjZSBTUHJvcHMge1xuICBpc0FjdGl2ZT86IGJvb2xlYW47XG4gIGJhY2tkcm9wVmFsdWU/OiB7XG4gICAgdmFsdWU6IHN0cmluZyxcbiAgICB0eXBlOiBzdHJpbmdcbiAgfTtcbiAgYmFja2Ryb3BUaGVtZT86IHN0cmluZztcbn1cblxuY29uc3QgQ29udGFpbmVyOiBSZWFjdC5GQzxDUHJvcHM+ID0gKHsgY2hpbGRyZW4sIHBvc2l0aW9uID0gJycgfSkgPT4ge1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9eyBgZGVtb19fY29udGFpbmVyICR7cG9zaXRpb259YCB9PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvZGl2PlxuICApXG59XG5cbmNvbnN0IEltYWdlRnJhbWU6IFJlYWN0LkZDPElNUHJvcHM+ID0gKHsgYWN0aXZlLCBpbWFnZSwgcG9zaXRpb24sIGNvbG9yLCB0aGVtZSB9KSA9PiB7XG5cbiAgY29uc3QgY29udGFpbmVyQ2xhc3NlcyA9IFtcbiAgICAnZGVtb19faW1hZ2VGcmFtZV9jb250YWluZXInLFxuICAgIHBvc2l0aW9uID09PSAncmlnaHQnID8gJ3JpZ2h0JyA6ICdsZWZ0JyxcbiAgICBhY3RpdmUgPyAnYWN0aXZlJyA6ICcnLFxuICBdLmpvaW4oJyAnKTtcblxuICBjb25zdCBkZWNvckNvbnRhaW5lckNsYXNzZXMgPSBbXG4gICAgJ2RlbW9fX2ltYWdlRnJhbWVfZGVjb3JhdGl2ZScsXG4gICAgdGhlbWUsXG4gIF0uam9pbignICcpO1xuXG4gIGNvbnN0IGJhY2tncm91bmRDb2xvclN0eWxlID0ge1xuICAgIGJhY2tncm91bmRDb2xvcjogYCR7Y29sb3IgPyBjb2xvciA6ICd0cmFuc3BhcmVudCd9YCxcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2NvbnRhaW5lckNsYXNzZXN9PlxuICAgICAgPGZpZ3VyZT5cbiAgICAgICAgPGltZ1xuICAgICAgICAgIGNsYXNzTmFtZT1cImRlbW9fX2ltYWdlRnJhbWVfaW1hZ2VcIlxuICAgICAgICAgIHNyYz17aW1hZ2V9XG4gICAgICAgICAgYWx0PVwiXCJcbiAgICAgICAgLz5cbiAgICAgIDwvZmlndXJlPlxuICAgICAgPGRpdiBjbGFzc05hbWU9e2RlY29yQ29udGFpbmVyQ2xhc3Nlc30gLz5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG4vKiA9PT09PT09PT09PT09PT09XG4gKiAgICBQbGFudCBkZW1vXG4gKiA9PT09PT09PT09PT09PT09Ki9cblxuY29uc3QgU3BsYXNoU2VjdGlvbiA9ICgpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJkZW1vX19zcGxhc2hfY29udGFpbmVyXCI+XG4gICAgICA8Q29udGFpbmVyIHBvc2l0aW9uPVwiY2VudGVyXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImRlbW9fX3NwbGFzaF90aXRsZVwiPlxuICAgICAgICAgIFNjcm9sbCBEb3duXG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPGltZ1xuICAgICAgICAgIHNyYz1cImFzc2V0cy9hcnJvdy5zdmdcIlxuICAgICAgICAgIGFsdD1cIlwiXG4gICAgICAgIC8+XG4gICAgICA8L0NvbnRhaW5lcj5cbiAgICA8L3NlY3Rpb24+XG4gIClcbn1cblxuY29uc3QgUGxhbnRTZWN0aW9uOiBSZWFjdC5GQzxTUHJvcHM+ID0gKHtpc0FjdGl2ZSwgYmFja2Ryb3BWYWx1ZSwgYmFja2Ryb3BUaGVtZX0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJkZW1vX19wbGFudF9jb250YWluZXJcIj5cbiAgICAgIDxDb250YWluZXIgcG9zaXRpb249XCJjZW50ZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkZW1vX19wbGFudF90ZXh0Qm94XCI+XG4gICAgICAgICAgPGg0IGNsYXNzTmFtZT1cImRlbW9fX3BsYW50X3NtYWxsSGVhZGVyXCI+U21hbGwgaGVhZGVyPC9oND5cbiAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwiZGVtb19fcGxhbnRfdGl0bGVcIj5IZWFkZXI8L2gxPlxuICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJkZW1vX19wbGFudF9zdWJ0aXRsZVwiPnN1YnRpdGxlPC9oMz5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJkZW1vX19wbGFudF9ib2R5XCI+XG4gICAgICAgICAgICBCYWNvbiBpcHN1bSBkb2xvciBhbWV0IGJ1ZmZhbG8gbmlzaSBhbmRvdWlsbGUgYmFsbFxuICAgICAgICAgICAgdGlwIGtpZWxiYXNhIHBvcmsgbG9pbiwgZXhlcmNpdGF0aW9uIGplcmt5IGZpbGV0XG4gICAgICAgICAgICBtaWdub24gZXhjZXB0ZXVyIGRvbmVyIGRvIHBvcmsgY2hvcC5cbiAgICAgICAgICA8L3A+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkZW1vX19wbGFudF9idXR0b25cIj5cbiAgICAgICAgICAgIExlYXJuIG1vcmVcbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L0NvbnRhaW5lcj5cbiAgICAgIDxpbWdcbiAgICAgICAgY2xhc3NOYW1lPVwiZGVtb19fcGxhbnRfaW1nXCJcbiAgICAgICAgc3JjPVwiYXNzZXRzL3BsYW50LnN2Z1wiXG4gICAgICAgIGFsdD1cIlwiXG4gICAgICAvPlxuICAgIDwvc2VjdGlvbj5cbiAgKVxufVxuXG5jb25zdCBQaW5rQnJpY2tzOiBSZWFjdC5GQzxTUHJvcHM+ID0gKHsgaXNBY3RpdmUsIGJhY2tkcm9wVmFsdWUsIGJhY2tkcm9wVGhlbWV9KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiZGVtb19fcGlua0JyaWNrc19jb250YWluZXJcIj5cbiAgICAgIDxDb250YWluZXIgcG9zaXRpb249J2NlbnRlcic+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGVtb19fcGlua0JyaWNrc190ZXh0Qm94XCI+XG4gICAgICAgICAgPGgxIGNsYXNzTmFtZT1cImRlbW9fX3BpbmtCcmlja3NfdGl0bGVcIj5UaGUgb3V0c2lkZSB2aWV3IGlzIGJldHRlcjwvaDE+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZGVtb19fcGlua0JyaWNrc19ib2R5XCI+Li4uQnV0IHlvdSBhbHJlYWR5IGtub3cgdGhhdDwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxJbWFnZUZyYW1lXG4gICAgICAgICAgYWN0aXZlPXtpc0FjdGl2ZX1cbiAgICAgICAgICBpbWFnZT1cImFzc2V0cy9waW5rQnJpY2tzLmpwZ1wiXG4gICAgICAgICAgcG9zaXRpb249J2xlZnQnXG4gICAgICAgICAgY29sb3I9e2JhY2tkcm9wVmFsdWUudmFsdWV9XG4gICAgICAgICAgdGhlbWU9e2JhY2tkcm9wVGhlbWV9XG4gICAgICAgIC8+XG4gICAgICA8L0NvbnRhaW5lcj5cbiAgICA8L3NlY3Rpb24+XG4gIClcbn1cblxuY29uc3QgR3JheVNraWVzOiBSZWFjdC5GQzxTUHJvcHM+ID0gKHsgaXNBY3RpdmUsIGJhY2tkcm9wVmFsdWUsIGJhY2tkcm9wVGhlbWV9KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiZGVtb19fZ3JheVNraWVzX2NvbnRhaW5lclwiPlxuICAgICAgPENvbnRhaW5lciBwb3NpdGlvbj0nY2VudGVyJz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkZW1vX19ncmF5U2tpZXNfdGV4dEJveFwiPlxuICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJkZW1vX19ncmF5U2tpZXNfdGl0bGVcIj5UaGUgb3V0c2lkZSB2aWV3IGlzIGJldHRlcjwvaDE+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZGVtb19fZ3JheVNraWVzX2JvZHlcIj4uLi5CdXQgeW91IGFscmVhZHkga25vdyB0aGF0PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPEltYWdlRnJhbWVcbiAgICAgICAgICBhY3RpdmU9e2lzQWN0aXZlfVxuICAgICAgICAgIGltYWdlPVwiYXNzZXRzL2Nsb3VkQ292ZXIuanBnXCJcbiAgICAgICAgICBwb3NpdGlvbj0ncmlnaHQnXG4gICAgICAgICAgY29sb3I9e2JhY2tkcm9wVmFsdWUudmFsdWV9XG4gICAgICAgICAgdGhlbWU9e2JhY2tkcm9wVGhlbWV9XG4gICAgICAgIC8+XG4gICAgICA8L0NvbnRhaW5lcj5cbiAgICA8L3NlY3Rpb24+XG4gIClcbn1cblxuY29uc3QgUmVkSGFuZHM6IFJlYWN0LkZDPFNQcm9wcz4gPSAoe2lzQWN0aXZlLCBiYWNrZHJvcFZhbHVlLCBiYWNrZHJvcFRoZW1lfSkgPT4ge1xuICByZXR1cm4gIChcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJkZW1vX19yZWRIYW5kc19jb250YWluZXJcIj5cbiAgICAgIDxDb250YWluZXIgcG9zaXRpb249XCJjZW50ZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkZW1vX19yZWRIYW5kc190ZXh0Qm94XCI+XG4gICAgICAgICAgPGgxIGNsYXNzTmFtZT1cImRlbW9fX3JlZEhhbmRzX3RpdGxlXCI+VGhlIG91dHNpZGUgdmlldyBpcyBiZXR0ZXI8L2gxPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImRlbW9fX3JlZEhhbmRzX2JvZHlcIj4uLi5CdXQgeW91IGFscmVhZHkga25vdyB0aGF0PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPEltYWdlRnJhbWVcbiAgICAgICAgICBhY3RpdmU9e2lzQWN0aXZlfVxuICAgICAgICAgIGltYWdlPVwiYXNzZXRzL2hhbmRzLmpwZ1wiXG4gICAgICAgICAgcG9zaXRpb249J2xlZnQnXG4gICAgICAgICAgY29sb3I9e2JhY2tkcm9wVmFsdWUudmFsdWV9XG4gICAgICAgICAgdGhlbWU9e2JhY2tkcm9wVGhlbWV9XG4gICAgICAgIC8+XG4gICAgICA8L0NvbnRhaW5lcj5cbiAgICA8L3NlY3Rpb24+XG4gIClcbn1cblxuY29uc3QgQnJpZGdlOiBSZWFjdC5TRkM8U1Byb3BzPiA9ICh7aXNBY3RpdmUsIGJhY2tkcm9wVmFsdWUsIGJhY2tkcm9wVGhlbWV9KSA9PiB7XG5cbiAgY29uc3QgdGV4dENsYXNzTmFtZXMgPSBbXG4gICAgJ2RlbW9fX2JyaWRnZV90ZXh0JyxcbiAgICBpc0FjdGl2ZSA/ICdhY3RpdmUnIDogJycsXG4gIF0uam9pbignICcpO1xuXG4gIGxldCB0ZXh0Tm9kZSA9IHVzZVJlZihudWxsKTtcblxuICBjb25zdCBbbG9hZGVkLCBkZWNsYXJlTG9hZGVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBpZighbG9hZGVkKSBkZWNsYXJlTG9hZGVkKHRydWUpO1xuXG4gIGlmKGxvYWRlZCAmJiB0ZXh0Tm9kZS5jdXJyZW50KSB7XG4gICAgY29uc3QgZWwgPSB0ZXh0Tm9kZS5jdXJyZW50O1xuXG4gICAgZWwuaW5uZXJIVE1MID0gZWxcbiAgICAgIC50ZXh0Q29udGVudFxuICAgICAgLnJlcGxhY2UoL1xcUy9nLCBcIjxzcGFuIGNsYXNzPSdsZXR0ZXInPiQmPC9zcGFuPlwiKTtcblxuICAgIGFuaW1lLnRpbWVsaW5lKHtsb29wOiBmYWxzZX0pXG4gICAgICAuYWRkKHtcbiAgICAgICAgdGFyZ2V0czogJy5kZW1vX19icmlkZ2VfdGV4dCAubGV0dGVyJyxcbiAgICAgICAgdHJhbnNsYXRlWDogWzQwLDBdLFxuICAgICAgICB0cmFuc2xhdGVaOiAwLFxuICAgICAgICBvcGFjaXR5OiBbMCwxXSxcbiAgICAgICAgZWFzaW5nOiBcImVhc2VPdXRFeHBvXCIsXG4gICAgICAgIGR1cmF0aW9uOiAxMjAwLFxuICAgICAgICBkZWxheTogKGVsLCBpKSA9PiA1MDAgKyAzMCAqIGlcbiAgICAgIH0pLmFkZCh7XG4gICAgICAgIHRhcmdldHM6ICcuZGVtb19fYnJpZGdlX3RleHQgLmxldHRlcicsXG4gICAgICAgIHRyYW5zbGF0ZVg6IFswLC0zMF0sXG4gICAgICAgIG9wYWNpdHk6IFsxLDFdLFxuICAgICAgICBlYXNpbmc6IFwiZWFzZUluRXhwb1wiLFxuICAgICAgICBkdXJhdGlvbjogMTEwMCxcbiAgICAgICAgZGVsYXk6IChlbCwgaSkgPT4gMTAwICsgMzAgKiBpXG4gICAgICB9KTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiZGVtb19fYnJpZGdlX2NvbnRhaW5lclwiPlxuICAgICAgPENvbnRhaW5lciBwb3NpdGlvbj1cImNlbnRlclwiPlxuICAgICAgICA8ZGl2IHJlZj17dGV4dE5vZGV9IGNsYXNzTmFtZT17dGV4dENsYXNzTmFtZXN9PlRoZSBvdXRzaWRlIHZpZXcgaXMgYmV0dGVyLi4uPC9kaXY+XG4gICAgICA8L0NvbnRhaW5lcj5cbiAgICA8L3NlY3Rpb24+XG4gIClcbn1cblxuaW50ZXJmYWNlIExQcm9wcyB7XG4gIGNoaWxkcmVuOiBhbnk7XG59XG5cbmludGVyZmFjZSBMU3RhdGUge1xuICBoYXNMb2FkZWQ6IGJvb2xlYW47XG59XG5cbmNsYXNzIExheW91dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxMUHJvcHMsIExTdGF0ZT4ge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBoYXNMb2FkZWQ6IGZhbHNlLFxuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe2hhc0xvYWRlZDogdHJ1ZX0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgY2hpbGRyZW4gfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8QmFja2Ryb3BDb250YWluZXJcbiAgICAgICAgICBkZWZhdWx0VmFsdWU9e3sgdmFsdWU6IFwidHJhbnNwYXJlbnRcIiwgdHlwZTogJ2NvbG9yJyB9fVxuICAgICAgICAgIGZyb21Ub3A9ezM1MH1cbiAgICAgICAgICBhbmltYXRpb25EdXJhdGlvbj17ODAwfVxuICAgICAgICA+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2xheW91dCc+XG4gICAgICAgICAgICA8SGVsbWV0PlxuICAgICAgICAgICAgICA8bGlua1xuICAgICAgICAgICAgICAgIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9UGxheWZhaXIrRGlzcGxheTo0MDAsNzAwfFJhbWFyYWphJmRpc3BsYXk9c3dhcFwiXG4gICAgICAgICAgICAgICAgcmVsPVwic3R5bGVzaGVldFwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxsaW5rXG4gICAgICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1QZXJtYW5lbnQrTWFya2VyJmRpc3BsYXk9c3dhcFwiXG4gICAgICAgICAgICAgICAgcmVsPVwic3R5bGVzaGVldFwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L0hlbG1ldD5cbiAgICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9CYWNrZHJvcENvbnRhaW5lcj5cbiAgICApXG4gIH1cbn1cblxuY29uc3QgQ29udGVudCA9ICgpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8TGF5b3V0PlxuXG4gICAgICAgIDxCYWNrZHJvcFpvbmUgY29sb3I9XCIjMjUyNjI5XCIgaW5zdGFudD17dHJ1ZX0+XG4gICAgICAgICAgPFNwbGFzaFNlY3Rpb24gLz5cbiAgICAgICAgPC9CYWNrZHJvcFpvbmU+XG5cbiAgICAgICAgPEJhY2tkcm9wWm9uZSBjb2xvcj1cIiNDRDlDQUVcIiB0aGVtZT1cImRhcmtcIj5cbiAgICAgICAgICB7KCBhY3RpdmUsIGN1cnJlbnRUaGVtZSwgY3VycmVudFZhbHVlICkgPT5cbiAgICAgICAgICAgIDxQaW5rQnJpY2tzXG4gICAgICAgICAgICAgIGlzQWN0aXZlPXthY3RpdmV9XG4gICAgICAgICAgICAgIGJhY2tkcm9wVmFsdWU9e2N1cnJlbnRWYWx1ZX1cbiAgICAgICAgICAgICAgYmFja2Ryb3BUaGVtZT17Y3VycmVudFRoZW1lfVxuICAgICAgICAgICAgLz59XG4gICAgICAgIDwvQmFja2Ryb3Bab25lPlxuXG4gICAgICAgIDxCYWNrZHJvcFpvbmUgY29sb3I9XCIjNDE0OTUzXCIgdGhlbWU9XCJsaWdodFwiPlxuICAgICAgICAgIHsoIGFjdGl2ZSwgY3VycmVudFRoZW1lLCBjdXJyZW50VmFsdWUgKSA9PlxuICAgICAgICAgICAgPEdyYXlTa2llcyBcbiAgICAgICAgICAgICAgaXNBY3RpdmU9e2FjdGl2ZX1cbiAgICAgICAgICAgICAgYmFja2Ryb3BWYWx1ZT17Y3VycmVudFZhbHVlfVxuICAgICAgICAgICAgICBiYWNrZHJvcFRoZW1lPXtjdXJyZW50VGhlbWV9XG4gICAgICAgICAgICAvPn1cbiAgICAgICAgPC9CYWNrZHJvcFpvbmU+XG5cbiAgICAgICAgPEJhY2tkcm9wWm9uZSBjb2xvcj1cIiNCQjE3MDJcIiB0aGVtZT1cImxpZ2h0XCI+XG4gICAgICAgICAgeyggYWN0aXZlLCBjdXJyZW50VGhlbWUsIGN1cnJlbnRWYWx1ZSApID0+XG4gICAgICAgICAgICA8UmVkSGFuZHNcbiAgICAgICAgICAgICAgaXNBY3RpdmU9e2FjdGl2ZX1cbiAgICAgICAgICAgICAgYmFja2Ryb3BWYWx1ZT17Y3VycmVudFZhbHVlfVxuICAgICAgICAgICAgICBiYWNrZHJvcFRoZW1lPXtjdXJyZW50VGhlbWV9XG4gICAgICAgICAgICAvPn1cbiAgICAgICAgPC9CYWNrZHJvcFpvbmU+XG5cbiAgICAgICAgPEJhY2tkcm9wWm9uZSBpbWFnZT17J2Fzc2V0cy9icmlkZ2UuanBnJ30gdGhlbWU9XCJkYXJrXCI+XG4gICAgICAgICAgeyggYWN0aXZlLCBjdXJyZW50VGhlbWUsIGN1cnJlbnRWYWx1ZSApID0+XG4gICAgICAgICAgICA8QnJpZGdlXG4gICAgICAgICAgICAgIGlzQWN0aXZlPXthY3RpdmV9XG4gICAgICAgICAgICAgIGJhY2tkcm9wVmFsdWU9e2N1cnJlbnRWYWx1ZX1cbiAgICAgICAgICAgICAgYmFja2Ryb3BUaGVtZT17Y3VycmVudFRoZW1lfVxuICAgICAgICAgICAgLz59XG4gICAgICAgIDwvQmFja2Ryb3Bab25lPlxuXG4gICAgPC9MYXlvdXQ+XG4gIClcbn1cbi8qICAqL1xuUmVhY3RET00ucmVuZGVyKDxDb250ZW50Lz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSk7IFxuIl19
