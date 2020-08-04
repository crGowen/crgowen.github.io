var Character = (function () {
    function Character(position) {
        if (position === void 0) { position = ""; }
        if (Math.floor(Math.random() * 2))
            this.genderIsM = true;
        else
            this.genderIsM = false;
        this.name = Character.generateName(this.genderIsM);
        if (position)
            this.title = position;
    }
    Character.generateName = function (isM) {
        var generated;
        if (isM)
            generated = Character.genPersonNameSubstrings.male[Math.floor(Math.random() * Character.genPersonNameSubstrings.male.length)];
        else
            generated = Character.genPersonNameSubstrings.female[Math.floor(Math.random() * Character.genPersonNameSubstrings.female.length)];
        generated += " " + Character.genPersonNameSubstrings.family[Math.floor(Math.random() * Character.genPersonNameSubstrings.family.length)];
        return generated;
    };
    Character.prototype.getName = function () {
        return this.name;
    };
    Character.prototype.getTitle = function () {
        return this.title;
    };
    Character.prototype.getNameAndTitle = function () {
        return this.getTitle() + " " + this.getName();
    };
    Character.genPersonNameSubstrings = {
        male: ["Jack", "Brigg", "Nicolaus", "Sigur", "Jens", "Ryan", "Dens", "Fenris", "William", "Edward", "Boris", "Vadim", "Alexander", "Jan", "Darius", "Lukas", "Petr", "Murray"],
        female: ["Madison", "Zofia", "Sicia", "Alis", "Morven", "Dena", "Luna", "Daria", "Lisa", "Maria", "Ann", "Helen", "Rosa", "Nataya", "Dura", "Erisa", "Andra"],
        family: ["Alvarez", "Gowes", "Biszovic", "Kendy", "Surrom", "Henera", "Atermann", "Olbram", "Erane", "Renardo", "Muraki", "Hieosaki", "Rutsamov", "Renne", "Henda", "Asimaci", "Wurand", "Yurg", "Lograd", "Olrom", "Hossid", "Karing", "Ferci", "Ionov", "Tarium", "Likos", "Utan", "Akers", "Maruhani", "Peretz", "Koenig"]
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