export type ElemInfo = {
    name: string;
    symbol: string;
    mass: string;
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
            mass: "1.01",
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
            spaces: 16
        },
        {
            name: "Helium",
            symbol: "He",
            mass: "4.00",
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

    ],
    [
        {
            name: "Lithium",
            symbol: "Li",
            mass: "6.94",
            z: 3,
            state: "Solid",
            p1: `Discovered in 1817 by Johan August Afwedson, who analysed a mineral called petalite and discovered it contained the as-of-then unknown element lithium.
                However, it wasn't isolated until William Thomas Brande used electrolysis on lithium oxide in 1821.`,
            p2: `Lithium shares similar properties with the rest of the alkali metals and it is the lightest and least reactive of the group. Being the least reactive
            alkali metal still makes it quite reactive, and like sodium and potassium its strong desire to be a cation means it will vigorously react, even with water.`,
            p3: `Lithium is the lightest solid element, if it didn't react with it, it could even float on water. It is also soft enough to be easily cut with a knife, and has one of the
            lowest melting points of all metals. Unlike most elements lithium was not 'invented' by stellar objects
            and - like hydrogen and most of the universe's helium - is in fact a product of the Big Bang itself.`
        },
        {
            name: "Beryllium",
            symbol: "Be",
            mass: "9.01",
            z: 4,
            state: "Solid",
            p1: `In 1798 Louis-Nicolas Vauquelin reported the discovery of the element after dissolving the beryl mineral in a base. In 1828 it was isolated for the first time by
            Friedrich Wöhler and Antione Bussy, who reacted beryllium chloride with potassium, which stole the chloride ions, leaving behind isolated powdery grains of beryllium.`,
            p2: `Beryllium is a hard, brittle, stiff, but lightweight metal with chemical properties often compared to aluminium because of the protective oxide layer it forms on the surface,
            which ordinarily makes it unreactive with strong oxidisers like nitric acid. It is also extremely toxic (especially for the lungs),
            but being light and tough it is used in alloys, where it can increase conductivity, hardness, and prevent sparking. Industrially, it is of particular interest to aircraft as a light but hard metal.`,
            p3: `It is also used for radiation windows in X-ray tubes, owing to its low absorption of X-rays. It is a relatively rare and expensive metal
            since most of it created in stellar fusion is also consumed by stellar fusion.`
        },
        {
            spaces: 10
        },
        {
            name: "Boron",
            symbol: "B",
            mass: "10.81",
            z: 5,
            state: "Solid",
            p1: `First discovered in 1808 when Sir Humphry Davy electrolysed borates and boron was precipitated out. At around the same time it was
            also being discovered by Louis-Josef Gay-Lussac and Louis-Jacques Thénard who worked together reducing boric acid to boron.`,
            p2: `Boron, like carbon, forms network-like crystal structures. It is chemically close to silicon, and resistant to reaction. Sodium tetraborate (known as 'borax')
            is a very useful chemical, and has many uses in detergents, cosmetics, metal refining, and more.`,
            p3: `A borate mineral, ulexite, has an rare characteristic: it behaves like optic fibre, able to project an image through the rock, as such it is called 'TV rock'.
            The TV rock isn't simply transparent, the image of what is behind the rock is projected through the rock, and appears on the surface, like a TV screen.`
        },
        {
            name: "Carbon",
            symbol: "C",
            mass: "12.01",
            z: 6,
            state: "Solid",
            p1: `The discovery of carbon as coal predates written history, and the name carbon derives from the Latin 'carbo' for coal. It would later also be learned that diamond and graphite are carbon structures.
            While carbon combusts easily in many forms, it has the highest melting point of all elements at 3500C.`,
            p2: `Carbon can be simply mined as graphite or coal and is an incredibly important molecule which can form a very wide range of structures (with varied properties).
            One significant chemical property is its ability to form chains. The study of carbon chains is an entire branch
            of chemistry known as organic chemistry, and there are millions of known carbon chains, including the oils and fossil fuels that power the modern world.`,
            p3: `Carbon is also the foundation and building blocks of all known life. Outside of organic chemistry carbon also has important compounds,
            a few of which are poisonous carbon monoxide, the carbonate anion, and carbon dioxide (a product of burning carbon chains which is responsible for climate change).`
        },
        {
            name: "Nitrogen",
            symbol: "N",
            mass: "14.01",
            z: 7,
            state: "Gas",
            p1: `Discovered in 1772 by Daniel Rutherford, who burned all the oxygen from a small space, then removed the carbon dioxide from it, in the remaining air mice
            died and candles wouldn't burn. He called it 'noxious air', a name which would eventually be replaced with 'nitrogen'.`,
            p2: `Nitrogen as found in air is considered mostly inert, unwilling to react with most elements and compounds because of the strong triple bond in a dinitrogen molecule.
            However, if you can get nitrogen outside of the dinitrogen molecule, you'll find it is willing to release a lot of energy to return to being dinitrogen.`,
            p3: `The way in which nitrogen compounds can release lots of energy to become dinitrogen makes it ideal for combustion and explosives. Nitrogen compounds like hydrazine,
            RFNA (very high concentration nitric acid), and dinitrogen tetroxide are known as fearsomely powerful reactants, and they all have been used in rocket propellants.`
        },
        {
            name: "Oxygen",
            symbol: "O",
            mass: "16.00",
            z: 8,
            state: "Gas",
            p1: `Credit for the discovery of oxygen is generally shared between three different chemists - Scheele, Priestley, and
            Lavoisier - but Joseph Priestley's discovery is given the most weight due to his findings being published first. Priestley thermally decomposed mercury oxide to produce mercury and oxygen.
            He found the gas helped with breathing and with burning fuels. The name 'oxygen' means 'acid generator' and was given later through Lavoisier's flawed understanding of acids.`,
            p2: `Chemical reaction with oxygen is common as both combustion and tarnish, as a result oxygen compounds (in soils as metal oxides and sand, in oceans as water)
            are found literally everywhere on the surface of the Earth, the Moon, Mars, Venus, and - so far as we know - most solid-surface planets.`,
            p3: `Like carbon, oxygen is a vital element for life on Earth: as ~89% of the water molecule, as dioxygen necessary in respiration, and as a vital source of energy for living things in glucose.`
        },
        {
            name: "Fluorine",
            symbol: "F",
            mass: "19.00",
            z: 9,
            state: "Gas",
            p1: `Hydrofluoric acid is one of the few substances that will corrode glass, as such (although nobody knew what it was chemically) it was used in the making of glass art as far back as 1720.
            It wasn't until 1810 when André-Marie Ampére realised that this glass-etching acid could be a hydrogen halide, and after much effort it was isolated by Henri Moissan through electrolysis.`,
            p2: `The first of the halogens, fluorine is the most reactive non-metal and an incredibly dangerous and reactive element, many early chemists working to isolate it are now called 'fluorine martyrs'
            as a result of being blinded or killed by their pursuits. Elemental fluorine in particular reacts hotly and explosively with many things it comes into contact with.`,
            p3: `Due to its extreme reactivity, fluorine on Earth exists almost exlusively in compounds. It was also the first substance
            found to be capable of reacting and forming compounds with the - previously thought absolutely inert - noble gasses.`
        },
        {
            name: "Neon",
            symbol: "Ne",
            mass: "20.18",
            z: 10,
            state: "Gas",
            p1: `Discovered by Sir William Ramsey and William Travers in 1898, when they seperated air by a method similar to fractional distillation.
            In the same experiment they also discovered the other noble gasses krypton and xenon.`,
            p2: `As a noble gas just like helium, it is rather unreactive. It is slightly less dense than normal air but not by enough to be useful for buoyancy.
            Occuring as only a fraction of a percent of ordinary air, it is a rare element, especially in comparison to helium which is produced in alpha radioactive decay.`,
            p3: `Unsurprisingly, neon is used in neon lighting. However, despite the name 'neon lighting' it is not just neon but most of the noble gasses that used
            in such lighting fixtures, especially because each noble gas glows with a different colour. Neon glows with a saturated orange-red colour.`
        },
    ],
    [
        {
            name: "Sodium",
            symbol: "Na",
            mass: "22.99",
            z: 11,
            state: "Solid",
            p1: `Discovered in 1807 by Sir Humphry Davy, who electrolysed molten sodium hydroxide to produce a small amount of elemental sodium.
            Since sodium is very reactive with air and particularly with any moisture, it has to be stored in mineral oil.`,
            p2: `Sodium is one of the most abundant elements on the Earth, mostly occuring as a salt: in the world's oceans sodium is the most common cation
            (with chloride being the most common anion). Like lithium, sodium is light and soft, and it can be cut with a knife.`,
            p3: `Whilst sodium itself is a weak, soft, and overly reactive metal, making it an awful building material, sodium salts are used all over the world.
            Sodium chloride is the edible white salt on your kitchen table, and sodium hydroxide (also known as caustic soda) is used in a wide variety of industries as a strong base.`
        },
        {
            name: "Magnesium",
            symbol: "Mg",
            mass: "24.31",
            z: 12,
            state: "Solid",
            p1: `Discovered in 1808 by Sir Humphry Davy, who seperated it out from oxides using electrolysis. Magnesium's name comes from magnesia abla meaning 'white ore from Magnesia', which is a region in Greece.
            From the same region also comes magnesia negra (the black ore), to avoid the obvious confusion, one became known as magnesium, and the other as manganese.`,
            p2: `While ordinarily being flammable with oxygen, alloying magnesium with other metals reduces its flammability,
            and magnesium alloys are often used in construction, especially vehicles and aircraft as a relatively light material.`,
            p3: `Magnesium sulfate is classified as one of the world's most essential medicines: commonly known as 'Epsom salt', it is used to
            treat skin infections and remove splinters (hence the common alias 'drawing paste').`
        },
        {
            spaces: 10
        },
        {
            name: "Aluminium",
            symbol: "Al",
            mass: "26.98",
            z: 13,
            state: "Solid",
            p1: `First isolated and discovered by Hans Christian Ørsted in 1824, who reacted an aluminium salt with mercury-potassium alloy, yielding a small lump of the metal.
            No easy production process for aluminium existed then, and it was worth more than many precious metals.
            This changed with the combined application of the Hall-Héroult Process and the Bayer Process, after which aluminium - the 3rd most abundant element on Earth - became ubiquitous in modern societies.`,
            p2: `Chemically aluminium is famed for its passivation, in which a thin oxide layer forms and sticks to the surface of the metal, enabling a high resistance to further reaction.`,
            p3: `As an abundant and corrosion-resistant element, aluminium is used everywhere from food and drink cans to cars. It is of particular use in aircraft, as it is one of the lightest metals,
            but doesn't have any of the undesirable traits often seen among other light metals, like toxicity and vigorous reactions with moisture.`
        },
        {
            name: "Silicon",
            symbol: "Si",
            mass: "28.09",
            z: 14,
            state: "Solid",
            p1: `First produced by Joseph Louis Gay-Lussac and Louis Jacques Thénard in 1811, when they heated silicon tetrafluoride with potassium, which stole the fluoride ions leaving behind elemental silicon.
            Unfortunately for them they did not recognise it as a new element, so credit for the discovery went to Jöns Jacob Berzelius in 1823, who performed a similar experiment.`,
            p2: `Chemically, it is ordinarily quite unreactive and will not even react with most acids. It will react with oxygen to form a protective surface oxide layer, which prevents further oxidation, and it will also react with the halogens.`,
            p3: `Silicon can form 'silicide' alloys with metals at very high temperatures, generally making them less reactive. Silicon dioxide (silica) is seen in minerals and soil/sand, and when heated to very high temperatures it will reform from
            silica granules into glass. In more recent times elemental silicon has become a very important material for electronics: as a great semiconductor it is used in diodes and transistors.`
        },
        {
            name: "Phosphorous",
            symbol: "P",
            mass: "30.97",
            z: 15,
            state: "Solid",
            p1: `Phosphorus was the first element discovery since the ancient era discoveries like carbon and iron. It was found by Hennig Brand in 1669, who distilled urine to produce a salt which burned blindingly bright - hence the name 'phosphorus':
            Latin for 'lightbringer'. It was later isolated by Robert Boyle in 1680, who used it to coat the tips of wooden splints, inventing matches.`,
            p2: `Phosphorus exists as several allotropes (molecular structures), each with different chemical properties. White phosphorus is extremely flammable on contact with air and glows in the dark, whilst red phosphorus is less reactive but will still
            ignite at temperature, and black phosphorus is quite stable.`,
            p3: `Phosphorus is mostly used in fertilisers, it is in fact such a large industry that the majority of phosphorus' neighbour in the periodic table - sulfur - is used in preparing phosphorus as a fertiliser.`
        },
        {
            name: "Sulfur",
            symbol: "S",
            mass: "32.06",
            z: 16,
            state: "Solid",
            p1: `Sulfur is one of the few elements that can be easily found in elemental form, as such its discovery predates written history. Sulfur occurs in abundance around volcanoes as a yellow solid, in antiquity they collected the element and associated it
            with the fiery lava of its source, although it also found use as a medicine, a component of gunpowder, and a precursor in making sulfuric acid.`,
            p2: `Chemically sulfur can be reacted with nearly all elements, and can often be seen as a sulfate ion in many metal salts, and sometimes as a sulfide ion as in fool's gold.`,
            p3: `Sulfur is often used in fertiliser as a salt, as well as in the preparation of sulfuric acid, which is then heavily used to prepare phosphorus fertiliser. Other uses for sulfur include medicines, fungicides, and as a common reagent (sulfuric acid) for a large number of other industries.`
        },
        {
            name: "Chlorine",
            symbol: "Cl",
            mass: "35.45",
            z: 17,
            state: "Gas",
            p1: `Chlorine was discovered by Carl Wilhelm Scheele in 1774, when he produced the element by reacting manganese dioxide with hydrochloric acid. Already with insects Scheele was able to observe the deadly toxicity of the gas,
            a feature that would infamously define it in the First World War as a weapon of mass destruction.`,
            p2: `As the second halogen, chlorine is slightly less reactive than fluorine, which still makes it one of the most reactive elements. Chloride is the most common anion in the world's oceans with the most common cation being sodium, so it's no surprise sodium chloride salt is so ubiquitous.`,
            p3: `It is used in the production of hydrochloric acid (used by many industries), the production of some polymers like polyvinyl chloride (known as PVC plastic), and is of course useful in chemistry for its ability to displace other anions or to produce salts.`
        },
        {
            name: "Argon",
            symbol: "Ar",
            mass: "39.88",
            z: 18,
            state: "Gas",
            p1: `Discovered in 1894 by Lord Rayleigh and Sir William Ramsay, who removed oxygen, carbon dioxide, and nitrogen from air leaving behind argon (which constitutes ~1% of ordinary air), as well as then undetected trace gases like neon and xenon which would later be discovered by Ramsey and Travers.`,
            p2: `Argon is the third noble gas, and as expected is rather inert. Owing to the fact it has similar density to air (being slightly heavier), it is the most abundant noble gas. Its abundance makes it a cheap alternative to the other noble gasses, especially when displacing ordinary air and making flammable sites safe.`,
            p3: `Like helium, argon is radiogenic, meaning almost all the argon in the Earth's atmosphere was produced through radioactive decay. While helium is the particle ejected in alpha decay, argon-40 is produced as a rare product of potassium-40 decay. When Argon is used in neon lighting, it glows bright blue.`
        }
    ],
    [
        {
            name: "Potassium",
            symbol: "K",
            mass: "39.10",
            z: 19,
            state: "Solid",
            p1: `Discovered in 1807 by Sir Humphry Davy, who electrolysed potassium hydroxide, isolating the metal. Potash is the name given to a group of salts that can be mined all over the world: from caustic potash (potassium hydroxide) the element was first isolated, hence the name potassium derives from potash.`,
            p2: `It has similar properties to the rest of the alkali metals, it is light, soft, and easily cut with a knife. Chemically it exemplifies the trend that moving down the alkali metals we see reactivity increase. Whilst sodium and lithium were already very reactive, potassium is so reactive that it can form
            dangerously unstable oxides: simply cutting a sample of potassium with an oxide layer can result in a potassium fire - which one should never attempt to put out with water, otherwise it will detonate and shower you with caustic potassium hydroxide.`,
            p3: `Potassium salts are important in biology for very wide variety of organisms, including plants, as such it is used in many fertilisers.`
        },
        {
            name: "Calcium",
            symbol: "Ca",
            mass: "40.08",
            z: 20,
            state: "Solid",
            p1: `Discovered and first isolated by Sir Humphry Davy in 1808, like most of Davy's discoveries it involved the electrolysis of a metal salt. Davy's method also required mercury and was not viable commercially, so in modern calcium production electrolysis of molten calcium chloride is used instead.`,
            p2: `Calcium's chemistry is exactly what you would expect from its place in the periodic table: it is slightly more reactive than magnesium and will react with the typical chemicals in the atmosphere like oxygen, water, and nitrogen. In a large block of calcium the surface will quickly form oxides and nitrides which help shield the rest of the calcium from further reaction.`,
            p3: `Calcium is one of the most abundant metals on Earth and is the most abundant metal in the human body, where it is famously essential to strong bones as calcium phosphate. It is also used in processing other metals, as its high reactivity will grab oxide anions and protect metals being forged.`
        },
        {
            name: "Scandium",
            symbol: "Sc",
            mass: "44.96",
            z: 21,
            state: "Solid",
            p1: `Discovered as an oxide by Lars Fredrik Nilson in 1879, it would only be isolated as late as 1937 through electrolysis. The element is named for Scandinavia, place of Nilson's birth and the discovery.`,
            p2: `Scandium is a soft but altogether somewhat average metal which has no standout quality: for pretty much everything it does there exists a metal that does it better. Adding to its lack of uses is a rarity that makes it more expensive than other metals with similar applications. It can be alloyed with aluminium to reduce thermal expansion/shrinkage but is outclassed by titanium in this use, and it can also be used for halide lamps.`,
            p3: `Scandium was one of the four elements (the others being technetium, gallium, germanium) famously predicted by Mendeleev's periodic table of elements - which, although essential today, was new at the time and was vindicated by the accuracy such predictions.`
        },
        {
            name: "Titanium",
            symbol: "Ti",
            mass: "47.87",
            z: 22,
            state: "Solid",
            p1: `Known to William Gregor as early as 1791, who prospected some 'black sand' he noticed and found a metallic oxide he did not recognise as any known element. Titanium was later isolated in 1910, when Matthew Hunter reacted titanium tetrafluoride with sodium.`,
            p2: `Titanium is a metal you've definitely heard of, it's famed for being extremely light, but unlike most other light metals it is relatively abundant, very strong, and has a high melting point. Interestingly, the metal is capable of catching fire, although only at such high temperatures it is not often relevant.`,
            p3: `It shouldn't come as much of a surprise that titanium sees use in the construction of fast vehicles, especially aircraft (the fastest aircraft ever - the SR-71 - was 85% titanium). But what might surprise you is that more than 90% of all titanium mined is used in white pigment/paint, as titanium dioxide.`
        },
        {
            name: "Vanadium",
            symbol: "V",
            mass: "50.94",
            z: 23,
            state: "Solid",
            p1: `Discovered by Andrés Manuel del Rio in 1801, who identified the new metal via the salts in 'brown lead' ore. It was isolated to its elemental form in 1867 by Henry Enfield Roscoe, who reacted vanadium chloride with hydrogen.`,
            p2: `As expected of a transition metal, vanadium will oxidise easily to 4 different states, allowing it to form a very wide variety of compounds (of varied colour), and form compounds of both oxidising and reducing agents. Vanadium is also a good catalyst and a better alternative to platinum for the sulfuric acid manufacturing contact process.`,
            p3: `The vast majority of vanadium is used in metal alloys to increase hardness, particularly with iron and steel to create ferrovanadium and vanadium steel respectively. Vanadium salts are quite toxic, for certain compounds it can be life threatening in even small concentrations.`
        },
        {
            name: "Chromium",
            symbol: "Cr",
            mass: "52.00",
            z: 24,
            state: "Solid",
            p1: `Discovered by Louis Nicolas Vauquelin in 1794, who thermally decomposed chromium trioxide to produce metallic chromium. However, before the discovery of chromium, oxides of the element had been used for decades in the production of red paints and pigments.`,
            p2: `Chemically, chromium is capable of many oxidation states, producing lots of salts of brilliant colours. As a very effective oxidiser, chromic acid is used often in chemistry (despite being a very hazardous chemical to work with).`,
            p3: `Chromium is famous for having an extremely lustrous appearance, where it is often electroplated onto other metals and just refered to as 'chrome', such as in cars, motorcycles, and home decor. Outside of chrome plating, the metal also sees use in alloys where it can increase the strength and corrosion resistance of its partner. It is also found in pigments (and famously was the yellow of American school buses), although following health concerns it is less common today.`
        },
        {
            name: "Manganese",
            symbol: "Mn",
            mass: "54.94",
            z: 25,
            state: "Solid",
            p1: `Known to Carl Wilhelm Scheele in 1774 as a dioxide, and isolated months later by Johan Gottlieb Gahn, who reduced manganese dioxide with carbon. Manganese's name comes from magnesia negra meaning 'black ore from Magnesia', which is a region in Greece. From the same region also comes magnesia able (the white ore), to avoid the obvious confusion, one became known as magnesium, and the other as manganese.`,
            p2: `Manganese, as a transition metal, will form various oxidation states with different properties. Some of these compounds can be very strong oxidisers.`,
            p3: `Manganese is a big name in the world of alloys, it vital to the production of stainless steel, and is also heavily used with aluminium. In paints and pigments, manganese can be used as a strong green and a mild pink. Curiously, while manganese is not magnetic, manganese salts are.`
        },
        {
            name: "Iron",
            symbol: "Fe",
            mass: "55.85",
            z: 26,
            state: "Solid",
            p1: `One of the elements known to humanity since ancient times: it surplanted bronze as the metal of choice at around 1000BCE, ending the Bronze Age and beginning the Iron Age. Despite common portrayals, bronze was actually superior to early iron in many ways, but too expensive for mass production since copper and tin deposits (the components of bronze) are relatively rare compared to iron.`,
            p2: `Iron is a fairly reactive transition metal and has typical transition metal chemistry: a wide variety of oxidation states with varied colour. Iron is produced by smelting iron oxide with carbon (as powdered coal), which takes the oxygen and leaves behind elemental iron.`,
            p3: `It is perhaps the most important metal in history due to its abundance and its useful alloys (such as steel). The element is so abundant due to being the last fusion product of dying stars - being created typically for only the last day of the star's life before supernova.`
        },
        {
            name: "Cobalt",
            symbol: "Co",
            mass: "58.93",
            z: 27,
            state: "Solid",
            p1: `The first metal discovery since ancient times, cobalt was discovered at around 1735 by Georg Brandt, who distinguished it from bismuth in a 'just bismuth' ore sample. Some compounds were often used in the blue-colouring of glass, even before its discovery, although people back then believed that they were bismuth compounds.`,
            p2: `Cobalt is another typical transition metal. It has various common oxidation states with bright and vivid colours, therefore it's no suprise it is often used in pigments.`,
            p3: `It is also used in very high performance alloys, known as superalloys, where the alloy is strong, corrosion resistant, and will not warp easily at high temperatures. As a component of batteries, cobalt is increasingly important to the modern world, especially in high capacity rechargable batteries for electric cars, which is taking up more and more of the global supply through the ongoing surge in worldwide electric vehicle production.`
        },
        {
            name: "Nickel",
            symbol: "Ni",
            mass: "58.96",
            z: 28,
            state: "Solid",
            p1: `Discovered by Axel Fredrik Cronstedt in 1751, who tried to extract copper from a mineral called nickeline, but was surprised by a new element instead, which he named after the ore. This discovery was somewhat controversial, and many chemists suspected it was likely nothing more than a copper alloy, the last of the nay-sayers were convinced in 1775 when Torbern Bergman produced pure nickel for the first time.`,
            p2: `Nickel is a transition metal although it is close to the threshold between the transition metals and semi-metals. As typical for a transition metal it can form compounds of various colours.`,
            p3: `It is mostly used in alloys, especially stainless steel. As an alloy component it increases corrosion resistance (especially to bases), and heat resistance. Nickel is of course also used in coinage (hence the set of coins refered to as 'nickels'), and also has a large role in chemistry where it is a good catalyst for hydrogenation reactions.`
        },
        {
            name: "Copper",
            symbol: "Cu",
            mass: "63.55",
            z: 29,
            state: "Solid",
            p1: `Copper is a prehistoric discovery, chiefly because it can actually be found in elemental form in some ores. Considering that copper is a component of bronze alloys, the use of copper must obviously predate the bronze age, and there is proof that copper was even used at around the time of the Neolithic Revolution - meaning copper was used by some of the very first civilisations and proto-civilisations in human history. Copper is therefore probably the first metal known to man.`,
            p2: `As a group 11 element (alongside gold and silver), it is an excellent conductor, relatively inert, and resistant to corrosion. Although it is not as inert as gold and silver, copper exhibits passivation like in aluminium, which protects the metal internally.`,
            p3: `Owing to its conductivity, the overwhelming use of copper is in electronics. It is also used in some buildings because it is so resistant to corrosion (and the bright green outer layer it produces looks pretty too!), a famous example is the Statue of Liberty.`
        },
        {
            name: "Zinc",
            symbol: "Zn",
            mass: "65.38",
            z: 30,
            state: "Solid",
            p1: `Discovered in prehistory by simply thermally decomposing ores, zinc has been used since before the Iron Age. It was often used as an alloy with copper: brass, which was even sometimes used in stead of other materials like iron and bronze, such as in the coinage and military equipment of the early Roman Empire.`,
            p2: `Like aluminium, zinc is somewhat reactive but has excellent passivation, as such it will corrode extremely slowly. It is not a transition metal like its neighbour and alloy-partner copper, so it generally only forms non-colourful compounds in one oxidation state.`,
            p3: `Whilst brittle and a poor material on its own, zinc is often used in alloys (like the afforementioned brass), where its passivation can help form an alloy that is resistant to corrosion. For the exact same reason - passivation - zinc is also often coated onto other materials like steel, making them much more corrosion resistant.`
        },
        {
            name: "Gallium",
            symbol: "Ga",
            mass: "69.72",
            z: 31,
            state: "Solid",
            p1: `Discovered in 1875 by Paul Emile Lecoq de Boisbaudran, who used the then-new invention of the spectroscope to analyse a mineral sample. Lecoq then went on to also be the first to isolate the element, through the use of electrolysis.`,
            p2: `Gallium has similar properties to the rest of the boron group, however it has a very low melting point in comparison, at just 30°C (which makes it an excellent alternative to mercury in thermometers for high temperature uses).`,
            p3: `One of the four elements famously predicted by Mendeleev's periodic table of elements, gallium was predicted with incredible accuracy: upon discovery its chemical properties fell within only a small margin of error of Mendeleev's writings. Such predictions made the element an important stepping stone in the widespread acceptance of Mendeleev's table which modern chemistry relies on today.`
        },
        {
            name: "Germanium",
            symbol: "Ge",
            mass: "72.63",
            z: 32,
            state: "Solid",
            p1: `Discovered in 1886 by Clemens Winkler, who analysed the mineral argyrodite and isolated out the known elements, what was left was a new unknown element: germanium, a brittle semi-metal that Winkler considered similar to antimony.`,
            p2: `The element remained largely ignored until it earned use in electronics late in the Second World War. After the war, germanium was used to create the very first transistors, earning a permanent place in the history of one of humanity's most important inventions. Although most of today's transistors are made with almost pure silicon, germanium remains at the cutting edge of electronics, where it is used in optical fibre and solar cells.`,
            p3: `Germanium is one of the four elements famously predicted by Mendeleev's periodic table of elements. The place Mendeleev reserved for the element proved to accurately represent its properties, providing yet more evidence of the periodic table's accuracy.`
        },
        {
            name: "Arsenic",
            symbol: "As",
            mass: "74.92",
            z: 33,
            state: "Solid",
            p1: `Arsenic is an element known since ancient times, where it was used in bronze alloys and - more infamously - as a deadly poison. Its value as a poison was owed to the difficulty of proving arsenic poisoning. Use as a murder weapon declined with the advent of the scientific revolution, which brought a new understanding of chemistry and a test for arsenic.`,
            p2: `Arsenic can occur as several different structures, the most common is gray arsenic: which is brittle, soft, and somewhat lustrous.`,
            p3: `The element's toxicity occurs as a result of arsenic taking the place of other important elements in the body's biochemistry. Arsenic steals places in reactions from phosphate, and without phosphate making it to the critical ATP-formation reaction, cells begin to die. For its gifted ability to destroy cells, the element also sees use in medicine: as 'trisenox' in chemotherapy treatments.`
        },
        {
            name: "Selenium",
            symbol: "Se",
            mass: "78.97",
            z: 34,
            state: "Solid",
            p1: `Discovered in 1817 by Jöns Jakob Berzelius and Johan Gottlieb Gahn, who reacted sulfuric acid with a sample of fool's gold: the reaction produced a precipitate which was first misidentified as the similar element tellurium, but Berzelius later reinvestigated the product, discovering selenium.`,
            p2: `In very small amounts, selenium is a biologically essential mineral (in large amounts it is very toxic); the data remains inconclusive and more research is required, but there are indications selenium intake may help prevent cancers and increase AIDS survival rates.`,
            p3: `Selenium's largest industrial usage in glass making, where it can provide a tint of red and/or help neutralise red's complementary colour. Selenium also finds contemporary usage as a vital component of CIGS cells for solar panels, which function to absorb solar energy heat and conduct it down to the ohmic contact to produce electricity.`
        },
        {
            name: "Bromine",
            symbol: "Br",
            mass: "79.90",
            z: 35,
            state: "Liquid",
            p1: `Discovered near-simultaneously by both Carl Jacob Löwig and Antoine Balard. Löwig discovered the element slightly sooner in 1825, by displacing the bromide in a salt with chloride, however the delay in publishing his findings meant that Balard's isolation of bromine (though performed a year later), was the first published discovery of the element.`,
            p2: `Bromine is one of only two elements in the periodic table to be a liquid at standard temperature and pressure (the other being mercury), and chemically speaking it has properties typical of a halogen: reactive, effective as an oxidiser, and it forms salts with metals.`,
            p3: `Bromine has many uses, the most common being part of flame retardant compounds, but the element also sees use in zinc-bromine batteries, the 'imperial purple' pigment, and in various medical uses. But, like the rest of the halogens, it can be very dangerous and its applications are severely restricted by its toxicity.`
        },
        {
            name: "Krypton",
            symbol: "Kr",
            mass: "83.80",
            z: 36,
            state: "Gas",
            p1: `Discovered in 1898 by William Ramsey and Morris Travers, via the same process as their discoveries for the other noble gasses neon and xenon: in a method similar to fractional distillation, applied to air.`,
            p2: `As a noble gas, there is not much to say about the chemistry of krypton, it is mostly inert and will not react unless in extreme conditions. It is a very dense gas and will sink in air, breathing it in has the opposite effect to breathing in helium: it lowers voice pitch, but being a heavy gas it can prove difficult to push out of your lungs (and that can cause death via asphyxiation).`,
            p3: `Superman's home world is of course named for the element krypton, however the reason why likely has more to do with the Greek name's origin (kryptos/cryptos meaning 'secret'), and the krypton seen in Superman has nothing in common with the real element. Like the other noble gases, krypton is used in neon lighting fixtures, where it glows white (which can be combined with filters for any colour light).`
        },
    ],
    [
        {
            name: "Rubidium",
            symbol: "Rb",
            mass: "85.47",
            z: 37,
            state: "Solid",
            p1: `Discovered in 1861 by Robert Bunsen (of Bunsen burner fame) and Gustav Kirchhoff, who performed flame tests (otherwise known as flame spectroscopy) on samples of a mineral called lepidolite. The spectrum showed a set of red lines unassociated with any element, and after successive chemical tests they determined they had found a new element.`,
            p2: `Excluding non-natural elements, rubidium is the 8th most expensive element, third most reactive metal and one of the most reactive elements overall: it can even spontaneously ignite in air, so it must be kept stored in oil.`,
            p3: `Rubidium is the first of the alkali metals to be more dense than water, all the previous elements of group 1 would actually float on the surface... that is, if they didn't react with the water. In 1995 rubidium was used to form the first ever Bose-Einstein condensate - a state of super-chilled matter which, through quantum effects, has a position that can only be defined as probabilistic waveform.`
        },
        {
            name: "Strontium",
            symbol: "Sr",
            mass: "87.62",
            z: 38,
            state: "Solid",
            p1: `Discovered by Adair Crawford and William Cruickshank in 1790, who believed an ore found in the mines of Strontian (a village on the west coast of Scotland) was distinct from previously known and extracted minerals. Their suspicion was confirmed in 1808 when Sir Humphry Davy electrolysed a sample and isolated the element.`,
            p2: `Strontium has scarce use as a building material, and as a chemical its most well known usage is as the necessary ingredient for the brilliant glow of red fireworks.`,
            p3: `Radioactive isotope strontium-90 is well known as a product of nuclear catastrophes like the Chernobyl disaster. Strontium-90 is so concerning because it is similar enough to calcium for the body to happily absorb it into bone, resulting in the body becoming heavily irradiated. However, the same strontium-90 is also useful as a potential fuel for radioisotope thermoelectric generators, which can power space probes in areas where solar panels are not effective.`
        },
        {
            name: "Yttrium",
            symbol: "Y",
            mass: "88.91",
            z: 39,
            state: "Solid",
            p1: `The first of eight elements discovered from samples of a single quarry in Ytterby, Sweden - the other seven being ytterbium, erbium, terbium, scandium, holmium, thulium, and gadolinium. Yttrium was found in 1794 by Johan Gadolin, but the element would only be isolated decades later by Friedrich Wöhler in 1828.`,
            p2: `Yttrium is a grey, lustrous metal whose compounds are lacking in colour compared to transition metals. Unsurprising with the similarities to the lanthanoids, it is often found with those elements.`,
            p3: `Yttrium's most significant contribution to science might be as part of the first known 'high temperature' superconductor: superconductivity near absolute zero is nearly useless, but in the quest for superconductivity at practical temperatures, one of the first 'high temperature' (still only just above -200C) candidates discovered was a complex material called yttrium barium copper oxide - known to its friends as the '123 superconductor'.`
        },
        {
            name: "Zirconium",
            symbol: "Zr",
            mass: "91.22",
            z: 40,
            state: "Solid",
            p1: `Discovered in 1789 by Martin Heinrich Klaproth, who analysed a sample of jargoon (a mineral known since classical antiquity) and discoverd a new oxide which he called zirconia. Jöns Jacob Berzelius was the first to isolate the element in 1824, by reacting a zirconium salt with potassium.`,
            p2: `Zirconium is a shiny, light-coloured metal with a high resistance to corrosion and a melting point of 1850C (the 16th highest of all the elements). Despite the resistance to corrosion, it will combust with oxygen in a powder form, burning as bright sparks. As a transition metal zirconium can form a wide range of molecules, but these compounds are lacking in colour.`,
            p3: `With the metal's chemical and thermal resistance, it is unsurprisingly used for extreme applications, such as in metal-moulding. A significant fraction of zirconium is used in alloys, such as those used in fuel cell cladding for nuclear reactors and close-to-the-sun space vehicles like the Parker Solar Probe.`
        },
        {
            name: "Niobium",
            symbol: "Nb",
            mass: "92.91",
            z: 41,
            state: "Solid",
            p1: `Discovered by Charles Hatchett in 1801, who suspected a sample of columbite contained a new element. Although he could not isolate it himself, his chemical investigation confirmed the existence of what he then named 'columbium'. The first isolation of the element occured in 1864 by the work of Christian Wilhelm Blomstrand, and by that time the element had been renamed to niobium.`,
            p2: `Pure niobium is lustrous grey, however the surface can be anodised to take on a futuristic-looking blue-violet appearance. A fitting look, as niobium is also an elemental superconductor... although you need to cool it to -260C.`,
            p3: `The vast majority of niobium goes to alloys: in the making of high-grade steel, and as a component of superalloys like inconel-718 designed for aeronautical and aerospace engineering. Niobium is also used for its superconductivity: these superconductors are used in applications ranging from particle accelerators on the fringe of science, to MRI machines in hospitals.`
        },
        {
            name: "Molybdenum",
            symbol: "Mo",
            mass: "95.95",
            z: 42,
            state: "Solid",
            p1: `Discovered by Carl Wilhelm Scheele in 1778, who distinguished what was previously thought to be a sample of graphite from both galena (lead sulfide ore) and real graphite. He named the new element molybdenum and it was isolated three years later by Peter Jacob Hjelm.`,
            p2: `Molybdenum is a transition metal with a very wide range of oxidation states and colourful compounds. It has both a high melting point and a minimal thermal expansion: making it ideal for complex machinery that must operate at high temperatures.`,
            p3: `The vast majority (nearly 90%) of all molybdenum is used as a component of high strength alloys like the 41xx family of steels. In addition to the thermal resistance it can offer alloys a resistance to corrosion and increased ductility and weldability.`
        },
        {
            name: "Technetium",
            symbol: "Tc",
            mass: "(97)",
            z: 43,
            state: "Solid",
            halfLife: "4,200,000 years",
            p1: `Discovered in 1937 by Caro Perrier and Emilio Segré, who inspected parts of a cyclotron that had become radioactive, and found that some molybdenum foil had converted into a different element. As there was a hole in the periodic table next to molybdenum for the undiscovered element 43, its synthesis and discovery was immediately suspected - and soon afterwards confirmed.`,
            p2: `Technetium is one of only two elements lighter than lead to be radioactive (the other being the lanthanoid promethium). Since the element is radioactive with a relatively short half-life (the most stable isotope has a half-life of 4.2 million years), almost all technetium that once might have existed on Earth decayed into other elements (considering the Earth is 4.5 billion years old), thus the element could never be discovered naturally.`,
            p3: `Technetium is one of the four elements predicted by Mendeleev back in 1871, although it could not be found in nature owing to radioactivity (a concept that would be discovered a quarter of a century later by Henri Becquerel).`
        },
        {
            name: "Ruthenium",
            symbol: "Ru",
            mass: "101.07",
            z: 44,
            state: "Solid",
            p1: `Discovered in 1844 by Karl Ernst Claus, who found and extracted the element from platinum residue. However, the element was very nearly almost discovered earlier by Gottfried Osann, but unfortunately for Osann he could not successfully repeat his own experiment, Osann gave it the name ruthenium after the land the ore came from: Russia... being the homeland of the eventual discoverer Claus, the name was kept thanks to his patriotism.`,
            p2: `Ruthenium is an extremely expensive precious metal, although it can form a wide range of oxidation states with bright vibrant colours like one would expect from a transition metal. The element is a member of the platinum group: six noble metals that are both good catalysts and resistant to tarnish, they often used in catalysts, jewellery, and electronics.`,
            p3: `Roughly half of all ruthenium produced goes into electronics, due to its platinum group properties. Other applications include platinum group alloys, superalloys, and as a chemical catalyst.`
        },
        {
            name: "Rhodium",
            symbol: "Rh",
            mass: "102.91",
            z: 45,
            state: "Solid",
            p1: `Discovered in 1803 by William Hyde Wollaston, the discovery - like most of the platinum group metals - involved the analysis of a platinum ore sample which yielded the observation that another metal was present. Wollaston then isolated the metal through a series of strong acid combinations, producing metallic rhodium.`,
            p2: `A typical platinum group metal, rhodium is resistant to corrosion, rare, and extremely expensive. Rhodium in particular is the most expensive metal in the world at around $70,000 per kilogram (at time of writing).`,
            p3: `In metallurgy, rhodium is typically alloyed with or plated onto other metals, and particularly other precious metal alloys, such as white gold, which is often plated with rhodium. On its own, the element's primary destination is in catalytic converters for vehicles, where it breaks down nitrogen oxides, it is also occassionally used in spark plugs, although other platinum group metals are cheaper and are usually used instead.`
        },
        {
            name: "Palladium",
            symbol: "Pd",
            mass: "106.42",
            z: 46,
            state: "Solid",
            p1: `Discovered and isolated by William Hyde Wollaston in 1802, as expected for a platinum group metal, the discovery was the result of the analysis of platinum ore, which turned out to contain more than just platinum. Palladium is named after an asteroid, called 2 Pallas, which was thought to have been a planet at that time.`,
            p2: `As a typical platinum group metal, palladium is hard to tell apart from platinum in just about every way: it is resistant to corrosion, an effective catalyst for some adsorption reactions, and it is rare and expensive.`,
            p3: `Most of the world's palladium goes into catalytic converters, where the metal can help catalyse the break down nitrogen oxides into oxygen and nitrogen, it will also effectively catalyse hydrogenation reactions (including crude oil cracking).`
        },
        {
            name: "Silver",
            symbol: "Ag",
            mass: "107.87",
            z: 47,
            state: "Solid",
            p1: `Being in the same group as copper and gold, silver shares many of the same properties, including the fact that it naturally occurs in its metallic form, and as a result silver is one of humanity's ancient discoveries. Like copper, silver was known to some of the very earliest proto-civilisations.`,
            p2: `Silver is a 'noble metal': resistant to corrosion, rare, and expensive. These properties made it extremely useful as currency, and it had an important role as proto-currency in transitioning barter economies over to currency-based trading, though not immediately with coins: the earliest trading of silver occured in trading silver pieces, bars, and jewellery.`,
            p3: `The use as decoration and jewellery remains a large share of silver's use in modern times, however the metal also has anti-bacterial properties which make it suited to certain medical applications, such as adding small amounts to wound dressings to prevent infection. Silver is also the most effective conductor of all elements, and so therefore has significant use in electronics.`
        },
        {
            name: "Cadmium",
            symbol: "Cd",
            mass: "112.41",
            z: 48,
            state: "Solid",
            p1: `Discovered in 1817 by both Friedrich Stromeyer and Karl Samuel Leberecht Hermann independently of each other. They both discovered it the same way: they were producing zinc oxide from zinc carbonate, and occassionally the product was discoloured instead of being white, this discolouration turned out to be from the presence of a cadmium oxide, and from there cadmium was soon isolated.`,
            p2: `Cadmium is a soft white metal similar to zinc, although it is more resistant to corrosion. The element displays transition metal properties (although not often considered a transition metal).`,
            p3: `The vast majority of all cadmium is used for rechargable nickel-cadmium batteries, however due to its corrosion resistance it is also often plated onto other metals as a protective layer. As a colourful (maybe-)transition metal, cadmium compounds can be quite colourful, and they are often used in pigments such as cadmium yellow.`
        },
        {
            name: "Indium",
            symbol: "In",
            mass: "114.82",
            z: 49,
            state: "Solid",
            p1: `Discovered by 1863 by Ferdinand Reich and Hieronymus Theodor Richter, who used emission spectroscopy to analyse ores. They were hoping to find thallium but after finding emission lines that didn't match any other known element, they realised they had found a new element. They gave it the name indium after indigo (the colour of one of its emission lines), they then went on to isolate it within a year.`,
            p2: `Indium is the softest non-alkali metal and it can be cut with a knife, it is a post-transition metal element with a very low melting point (150C).`,
            p3: `Indium was previously an unremarkable metal with few interesting applications, however with the advent of smart phones it has become a very useful element: indium tin oxide is a clear material that can conduct electricity, which is vital for touchscreens: the price of indium went up 400% at the advent of the smartphone era.`
        },
        {
            name: "Tin",
            symbol: "Sn",
            mass: "118.71",
            z: 50,
            state: "Solid",
            p1: `A prehistoric discovery, tin was used since as far back as at least 3000BCE: the metal is alloyed together with copper to form bronze, and this alloy was such a breakthrough that an era of history is named for it: the Bronze Age. Contrary to popular belief, bronze was actually a better metal than early iron in almost every way, but the downside of bronze is the relative rarity of copper and tin compared to iron - iron tools are much less expensive to mass produce.`,
            p2: `Tin is a slightly-off silver coloured metal, which is resistant to tarnish but when left at low temperatures will suffer from 'tin pest' - a destructive conversion from the metallic tin allotrope to the brittle crystal allotrope.`,
            p3: `Tin see heavy use as solder due to its low melting point, although the chemistry of 'gold-dissolving' tin alloys and lead toxicity has complicated this application in modern times. Like its neighbour indium, tin is a vital component in modern smartphones due to the useful properties of indium tin oxide.`
        },
        {
            name: "Antimony",
            symbol: "Sb",
            mass: "121.76",
            z: 51,
            state: "Solid",
            p1: `Antimony is a prehistoric discovery and has been used for thousands of years, there is even a vase made of antimony in the Louvre today which dates to 3000BCE. Its compounds have been used historically for make-up as well as for medical purposes, though the brittle metallic form has largely been considered useless.`,
            p2: `Elemental antimony is a brittle pnictogen semi-metal which is useless for building purposes owing to its lack of durability, and avoided in many applications for being toxic to humans.`,
            p3: `Being a relatively uninteresting element, there are few applications for antimony that stick out: one is the antimony trioxide compound which functions as a flame retardant, and another is in electronics due to some semiconductor qualities it has. Antimony can also be alloyed with lead to increase its hardness and strength, which makes a useful material for lead batteries, bullets, and cable sheathing.`
        },
        {
            name: "Tellurium",
            symbol: "Te",
            mass: "127.60",
            z: 52,
            state: "Solid",
            p1: `Discovered in 1782 by Franz-Joseph Müller von Reichenstein, who inspected supposed gold ore from a Romanian mine and found it contained a antimony-like metal. Martin Heinrich Klaproth later isolated the metal and named it.`,
            p2: `Tellurium is a semi-metal, semi-conductor chalcogen. As a chalcogen it can act as an oxidiser (although it is nowhere near as reactive as oxygen). As a semi-metal it can be used in alloys to make them more easily cut and shaped. And as a semi-conductor it can useful in the creation of diodes (although the material of choice for diodes remains silicon).`,
            p3: `The main use of tellurium is in cadmium telluride solar panels: a CdTe array can exhibit extremely high levels of efficiency, as such the production of these panels occupies 40% of all mined tellurium. The growth of solar panels is the primary driver of tellurium demand, and the introduction of the first CdTe panels early into the new millennium spiked the price of the metal by over 200%.`
        },
        {
            name: "Iodine",
            symbol: "I",
            mass: "126.90",
            z: 53,
            state: "Solid",
            p1: `Discovered and isolated in 1811 by Bernard Courtois, who - in a fairly routine procedure - was harvesting sodium carbonate from seaweed, but when dealing with the waste he added sulfuric acid and observed purple fumes that condensed into crystals, he immediately suspected this was a new element and gave samples to others, who verified the discovery.`,
            p2: `Iodine is the last and heaviest stable halogen, keeping with the trend of decreasing reactivity down the halogens, it is the weakest oxidiser of them all (ignoring the unstable halogens, which are too rare and costly to effectively study).`,
            p3: `The most well known of iodine's uses is in medicine, where dissolved elemental iodine is often used to kill bacteria: it is often coated on the patient's skin in a very thin layer at the start of a surgical procedure, covering the area where an incision is to be made, in this form it is an orange solution that evaporates.`
        },
        {
            name: "Xenon",
            symbol: "Xe",
            mass: "131.29",
            z: 54,
            state: "Gas",
            p1: `Discovered by William Ramsay and Morris Travers in 1898, they used the same methodology as was used in the discoveries of krypton and neon. As a colourless noble gas it was previously undetected like the rest of the noble gasses.`,
            p2: `Xenon is the heaviest non-radioactive noble gas, and like helium can be breathed to alter voice pitch (xenon lowers the pitch), although being a heavy gas it can prove difficult to push out of your lungs (and that can cause death via asphyxiation). Although noble gasses are inert, under the right conditions they can be forced to react and form compounds, this was first demonstrated by reacting xenon with fluorine (the most reactive element).`,
            p3: `The most interesting application of xenon from a technology perspective, is as propellant in ion drives like Hall-effect thrusters for space craft (e.g. Deep Space 1), which use plasma jets to accelerate space vehicles, aside from solar sails it is the most efficient type of space craft propulsion ever invented.`
        },
    ],
    [
        {
            name: "Caesium",
            symbol: "Cs",
            mass: "132.91",
            z: 55,
            state: "Solid",
            p1: `In 1859 Robert Bunsen and Gustav Kirchhoff invented the spectroscope, within a year they had put it to good use analysing residue left behind by evaporating mineral water. Using the spectroscope to conduct essentially a high-tech flame test, they discovered spectral lines that were not shared by any known element - thus, they had discovered a new one: caesium.`,
            p2: `Caesium is a soft pale-gold coloured metal with a melting point of only 28C. In continuation of the reactivity trend down the alkali metals, it is more reactive than rubidium, and the most reactive metal (actually more reactive than francium below it).`,
            p3: `Caesium-137 - a product of uranium fission - is considered the most troublesome fission product in nuclear power. It fills a Goldilock's zone of decaying fast enough to be very harmful, but slow enough to render areas uninhabitable for a long time. Over 30 years after the Chernobyl disaster, Cs-137 is still found in high concentration in fauna as far away as France.`
        },
        {
            name: "Barium",
            symbol: "Ba",
            mass: "137.33",
            z: 56,
            state: "Solid",
            p1: `Discovered in 1774 when Carl Wilhelm Scheele analysed baryte, a phosphorescent mineral known for centuries. Barium was later isolated by Sir Humphry Davy in 1808 through the same method he used for his isolations of other alkali metals: electrolysis of a molten salt compound.`,
            p2: `Barium is similar to the rest of the earth alkalki metals, following the group trend it is more reactive than strontium and the second most reactive element of the group.`,
            p3: `Elemental barium has few uses, but barium salts are important to several industries: barium sulfate is used in drilling fluid for oil wells where it increases hydrostatic pressure of the fluid, barium nitrate is often used as a green colouring for pyrotechnics, yttrium barium copper oxide is a high temperature superconductor (known as the '123 superconductor'), and barium peroxide can be used as a catalyst for thermite reactions.`
        },
        {
            rowSub: 1 
        },
        {
            name: "Hafnium",
            symbol: "Hf",
            mass: "178.49",
            z: 72,
            state: "Solid",
            p1: `Discovered in Copenhagen by Dirk Coster and Georg von Hevesy in 1923. Armed with the knowledge that undiscovered element 72 would likely be similar to zirconium, they performed X-ray spectroscopy on zircon (zirconium ore) confirming that a new element was present. Shortly afterward, this new element was also isolated for the first time. It was named Hafnium after the Latin word for Copenhagen, Hafnia.`,
            p2: `Hafnium was the last non-radioactive element discovered, it is a transition metal with qualities similar to zirconium: it is a shiny silvery metal that is highly resistant to corrosion, it is, however, twice as dense as zirconium.`,
            p3: `Due to its similarity to zirconium, it is no surprise that it shares many of the same applications, including the use in nuclear reactors and superalloys. For nuclear reactors it is even a better alternative to zirconium, since it is much more effective at absorbing neutrons, making it a fantastic control rod material.`
        },
        {
            name: "Tantalum",
            symbol: "Ta",
            mass: "180.95",
            z: 73,
            state: "Solid",
            p1: `Discovered in ores by Anders Ekeberg in 1802, but he thought these ores to only contain columbium. Tantalum was only discovered as a unique element in 1846, when Heinrich Rose rediscovered columbium (and gave it the name it has today - niobium) and determined that there was also a second element in the ore: tantalum.`,
            p2: `Tantalum is a dark, highly conductive metal with the fifth highest melting point of all the elements. Two structures of tantalum exist: alpha phase which is soft, and beta phase which is very hard and brittle. Chemically it is similar to niobium, with a wide range of oxidation states.`,
            p3: `The element sees much of its use in electronics, where it can be electroplated onto conductive metals to apply a very thin layer of insulation to them. The oxide layer that forms on tantalum's surface is dielectric, thus producing a thin oxide layer of an already extremely thin layer of tantalum plating - ideal for capacitors, where a thinner dielectric results in higher capacitance.`
        },
        {
            name: "Tungsten",
            symbol: "W",
            mass: "183.84",
            z: 74,
            state: "Solid",
            p1: `Also known as wolfram, tungsten was discovered by Carl Wilhelm Scheele and Torbern Bergman in 1781, who produced tungstic acid from a sample of scheelite and thought a metal may be obtainable from it. Two years later, José and Fausto Elhuyar reduced tungstic acid with carbon, producing metallic tungsten.`,
            p2: `Tungsten is a hard steel-coloured metal famed for its resistance to temperature and deformation, at 3420C its melting point is second only to carbon (at 3500C). Tungsten's hardness is also impressive, as the third hardest element overall (behind chromium and boron).`,
            p3: `Unsurprisingly, tungsten's main applications are in heavy duty high temperature and high stress applications, such as to produce tungsten carbide - an extremely hard material used in industrial mining drills and armour-piercing ammunition - or often as the metal used in temperature resistant nozzles designed to perform under the heat of a rocket launch.`
        },
        {
            name: "Rhenium",
            symbol: "Re",
            mass: "186.21",
            z: 75,
            state: "Solid",
            p1: `Discovered in 1925 by Walter and Ida Noddack and Otto Berg, who found the element in samples of platinum ore and columbite. Rhenium was also accidently discovered earlier by Japanese scientist Masataka Ogawa in 1908: he believed he had discovered element 43 (technetium) however he had actually discovered rhenium, unfortunately for him, he did not realise his true discovery.`,
            p2: `Rhenium is light-silver coloured metal with the third highest melting point of all the elements, it is extremely dense and resistant to corrosion, which makes the element ideal for use in heavy duty applications like superalloys. Rhenium is, however, also rare and expensive, limiting its applications.`,
            p3: `The vast majority of rhenium use in is afforementioned superalloys, and many of these super alloys are then used in advanced jet engines and gas turbines. Rhenium also has use when alloyed with platinum: this alloy can be used a catalyst to help produce high octane fuels from crude oil derivatives.`
        },
        {
            name: "Osmium",
            symbol: "Os",
            mass: "190.23",
            z: 76,
            state: "Solid",
            p1: `As normal for platinum group metals, osmium was discovered from a platinum sample: when some platinum was dissolved in aqua regia, an insoluble reside was formed in addition to the soluble platinum salt. This residue was analysed by Smithson Tennant in 1803, and he found they were the insoluble salts of two new elements, which came to be known as iridium and osmium (neighbours on the periodic table).`,
            p2: `Osmium is a dim gray metal and the densest element (twice as dense as lead). The element forms an oxide that is very toxic, as such it is usually alloyed with other metals (often with iridium) to reduce the formation of the oxide layer.`,
            p3: `Alongside uranium, osmium used to be heavily used as a catalyst in the Haber process to produce ammonia (but was later replaced with cheaper alternatives). Osmium is still used today as a catalyst for some alternative industrial applications.`
        },
        {
            name: "Iridium",
            symbol: "Ir",
            mass: "192.22",
            z: 77,
            state: "Solid",
            p1: `As expected for a platinum group metal, iridium was found from a platinum sample: when some platinum was dissolved in aqua regia, an insoluble reside was formed in addition to the soluble platinum salt. This residue was analysed by Smithson Tennant in 1803, and he found they were the insoluble salts of two new elements, which came to be known as iridium and osmium (neighbours on the periodic table).`,
            p2: `Iridium is a very rare metal (10 times rarer than platinum on Earth), it is a hard silvery metal with a very high melting point and is the most corrosion-resistant metal of all: few chemicals can react with it - not even aqua regia- although at high temperatures oxidisers will react with the element.`,
            p3: `As a result of its hardy material properties, iridium sees some applications for its durability, such as in aircraft engines or high pressure plumbing. As a platinum group metal, it unsurprisingly also makes a good catalyst for some industrial reactions.`
        },
        {
            name: "Platinum",
            symbol: "Pt",
            mass: "195.08",
            z: 78,
            state: "Solid",
            p1: `As a noble metal, platinum occurs often in its native metallic form and was discovered two millennia ago by an Ecuadoran civilisation. It was later discovered by Europeans when Antonio de Ulloa and Jorge Juan y Santacilia observed Native Americans mining the element.`,
            p2: `Platinum is a lustrous white metal that exemplifies the traits of the platinum group: it is rare, expensive, can be used to catalyse reactions, and is resistant to reaction with most other elements. It is sometimes also used in the same way as gold for its noble metal properties - for both investment and jewellery - as it can be considered a safe and reliable store of wealth, although industrial use still drives most demand.`,
            p3: `The most significant application of platinum is as a catalyst for many reactions, one of those reactions is the breakdown of nitrogen dioxide, for which the metal is used in catalytic converters in cars.`
        },
        {
            name: "Gold",
            symbol: "Au",
            mass: "196.97",
            z: 79,
            state: "Solid",
            p1: `Discovered in prehistory, as a result of its lack of reactivity gold often occurs in its metallic form, and therefore was found by some of the earliest humans. Alongside silver, gold was quick to become a precious and valued material, and was employed as currency and jewellery throughout history.`,
            p2: `Gold is considered the most noble of the noble metals, it does not tarnish and there are few elements that will directly react with it. Gold will not dissolve in most acids and solutions, but one solution that will dissolve it is aqua regia (a mixture of nitric and muriatic acid).`,
            p3: `Today, the largest application of gold remains jewellery, the second largest is as an investment (a loose connection to the metal's history as currency). Increasingly electronics forms a large proportion of gold consumption: since gold is immune to most forms of corrosion it is an excellent choice for plating electrical connectors, ensuring they last the product's lifetime.`
        },
        {
            name: "Mercury",
            symbol: "Hg",
            mass: "200.59",
            z: 80,
            state: "Liquid",
            p1: `Mercury (also known as quicksilver) was discovered in prehistory before 2000BCE. Although it is a rare element, it can be obtained from a beautiful ruby-like mineral known as cinnabar, by simply heating the cinnabar and condensing a mercury product.`,
            p2: `Mercury is one of only two elements to exist as a liquid at standard temperature and pressure (the other being bromine), and it has a boiling point of only 355C. Despite being a liquid at standard temperature and pressure, mercury is extremely dense to the point that other metals will float on its surface, mercury will also dissolve many metals to form 'amalgams' (the name given to mercury alloys).`,
            p3: `Mercury is a neurotoxin, especially in compounds like methylmercury - where just 4 parts per million can be fatal. Mercury was historically used as the indicating fluid in thermometers, however as the toxicity of the metal has become more apparent this application has been replaced with safer alternatives.`
        },
        {
            name: "Thallium",
            symbol: "Tl",
            mass: "204.38",
            z: 81,
            state: "Solid",
            p1: `Discovered in 1861 by William Crookes, who used flame spectroscopy and observed the element's bright green lines on the flame's emission spectrum. It was also independently discovered by Claude Auguste Lamy at around the same time through the same method.`,
            p2: `Thallium is a soft and heavy post-transition metal, it has a relatively low melting point of just over 300C and it can be cut with a knife. Thallium is extremely toxic and has a similar (although less well known) reputation to arsenic for being used for murder: as thallium sulfate is odorless, tasteless, soluble in water, and less than a gram can easily be fatal.`,
            p3: `Perhaps thallium's most interesting application is the element's potential to be a high-temperature superconductor: thallium is a component of the TBCCO (thallium barium calcium copper oxide) superconductor, which can acheive superconductivity below 127K. Ongoing research suggests a higher temperature thallium superconductor may be possible.`
        },
        {
            name: "Lead",
            symbol: "Pb",
            mass: "207.21",
            z: 82,
            state: "Solid",
            p1: `A relatively common element, lead has been known since prehistoric times, going back at least as far a 6000BCE. Early civilisations infamously used lead for many uses (ignorant of the dangers posed by the neurotoxin) ranging from make-up to currency to plumbing - in fact the word 'plumbing' originates from the Latin word for lead 'plumbum'.`,
            p2: `Lead is the heaviest stable element and is often at the end of other elements' decay chains. As a result of this, almost all the lead on Earth is radiogenic: millions of years ago quantities of elements like uranium would have been greater, whilst lead would have been rarer.`,
            p3: `Lead was previously used in a wide variety of industries, although almost all of its uses have been usurped by less toxic elements. Most infamously, lead was used in fuels to reduce engine knocking, a mistake which (according to the 'lead-crime hypothesis') literally increased murder rates through lead's effects on the human brain. Today, lead's largest remaining use is as a reactant in lead-acid car batteries.`
        },
        {
            name: "Bismuth",
            symbol: "Bi",
            mass: "208.98",
            z: 83,
            halfLife: "2x10^19 years",
            state: "Solid",
            p1: `Bismuth was discovered at least as early as 1400CE, although the name of the discoverer is unknown. It was often alloyed with and confused for lead, but it was convincingly demonstrated to be seperate from lead by Claude François Geoffroy in 1753.`,
            p2: `On many periodic tabels bismuth is listed as not being radioactive, on this table it is considered radioactive. The reason for this discrepancy is that in 2003 bismuth was found to be very very slightly radioactive, with a half-life of 20,000,000,000,000,000,000 years (more than a billion times the age of the universe). For almost all intents and purposes it can be considered to be nonradioactive: it is not dangerous, and decays too slowly to be noticed.`,
            p3: `Bismuth's uses include being an ingredient of some medicines (like Pepto-bismol), it is used in many alloys, and increasingly it is replacing lead uses as weights, since it is roughly the same density as lead but not so toxic.`
        },
        {
            name: "Polonium",
            symbol: "Po",
            mass: "(209)",
            z: 84,
            halfLife: "125 years",
            state: "Solid",
            p1: `Discovered by the Curies in 1898, who analysed a highly radioactive sample of uraninite, considering that uranium (the usual element in uraninite) is not very radioactive, they investigated the sample to figure out why it produced so much radiation: they subsequently discovered polonium and radium in the mineral.`,
            p2: `Due to its short half-life polonium is very rare in nature, only occurring as a daughter isotope. The production of polonium is a very tedious and high-tech process, only about 100 grams of polonium are produced every year.`,
            p3: `Polonium's high level of radioactivity means that it heats up very quickly, this makes it ideal for thermoelectric generators, such as those used on spacecraft where solar panels would not be effective. Perhaps polonium's most (in)famous usage was the assassination of ex-FSB officer Alexander Litvinyenko, who ingested a small sample of polonium and consequently died of radiation sickness.`
        },
        {
            name: "Astatine",
            symbol: "At",
            mass: "(210)",
            z: 85,
            halfLife: "8 hours",
            state: "Solid",
            p1: `Like technetium, astatine was predicted before its discovery and many had 'discovered' it before being found to have false positives. It was confirmed discovered and created for the very first time in 1940, when Dale Raymond Corson, Kenneth Ross MacKenzie, and Emilio Segré bombarded bismuth with alpha particles to produce the element.`,
            p2: `Astatine is incredibly radioactive, with a half-life of only 8 hours it is one of the rarest elements in the entire periodic table. Additionally, the intense radioactivity produces so much energy that it is impossible to observe a visible amount of astatine at room temperature: it would just vaporise itself, as a result nobody knows what material astatine looks like.`,
            p3: `Considering that any sample of astatine will cease to exist within just a few days due to its radioactivity, the element has no major uses outside of simply studying it.`
        },
        {
            name: "Radon",
            symbol: "Rn",
            mass: "(222)",
            z: 86,
            halfLife: "92 hours",
            state: "Gas",
            p1: `Discovered in 1899 by Ernest Rutherford and Robert Bowie Owens, who were trying to measure the radiation of a thoria sample when they noticed it was emitting a radioactive gas. Shortly after them, others (including the Curies) noticed the same gas and they all gave it their own choice of names (exradio, radeon, thoron - to name a few), but in 1923 IUPAC chose the name radon.`,
            p2: `Radon is a radioactive noble gas (and the heaviest gas), its most stable isotope has a half-life of less than four days, so decay-chain parent isotopes are often used as a supply (radium in particular is reliable for radon production). Radon can be particularly dangerous when mining parent isotopes such as uranium, due to the risk of breathing radioactive gas.`,
            p3: `In 1985 it was discovered that radon gas can rise out from soil and through concrete cracks and accumulate in building basements, significantly increasing lung cancer risk. Since radon has no smell, equipment is required to detect radon accumulation.`
        }
    ],
    [
        {
            name: "Francium",
            symbol: "Fr",
            mass: "(223)",
            z: 87,
            halfLife: "22 minutes",
            state: "Solid",
            p1: `Discovered in 1939 by Marguerite Perey, who noticed radiation of a lower energy than expected from a sample of actinium-227 and deduced that it must be the emission of another radioactive element in the same sample. However, the actinium-227 sample was pure, and so therefore the cause of this lower energy radiation must be an element in the decay chain of Ac-227 and had a very short half-life that made finding a sample impossible. Under subsequent analyses and scrutiny, her theory was validated, and she named the elusive element 'francium', after France.`,
            p2: `With a half-life of only 22 minutes, francium is incredibly radioactive and a large sample can never exist, even for a moment: the heat generated by such intense radioactivity would instantly vapourise any sample large enough to be seen with the naked eye.`,
            p3: `Ultimately, with its impractically short half-life, francium cannot be used for any applied purpose, the only use of the element is to be studied.`
        },
        {
            name: "Radium",
            symbol: "Ra",
            mass: "(226)",
            z: 88,
            halfLife: "1600 years",
            state: "Solid",
            p1: `Discovered by the Curies in 1898, who analysed a highly radioactive sample of uraninite, considering that uranium (the usual element in uraninite) is not very radioactive, they investigated the sample to figure out why it produced so much radiation: they subsequently discovered polonium and radium in the mineral.`,
            p2: `Radium is a highly reactive element, it will readily form salts (for example, forming a nitride when exposed to air), although overtime the radiation causes radiolysis, breaking its own ionic bonds. Radium's short half-life means that all radium that is available today must be radiogenic, as the half-life is much shorter than the Earth's history any primordial atoms would have long since decayed.`,
            p3: `All of the element's usefulness revolves around its radioactivity, such as in radiotherapy: radium is similar enough to calcium that it can be absorbed by bones and is therefore used to treat bone cancers. Radium is also used to generate radon gas, which has a half-life of less than 4 days.`
        },
        {
            rowSub: 2
        },
        {
            name: "Rutherfordium",
            symbol: "Rf",
            mass: "(267)",
            z: 104,
            halfLife: "75 minutes",
            state: "Solid",
            p1: `Discovered in 1964 by the Soviet Joint Institute for Nuclear Research near Moscow, who synthesised the element by bombarding plutonium with neon-22. 5 years later the American Lawrence Berkeley National Laboratory sythesised the element for the first time by bombarding californium with carbon-12.`,
            p2: `The JINR named the element 'kurchatowium', whilst the American team gave it the name 'rutherfordium', and in 1992 the IUPAC chose to make the latter name standard - although it was initially hotly debated as part of a greater disagreement over credit between the the different scientists behind Cold War element synthesis (known as the Transfermium Wars).`,
            p3: `Like the rest of the superheavy synthesised elements, with a very short half-life, the element has no practical use outside of being studied, though the synthesis of such heavy elements remains an example of the power of modern science.`
        },
        {
            name: "Dubnium",
            symbol: "Db",
            mass: "(268)",
            z: 105,
            halfLife: "28 hours",
            state: "Solid",
            p1: `Discovered in 1968 by the Joint Institute for Nuclear Research, who bombarded americium with neon-22, producing the element 105. Like rutherfordium, it was soon after also synthesised by American science and a disagreement over credit between the two Cold War powers ensued.`,
            p2: `Dubnium was first called 'nielsbohrium' by the JINR, the Americans proposed the name 'hahnium' (for Otto Hahn), both names remained in conflict (as part of the Transfermium Wars) until being resolved by IUPAC in 1995: after suggesting 'joliotium' and reconsidering, the name 'dubnium' was finally settled (named for Dubna, the home of the JINR).`,
            p3: `Like the rest of the superheavy synthesised elements, with a very short half-life, the element has no practical use outside of being studied, though the synthesis of such heavy elements remains an example of the power of modern science.`
        },
        {
            name: "Seaborgium",
            symbol: "Sg",
            mass: "(269)",
            z: 106,
            halfLife: "14 minutes",
            state: "Solid",
            p1: `Discovered almost simultaenously in 1974, firstly by the American Lawrence Berkeley National Laboratory when they bombarded californium with oxygen-18, and also by the Soviet JINR who bombarded lead with chromium-54.`,
            p2: `As part of the 'Transfermium Wars', a dispute about discovery credit soon broke out. When the disputes of the Transfermium Wars were resolved by IUPAC in the 1990s, the name Seaborgium was given for element 106.`,
            p3: `Like the rest of the superheavy synthesised elements, with a very short half-life, the element has no practical use outside of being studied, though the synthesis of such heavy elements remains an example of the power of modern science.`
        },
        {
            name: "Bohrium",
            symbol: "Bh",
            mass: "(270)",
            z: 107,
            halfLife: "1 minute",
            state: "Solid",
            p1: `Discovered in 1981 by the German GSI Helmholtz Centre for Heavy Ion Research, who bombarded bismuth with chromium-54. A soviet research team also claimed to have created bohrium in 1976, however the evidence was not judged to be convincing enough.`,
            p2: `Like dubnium, the name 'nielsbohrium' was first proposed for the element, but this was eventually shortened to just 'bohrium'.`,
            p3: `Like the rest of the superheavy synthesised elements, with a very short half-life, the element has no practical use outside of being studied, though the synthesis of such heavy elements remains an example of the power of modern science.`
        },
        {
            name: "Hassium",
            symbol: "Hs",
            mass: "(269)",
            z: 108,
            halfLife: "16 seconds",
            state: "Solid",
            p1: `Discovered in 1984 by a team of the German GSI Helmholtz Centre for Heavy Ion Research, lead by Peter Armbruster and Gottfried Münzenberg. This team bombarded lead with iron to produce only a few atoms of hassium, which would nearly instantly decay.`,
            p2: `The name of the element comes from the Latin name of the home of the GSI Helmholtz Centre for Heavy Ion Research: Hesse (a bundesland of Germany) or 'Hassia' in Latin.`,
            p3: `Like the rest of the superheavy synthesised elements, with a very short half-life, the element has no practical use outside of being studied, though the synthesis of such heavy elements remains an example of the power of modern science.`
        },
        {
            name: "Meitnerium",
            symbol: "Mt",
            mass: "(278)",
            z: 109,
            halfLife: "4 seconds",
            state: "Solid",
            p1: `Discovered in 1982 by a team of the German GSI Helmholtz Centre for Heavy Ion Research, lead by Peter Armbruster and Gottfried Münzenberg. They bombarded bismuth with iron-58, and only a single atom of meitnerium was then observed.`,
            p2: `Meitnerium is named for Lise Meitner, a nuclear physicist famous for co-discovering protactinium. Although the name was only officially adopted long afterward: as part of the naming controversies of that era the element was previously given the placeholder name 'unnilennium', until the official recognition of the 'meitnerium' name in 1997.`,
            p3: `Like the rest of the superheavy synthesised elements, with a very short half-life, the element has no practical use outside of being studied, though the synthesis of such heavy elements remains an example of the power of modern science.`
        },
        {
            name: "Darmstadtium",
            symbol: "Ds",
            mass: "(281)",
            z: 110,
            halfLife: "14 seconds",
            state: "Solid",
            p1: `Discovered in 1994 by the prolific German GSI Helmholtz Centre for Heavy Ion Research, by Peter Armbruster, Gottfried Münzenberg, and Sigurd Hofmann. They bombarded lead with nickel-62, and a single atom of darmstadtium was then observed.`,
            p2: `The names proposed for the new element were first 'becquerelium' and 'hahnium', but ultimately the element's discoverers proposed the name 'darmstadtium' after the hometown of the GSI, Darmstadt.`,
            p3: `Like the rest of the superheavy synthesised elements, with a very short half-life, the element has no practical use outside of being studied, though the synthesis of such heavy elements remains an example of the power of modern science.`
        },
        {
            name: "Roentgenium",
            symbol: "Rg",
            mass: "(282)",
            z: 111,
            halfLife: "100 seconds",
            state: "Solid",
            p1: `Discovered in 1994 by the German GSI Helmholtz Centre for Heavy Ion Research, by Peter Armbruster, Gottfried Münzenberg, and Sigurd Hofmann. They bombarded bismuth with nickel-64, and three atoms of roentgenium were consequently detected.`,
            p2: `The GSI team who discovered the element roentgenium named it for Wilhelm Conrad Röntgen, who won the Nobel Prize in Physics for his discovery of the high energy 'Röntgen Ray' - now known as X-Ray - radiation in 1901.`,
            p3: `Like the rest of the superheavy synthesised elements, with a very short half-life, the element has no practical use outside of being studied, though the synthesis of such heavy elements remains an example of the power of modern science.`
        },
        {
            name: "Copernicium",
            symbol: "Cn",
            mass: "(285)",
            z: 112,
            halfLife: "28 seconds",
            state: "Solid",
            p1: `Discovered in 1996 by the German GSI Helmholtz Centre for Heavy Ion Research, by a team under the direction of Sigurd Hofmann. They bombarded lead with zinc-70 for two weeks, producing a few atoms of copernicium.`,
            p2: `After the discovery, the name 'copernicium' was eventually selected, in honor of Nicolaus Copernicus, who published 'De Revolutionibus' and introduced the concept of heliocentrism to Europe, arguing that the Earth revolved around the Sun, not the other way around.`,
            p3: `Like the rest of the superheavy synthesised elements, with a very short half-life, the element has no practical use outside of being studied, though the synthesis of such heavy elements remains an example of the power of modern science.`
        },
        {
            name: "Nihonium",
            symbol: "Nh",
            mass: "(286)",
            z: 113,
            halfLife: "9.5 seconds",
            state: "Solid",
            p1: `Although previously reported by a Russian-American collaboration, the credit for discovery goes to a Japanese team, who synthesised the element in 2004 by bombarding bismuth with zinc-70. The element's name comes from 'Nihon' (the Japanese name for Japan).`,
            p2: `Super heavy elements are created and exist for a fraction of a second before decay. The discovery of these elements is based on energy signatures of that decay, and some observations are more reliable than others, which is why the Japanese team are credited with the discovery: evidence from the Russian-American team was not enough to be sure they actually produced nihonium (although it took many subsequent experiments to validate the Japanese discovery, too).`,
            p3: `Like the rest of the superheavy synthesised elements, with a very short half-life, the element has no practical use outside of being studied, though the synthesis of such heavy elements remains an example of the power of modern science.`
        },
        {
            name: "Flerovium",
            symbol: "Fl",
            mass: "(289)",
            z: 114,
            halfLife: "1.9 seconds",
            state: "Solid",
            p1: `Discovered in 1998 at the Joint Institute for Nuclear Research in Dubna, Russia. The discovery came from a team led by Yuri Oganessian, who bombarded plutonium with calcium-48 to produce a single atom of flerovium.`,
            p2: `The element was named after the Flyorov Laboratory at the JINR, which is itself named after the Russian nuclear physicist Georgy Flyorov, who played a large role in the Soviet Union's own Manhattan Project.`,
            p3: `Like the rest of the superheavy synthesised elements, with a very short half-life, the element has no practical use outside of being studied, though the synthesis of such heavy elements remains an example of the power of modern science.`
        },
        {
            name: "Moscovium",
            symbol: "Mc",
            mass: "(290)",
            z: 115,
            halfLife: "650 milliseconds",
            state: "Solid",
            p1: `Discovered in 2003 by a joint Russian-American team at the JINR in Russia. The discovery came from a team led by Yuri Oganessian, who bombarded americium with calcium-48 to produce four atoms of moscovium.`,
            p2: `The first name suggested for the element was 'langevinium': named for Paul Langevin, famous for his Langevin dynamics modelling of molecular interactions. Later the name 'moscovium' was proposed, after the Moscow Oblast (roughly translating to 'Moscow province') to which which the town of Dubna belongs.`,
            p3: `Like the rest of the superheavy synthesised elements, with a very short half-life, the element has no practical use outside of being studied, though the synthesis of such heavy elements remains an example of the power of modern science.`
        },
        {
            name: "Livermorium",
            symbol: "Lv",
            mass: "(293)",
            z: 116,
            halfLife: "57 milliseconds",
            state: "Solid",
            p1: `Discovered in 2000 by a joint Russian-American team at the JINR in Russia. The discovery came from a team led by led by Yuri Oganessian, Vladimir Utyonkov, and Kenton Moody, who bombarded curium with calcium-48 to produce a single atom of livermorium.`,
            p2: `Livermorium is named after the Lawrence Livermore National Laboratory in the United States (the laboratory being the US side of the collaboration). The laboratory is itself named after Ernest Orlando Lawrence (the 'Livermore' part of the name comes from its location in Livermore, California). Lawrence was an American nuclear physicist famous for inventing the cyclotron particle accelerator. The element lawrencium is also more directly named after Ernest.`,
            p3: `Like the rest of the superheavy synthesised elements, with a very short half-life, the element has no practical use outside of being studied, though the synthesis of such heavy elements remains an example of the power of modern science.`
        },
        {
            name: "Tennessine",
            symbol: "Ts",
            mass: "(294)",
            z: 117,
            halfLife: "51 milliseconds",
            state: "Solid",
            p1: `Discovered in 2010 by a joint Russian-American team at the JINR in Russia. They bombarded berkelium with calcium-48 to produce a tiny amount of tennessine, which immediately decayed. The discovery has been cast in doubt by others, such as the GSI (discoverers of elements 107-112), yet after further analyses the discovery still stands.`,
            p2: `The element is named after the US state of Tennessee, the reason being that the Oak Ridge National Laboratory in Tennessee was involved in the project and had supplied the berkelium target (at the time Oak Ridge was the only place in the world where berkelium was produced).`,
            p3: `Like the rest of the superheavy synthesised elements, with a very short half-life, the element has no practical use outside of being studied, though the synthesis of such heavy elements remains an example of the power of modern science.`
        },
        {
            name: "Oganesson",
            symbol: "Og",
            mass: "(294)",
            z: 118,
            halfLife: "690 milliseconds",
            state: "Solid",
            p1: `Discovered in 2002 by a joint Russian-American team at the JINR in Russia. They bombarded californium with calcium-48 to produce three atoms of oganesson. At time of writing, it is the heaviest element known to humanity.`,
            p2: `As with many of the superheavy elements, the discovering team operated under the direction of Yuri Oganessian, and this element was ultimately named in his honour. He is one of only two scientists to have an element named after them whilst still alive (the other being seaborgium, after Glenn Seaborg).`,
            p3: `Like the rest of the superheavy synthesised elements, with a very short half-life, the element has no practical use outside of being studied, though the synthesis of such heavy elements remains an example of the power of modern science.`
        },
    ],
    [
        {
            spaces: 18
        }
    ],
    [
        {
            spaces: 1
        },
        {
            rowSub: 1
        },
        {
            name: "Lanthanum",
            symbol: "La",
            mass: "138.91",
            z: 57,
            state: "Solid",
            p1: `Discovered by Carl Gustaf Mosander in 1839, who investigated a sample of ceria and observed that although most was insoluble, some was soluble: this he correctly deduced to be the oxide of another element. From the same sample he also found 'didymium', but failed to realise didymium was infact two new elements: neodymium and praseodymium, thus he narrowly missed discovery of 2 other elements.`,
            p2: `As a lanthanoid, lanthanum can generally be considered to have a reactivity falling between barium and hafnium, and is also considered a group 3 element.`,
            p3: `All elements of the lanthanoid row actually belong between barium and hafnium, but in order to keep the table within standard book dimensions they are often shown below (although '32 column' versions of the table exist with these elements in the main block). The word 'lanthanide' is also used, but 'lanthanoid' is recommended instead since the -ide prefix should only be used to indicate a negative ion.`
        },
        {
            name: "Cerium",
            symbol: "Ce",
            mass: "140.12",
            z: 58,
            state: "Solid",
            p1: `Discovered in 1803 simultaneously by two independent experiments: Jöns Jakob Berzelius and Wilhelm Hisinger in Sweden; and Martin Heinrich Klaproth in Germany. Both found the element as (what is now called) cerium oxide, or ceria. It is named after the dwarf planet Ceres, which was newly discovered at the time and was believed to be a major planet.`,
            p2: `Cerium is the second element of the lanthanoids and has qualities expected of a lanthanoid, it is quite reactive with oxygen and will tarnish easily (shavings are also flammable), the element will also react readily with halogens.`,
            p3: `The most common use of the element is as ceria, which is used in 'chemical mechanical polishing', especially for optical lens and instruments where purely abrasive polishing could leave scratches. It is also used in pyrophoric ignition sources, as it is about 42% of the alloy ferrocerium, which can be struck to produce burning sparks, often used in handheld lighters and firestarting rods.`
        },
        {
            name: "Praseodymium",
            symbol: "Pr",
            mass: "140.91",
            z: 59,
            state: "Solid",
            p1: `In 1839 Carl Gustaf Mosander investigated a sample of ceria and observed that although most was insoluble, some was soluble: from this he found the element lanthanum and also 'didymium', but failed to realise didymium was infact two new elements: neodymium and praseodymium. It wasn't until 1885 that Carl Auer von Welsbach seperated didymium and formally discovered the two elements.`,
            p2: `Chemically, praseodymium is exactly what can be expected of a lanthanoid: it tarnishes quickly, it can burn in oxygen, and will readily react with the halogens. Like the rest of the lanthanoids in general, it can usually be substituted in the place of other lanthanoids in alloys and applications for similar performance.`,
            p3: `The element has many niche applications, among other things it can be alloyed with magnesium to produce robust metals, it can used in arc lamps (for lighting large rooms), and it can be used as a yellow ceramics/glass colouring additive.`
        },
        {
            name: "Neodymium",
            symbol: "Nd",
            mass: "144.24",
            z: 60,
            state: "Solid",
            p1: `In 1839 Carl Gustaf Mosander investigated a sample of ceria and observed that although most was insoluble, some was soluble: from this he found the element lanthanum and also 'didymium', but failed to realise didymium was infact two new elements: neodymium and praseodymium. It wasn't until 1885 that Carl Auer von Welsbach seperated didymium and formally discovered the two elements.`,
            p2: `As a lanthanoid, the chemistry of neodymium is similar to lanthanum: it is quite reactive and will oxidise quickly in area, and will burn at only 150C. Like most of the lanthanoids it is also paramagnetic, and this forms the most well known use of neodymium.`,
            p3: `Neodymium is most famous as forming the extremely strong magnetic alloy known as 'NdFeB' after the periodic table symbols of the consituent elements. Apart from high-power electromagnets, neodymium magnets are the strongest magnets available, and are used in many modern technologies, such as hard-drives.`
        },
        {
            name: "Promethium",
            symbol: "Pm",
            mass: "(145)",
            z: 61,
            state: "Solid",
            halfLife: "18 years",
            p1: `Discovered in 1945 by Jacob A. Marinsky, Lawrence E. Glendenin, and Charles D. Coryell at the Oak Ridge National Laboratory. They analysed fission products of uranium fuel from a graphite reactor, but due to the ongoing Second World War did not reveal their discovery until 1947. Charles D. Coryell's wife, Grace, suggested the name 'promethium', after the Ancient Greek god Promethius.`,
            p2: `Promethium is one of only two elements lighter than lead to be radioactive (the other being the much lighter technetium). The element is - as expected - very similar to the rest of the lanthanoid row, the only real difference being that it is (extremely) radioactive and doesn't exist in nature.`,
            p3: `Owing to the element's high radioactivity, it is only useful for research and too dangerous elsewhere, however in the past small amounts have been used in radioluminescent paint. Due to safety concerns, radioluminescent paints are not used today and have been replaced by phosphorescent paints.`
        },
        {
            name: "Samarium",
            symbol: "Sm",
            mass: "150.36",
            z: 62,
            state: "Solid",
            p1: `Discovered by numerous chemists in during the 1800s, although the strongest credit for the discovery typically goes Paul Émile Lecoq de Boisbaudran. In 1879, Boisbaudran found and analysed oxide from a mineral called samarskite, using absorption spectroscopy he confirmed this was an oxide of a new element. Boisbaudran was also able to isolate the element (though not with a high degree of purity).`,
            p2: `As typical for a lanthanoid, the element is quite reactive, tarnishes quickly, can be burned, and is also paramagnetic. Samarium's paramagnetism is more resistance to temperature, and such it can used in some applications where other elements would fail.`,
            p3: `Second to only neodymium in the strength of its permanent magnetisation, a major use of the element is in samarium-cobalt magnets. Samarium also catalyses several decomposition reactions, including dehydration, dehydrogenation, and dechlorination - which can be particularly useful in breaking down plastics.`
        },
        {
            name: "Europium",
            symbol: "Eu",
            mass: "151.96",
            z: 63,
            state: "Solid",
            p1: `Discovered in 1901 by Eugène-Anatole Demarçay, who suspected that some samples of recently discovered samarium included an unknown element. He carried out a sequence of crystallisations on a sample of samarium magnesium nitrate and managed to separate out the suspected element, which he subsequently called 'europium'.`,
            p2: `As a lanthanoid the characteristics of europium are as expected: quite reactive, will tarnish easily, and it is possible to ignite and burn the element, the element is also very soft (softer than all other lanthanoids) and can be cut with a knife. Europium is actually the most reactive of all the lanthanoids and rare-earth elements: if left in air, a sample will oxidise completely within days, and even in mineral oil the element will slightly oxidise.`,
            p3: `Materials containing europium can be used for both the red and blue flourenscent emitters in RGB colour CRT screens for televisions and computers, however with the downfall of CRT screens this usage has declined.`
        },
        {
            name: "Gadolinium",
            symbol: "Gd",
            mass: "157.25",
            z: 64,
            state: "Solid",
            p1: `Discovered in 1880 by Jean Charles Galissard de Marignac, who observed spectral emission lines of an unknown element in a sample of gadolinite, he subsequently seperated out the oxide of this new element, which he called 'gadolinia'. Although this was the formal discovery of a new element, the first isolation of gadolinium from gadolinia was done later in 1886 by Paul Émile Lecoq de Boisbaudran.`,
            p2: `Gadolinium is a malleable lanthanoid that bucks the reactivity of the row by being less reactive: in dry air it will generally not tarnish, although humidity will still cause the element to tarnish rapidly.`,
            p3: `Gadolinium is one of eight elements discovered from samples of a single quarry in Ytterby, Sweden - the other seven being ytterbium, erbium, terbium, scandium, holmium, thulium, and yttrium. Gadolinium has some small uses in green flourenscent emitters in TV screens, as well as being an element of the GdBCO superconductor alloy.`
        },
        {
            name: "Terbium",
            symbol: "Tb",
            mass: "158.93",
            z: 65,
            state: "Solid",
            p1: `Discovered in 1843 by Carl Gustaf Mosander, who seperated out impurities of a yttria sample, one of which was terbia (terbium oxide). Although Mosander was unable to isolate the elemental terbium from the oxide, he realised the compound contained a new element and is credited with the discovery. Elemental terbium would only be isolated 162 years later, in 1905.`,
            p2: `Terbium is a soft lanthanoid - soft enough to be cut with a knife - with typical lanthanoid chemistry, although it is somewhat less reactive than the lighter elements of the row. The element is still reactive enough to take part in all the reactions characteristic of the lanthanoids, including reactions with water, halides, and tarnishing (albeit slowly for this element).`,
            p3: `Terbium is one of eight elements discovered from samples of a single quarry in Ytterby, Sweden - the other seven being ytterbium, erbium, gadolinium, scandium, holmium, thulium, and yttrium. The largest use is in flourenscent emitters for TV screens, as the green 'pixel'.`
        },
        {
            name: "Dysprosium",
            symbol: "Dy",
            mass: "162.50",
            z: 66,
            state: "Solid",
            p1: `Discovered in 1886 by Paul Émile Lecoq de Boisbaudran, who separated dysprosium oxide from a sample of holmium oxide. Isolating dysprosium from the oxide however, was a difficult process which took him more than 30 tries - when he finally did succeed he gave the element the name 'dysprosium' from 'dysprositos', Greek for 'hard to obtain'.`,
            p2: `Dysprosium is chemically a typical lanthanoid, it will react readily with oxygen and other electronegative elements. Physically it has slightly soft, has a fair melting point, and is resistant to demagnetisation.`,
            p3: `Most roles that dysprosium could fill are already occupied by better-performing alternatives, that doesn't stop the element from being used in some niche applications though, such as being combined with neodymium-magnet alloys, where it can make the magnet more resistant to demagnetisation. Dysprosium also has use in nuclear reactor control rod cermets due to its neutron absorption performance.`
        },
        {
            name: "Holmium",
            symbol: "Ho",
            mass: "164.93",
            z: 67,
            state: "Solid",
            p1: `Discovered in 1878 by Jacques-Louis Soret and Marc Delafontaine; as well as separately by Per Teodor Cleve. Soret and Delafontaine carried out spectrophotometry on a sample of gadolinite and noticed the absorption lines of the element, meanwhile Cleve seperated two unknown oxides from erbia: discovering holmium and thulium together.`,
            p2: `Holmium is a soft lanthanoid that is - relative to most of the lanthanoids - resistant to oxidation, but it will still tarnish from moisture or heating. Holmium has the highest magnetic permeability of all the elements, which makes it a good choice for magnet polepieces.`,
            p3: `The element's name comes the Latin name for the city of Stockholm - 'Holmia', the capital of Sweden (Per Teodor Cleve's home country). Due to the element's magnetic properties it is often used in alloys for strong magnets, such as the polepieces. In the future holmium may as be useful for quantum computing, as ongoing innovations show that qubits may be stored with holmium atoms.`
        },
        {
            name: "Erbium",
            symbol: "Er",
            mass: "167.26",
            z: 68,
            state: "Solid",
            p1: `Discovered in 1843 by Carl Gustaf Mosander, who seperated out impurities of a yttria sample, one of which was erbia (erbium oxide). Although Mosander was unable to isolate the elemental erbium from the oxide, he realised the compound contained a new element and is credited with the discovery. Elemental erbium would not be produced until 1934, when Wilhelm Klemm and Heinrich Bommer reacted erbium chloride with potassium.`,
            p2: `Chemically erbium behaves as expected for a lanthanoid, it will tarnish easily, can be burned, and will react readily with all halogens. It does not tarnish as quickly as most of the lanthanoids, but in the presence of moisture and heat it will still oxidise all the same.`,
            p3: `Erbia can be used as an additive for glass, typically for safety glasses in high temperature applications where it helps to absorb infrared radiation. The element also sees use in 'EDFA' fibre optic cables where it can be used to amplify signals.`
        },
        {
            name: "Thulium",
            symbol: "Tm",
            mass: "168.93",
            z: 69,
            state: "Solid",
            p1: `Discovered in 1879 by Per Teodor Cleve who used the same technique used in the discovery of most lanthanoids: he seperated oxides from erbia, and found the oxides of two new elements: one was holmium (which Cleve discovered simultaneously to two other researchers), and the other was thulium. The element is named after Thule, the Ancient Greek/Roman name for the most northern land on Earth: it isn't clear whether they used the name to refer to a place on the northern tip of Scotland, Norway, or Iceland.`,
            p2: `Thulium is a very soft and fairly reactive lanthanoid, it is able to be cut with a knife, will tarnish slowly in air, and it can be burned. All in all, it is quite a typical lanthanoid element.`,
            p3: `The element has two main uses in medical fields: one of the isotopes is ideal as an X-ray source, and a material which includes thulium can be used to produce superficially harmful lasers that are ideal for laser-based surgeries.`
        },
        {
            name: "Ytterbium",
            symbol: "Yb",
            mass: "173.05",
            z: 70,
            state: "Solid",
            p1: `Discovered by Jean Charles Galissard de Marignac in 1878, who like many other chemists of the time, analysed rare earth metal oxide samples to seperate out impurities: through this he separated out an new oxide from erbia which he named 'ytterbia' and hence the new element was called ytterbium.`,
            p2: `The chemistry of ytterbium is as expected for a lanthanoid element, it follows all the regular patterns of the row: electropositive and will oxidise readily in air, water, and with halogens. Ytterbium is notable for having the smallest liquid range of all metals (the range between the boiling point and melting point) at only 327C.`,
            p3: `Like its neighbour thulium, ytterbium has use as a dopant for lasers, as well as having an isotope useful for generating high energy EM radiation (in this case, it is a good source of gamma rays and is useful is radiomedicine).`
        },
        {
            name: "Lutetium",
            symbol: "Lu",
            mass: "174.97",
            z: 71,
            state: "Solid",
            p1: `Discovered in 1907 by three individual people sumultaneously: Georges Urbain, Carl Auer von Welsbach, and Charles James. They all discovered the element by the seperating out lutetium oxide from ytterbia, ultimately Urbain published his experiment methodology and was given naming rights, he called the new element 'lutetium' after the Latin name for Paris, 'Lutetia'.`,
            p2: `Lutetium is the heaviest, hardest, and has the highest melting point of all the lanthanoids, the chemistry of the element is typical for the row and the element is easily oxidised and will burn in air, although it is on the less reactive end of the lanthanoids and will tarnish quite slowly.`,
            p3: `Being a very rare lanthanoid, the element is outclassed by cheaper, easier to obtain alternatives and has few uses. Some isotopes of lutetium have niche uses, such as in radiomedicine..`
        }
    ],
    [
        {
            spaces: 1
        },
        {
            rowSub: 2
        },
        {
            name: "Actinium",
            symbol: "Ac",
            mass: "(227)",
            z: 89,
            halfLife: "22 years",
            state: "Solid",
            p1: `Discovered in 1899 by André Debierne, who managed to extract the element from a uranium ore sample. Since actinium has a half-life too short to be found on its own, finding it as part of the uranium decay chain is the only way to find it naturally - which is to say, the element is only available as radiogenic or synthetic.`,
            p2: `As an actinoid, actinium can generally be considered to have a reactivity falling between radium and rutherfordium, and is also considered a group 3 element.`,
            p3: `Just as to lanthanum and the lanthanoids, all elements of the actinoid row actually belong between radium and rutherfordium, but in order to keep the table within standard book dimensions they are often shown below (although '32 column' versions of the table exist with these elements in the main block). The word 'actinide' is also used, but 'actinoid' is recommended instead since the -ide prefix should only be used to indicate a negative ion.`
        },
        {
            name: "Thorium",
            symbol: "Th",
            mass: "(232)",
            z: 90,
            halfLife: "14 billion years",
            state: "Solid",
            p1: `Discovered in 1828 by Jöns Jacob Berzelius with help from Morten and Jens Esmark: Morten was a priest who often sent interesting minerals to his father, Jens, who was a learned mineralogist. One day Morten sent a black mineral sample to his father, who did not recognise it as a known mineral and sent it to Berzelius, who then analysed it and discovered a new element within, which he called 'thorium'.`,
            p2: `As an actinoid, thorium is quite electropositive and will oxidise with air, water, and halogens; its shavings are also combustable in air. It is suprisingly resistance to most acids and the reaction with water is quite slow.`,
            p3: `Like uranium, thorium is radioactive enough to have relevant uses (unlike bismuth), but not so radioactive as to be too dangerous to interact with: the longest lived isotope has a half-life of 14 billion years - about the same as the age of the universe. Thorium may soon provide a vital part of the world's energy needs, as research into 'LFTR' thorium-cell reactors is ongoing.`
        },
        {
            name: "Protactinium",
            symbol: "Pa",
            mass: "(231)",
            z: 91,
            halfLife: "32,000 years",
            state: "Solid",
            p1: `Discovered in 1913 by Kasimir Fajans and Oswald Helmuth Göhring, who found the element whilst they were analysing the daughter isotopes of the uranium-238 decay chain. The isotope they discovered had a short half-life of only a few hours, so they called their discovery 'brevium' for its brevity; then in 1918, Otto Hahn and Lise Meitner discovered the longer lived isotope with a half-life of 32,000 years, and the element's name was changed to protactinium.`,
            p2: `Chemically and physically the element behaves as hybrid of thorium and uranium (as expected from its place between in the actinoids row), however protactinium has a much short half-life than both elements and is therefore both intensively radioactive and scarce in comparison, in fact it only really occurs in nature radiogenically.`,
            p3: `Owing to the element's scarcity, the element has no major uses outside of scientific research: uranium and thorium are much cheaper, easier to obtain, safer alternatives for every application.`
        },
        {
            name: "Uranium",
            symbol: "U",
            mass: "(238)",
            z: 92,
            halfLife: "4.5 billion years",
            state: "Solid",
            p1: `Discovered in 1789 by Martin Heinrich Klaproth, who performed reactions on an unknown precipitate to produce what he called 'uranium' after the recently discovered planet Uranus. Although he actually produced uranium oxide, Eugène-Melchior Péligot would produce true uranium for the first time in 1841. At that time radioactivity was unknown and therefore the element was not particularly interesting.`,
            p2: `Following the discovery of radioactivity by Henri Becquerel and the advent of nuclear physics in the 20th century, the use of uranium for nuclear fission reactions would define the element.`,
            p3: `In controlled fission reactions, the rate of fission is strictly controlled and kept low in order to radiate energy over a long period of time, we take advantage of this and use it as a source of energy in nuclear powerplants. In uncontrolled fission reactions, all of the uranium fuel can fission at once, with all of the energy released in an instant: a gigantic explosion. These are the two main applications of uranium.`
        },
        {
            name: "Neptunium",
            symbol: "Np",
            mass: "(237)",
            z: 93,
            halfLife: "2.1 million years",
            state: "Solid",
            p1: `Discovered in 1939 by Edwin McMillan and Philip H. Abelson, when McMillan bombarded a uranium sample with helium nuclei and noticed an unknown radioactive decay signature in the aftermath. At first this was seen as simply the result of a uranium fission event, but as time went on this explanation became less and less plausible, and Abelson conducted chemical tests on the sample, and realised then that a new element was present, with very similar properties to uranium. Since this element slots in next to uranium in the table, the name 'neptunium' was chosen (since Neptune is next farthest planet from the Sun after Uranus).`,
            p2: `In terms of radioactivity, the element is much more radioactive than uranium, but still not so radioactive as to be an disaster risk or be usable in RTGs. The half-life is also much shorter than the age of the Earth, and thus all neptunium available on Earth must be synthetic and radiogenic.`,
            p3: `Neptunium has no major commercial uses, although it is fissionable and could theoretically be used in nuclear reactors (and weapons).`
        },
        {
            name: "Plutonium",
            symbol: "Pu",
            mass: "(244)",
            z: 94,
            halfLife: "80 million years",
            state: "Solid",
            p1: `Discovered in 1940 by Glenn T. Seaborg, Edwin McMillan, Joseph W. Kennedy, and Arthur Wahl, who bombarded a uranium sample with helium nuclei to produce an isotope of neptunium, which decayed into plutonium. Just as McMillan had named element 93 'neptunium' after Neptune (following uranium/Uranus), he continued in this vein and named element 94 'plutonium', after - then considered a planet - Pluto.`,
            p2: `Within a couple of months, the chemical properties were quickly analysed and determined to be typical of an actinoid; the radioactivity of the element was then considered and it was determined that, like uranium, it could fission.`,
            p3: `Plutonium was the fissile fuel of the first ever nuclear bomb (the Trinity test), and plutonium is still used in nuclear warheads today. Isotopes of plutonium are also useful for radioisotope thermoelectric generators (RTGs), such as those used on space probes and on the Mars rover Curiosity.`
        },
        {
            name: "Americium",
            symbol: "Am",
            mass: "(243)",
            z: 95,
            halfLife: "7400 years",
            state: "Solid",
            p1: `Discovered and isolated in 1944 by Glenn T. Seaborg, Leon O. Morgan, Ralph A. James, and Albert Ghiorso, who bombarded a sample of plutonium with helium nuclei and identified the new element through chemical analyses. The isolation of the element proved to be so difficult that the Berkley team gave it the name 'delirium', and later the more serious name 'americium' was selected: this name was inspired by the lanthanoid above it in the table, europium (hence, a europium-americium group).`,
            p2: `Chemically, americium exhibits typical actinoid chemistry. It is a fissionable material like its neighbours, however it is prohibitively expensive and has never been used in nuclear reactors.`,
            p3: `While not used in reactors, it is very widely used in household smoke detectors: the alpha particles of americium's radioactive decay are emitted above the vent of the smoke detector and are detected at the other edge of the device - smoke can fill the device through the vent and inhibit the journey of the alpha particles, triggering the alarm.`
        },
        {
            name: "Curium",
            symbol: "Cm",
            mass: "(247)",
            z: 96,
            halfLife: "16 million years",
            state: "Solid",
            p1: `Discovered in 1944 by Glenn T. Seaborg, Ralph A. James, and Albert Ghiorso, who bombarded the - then recently discovered - element plutonium with helium nuclei, then seperated results from the plutonium through chemical analyses. Like americium (which would be discovered later) this turned out to be a dismal process, and the element was temporarily perjoratively named 'pandemonium' before eventually being named 'curium' after the Curies, who pioneered much of the early science of radioactivity and discovered polonium and radium.`,
            p2: `Like americium, there are isotopes of curium that are theoretically sound as fissile material for use in nuclear reactors, but it has never been used as such.`,
            p3: `Many of curium's isotopes are extremely radioactive, so radioactive that the ionisation of air particles around a curium sample allows it to faintly glow in the dark. High radioactivity produces lots of heat, making it ideal for power generation in RTGs, which is the most common use of curium.`
        },
        {
            name: "Berkelium",
            symbol: "Bk",
            mass: "(247)",
            z: 97,
            halfLife: "1400 years",
            state: "Solid",
            p1: `Discovered in 1949 by Glenn T. Seaborg, Albert Ghiorso, Stanley G. Thompson, and Kenneth Street Jr. They bombarded a sample of americium with helium nuclei, and as with the element's closest neighbours on the actinoid row, the hardest part was seperating the product from the starting material. After an extensive process the element was finally isolated and named 'berkelium' after the place of discovery (Berkeley), mirroring the lanthanoid above being named 'terbium' after its own place of discovery.`,
            p2: `Unlike its neighbour elements in the row, berkelium is not expected to perform well as a fissile fuel, it is also not particularly dangerous by its radioactivity, despite the very short half-life: this is because it decays be emitting low-energy electrons, instead of with something more ionising, like alpha particles.`,
            p3: `The only real application of berkelium was being used to help synthesise and discover heavier elements by being a bombardment target in experiments.`
        },
        {
            name: "Californium",
            symbol: "Cf",
            mass: "(251)",
            z: 98,
            halfLife: "900 years",
            state: "Solid",
            p1: `Discovered in 1950 by Glenn T. Seaborg, Stanley G. Thompson, Albert Ghiorso, and Kenneth Street Jr, who bombarded a curium target with helium nuclei to produce a few thousand atoms of californium. The element was of course named for the place of discovery: Berkeley, California.`,
            p2: `Californium is a soft actinoid, able to be cut with a knife, and it will oxidise and tarnish readily. In terms of its radioactivity, californium is extremely radioactive with a short half-life, and decays producing alpha particles and free neutrons, making the element potentially very harmful.`,
            p3: `Since californium produces free neutrons during its decay, it can be used as a 'neutron startup source' to begin chain reactions, since typical fissile fuels must absorb neutrons to begin their fission, but do not often spontaneously produce their own free neutrons. This forms the main application of californium-252, which is typically used to start nuclear power station reactors, in a manner similar to a spark being required to ignite flammable fuels.`
        },
        {
            name: "Einsteinium",
            symbol: "Es",
            mass: "(252)",
            z: 99,
            halfLife: "470 days",
            state: "Solid",
            p1: `Discovered in 1952 in the aftermath of the Ivy Mike test, the detonation of the world's first fusion bomb. When Albert Ghiorso and colleagues examined the fallout of the test, they observed that two new elements had been forged in the thermonuclear blast: einsteinium and fermium - both named after two of humanity's most influential scientists, Albert Einstein and Enrico Fermi.`,
            p2: `Einsteinium is extremely radioactive, such that forming a solid structure of the element is only possible in the short term, as it is always destroyed by its own intense high energy radiation.`,
            p3: `Aside from research efforts like producing yet heavier elements, there are no real applications for einsteinium, and even if there was, the use of einsteinium would still be incredibly impractical due to the rarity of the entirely synthetic, 470 day half-life element, as well as the dangerously high radioactivity.`
        },
        {
            name: "Fermium",
            symbol: "Fm",
            mass: "(257)",
            z: 100,
            halfLife: "100 days",
            state: "Solid",
            p1: `Discovered in 1952 in the aftermath of the Ivy Mike test, the detonation of the world's first fusion bomb. When Albert Ghiorso and colleagues examined the fallout of the test, they observed that two new elements had been forged in the thermonuclear blast: einsteinium and fermium - both named after two of humanity's most influential scientists, Albert Einstein and Enrico Fermi.`,
            p2: `Fermium is intensively radioactive, undergoing alpha decay and spontaneous fission with a half life of 100 days, it is not practical to use for any purpose.`,
            p3: `Owing to the element's extreme radioactivity, it has no applications outside of basic research, nor would any possible applications ever be practical with the element's short half-life meaning it would have be replaced too often to be economically viable.`
        },
        {
            name: "Mendelevium",
            symbol: "Md",
            mass: "(258)",
            z: 101,
            halfLife: "52 days",
            state: "Solid",
            p1: `Discovered in 1955 by Glenn T. Seaborg, Gregory R. Choppin, Bernard G. Harvey, and Stanley G. Thompson, who bombarded a target of einsteinium (then a new element) with helium nuclei, producing only seventeen atoms of mendelevium.`,
            p2: `As can be expected of the element, based on its place in the periodic table, it is extremely radioactive, and some isotopes decay primarily through spontaneous fission (releasing plenty of energy in the process).`,
            p3: `Those who took part in the discovery decided to name the element after the man who invented the concept of the periodic table: Dmitri Mendeleev, although - given the ongoing Cold War at the time - this decision was not without nationalistic criticism, and Seaborg had to request permission from his American government before submitting the naming proposal.`
        },
        {
            name: "Nobelium",
            symbol: "No",
            mass: "(259)",
            z: 102,
            halfLife: "58 minutes",
            state: "Solid",
            p1: `Discovered in 1966 by the Soviet Union's Joint Institute for Nuclear Research, who bombarded a uranium target using neon ions, and the resulting product shortly afterward decayed with signature indicating element 102. An American team later confirmed this discovery by replicating the methodology.`,
            p2: `Whilst the element was first discovered in 1966 by the Soviet Union, an earlier false discovery was reported by the Nobel Institute in Sweden, in 1957, and suggested the name 'nobelium'. This was quite contraversial, but the name was ultimately kept when element 102 was discovered for real a decade later.`,
            p3: `Like the rest of the superheavy synthesised elements, with a very short half-life, the element has no practical use outside of being studied, though the synthesis of such heavy elements remains an example of the power of modern science.`
        },
        {
            name: "Lawrencium",
            symbol: "Lr",
            mass: "(266)",
            z: 103,
            halfLife: "10 hours",
            state: "Solid",
            p1: `Independently codiscovered from 1961-71 by the American Lawrence Berkeley National Laboratory and the Soviet Joint Institute for Nuclear Research. In both discoveries, an isotope of lawrencium was created that shortly afterward decayed, providing signature necessary to prove the creation of element 103.`,
            p2: `It was ultimately named 'lawrencium' in honour of Ernest Orlando Lawrence, for whom the LBNL itself was also named. The LBNL was later renamed to the Lawrence Livermore National Laboratory, and gave its own name to the element livermorium.`,
            p3: `Like the rest of the superheavy synthesised elements, with a very short half-life, the element has no practical use outside of being studied, though the synthesis of such heavy elements remains an example of the power of modern science.`
        },
    ]
];