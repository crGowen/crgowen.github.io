class Character {
    static genPersonNameSubstrings = {
        male: [ "Jack", "Nicolaus", "Jens", "Ryan", "Dens", "Fenris", "William", "Edward", "Boris", "Vadim", "Alexander", "Jan", "Darius" ],
        female: [ "Zofia", "Sicia", "Morven", "Dena", "Luna", "Daria", "Lisa", "Maria", "Ann", "Helen", "Rosa", "Nataya", "Dura" ],
        family: [ "Alvarez", "Surrom", "Henera", "Atermann", "Olbram", "Erane", "Renardo", "Muraki", "Hieosaki", "Rutsamov", "Asimaci", "Wutend", "Olrom", "Hossid", "Karing", "Ferci", "Ionov", "Tarium", "Likos" ]
    };

    static genTraits = {
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
    }

    private name: string;
    private title: string;


    
}

class Ship {
    private name: string;
    private integrity: {base: number, total: number, current: number};
    private galaxySpeed: number;
    private systemSpeed: number;

    constructor() {
        this.name = "Testship Example";
        this.galaxySpeed = 2.1;
        this.systemSpeed = 5.0;
        this.integrity = {base: 500, total: 500, current: 500};
    }


    getGalaxySpeed() {
        return this.galaxySpeed;
    }

    getSystemSpeed() {
        return this.systemSpeed;
    }

    getName() {
        return this.name;
    }
}