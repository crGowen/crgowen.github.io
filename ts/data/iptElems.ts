export type ElemInfo = {
    name: string;
    symbol: string;
    mass: number;
    z: number;
    state: "Gas" | "Liquid" | "Solid";
    halfLife?: string;
    p1: string;
    p2: string;
    p3: string;
};

export type Spacer = {
    spaces: number;
};

export type RowSubstitution = {
    rowSub: number;
};

export type Elem = ElemInfo | Spacer | RowSubstitution;

export const elements: Elem[][]  = [
    [
        {
            name: "Hydrogen",
            symbol: "H",
            mass: 1.01,
            z: 1,
            state: "Gas",
            p1: `Discovered in 1766 by Henry Cavendish, 
                who reacted metals and acids to produce what was then thought to be a kind of 'burned out air'
                - phlogiston. After mankind's understanding of chemistry improved, phlogiston theory was discarded and this gas was named hydrogen,
                reflecting its ability to generate water through reaction with oxygen.`,
            p2: `It is produced in a large number of reactions, as well as through electrolysis of water.
                It is able to form ionic bonds as both an anion or cation: as a cation it is a vital component of acids, as the anion it forms compounds called hydrides.
                Hydrogen can of course also form covalent bonds, and may also be able to form metallic bonds, but forming metallic hydrogen remains an elusive 'holy grail' of modern physics.`,
            p3: `As the most abundant element, hydrogen makes up approximately
                75% of all mass in the universe, where it is often found as the fusion fuel of stars, the glow of nebulae, and the atmosphere of gas planets.`
        },
        {
            spaces: 17
        },
        {
            name: "Helium",
            symbol: "He",
            mass: 4.00,
            z: 2,
            state: "Gas",
            p1: `Discovered in 1868 when several astronomers studied the emission spectrum of the Sun and found indications of
                an element never seen on Earth. The element was named helium after 'Helios', the ancient Greek personification of the Sun.`,
            p2: `Helium can in fact be found on Earth in underground gas fields: a helium nucleus is the particle of alpha radioactive decay,
                and as elements like uranium decay underground the produced helium collects in cavities alongside other gasses.`,
            p3: `As a noble gas helium is unreactive. Whilst it can be reactive under certain conditions,
                the product will not remain for long unless kept in absolute isolation. The lack of reactivity makes helium a good choice for safely
                filling and purging areas that would be flammable if filled with normal air.
                As a low-density gas it makes a safe alternative to hydrogen for airships and Rozière balloons.
                It can also be used in neon lighting fixtures, where it glows bright orange.`
        },

    ]
];