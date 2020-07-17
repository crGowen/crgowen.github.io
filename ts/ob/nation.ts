class Nation {
    private capital: StarSystem;
    private culture: Culture;
    private name:string;
    private independentNat:boolean;
    private colourScheme: {c1: string, c2: string};
    
    public index: number;
    public leadership: any [];
    public controlledStars: StarSystem [];

    static generateCapital() {
        var tStar: StarSystem;
        var s = 0;
        
        var generatedIsUnique = false;

        while(!generatedIsUnique) {
            // for all other nations, make sure the distance between them is large enough to be 'unique' 

            generatedIsUnique = true;
            tStar = ObController.stars[Math.floor(Math.random() * ObController.stars.length)];

            if (tStar.destinations.length === 0) generatedIsUnique = false;

            for (let i = 0; i < ObController.nations.length && generatedIsUnique; i++) {
                s = Math.pow(tStar.location.x - ObController.nations[i].capital.location.x, 2) + Math.pow(tStar.location.y - ObController.nations[i].capital.location.y, 2);

                if (s<35000) {
                    generatedIsUnique = false;
                }
            }
        }

        return tStar;
    }

    constructor(index: number, colour1:string, colour2:string, independentNat = false) {
        this.independentNat = independentNat;
        this.colourScheme = {c1: colour1, c2: colour2};

        if (independentNat) {
            this.capital = null;
            this.culture = null;
            this.name = "Independent";
            this.controlledStars = [];
            this.leadership = [];
            this.index = null;
            return;
        }

        this.index = index;
        this.capital = Nation.generateCapital();
        this.culture = Culture.getRandomCulture();
        //console.log(this.culture);
        this.name = "UNDEF";
        this.generateName();

        this.controlledStars = [];
        this.controlledStars.push(this.capital);

        this.leadership = [];
    }

    getName() {
        return this.name;
    }

    getColour1() {
        return this.colourScheme.c1;
    }

    getColour2() {
        return this.colourScheme.c2;
    }

    isIndependentNat() {
        return this.independentNat;
    }

    generateName() {
        this.name = this.culture.genNationTitle(this.capital.getStarName());
    }

    addStar(star: StarSystem) {
        this.controlledStars.push(star);
    }

    getCapital() {
        return this.capital;
    }

    getCulture() {
        return this.culture;
    }
 
    removeStar(star: StarSystem){
        let ind = this.controlledStars.indexOf(star);
        this.controlledStars[ind] = null;
        this.controlledStars.splice(ind, 1);
    }

    freeControlledStars() {
        this.controlledStars.forEach(e => {
            e.makeIndependent();
        });
    }
}

class Culture {
    public index: number;

    private name: string;
    private leaderTitles: {overall: string, military: string, civic: string};
    private shipDesignations: {commercial: string, military: string};
    private shipNames: {both: string [], commercial: string [], military: string[]};
    private nationTitles: {post: string [], pre: string []};
    private politicalAlignment: {authority: number, wealth: number, militarism: number}; // 1-5 likert scale
    private colour: string;


    static getRandomCulture() {
        return ObController.cultures[Math.floor(Math.random() * ObController.cultures.length)];
    }

    constructor(index: number, name: string,
        overallLeaderTitle: string,
        militaryLeaderTitle: string,
        civicLeaderTitle: string,
        militaryShipDesignation: string,
        commercialShipDesignation: string,
        shipNamesBoth: string [],
        shipNamesMilitary: string [],
        shipNamesCommercial: string [],
        nationTitlesSuffixes: string [],
        nationTitlesPrefixes: string [],
        politicalAlignmentAuthority: number,
        politicalAlignmentWealth: number,
        politicalAlignmentMilitarism: number,
        colour: string
        )
        {
            this.index = index;
            this.name = name;
            this.leaderTitles = {overall: overallLeaderTitle, military: militaryLeaderTitle, civic: civicLeaderTitle};
            this.shipDesignations = {military: militaryShipDesignation, commercial: commercialShipDesignation};
            this.shipNames = {both: shipNamesBoth, military: shipNamesMilitary, commercial: shipNamesCommercial};
            this.nationTitles = {post: nationTitlesSuffixes, pre: nationTitlesPrefixes};
            this.politicalAlignment = {authority: politicalAlignmentAuthority, wealth: politicalAlignmentWealth, militarism: politicalAlignmentMilitarism};

            this.colour = colour;
    }

    getColour() {
        return this.colour;
    }

    getName() {
        return this.name;
    }

    getLeaderTitle(type:string) {
        switch(type.toLowerCase()) {
            case 'o':
            case 'overall':
                return this.leaderTitles.overall;
            case 'm':
            case 'military':
                return this.leaderTitles.military;
            case 'c':
            case 'civic':
            case 'commercial':
                return this.leaderTitles.civic;
            default:
                console.error("error: unexpected argument in function Culture.getLeaderTitle");
        }
    }

    getShipDesignation(type:string) {
        switch(type.toLowerCase()) {
            case 'o':
            case 'overall':
                console.error("error: 'overall' / 'o' is NOT a valid argument in function Culture.getShipDesignation");
            case 'm':
            case 'military':
                return this.shipDesignations.military;
            case 'c':
            case 'civic':
            case 'commercial':
                return this.shipDesignations.commercial;
            default:
                console.error("error: unexpected argument in function Culture.getShipDesignation");
        }
    }

    // TODO
    genShipName(type:string) {
        switch(type.toLowerCase()) {
            case 'o':
            case 'overall':
                // need to do something
            case 'm':
            case 'military':
                // need to do something
            case 'c':
            case 'civic':
            case 'commercial':
                // need to do something
            default:
                console.error("error: unexpected argument in function Culture.genShipName");
        }
    }

    genNationTitle(capital: string) {
        var rand: number;
        var name: string;
        rand = Math.floor(Math.random() * (this.nationTitles.pre.length + this.nationTitles.post.length));
        if (rand < this.nationTitles.pre.length) {
            name = this.nationTitles.pre[rand] + " " + capital;
        } else {
            name = capital + " " + this.nationTitles.post[rand - this.nationTitles.pre.length];
        }
        return name;
    }

    getPoliticalDistance(cult: Culture) {
        let s: number;

        s = Math.pow(cult.politicalAlignment.authority - this.politicalAlignment.authority, 2) +
            Math.pow(cult.politicalAlignment.wealth - this.politicalAlignment.wealth, 2) +
            Math.pow(cult.politicalAlignment.militarism - this.politicalAlignment.militarism, 2);
        
        s = Math.pow(s, 0.5);

        return s;
    }
}