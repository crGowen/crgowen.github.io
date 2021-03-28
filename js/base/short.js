var short = {
    h: document.head,
    b: document.body,
    create: function (type, id, classes) {
        var c = document.createElement(type);
        if (id.length > 0) {
            c.id = id;
        }
        for (var i = 0; i < classes.length; i++) {
            c.classList.add(classes[i]);
        }
        return c;
    },
    byId: function (name) { return document.getElementById(name); },
    byClass: function (clname) { return document.getElementsByClassName(clname); },
    del: function (elem) { if (elem)
        elem.parentNode.removeChild(elem); },
    clearChildren: function (elem) {
        while (elem.childNodes.length > 0) {
            elem.removeChild(elem.childNodes[0]);
        }
    },
    checkForMobile: function () {
        var regex = /Mobi|Android/i;
        return regex.test(navigator.userAgent);
    },
    generator: function (attachTo, html, args) {
        var htmlRes = "";
        for (var _i = 0, args_1 = args; _i < args_1.length; _i++) {
            var arg = args_1[_i];
            htmlRes = html;
            for (var key in arg) {
                htmlRes = htmlRes.replaceAll("[>>" + key + "<<]", arg[key]);
            }
            attachTo.innerHTML += htmlRes;
        }
    }
};
//# sourceMappingURL=short.js.map