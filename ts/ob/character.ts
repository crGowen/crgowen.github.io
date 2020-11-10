class Character {
    static genPersonNameSubstrings = {
        male: [ "Ade", "Jermane", "Jack", "Hadr", "Caro", "Brigg", "Clark", "Benji", "Jeric", "Matis", "Nicolaus", "Sigur", "Jens", "Ryan", "Dens", "Fenris", "William", "Edward", "Boris", "Vadim", "Alexander", "Jan", "Darius", "Lukas", "Petr", "Murray" ],
        female: [ "Tyra", "Io", "Fiore", "Matra", "Valentina", "Kim", "Madison", "Majira", "Iva", "Perin", "Zofia", "Sicia", "Alis", "Morven", "Dena", "Luna", "Daria", "Lisa", "Maria", "Ann", "Helen", "Rosa", "Nataya", "Dura", "Erisa", "Andra" ],
        family: [ "Arden", "Rey", "Stone", "Martial", "Bochart", "Nguyen", "Pulosic", "Duisgarde", "Ochre", "Monraue", "Alvarez", "Gowes", "Biszovic", "Kendy", "Surrom", "Henera", "Atermann", "Olbram", "Erane", "Renardo", "Muraki", "Hieosaki", "Rutsamov", "Renne", "Henda", "Asimaci", "Wurand", "Yurg", "Lograd", "Alrom", "Hossid", "Karing", "Ferci", "Tanov", "Tarium", "Likos", "Utan", "Akers", "Maruhani", "Peretz", "Koenig" ]
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
    constructor(fac: Nation = null, position: string = "") {
        this.faction = fac;   

        if (Math.floor(Math.random() * 2)) this.genderIsM = true;
        else this.genderIsM = false;

        this.name = Character.generateName(this.genderIsM);

        if (position) this.title = position;
        
        this.appearance = Math.floor(Math.random() * 3);

        this.traits = [];

        while (this.traits.length < 1) {
            for (let i = 0; i < 10; i++) {
                let tempStr = Character.genTraitSingle(i);
                if (tempStr) this.traits.push(tempStr);
            }
        }             
    }

    static genTraitSingle(traitType: number) {
        let tempRand = Math.floor(Math.random() * 10);        
        if (tempRand>0 && tempRand<9) return "";

        if (tempRand > 1) tempRand = 1;

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

    private traits: string[];
    private appearance: number;
    
    public getName() {
        return this.name;
    }

    public getPortrait() {
        let str = "f";
        if (this.genderIsM) str = "m";
        return str += this.appearance.toString() + '.jpg';
    }

    public getTitle() {
        return this.title;
    }

    public getTraitsAsString(){
        let buildStr = "";
        for (let i = 0; i < this.traits.length; i++) {
            buildStr = buildStr + this.traits[i] + ", ";
        }
        buildStr = buildStr.substring(0, buildStr.length - 2);
        return buildStr;
    }

    public getFaction() {
        return this.faction;
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