var Character = (function () {
    function Character(fac, position) {
        if (fac === void 0) { fac = null; }
        if (position === void 0) { position = ""; }
        this.faction = fac;
        if (Math.floor(Math.random() * 2))
            this.genderIsM = true;
        else
            this.genderIsM = false;
        this.name = Character.generateName(this.genderIsM);
        if (position)
            this.title = position;
        this.appearance = Math.floor(Math.random() * 3);
        this.traits = [];
        while (this.traits.length < 1) {
            for (var i = 0; i < 10; i++) {
                var tempStr = Character.genTraitSingle(i);
                if (tempStr)
                    this.traits.push(tempStr);
            }
        }
    }
    Character.genTraitSingle = function (traitType) {
        var tempRand = Math.floor(Math.random() * 10);
        if (tempRand > 0 && tempRand < 9)
            return "";
        if (tempRand > 1)
            tempRand = 1;
        switch (traitType) {
            case 0:
                return Character.genTraits.efficiency[tempRand];
            case 1:
                return Character.genTraits.involvement[tempRand];
            case 2:
                return Character.genTraits.niceness[tempRand];
            case 3:
                return Character.genTraits.cleverness[tempRand];
            case 4:
                return Character.genTraits.excitability[tempRand];
            case 5:
                return Character.genTraits.cruelty[tempRand];
            case 6:
                return Character.genTraits.patience[tempRand];
            case 7:
                return Character.genTraits.greed[tempRand];
            case 8:
                return Character.genTraits.modesty[tempRand];
            case 9:
                return Character.genTraits.respect[tempRand];
        }
    };
    Character.generateName = function (isM) {
        var generated;
        var isUnique = false;
        while (!isUnique) {
            if (isM)
                generated = Character.genPersonNameSubstrings.male[Math.floor(Math.random() * Character.genPersonNameSubstrings.male.length)];
            else
                generated = Character.genPersonNameSubstrings.female[Math.floor(Math.random() * Character.genPersonNameSubstrings.female.length)];
            generated += " " + Character.genPersonNameSubstrings.family[Math.floor(Math.random() * Character.genPersonNameSubstrings.family.length)];
            isUnique = true;
            for (var i = 0; i < ObController.characters.length && isUnique; i++) {
                if (ObController.characters[i].getName() === generated)
                    isUnique = false;
            }
        }
        return generated;
    };
    Character.prototype.getName = function () {
        return this.name;
    };
    Character.prototype.getPortrait = function () {
        var str = "f";
        if (this.genderIsM)
            str = "m";
        return str += this.appearance.toString() + '.jpg';
    };
    Character.prototype.getTitle = function () {
        return this.title;
    };
    Character.prototype.getTraitsAsString = function () {
        var buildStr = "";
        for (var i = 0; i < this.traits.length; i++) {
            buildStr = buildStr + this.traits[i] + ", ";
        }
        buildStr = buildStr.substring(0, buildStr.length - 2);
        return buildStr;
    };
    Character.prototype.getFaction = function () {
        return this.faction;
    };
    Character.prototype.getNameAndTitle = function () {
        return this.getTitle() + " " + this.getName();
    };
    Character.genPersonNameSubstrings = {
        male: ["Ade", "Jermane", "Jack", "Hadr", "Caro", "Brigg", "Clark", "Benji", "Jeric", "Matis", "Nicolaus", "Sigur", "Jens", "Ryan", "Dens", "Fenris", "William", "Edward", "Boris", "Vadim", "Alexander", "Jan", "Darius", "Lukas", "Petr", "Murray"],
        female: ["Tyra", "Io", "Fiore", "Matra", "Valentina", "Kim", "Madison", "Majira", "Iva", "Perin", "Zofia", "Sicia", "Alis", "Morven", "Dena", "Luna", "Daria", "Lisa", "Maria", "Ann", "Helen", "Rosa", "Nataya", "Dura", "Erisa", "Andra"],
        family: ["Arden", "Rey", "Stone", "Martial", "Bochart", "Nguyen", "Pulosic", "Duisgarde", "Ochre", "Monraue", "Alvarez", "Gowes", "Biszovic", "Kendy", "Surrom", "Henera", "Atermann", "Olbram", "Erane", "Renardo", "Muraki", "Hieosaki", "Rutsamov", "Renne", "Henda", "Asimaci", "Wurand", "Yurg", "Lograd", "Alrom", "Hossid", "Karing", "Ferci", "Tanov", "Tarium", "Likos", "Utan", "Akers", "Maruhani", "Peretz", "Koenig"]
    };
    Character.genTraits = {
        efficiency: ["Efficient", "Profligate"],
        involvement: ["Ardent", "Cynical"],
        niceness: ["Sympathetic", "Callous"],
        cleverness: ["Astute", "Simple"],
        excitability: ["Calm", "Hysterical"],
        cruelty: ["Humane", "Ruthless"],
        patience: ["Patient", "Impatient"],
        greed: ["Generous", "Greedy"],
        modesty: ["Modest", "Vain"],
        respect: ["Respectful", "Arrogant"]
    };
    return Character;
}());
var Ship = (function () {
    function Ship() {
        this.name = "Testship Example";
        this.galaxySpeed = 2.1;
        this.systemSpeed = 5.0;
        this.integrity = { base: 500, total: 500, current: 500 };
    }
    Ship.prototype.getGalaxySpeed = function () {
        return this.galaxySpeed;
    };
    Ship.prototype.getSystemSpeed = function () {
        return this.systemSpeed;
    };
    Ship.prototype.getName = function () {
        return this.name;
    };
    return Ship;
}());
//# sourceMappingURL=character.js.map