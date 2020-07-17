var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var View = (function () {
    function View() {
        this.zoom = 1.8;
        this.minZoom = 1.6;
        this.maxZoom = 4;
        this.offset = { x: 400, y: 200 };
    }
    View.prototype.moveView = function (dx, dy) {
        this.offset.x += dx;
        this.offset.y += dy;
        if (this.offset.x < 0)
            this.offset.x = 0;
        else if (this.offset.x > (this.zoom - 1) * 1280)
            this.offset.x = (this.zoom - 1) * 1280;
        if (this.offset.y < -30)
            this.offset.y = -30;
        else if (this.offset.y > (this.zoom - 1) * 820)
            this.offset.y = (this.zoom - 1) * 820;
    };
    View.prototype.zoomView = function (dZoom) {
        var oldZoom = this.zoom;
        this.zoom += dZoom * -0.04;
        this.zoom = Math.min(Math.max(this.minZoom, this.zoom), this.maxZoom);
        var midpointX = (1280 / 2 + this.offset.x) / oldZoom;
        var midpointY = (720 / 2 + this.offset.y) / oldZoom;
        oldZoom = this.zoom - oldZoom;
        this.offset.x += oldZoom * midpointX;
        this.offset.y += oldZoom * midpointY;
        if (this.offset.x < 0)
            this.offset.x = 0;
        else if (this.offset.x > (this.zoom - 1) * 1280)
            this.offset.x = (this.zoom - 1) * 1280;
        if (this.offset.y < 0)
            this.offset.y = 0;
        else if (this.offset.y > (this.zoom - 1) * 720)
            this.offset.y = (this.zoom - 1) * 720;
    };
    return View;
}());
var GalaxyView = (function (_super) {
    __extends(GalaxyView, _super);
    function GalaxyView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GalaxyView.prototype.drawGalaxyMap = function (colourStyle) {
        var _this = this;
        ObController.stars.forEach(function (star) {
            star.draw(_this.offset.x, _this.offset.y, _this.zoom, colourStyle);
        });
        ObController.player.draw(this.offset.x, this.offset.y, this.zoom);
    };
    GalaxyView.prototype.centerViewAtStar = function (star) {
        this.zoom = 1.8;
        this.offset.x = (this.zoom * star.location.x) - 640;
        this.offset.y = (this.zoom * star.location.y) - 360;
        if (this.offset.x < 0)
            this.offset.x = 0;
        else if (this.offset.x > (this.zoom - 1) * 1280)
            this.offset.x = (this.zoom - 1) * 1280;
        if (this.offset.y < -30)
            this.offset.y = -30;
        else if (this.offset.y > (this.zoom - 1) * 820)
            this.offset.y = (this.zoom - 1) * 820;
    };
    GalaxyView.prototype.getStarAt = function (x, y) {
        x = x + this.offset.x;
        x = x / this.zoom;
        y = y + this.offset.y;
        y = y / this.zoom;
        for (var i = 0; i < ObController.stars.length; i++) {
            if ((Math.abs(ObController.stars[i].location.x - x) < 5) && (Math.abs(ObController.stars[i].location.y - y) < 5)) {
                return ObController.stars[i];
            }
        }
        return null;
    };
    GalaxyView.prototype.getMouseHoverPlayer = function (x, y) {
        x = x + this.offset.x;
        x = x / this.zoom;
        y = y + this.offset.y;
        y = y / this.zoom;
        if (Math.abs(ObController.player.location.x - x) < 4 && Math.abs(ObController.player.location.y - y - 6) < 6)
            return true;
        else
            return false;
    };
    return GalaxyView;
}(View));
var StarView = (function (_super) {
    __extends(StarView, _super);
    function StarView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StarView.prototype.drawSystemMap = function (star) {
        var xDraw = (this.zoom * 640) - this.offset.x;
        var yDraw = (this.zoom * 360) - this.offset.y;
        if ((xDraw <= 1280 - 5 && yDraw <= 720 - 5) && (xDraw >= 5 && yDraw >= 5)) {
            ObController.context.drawImage(StarSystem.starSprites[star.getStarType()], xDraw - (15 * this.zoom), yDraw - (15 * this.zoom), 30 * this.zoom, 30 * this.zoom);
        }
        for (var i = 0; i < star.destinations.length; i++) {
            star.destinations[i].draw(this.offset.x, this.offset.y, this.zoom);
        }
        ObController.player.draw(this.offset.x, this.offset.y, this.zoom, star.getStarName());
    };
    StarView.prototype.resetView = function () {
        this.offset.x = 500;
        this.offset.y = 300;
        this.zoom = 1.8;
    };
    StarView.prototype.getDestinationAt = function (x, y) {
        x = x + this.offset.x;
        x = x / this.zoom;
        y = y + this.offset.y;
        y = y / this.zoom;
        for (var i = 0; i < ObController.selectedStar.destinations.length; i++) {
            if ((Math.abs(ObController.selectedStar.destinations[i].location.x - x) < 3) && (Math.abs(ObController.selectedStar.destinations[i].location.y - y) < 3)) {
                return ObController.selectedStar.destinations[i];
            }
        }
        return null;
    };
    StarView.prototype.getMouseHoverStar = function (x, y) {
        x = x + this.offset.x;
        x = x / this.zoom;
        y = y + this.offset.y;
        y = y / this.zoom;
        if (Math.abs(640 - x) < 5 * this.zoom && Math.abs(360 - y) < 5 * this.zoom)
            return true;
        else
            return false;
    };
    StarView.prototype.getMouseHoverPlayer = function (x, y) {
        x = x + this.offset.x;
        x = x / this.zoom;
        y = y + this.offset.y;
        y = y / this.zoom;
        if (Math.abs(ObController.player.systemLocation.x - x) < 4 && Math.abs(ObController.player.systemLocation.y - y - 6) < 6)
            return true;
        else
            return false;
    };
    return StarView;
}(View));
//# sourceMappingURL=view.js.map