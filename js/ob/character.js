var Character = (function () {
    function Character() {
    }
    Character.genPersonNameSubstrings = {
        male: ["Jack", "Nicolaus", "Jens", "Ryan", "Dens", "Fenris", "William", "Edward", "Boris", "Vadim", "Alexander", "Jan", "Darius"],
        female: ["Zofia", "Sicia", "Morven", "Dena", "Luna", "Daria", "Lisa", "Maria", "Ann", "Helen", "Rosa", "Nataya", "Dura"],
        family: ["Alvarez", "Surrom", "Henera", "Atermann", "Olbram", "Erane", "Renardo", "Muraki", "Hieosaki", "Rutsamov", "Asimaci", "Wutend", "Olrom", "Hossid", "Karing", "Ferci", "Ionov", "Tarium", "Likos"]
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