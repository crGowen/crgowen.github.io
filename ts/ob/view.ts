class View {
    protected zoom: number;
    protected minZoom: number;
    protected maxZoom: number;
    protected offset: {x: number, y: number};

    constructor() {
        this.zoom = 1.8;
        this.minZoom = 1.6;
        this.maxZoom = 4;
        this.offset = {x:400, y:200};
    }

    moveView(dx:number, dy:number) {
        this.offset.x += dx;
        this.offset.y += dy;
    
        // SANITY CHECKS = MUST ALWAYS BE AT THE BOTTOM OF THIS FUNCTION!
        if (this.offset.x < 0) this.offset.x = 0;
        else if (this.offset.x > (this.zoom-1)*1280) this.offset.x = (this.zoom-1)*1280;
    
        if (this.offset.y < -30) this.offset.y = -30;
        else if (this.offset.y > (this.zoom-1)*820) this.offset.y = (this.zoom-1)*820;  
    }

    zoomView(dZoom:number){   
        let oldZoom = this.zoom; 
        this.zoom += dZoom * -0.04;
        this.zoom = Math.min(Math.max(this.minZoom, this.zoom), this.maxZoom);
    
        let midpointX = (1280/2 + this.offset.x)/oldZoom;
        let midpointY = (720/2 + this.offset.y)/oldZoom;
    
        // offset correction
        oldZoom = this.zoom - oldZoom;    
    
        this.offset.x += oldZoom*midpointX;
        this.offset.y += oldZoom*midpointY;
    
        
        // end offset correction
        // THIS WORKS ONLY FOR THE CENTER POINT!
        
    
        // SANITY CHECKS = MUST ALWAYS BE AT THE BOTTOM OF THIS FUNCTION!
        if (this.offset.x < 0) this.offset.x = 0;
        else if (this.offset.x > (this.zoom-1)*1280) this.offset.x = (this.zoom-1)*1280;
    
        if (this.offset.y < 0) this.offset.y = 0;
        else if (this.offset.y > (this.zoom-1)*720) this.offset.y = (this.zoom-1)*720;
    }
}

// requires changes once player class is added
class GalaxyView extends View {
    drawGalaxyMap(colourStyle:string) {
        ObController.stars.forEach(star => {
            star.draw(this.offset.x, this.offset.y, this.zoom, colourStyle);
        });

        ObController.player.draw(this.offset.x, this.offset.y, this.zoom);
    }

    centerViewAtStar(star:StarSystem){
        this.zoom = 1.8;


        this.offset.x = (this.zoom * star.location.x) - 640;
        this.offset.y = (this.zoom * star.location.y) - 360;

        // SANITY CHECKS = MUST ALWAYS BE AT THE BOTTOM OF THIS FUNCTION!
        if (this.offset.x < 0) this.offset.x = 0;
        else if (this.offset.x > (this.zoom-1)*1280) this.offset.x = (this.zoom-1)*1280;
    
        if (this.offset.y < -30) this.offset.y = -30;
        else if (this.offset.y > (this.zoom-1)*820) this.offset.y = (this.zoom-1)*820;
    }

    // return the star near the specfied co-ordinates (or null if there is none there)
    getStarAt(x:number, y:number) {
        x = x + this.offset.x;
        x = x / this.zoom;
    
        y = y + this.offset.y;
        y = y / this.zoom;
    
        for (let i=0; i<ObController.stars.length; i++) {
            if ( (Math.abs(ObController.stars[i].location.x - x) < 5)  &&  (Math.abs(ObController.stars[i].location.y - y) < 5) ) {
                //console.log(_stars[i].GetStarInfo());
                //console.log(_stars[i]);
                return ObController.stars[i];
            }
        }

        /*
        if ( (Math.abs(_plrCtrl.location.x - x) < 8)  &&  (Math.abs(_plrCtrl.location.y - y) < 8) ) {
            return null;
        }
        */

        return null;
    }

    // return true if mouse is hovering over player
    getMouseHoverPlayer(x:number, y:number) {
        x = x + this.offset.x;
        x = x / this.zoom;
    
        y = y + this.offset.y;
        y = y / this.zoom;
        
        if (Math.abs(ObController.player.location.x - x) < 4 && Math.abs(ObController.player.location.y - y - 6) < 6)
            return true;
        else
            return false;
    }
}

class StarView extends View {
    drawSystemMap(star:StarSystem) {
        let xDraw = (this.zoom * 640) - this.offset.x;
        let yDraw = (this.zoom * 360) - this.offset.y;

        if ((xDraw <= 1280 - 5 && yDraw <= 720 - 5) && (xDraw >= 5 && yDraw >= 5)){
            ObController.context.drawImage(StarSystem.starSprites[star.getStarType() as number], xDraw-(15*this.zoom), yDraw-(15*this.zoom), 30*this.zoom, 30*this.zoom);
        }

        for (let i=0; i<star.destinations.length; i++) {
            star.destinations[i].draw(this.offset.x, this.offset.y, this.zoom);
        }

        ObController.player.draw(this.offset.x, this.offset.y, this.zoom, star.getStarName());
    }

    resetView() {
        this.offset.x = 500;
        this.offset.y = 300;
        this.zoom = 1.8;
    }

    // return the destination near the specfied co-ordinates (or null if there is none there)
    getDestinationAt(x:number, y:number) {
        x = x + this.offset.x;
        x = x / this.zoom;
    
        y = y + this.offset.y;
        y = y / this.zoom;
    
        for (let i=0; i<ObController.selectedStar.destinations.length; i++) {
            if ( (Math.abs(ObController.selectedStar.destinations[i].location.x - x) < 3)  &&  (Math.abs(ObController.selectedStar.destinations[i].location.y - y) < 3) ) {
                //console.log(_stars[i].GetStarInfo());
                //console.log(_selectedStar.destinations[i]);
                return ObController.selectedStar.destinations[i];
            }
        }

        /*
        if (Math.abs(640 - x) < 5 * this.zoom && Math.abs(360 - y) < 5 * this.zoom) return "star"; 

        if ( _plrCtrl.currentSystem == _selectedStar.name && (Math.abs(_plrCtrl.systemLocation.x - x) < 8)  &&  (Math.abs(_plrCtrl.systemLocation.y - y) < 8) ) {
            return "plr";
        }
        */

        return null;
    }

    // return true if mouse is hovering over the star in the center of the system
    getMouseHoverStar(x:number, y:number) {
        x = x + this.offset.x;
        x = x / this.zoom;
    
        y = y + this.offset.y;
        y = y / this.zoom;
        
        if (Math.abs(640 - x) < 5 * this.zoom && Math.abs(360 - y) < 5 * this.zoom)
            return true;
        else
            return false;
    }

    // return true if mouse is hovering over player
    getMouseHoverPlayer(x:number, y:number) {
        x = x + this.offset.x;
        x = x / this.zoom;
    
        y = y + this.offset.y;
        y = y / this.zoom;
        
        if (Math.abs(ObController.player.systemLocation.x - x) < 4 && Math.abs(ObController.player.systemLocation.y - y - 6) < 6)
            return true;
        else
            return false;
    }
}