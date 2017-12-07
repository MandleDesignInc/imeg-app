"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Pages = (function () {
    function Pages() {
    }
    return Pages;
}());
exports.Pages = Pages;
var Page = (function () {
    function Page() {
    }
    return Page;
}());
exports.Page = Page;
var NavigationItem = (function () {
    function NavigationItem(id, alias, title, template) {
        this.id = id;
        this.alias = alias;
        this.path = '/' + alias;
        this.title = title;
        this.template = template;
    }
    return NavigationItem;
}());
exports.NavigationItem = NavigationItem;
var Slide = (function () {
    function Slide() {
    }
    return Slide;
}());
exports.Slide = Slide;
