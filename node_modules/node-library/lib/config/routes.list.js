"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getRoutesOfLayer(path, layer) {
    if (layer.method) {
        return [layer.method.toUpperCase() + ' ' + path];
    }
    else if (layer.route) {
        return getRoutesOfLayer(path + split(layer.route.path), layer.route.stack[0]);
    }
    else if (layer.name === 'router' && layer.handle.stack) {
        let routes = [];
        layer.handle.stack.forEach(function (stackItem) {
            routes = routes.concat(getRoutesOfLayer(path + split(layer.regexp), stackItem));
        });
        return routes;
    }
    return [];
}
function split(thing) {
    if (typeof thing === 'string') {
        return thing;
    }
    else if (thing.fast_slash) {
        return '';
    }
    else {
        var match = thing.toString()
            .replace('\\/?', '')
            .replace('(?=\\/|$)', '$')
            .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
        return match
            ? match[1].replace(/\\(.)/g, '$1')
            : '<complex:' + thing.toString() + '>';
    }
}
const listEndpoints = require('express-list-endpoints');
const routesList = (app) => {
    listEndpoints(app).forEach((route) => {
        route.methods.forEach((method) => {
            console.log(method, route.path);
        });
    });
};
exports.default = routesList;
