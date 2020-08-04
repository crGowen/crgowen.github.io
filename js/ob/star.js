var StarSystem = (function () {
    function StarSystem() {
        var dClass = 'n';
        this.location = StarSystem.generateStarLocation();
        var rand = Math.floor(Math.random() * 25);
        if (rand == 0) {
            dClass = 'r';
            this.type = Math.floor(Math.random() * 2) + 4;
            rand = 1;
        }
        else if (rand < 8) {
            dClass = 'b';
            this.type = Math.floor(Math.random() * 4) + 6;
            rand = Math.floor(Math.random() * 2) + 1;
        }
        else if (rand < 15) {
            this.type = Math.floor(Math.random() * 2);
            rand = Math.floor(Math.random() * 4) + 1;
        }
        else {
            this.type = Math.floor(Math.random() * 2) + 2;
            rand = Math.floor(Math.random() * 4) + 1;
        }
        this.name = StarSystem.generateName();
        this.destinations = [];
        this.nearbyStars = [];
        var d = StarSystem.getDistanceFromOrigin(this.location) / 25;
        switch (dClass) {
            case 'n':
                d = d * 0.95;
                break;
            case 'r':
                d = d * 2.5;
                break;
            case 'b':
                d = d * 1.4;
                break;
        }
        if (Math.floor(Math.random() * 10) + 10 > d) {
            for (var i = 0; i < rand; i++) {
                this.destinations.push(new Destination(i, dClass, this.destinations, this));
            }
            this.nation = ObController.independentNat;
            this.culture = Culture.getRandomCulture();
        }
        else {
            this.nation = null;
            this.culture = null;
        }
    }
    StarSystem.getDistanceFromOrigin = function (loc) {
        var s = Math.pow(loc.x - 640, 2) + Math.pow(loc.y - 360, 2);
        return Math.pow(s, 0.5);
    };
    StarSystem.generateName = function () {
        var generated = "";
        var generatedIsUnique = false;
        while (!generatedIsUnique) {
            generated = "";
            generated += StarSystem.genStarSubstrings.p1[Math.floor(Math.random() * StarSystem.genStarSubstrings.p1.length)];
            generated += StarSystem.genStarSubstrings.p2[Math.floor(Math.random() * StarSystem.genStarSubstrings.p2.length)];
            generatedIsUnique = true;
            for (var i = 0; (i < ObController.stars.length) && generatedIsUnique; i++) {
                if (ObController.stars[i].name == generated)
                    generatedIsUnique = false;
                for (var j = 0; (j < ObController.stars[i].destinations.length) && generatedIsUnique; j++) {
                    if (ObController.stars[i].destinations[j].name.split(" ")[0] == generated)
                        generatedIsUnique = false;
                }
            }
        }
        return generated;
    };
    StarSystem.generateStarLocation = function () {
        var x = 0;
        var y = 0;
        var s = 0;
        var generatedIsUnique = false;
        while (!generatedIsUnique) {
            x = Math.floor(Math.random() * 1228) + 26;
            y = Math.floor(Math.random() * 668) + 26;
            generatedIsUnique = true;
            for (var i = 0; (i < ObController.stars.length) && generatedIsUnique; i++) {
                s = Math.pow(x - ObController.stars[i].location.x, 2) + Math.pow(y - ObController.stars[i].location.y, 2);
                if (s < 36)
                    generatedIsUnique = false;
            }
        }
        return { x: x, y: y };
    };
    StarSystem.prototype.setNation = function (nat) {
        this.nation = nat;
    };
    StarSystem.prototype.getNation = function () {
        return this.nation;
    };
    StarSystem.prototype.setCulture = function (cult) {
        this.culture = cult;
    };
    StarSystem.prototype.getCulture = function () {
        return this.culture;
    };
    StarSystem.prototype.getStarName = function () {
        return this.name;
    };
    StarSystem.prototype.getStarType = function (asString) {
        if (asString === void 0) { asString = false; }
        if (!asString) {
            return this.type;
        }
        switch (this.type) {
            case 0:
                return "Yellow-white Dwarf";
            case 1:
                return "Be Star";
            case 2:
                return "Orange Dwarf";
            case 3:
                return "Red Dwarf";
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
    };
    StarSystem.prototype.makeIndependent = function () {
        this.nation = ObController.independentNat;
    };
    StarSystem.prototype.draw = function (xOffset, yOffset, zoom, colourStyle) {
        var xDraw = (zoom * this.location.x) - xOffset;
        var yDraw = (zoom * this.location.y) - yOffset;
        if (xDraw > 1280 - 5 || yDraw > 720 - 5)
            return;
        if (xDraw < 5 || yDraw < 5)
            return;
        switch (colourStyle) {
            case 'n':
                ObController.context.beginPath();
                ObController.context.arc(xDraw, yDraw, 3, 0, 2 * Math.PI);
                if (this.nation) {
                    ObController.context.fillStyle = this.nation.getColour1();
                    ObController.context.strokeStyle = this.nation.getColour2();
                }
                else {
                    ObController.context.fillStyle = '#353535';
                    ObController.context.strokeStyle = '#353535';
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
                ObController.context.drawImage(StarSystem.starSprites[this.type], xDraw - (2 * zoom), yDraw - (2 * zoom), 4 * zoom, 4 * zoom);
                break;
        }
    };
    StarSystem.prototype.nationSpread = function () {
        if (!this.nation)
            return;
        if (!this.nation.isIndependentNat())
            return;
        var growthScore = 0;
        var civExpansionScores = [0, 0, 0, 0, 0, 0, 0, 0];
        for (var i = 0; i < this.nearbyStars.length; i++) {
            if (this.nearbyStars[i].nation) {
                if (!this.nearbyStars[i].nation.isIndependentNat()) {
                    growthScore++;
                    civExpansionScores[this.nearbyStars[i].nation.index]++;
                }
            }
        }
        var rand = Math.floor(Math.random() * 8);
        if (rand >= growthScore)
            return;
        var expCiv = 0;
        var expScore = 0;
        for (var i = 0; i < civExpansionScores.length; i++) {
            civExpansionScores[i] *= Math.floor(Math.random() * 4) + 10;
            if (civExpansionScores[i] > expScore) {
                expCiv = i;
                expScore = civExpansionScores[i];
            }
        }
        this.nation = ObController.nations[expCiv];
        ObController.nations[expCiv].addStar(this);
    };
    StarSystem.prototype.cultureSpread = function () {
        if (!this.culture)
            return;
        var cultureExpansionScores = [0, 0, 0, 0, 0, 0];
        cultureExpansionScores[this.culture.index] = 3;
        for (var i = 0; i < this.nearbyStars.length; i++) {
            if (this.nearbyStars[i].culture)
                cultureExpansionScores[this.nearbyStars[i].culture.index]++;
        }
        var expCult = 0;
        var expScore = 0;
        for (var i = 0; i < cultureExpansionScores.length; i++) {
            cultureExpansionScores[i] *= Math.floor(Math.random() * 4) + 6;
            if (cultureExpansionScores[i] > expScore) {
                expCult = i;
                expScore = cultureExpansionScores[i];
            }
        }
        this.culture = ObController.cultures[expCult];
    };
    StarSystem.genStarSubstrings = {
        p1: ["Red", "Blu", "Lo", "Hi", "Mi", "Ni", "Mei", "Hor", "Sof", "Of", "Brei", "Dar", "Lon", "Dul", "Sur", "Ex", "Inc", "Ela", "Weit", "Wei", "Weu", "North", "Nor", "Su", "Sud", "Eas", "Ost", "Met", "Wes", "New", "Ol", "Sto", "Sta", "Mag", "Sil", "Go", "Vor", "Vol", "Glas", "Ar", "Nar", "Ide", "Narro", "Wid", "Tal", "Klein", "Ein", "Schwarz", "Fau", "Gruen", "Wel", "Bie", "Gros", "Krasna", "Sam", "San", "Sanc", "Neu", "Alt", "Venta", "Ater", "Kol", "Kis", "Vila", "For", "Bas", "Ander", "Nis", "Las", "Hib", "Nos", "Sed", "Ara", "Au", "In", "Sid", "Il", "Ely", "Nov", "Ac", "Cara", "Sus", "Tho", "Thor"],
        p2: ["tow", "dac", "lit", "scha", "ite", "is", "ic", "plex", "bid", "orta", "terra", "schild", "pen", "zen", "fort", "and", "key", "rut", "ei", "ear", "son", "ent", "ice", "katz", "hun", "heim", "este", "burg", "feld", "har", "ar", "am", "as", "a", "koshka", "dom", "stin", "anz", "ko", "ja", "el", "tor", "stra", "gorod", "ae", "canis", "roma", "gallia", "nia", "don", "ton", "belga", "via", "null", "ra", "marit", "senex", "bus", "fir", "feuer", "kon", "kos", "ros", "lex", "loch", "tus", "domus", "ser", "ius", "ium", "il", "um", "us", "itz", "ca", "anov", "sk", "stein", "ev", "ine", "tol"],
        opt1: ["Orbital", "Station", "Outpost", "Post", "Gateway"]
    };
    return StarSystem;
}());
var Destination = (function () {
    function Destination(ind, dClass, priorDestinations, star) {
        var radius = (ind * 38 + 60);
        this.star = star;
        var i = Math.floor(Math.random() * radius);
        var j = Math.floor(Math.pow(Math.pow(radius, 2) - Math.pow(i, 2), 0.5));
        var rand = Math.floor(Math.random() * 2);
        if (rand == 1)
            i *= (-1);
        rand = Math.floor(Math.random() * 2);
        if (rand == 1)
            j *= (-1);
        this.location = { x: 640 + i, y: 360 + j };
        this.bodyAppearance = Math.floor(Math.random() * 4);
        this.status = 0;
        switch (dClass) {
            case 'n':
                rand = Math.floor(Math.random() * 4);
                if (rand == 1)
                    this.type = Math.floor(Math.random() * 3);
                else
                    this.type = 3;
                break;
            case 'r':
                rand = Math.floor(Math.random() * 16);
                if (rand == 1)
                    this.type = 1;
                else
                    this.type = 0;
                break;
            case 'b':
                rand = Math.floor(Math.random() * 8);
                if (rand == 1)
                    this.type = 1;
                else
                    this.type = 0;
                break;
        }
        this.name = Destination.generateName(priorDestinations);
    }
    Destination.generateName = function (priorDestinations) {
        var generated = "";
        var generatedIsUnique = false;
        while (!generatedIsUnique) {
            generated = "";
            generated += StarSystem.genStarSubstrings.p1[Math.floor(Math.random() * StarSystem.genStarSubstrings.p1.length)];
            generated += StarSystem.genStarSubstrings.p2[Math.floor(Math.random() * StarSystem.genStarSubstrings.p2.length)];
            generatedIsUnique = true;
            for (var i = 0; (i < ObController.stars.length) && generatedIsUnique; i++) {
                if (ObController.stars[i].getStarName() == generated)
                    generatedIsUnique = false;
                for (var j = 0; (j < ObController.stars[i].destinations.length) && generatedIsUnique; j++) {
                    if (ObController.stars[i].destinations[j].name == generated)
                        generatedIsUnique = false;
                }
            }
            for (var i = 0; i < priorDestinations.length; i++) {
                if (priorDestinations[i].name == generated)
                    generatedIsUnique = false;
            }
        }
        return generated;
    };
    Destination.prototype.getEconomyType = function () {
        switch (this.type) {
            case 0:
                return "Research facility";
            case 1:
                return "Military facility";
            case 2:
                return "Mining post";
            case 3:
                return "Permanent colony";
        }
    };
    Destination.prototype.getDestinationName = function () {
        return this.name;
    };
    Destination.prototype.getStatus = function () {
        switch (this.status) {
            case 0:
                return "operating normally";
        }
    };
    Destination.prototype.getStar = function () {
        return this.star;
    };
    Destination.prototype.draw = function (xOffset, yOffset, zoom) {
        var xDraw = (zoom * this.location.x) - xOffset;
        var yDraw = (zoom * this.location.y) - yOffset;
        if (xDraw > 1280 - 5 || yDraw > 720 - 5)
            return;
        if (xDraw < 5 || yDraw < 5)
            return;
        ObController.context.drawImage(Destination.planetSprites[this.bodyAppearance], xDraw - (2 * zoom), yDraw - (2 * zoom), 4 * zoom, 4 * zoom);
    };
    Destination.prototype.drawDestinationScreen = function () {
        ObController.context.drawImage(Destination.planetHqSprites[this.bodyAppearance], -200, -200, 1000, 1000);
    };
    return Destination;
}());
//# sourceMappingURL=star.js.map