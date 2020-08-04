class StarSystem {
    private type: number;
    public location:{x: number, y: number};
    private name: string;
    public destinations: any []; // CHANGE TO DESTINATIONS!
    public nearbyStars: StarSystem [];
    private nation: Nation;
    private culture: Culture;

    // used to generate the random names for the stars and destination
    static genStarSubstrings = {
        p1: [ "Red", "Blu", "Lo", "Hi", "Mi", "Ni", "Mei", "Hor", "Sof", "Of", "Brei", "Dar", "Lon", "Dul", "Sur", "Ex", "Inc", "Ela", "Weit", "Wei", "Weu", "North", "Nor", "Su", "Sud", "Eas", "Ost", "Met", "Wes", "New", "Ol", "Sto", "Sta", "Mag", "Sil", "Go", "Vor", "Vol", "Glas", "Ar", "Nar", "Ide", "Narro", "Wid", "Tal", "Klein", "Ein", "Schwarz", "Fau", "Gruen", "Wel", "Bie", "Gros", "Krasna", "Sam", "San", "Sanc", "Neu", "Alt", "Venta", "Ater", "Kol", "Kis", "Vila", "For", "Bas", "Ander", "Nis", "Las", "Hib", "Nos", "Sed", "Ara", "Au", "In", "Sid", "Il", "Ely", "Nov", "Ac", "Cara", "Sus", "Tho", "Thor" ],
        p2: [ "tow", "dac", "lit", "scha", "ite", "is", "ic", "plex", "bid", "orta", "terra", "schild", "pen", "zen", "fort", "and", "key", "rut", "ei", "ear", "son", "ent", "ice", "katz", "hun", "heim", "este", "burg", "feld", "har", "ar", "am", "as", "a", "koshka", "dom", "stin", "anz", "ko", "ja", "el", "tor", "stra", "gorod", "ae", "canis", "roma", "gallia", "nia", "don", "ton", "belga", "via", "null", "ra", "marit", "senex", "bus", "fir", "feuer", "kon", "kos", "ros", "lex", "loch", "tus", "domus", "ser", "ius", "ium", "il", "um", "us", "itz", "ca", "anov", "sk", "stein", "ev", "ine", "tol" ],
        opt1: ["Orbital", "Station", "Outpost", "Post", "Gateway"]
    };

    static starSprites: any;

    // self-explanitory
    static getDistanceFromOrigin(loc:{x:number, y:number}) {
        let s = Math.pow(loc.x - 640, 2) + Math.pow(loc.y - 360, 2);
        return Math.pow(s, 0.5);
    }

    static generateName() {
        // called by the constructor to generate a random name
        let generated = "";
        let generatedIsUnique = false;
        
        while (!generatedIsUnique) {
            generated = "";
            generated += StarSystem.genStarSubstrings.p1[ Math.floor(Math.random() * StarSystem.genStarSubstrings.p1.length) ];
            generated += StarSystem.genStarSubstrings.p2[ Math.floor(Math.random() * StarSystem.genStarSubstrings.p2.length) ];
    
            generatedIsUnique = true;
            for (let i = 0; (i < ObController.stars.length) && generatedIsUnique; i++) {
                if (ObController.stars[i].name == generated) generatedIsUnique = false;
    
                for (let j = 0; (j < ObController.stars[i].destinations.length) && generatedIsUnique; j++) {
                    if (ObController.stars[i].destinations[j].name.split(" ")[0] == generated) generatedIsUnique = false;
                }
            }
        }
    
        return generated;
    }

    // self-explanatory but also includes functionality to avoid generating stars too close to each other
    static generateStarLocation() {
        let x = 0;
        let y = 0;
        let s = 0;

        let generatedIsUnique = false;
        
        while (!generatedIsUnique) {
            x = Math.floor(Math.random() * 1228) + 26;
            y = Math.floor(Math.random() * 668) + 26;
    
            generatedIsUnique = true;

            for (let i = 0; (i < ObController.stars.length) && generatedIsUnique; i++) {
                s = Math.pow(x - ObController.stars[i].location.x, 2) + Math.pow(y - ObController.stars[i].location.y, 2);

                if (s<36) generatedIsUnique = false;
            }
        }

        return {x, y};
    }

    constructor() {
        let dClass = 'n'; //normal
        this.location = StarSystem.generateStarLocation();

        let rand = Math.floor(Math.random() * 25);
        if (rand == 0) {
            // generate as a rare star (neutron star, black hole)
            dClass = 'r';
            this.type = Math.floor(Math.random() * 2) + 4;
            rand = 1;
        } else if (rand < 8){
            // generate as a barely habitable star (L,W,Y,D class stars)
            dClass = 'b';
            this.type = Math.floor(Math.random() * 4) + 6;
            rand = Math.floor(Math.random() * 2) + 1;
        } else if (rand < 15){
            // generate as a rare white or blue main sequence star
            this.type = Math.floor(Math.random() * 2); // white and blue are rare           
            rand = Math.floor(Math.random() * 4) + 1;
        } else {
            // generate as a common main sequence star
            this.type = Math.floor(Math.random() * 2) + 2; // white and blue are rare           
            rand = Math.floor(Math.random() * 4) + 1;
        }

        this.name = StarSystem.generateName();
        this.destinations = [];
        this.nearbyStars = [];

        let d = StarSystem.getDistanceFromOrigin(this.location) / 25;
        
        switch (dClass){
            case 'n':
                d = d*0.95;
                break;
            case 'r':
                d = d*2.5;
                break;
            case 'b':
                d = d*1.4;
                break;
        }

        // becomes LESS likely be inhabited the further out they are, and more likely to be inhabited if the star is a main sequence
        if (Math.floor(Math.random() * 10) + 10 > d){
            for (let i = 0; i < rand; i++) {
                this.destinations.push(new Destination(i, dClass, this.destinations, this));
            } 
            this.nation = ObController.independentNat;
            this.culture = Culture.getRandomCulture();
        } else {
            this.nation = null;
            this.culture = null;
        }
    }

    // specify the nation currently controlling the star
    setNation(nat: Nation) {
        this.nation = nat;
    }

    getNation() {
        return this.nation;
    }

    // specify the culture dominant in this star system
    setCulture(cult: Culture) {
        this.culture = cult;
    }

    getCulture() {
        return this.culture;
    }

    getStarName() {
        return this.name;
    }

    getStarType(asString = false) {
        if (!asString) {
            return this.type;
        }
        
        switch (this.type) {
            case 0:
                return "Yellow-white Dwarf"; // F-class
            case 1:
                return "Be Star"; // B-class
            case 2:
                return "Orange Dwarf"; // K-class
            case 3:
                return "Red Dwarf"; // M-class
            case 4:
                return "Neutron Star";
            case 5:
                return "Black Hole";
            case 6:
                return "Brown Dwarf";
            case 7:
                return "Wolf-Rayet Star";
            case 8:
                return "Carbon Star";
            case 9:
                return "Degenerate Dwarf";
        }
    }

    // free star from its controlling nation
    makeIndependent() {
        this.nation = ObController.independentNat;
    }
    
    // draw star (sprite if in realistic view, or colours in culture / nation view)
    draw(xOffset:number, yOffset:number, zoom:number, colourStyle:string) {
        let xDraw = (zoom * this.location.x) - xOffset;
            let yDraw = (zoom * this.location.y) - yOffset;

            if (xDraw > 1280 - 5 || yDraw > 720 - 5) return;
            if (xDraw < 5 || yDraw < 5) return; 

            switch (colourStyle) {
                case 'n':
                    ObController.context.beginPath();
                    ObController.context.arc(xDraw, yDraw, 3, 0, 2 * Math.PI);
                    if (this.nation) {
                        ObController.context.fillStyle = this.nation.getColour1();
                        ObController.context.strokeStyle = this.nation.getColour2();
                    } else {
                        ObController.context.fillStyle = '#353535';
                        ObController.context.strokeStyle ='#353535';
                    }

                    ObController.context.fill();
                    ObController.context.stroke();
                    break;

                case 'c':
                    ObController.context.beginPath();
                    ObController.context.arc(xDraw, yDraw, 3, 0, 2 * Math.PI);

                    if (this.culture)
                        ObController.context.fillStyle = this.culture.getColour();
                    else
                        ObController.context.fillStyle = "gray";

                    ObController.context.fill();
                    break;
                default:
                    ObController.context.drawImage(StarSystem.starSprites[this.type], xDraw-(2*zoom), yDraw-(2*zoom), 4*zoom, 4*zoom);
                    break;
            }
    }

    // if this star is independent, potentially become part of a nearby nation (used primarily for galaxy generation to blob nations out)
    nationSpread() {
        if (!this.nation) return;
        if (!this.nation.isIndependentNat()) return;

        let growthScore = 0;
        //8 nations
        let civExpansionScores = [0, 0, 0, 0, 0, 0, 0, 0];

        for (let i = 0; i < this.nearbyStars.length; i++) {
            if (this.nearbyStars[i].nation) {
                if (!this.nearbyStars[i].nation.isIndependentNat()) {
                    growthScore++;
                    civExpansionScores[this.nearbyStars[i].nation.index]++;
                }
            }
        }

        let rand = Math.floor(Math.random() * 8);
        if (rand >= growthScore) return;

        let expCiv = 0;
        let expScore = 0;
        for (let i = 0; i < civExpansionScores.length; i++) {
            civExpansionScores[i] *= Math.floor(Math.random() * 4) + 10;
            if (civExpansionScores[i]>expScore) {
                expCiv = i;
                expScore = civExpansionScores[i];
            }
        }

        this.nation = ObController.nations[expCiv];
        ObController.nations[expCiv].addStar(this);
    }

    // potentially change culture if surrounded by a larger culture group (used primarily for galaxy generation to blob culture out)
    cultureSpread(){
        if (!this.culture) return;
        // 6 cultures
        let cultureExpansionScores = [0, 0, 0, 0, 0, 0];

        cultureExpansionScores[this.culture.index] = 3;

        for (let i = 0; i < this.nearbyStars.length; i++) {
            if (this.nearbyStars[i].culture)
                cultureExpansionScores[this.nearbyStars[i].culture.index]++;
        }

        let expCult = 0;
        let expScore = 0;
        
        for (let i = 0; i < cultureExpansionScores.length; i++) {
            cultureExpansionScores[i] *= Math.floor(Math.random() * 4) + 6;
            if (cultureExpansionScores[i]>expScore) {
                expCult = i;
                expScore = cultureExpansionScores[i];
            }
        }

        this.culture = ObController.cultures[expCult];
    }
}

class Destination {
    public location: {x:number, y:number};
    private bodyAppearance: number;
    private status: number;
    private type: number;
    private name: string;
    private star: StarSystem;

    static planetSprites:any;
                
    static planetHqSprites:any;

    static generateName(priorDestinations: Destination []) {
        // called by the constructor to generate a random name
        let generated = "";
        let generatedIsUnique = false;
        
        while (!generatedIsUnique) {
            generated = "";
            generated += StarSystem.genStarSubstrings.p1[ Math.floor(Math.random() * StarSystem.genStarSubstrings.p1.length) ];
            generated += StarSystem.genStarSubstrings.p2[ Math.floor(Math.random() * StarSystem.genStarSubstrings.p2.length) ];
    
            generatedIsUnique = true;
            for (let i = 0; (i < ObController.stars.length) && generatedIsUnique; i++) {
                if (ObController.stars[i].getStarName() == generated) generatedIsUnique = false;
    
                for (let j = 0; (j < ObController.stars[i].destinations.length) && generatedIsUnique; j++) {
                    if (ObController.stars[i].destinations[j].name == generated) generatedIsUnique = false;
                }
            }

            for (let i = 0; i < priorDestinations.length; i++) {
                if (priorDestinations[i].name == generated) generatedIsUnique = false;
            }
        }
    
        return generated;
    }

    constructor(ind:number, dClass:string, priorDestinations: Destination [], star: StarSystem){
        // replace this line with a simple x,y
        let radius = (ind*38 + 60);
        this.star = star;

        let i = Math.floor(Math.random() * radius);
        let j = Math.floor(Math.pow(   Math.pow(radius, 2) - Math.pow(i, 2),        0.5  ));

        let rand = Math.floor(Math.random() * 2);
        if (rand == 1) i *= (-1);

        rand = Math.floor(Math.random() * 2);
        if (rand == 1) j *= (-1);

        this.location = {x: 640 + i, y: 360 + j};
        this.bodyAppearance = Math.floor(Math.random() * 4);
        this.status = 0;

        switch(dClass) {
            case 'n':
                rand = Math.floor(Math.random() * 4);
                if (rand==1) this.type = Math.floor(Math.random() * 3); // tiny chance of anything else
                else this.type = 3; // but most likely a colony
                break;
            
            case 'r':
                // rare neutron/black hole

                rand = Math.floor(Math.random() * 16);
                if (rand==1) this.type = 1; // tiny chance of military station
                else this.type = 0; // but most likely a research station
                break;

            case 'b':
                // barely habitable
    
                rand = Math.floor(Math.random() * 8);
                if (rand==1) this.type = 1; // small chance of military station
                else this.type = 0; // but most likely a research station
                break;
        }

        this.name = Destination.generateName(priorDestinations);
    }

    getEconomyType() {
        switch(this.type) {
            case 0:
                return "Research facility";
            case 1: 
                return "Military facility";
            case 2:
                return "Mining post";
            case 3:
                return "Permanent colony";
        }
    }

    getDestinationName() {
        return this.name;
    }

    getStatus() {
        switch (this.status) {
            case 0:
                return "operating normally";
        }
    }

    // return the star object around which this destination belongs
    getStar(){
        return this.star;
    }

    // draw in the starMap view
    draw(xOffset: number, yOffset: number, zoom: number) {
        let xDraw = (zoom * this.location.x) - xOffset;
        let yDraw = (zoom * this.location.y) - yOffset;

        if (xDraw > 1280 - 5 || yDraw > 720 - 5) return;
        if (xDraw < 5 || yDraw < 5) return; 

        ObController.context.drawImage(Destination.planetSprites[this.bodyAppearance], xDraw-(2*zoom), yDraw-(2*zoom), 4*zoom, 4*zoom);
    }

    // draw the destination screen
    drawDestinationScreen() {
        ObController.context.drawImage(Destination.planetHqSprites[this.bodyAppearance], -200, -200, 1000, 1000);
    }
}