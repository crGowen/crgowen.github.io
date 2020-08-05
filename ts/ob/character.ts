class Character {
    static genPersonNameSubstrings = {
        male: [ "Jack", "Caro", "Brigg", "Clark", "Benji", "Jeric", "Matis", "Nicolaus", "Sigur", "Jens", "Ryan", "Dens", "Fenris", "William", "Edward", "Boris", "Vadim", "Alexander", "Jan", "Darius", "Lukas", "Petr", "Murray" ],
        female: [ "Io", "Madison", "Majira", "Iva", "Perin", "Zofia", "Sicia", "Alis", "Morven", "Dena", "Luna", "Daria", "Lisa", "Maria", "Ann", "Helen", "Rosa", "Nataya", "Dura", "Erisa", "Andra" ],
        family: [ "Bochart", "Duisgarde", "Ochre", "Monraue", "Alvarez", "Gowes", "Biszovic", "Kendy", "Surrom", "Henera", "Atermann", "Olbram", "Erane", "Renardo", "Muraki", "Hieosaki", "Rutsamov", "Renne", "Henda", "Asimaci", "Wurand", "Yurg", "Lograd", "Alrom", "Hossid", "Karing", "Ferci", "Tanov", "Tarium", "Likos", "Utan", "Akers", "Maruhani", "Peretz", "Koenig" ]
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
    };

    // could probably use !! but whatever, this way is a little more clear and explicit (if more verbose)
    constructor(fac: Nation, position: string = "") {
        this.faction = fac;
        if (Math.floor(Math.random() * 2)) this.genderIsM = true;
        else this.genderIsM = false;

        this.name = Character.generateName(this.genderIsM);

        if (position) this.title = position;
    }

    static generateName(isM: boolean) {
        var generated;
        var isUnique = false;
        
        while(!isUnique) {
            if (isM) generated = Character.genPersonNameSubstrings.male[ Math.floor(Math.random() * Character.genPersonNameSubstrings.male.length) ];
            else generated = Character.genPersonNameSubstrings.female[ Math.floor(Math.random() * Character.genPersonNameSubstrings.female.length) ];
    
            generated += " " + Character.genPersonNameSubstrings.family[ Math.floor(Math.random() * Character.genPersonNameSubstrings.family.length) ];

            isUnique = true;

            for (let i = 0; i < ObController.characters.length && isUnique; i++) {
                if (ObController.characters[i].getName() === generated) isUnique = false;
            }
        }

        

        return generated;
    }

    private genderIsM: boolean;
    private name: string;
    private title: string;

    private faction: Nation;
    
    public getName() {
        return this.name;
    }

    public getTitle() {
        return this.title;
    }

    public getNameAndTitle() {
        return this.getTitle() + " " + this.getName();
    }
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