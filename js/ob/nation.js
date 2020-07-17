var Nation = (function () {
    function Nation(index, colour1, colour2, independentNat) {
        if (independentNat === void 0) { independentNat = false; }
        this.independentNat = independentNat;
        this.colourScheme = { c1: colour1, c2: colour2 };
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
        this.name = "UNDEF";
        this.generateName();
        this.controlledStars = [];
        this.controlledStars.push(this.capital);
        this.leadership = [];
    }
    Nation.generateCapital = function () {
        var tStar;
        var s = 0;
        var generatedIsUnique = false;
        while (!generatedIsUnique) {
            generatedIsUnique = true;
            tStar = ObController.stars[Math.floor(Math.random() * ObController.stars.length)];
            if (tStar.destinations.length === 0)
                generatedIsUnique = false;
            for (var i = 0; i < ObController.nations.length && generatedIsUnique; i++) {
                s = Math.pow(tStar.location.x - ObController.nations[i].capital.location.x, 2) + Math.pow(tStar.location.y - ObController.nations[i].capital.location.y, 2);
                if (s < 35000) {
                    generatedIsUnique = false;
                }
            }
        }
        return tStar;
    };
    Nation.prototype.getName = function () {
        return this.name;
    };
    Nation.prototype.getColour1 = function () {
        return this.colourScheme.c1;
    };
    Nation.prototype.getColour2 = function () {
        return this.colourScheme.c2;
    };
    Nation.prototype.isIndependentNat = function () {
        return this.independentNat;
    };
    Nation.prototype.generateName = function () {
        this.name = this.culture.genNationTitle(this.capital.getStarName());
    };
    Nation.prototype.addStar = function (star) {
        this.controlledStars.push(star);
    };
    Nation.prototype.getCapital = function () {
        return this.capital;
    };
    Nation.prototype.getCulture = function () {
        return this.culture;
    };
    Nation.prototype.removeStar = function (star) {
        var ind = this.controlledStars.indexOf(star);
        this.controlledStars[ind] = null;
        this.controlledStars.splice(ind, 1);
    };
    Nation.prototype.freeControlledStars = function () {
        this.controlledStars.forEach(function (e) {
            e.makeIndependent();
        });
    };
    return Nation;
}());
var Culture = (function () {
    function Culture(index, name, overallLeaderTitle, militaryLeaderTitle, civicLeaderTitle, militaryShipDesignation, commercialShipDesignation, shipNamesBoth, shipNamesMilitary, shipNamesCommercial, nationTitlesSuffixes, nationTitlesPrefixes, politicalAlignmentAuthority, politicalAlignmentWealth, politicalAlignmentMilitarism, colour) {
        this.index = index;
        this.name = name;
        this.leaderTitles = { overall: overallLeaderTitle, military: militaryLeaderTitle, civic: civicLeaderTitle };
        this.shipDesignations = { military: militaryShipDesignation, commercial: commercialShipDesignation };
        this.shipNames = { both: shipNamesBoth, military: shipNamesMilitary, commercial: shipNamesCommercial };
        this.nationTitles = { post: nationTitlesSuffixes, pre: nationTitlesPrefixes };
        this.politicalAlignment = { authority: politicalAlignmentAuthority, wealth: politicalAlignmentWealth, militarism: politicalAlignmentMilitarism };
        this.colour = colour;
    }
    Culture.getRandomCulture = function () {
        return ObController.cultures[Math.floor(Math.random() * ObController.cultures.length)];
    };
    Culture.prototype.getColour = function () {
        return this.colour;
    };
    Culture.prototype.getName = function () {
        return this.name;
    };
    Culture.prototype.getLeaderTitle = function (type) {
        switch (type.toLowerCase()) {
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
    };
    Culture.prototype.getShipDesignation = function (type) {
        switch (type.toLowerCase()) {
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
    };
    Culture.prototype.genShipName = function (type) {
        switch (type.toLowerCase()) {
            case 'o':
            case 'overall':
            case 'm':
            case 'military':
            case 'c':
            case 'civic':
            case 'commercial':
            default:
                console.error("error: unexpected argument in function Culture.genShipName");
        }
    };
    Culture.prototype.genNationTitle = function (capital) {
        var rand;
        var name;
        rand = Math.floor(Math.random() * (this.nationTitles.pre.length + this.nationTitles.post.length));
        if (rand < this.nationTitles.pre.length) {
            name = this.nationTitles.pre[rand] + " " + capital;
        }
        else {
            name = capital + " " + this.nationTitles.post[rand - this.nationTitles.pre.length];
        }
        return name;
    };
    Culture.prototype.getPoliticalDistance = function (cult) {
        var s;
        s = Math.pow(cult.politicalAlignment.authority - this.politicalAlignment.authority, 2) +
            Math.pow(cult.politicalAlignment.wealth - this.politicalAlignment.wealth, 2) +
            Math.pow(cult.politicalAlignment.militarism - this.politicalAlignment.militarism, 2);
        s = Math.pow(s, 0.5);
        return s;
    };
    return Culture;
}());
//# sourceMappingURL=nation.js.map