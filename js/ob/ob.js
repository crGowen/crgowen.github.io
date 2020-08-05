var ObController = (function () {
    function ObController() {
    }
    ObController.handleMouseDownEvents = function (event) {
        if (ObController.inputIsLocked)
            return;
        ObController.inputIsLocked = true;
        ObController.mouseInput.mouseDownBeginsAt.x = event.pageX - short.byId("obCanv").offsetLeft;
        ObController.mouseInput.mouseDownBeginsAt.y = event.pageY - short.byId("obCanv").offsetTop;
        ObController.mouseInput.mouseMove.x = ObController.mouseInput.mouseDownBeginsAt.x;
        ObController.mouseInput.mouseMove.y = ObController.mouseInput.mouseDownBeginsAt.y;
        ObController.mouseInput.mouseMoveCumulative = 0;
        ObController.mouseInput.mouseIsDown = true;
        ObController.clearLocationTooltip();
        ObController.inputIsLocked = false;
    };
    ObController.handleMouseMoveEvents = function (event) {
        if (ObController.inputIsLocked)
            return;
        ObController.inputIsLocked = true;
        if (ObController.mouseInput.mouseIsDown) {
            var dx = event.pageX - short.byId("obCanv").offsetLeft - ObController.mouseInput.mouseMove.x;
            var dy = event.pageY - short.byId("obCanv").offsetTop - ObController.mouseInput.mouseMove.y;
            ObController.mouseInput.mouseMove.x = event.pageX - short.byId("obCanv").offsetLeft;
            ObController.mouseInput.mouseMove.y = event.pageY - short.byId("obCanv").offsetTop;
            switch (ObController.viewType) {
                case 'g':
                    ObController.galaxyMap.moveView(-dx, -dy);
                    break;
                case 's':
                    ObController.starMap.moveView(-dx, -dy);
                    break;
            }
            ObController.mouseInput.mouseMoveCumulative += Math.pow(Math.pow(dx, 2) + Math.pow(dy, 2), 0.5);
        }
        else {
            ObController.handleTooltip(event.pageX - short.byId("obAppCon").offsetLeft, event.pageY - short.byId("obAppCon").offsetTop);
        }
        ObController.inputIsLocked = false;
    };
    ObController.handleMouseUpEvents = function (event) {
        if (ObController.inputIsLocked)
            return;
        ObController.inputIsLocked = true;
        ObController.mouseInput.mouseIsDown = false;
        var newPosX = event.pageX - short.byId("obAppCon").offsetLeft;
        var newPosY = event.pageY - short.byId("obAppCon").offsetTop;
        if (ObController.mouseInput.mouseMoveCumulative <= 3)
            switch (ObController.viewType) {
                case 'g':
                    ObController.openStarMap(newPosX, newPosY);
                    break;
                case 's':
                    ObController.openDestination(newPosX, newPosY);
                    break;
            }
        ObController.inputIsLocked = false;
    };
    ObController.handleMouseWheelEvents = function (event) {
        if (ObController.inputIsLocked)
            return;
        ObController.inputIsLocked = true;
        switch (ObController.viewType) {
            case 'g':
                ObController.galaxyMap.zoomView(event.deltaY);
                ObController.clearLocationTooltip();
                break;
            case 's':
                ObController.starMap.zoomView(event.deltaY);
                break;
        }
        ObController.inputIsLocked = false;
    };
    ObController.handleMouseOutEvents = function (event) {
        ObController.mouseInput.mouseIsDown = false;
        ObController.clearLocationTooltip();
    };
    ObController.handleKeyUpEvents = function (event) {
        var key = String.fromCharCode(event.keyCode).toLowerCase();
        switch (key) {
            case 'n':
            case 'p':
            case 'c':
                ObController.viewStyle = key;
        }
    };
    ObController.initEventHandlers = function () {
        short.byId("obCanv").addEventListener('mousedown', ObController.handleMouseDownEvents);
        short.byId("obCanv").addEventListener('mousemove', ObController.handleMouseMoveEvents);
        short.byId("obCanv").addEventListener('mouseup', ObController.handleMouseUpEvents);
        short.byId("obCanv").addEventListener('wheel', ObController.handleMouseWheelEvents);
        short.byId("obCanv").addEventListener('mouseout', ObController.handleMouseOutEvents);
        document.addEventListener('keyup', ObController.handleKeyUpEvents);
    };
    ObController.buildUiAfterLoad = function () {
        var insert = short.create('div', 'obTopBar', ["obApp__topBar"]);
        insert.innerText = "Top bar used for simple UI (prototype!)";
        short.byId('obAppCon').appendChild(insert);
        insert = short.create('div', 'obBottomBar', ["obApp__bottomBar"]);
        short.byId('obAppCon').appendChild(insert);
    };
    ObController.refreshUi = function () {
        ObController.uiAll();
        switch (ObController.viewType) {
            case 'g':
                ObController.uiGalaxy();
                break;
            case 's':
                ObController.uiStar();
                break;
            case 'd':
                ObController.uiDest();
                break;
        }
    };
    ObController.uiAll = function () {
        short.del(short.byId("obDestInfoPane"));
        short.clearChildren(short.byId("obBottomBar"));
        ObController.uiCloseCharInfoPane();
        ObController.uiCloseNatInfoPane();
    };
    ObController.uiGalaxy = function () {
    };
    ObController.uiStar = function () {
        var btn = short.create("div", "", ["obApp__btn", "obApp__btn--uiBottom"]);
        btn.innerText = "Galaxy Map";
        btn.onclick = ObController.openGalaxyMap;
        short.byId("obBottomBar").appendChild(btn);
        if (ObController.player.currentSystem != ObController.selectedStar.getStarName()) {
            btn = short.create("div", "", ["obApp__btn", "obApp__btn--uiBottom"]);
            btn.innerText = "Travel to Star";
            btn.onclick = ObController.beginJourneyToStar;
            short.byId("obBottomBar").appendChild(btn);
        }
    };
    ObController.uiDest = function () {
        var btn = short.create("div", "", ["obApp__btn", "obApp__btn--uiBottom"]);
        btn.innerText = "Galaxy Map";
        btn.onclick = ObController.openGalaxyMap;
        short.byId("obBottomBar").appendChild(btn);
        btn = short.create("div", "", ["obApp__btn", "obApp__btn--uiBottom"]);
        btn.innerText = "Star Map";
        btn.onclick = ObController.returnToStarMap;
        short.byId("obBottomBar").appendChild(btn);
        if (ObController.player.currentDestination != ObController.selectedDestination.getDestinationName()
            && ObController.player.currentSystem === ObController.selectedStar.getStarName()) {
            btn = short.create("div", "", ["obApp__btn", "obApp__btn--uiBottom"]);
            btn.innerText = "Visit Destination";
            btn.onclick = ObController.beginJourneyToDestination;
            short.byId("obBottomBar").appendChild(btn);
        }
        var insert = short.create('div', 'obDestInfoPane', ["obApp__uiPane", "obApp__uiPane--centerLarge"]);
        var destControlledBy = ObController.selectedDestination.getStar().getNation().isIndependentNat() ? "no faction" : ObController.selectedDestination.getStar().getNation().getName();
        var hIns = "<h1 class= 'obApp__paneInfoHeader'>" + ObController.selectedDestination.getDestinationName() + "</h1>\n        <h1 class= 'obApp__paneInfoSubHeader'>" + ObController.selectedDestination.getEconomyType() + " in the " + ObController.selectedDestination.getStar().getStarName() + " system,\n        controlled by " + destControlledBy + ". This destination is currently " + ObController.selectedDestination.getStatus() + ".</h1>";
        insert.innerHTML = hIns;
        var bar = short.create("div", "", ["obApp__paneBtnBar"]);
        if (!ObController.selectedDestination.getStar().getNation().isIndependentNat()) {
            btn = short.create("div", "", ["obApp__btn", "obApp__btn--uiPane"]);
            btn.innerText = "View Faction";
            btn.onclick = ObController.uiShowViewNation;
            bar.appendChild(btn);
        }
        insert.appendChild(bar);
        short.byId('obAppCon').appendChild(insert);
    };
    ObController.uiShowViewNation = function () {
        var insert = short.create('div', 'obNatInfoPane', ["obApp__uiPane", "obApp__uiPane--centerSmall"]);
        var nation = ObController.selectedStar.getNation();
        var hIns = "<h1 class= 'obApp__paneInfoHeader'>" + nation.getName() + "</h1>\n        <h1 class= 'obApp__paneInfoDoubleColumn obApp__paneInfoDoubleColumn--left obApp__textUnderline'>Details</h1><h1 class= 'obApp__paneInfoDoubleColumn obApp__paneInfoDoubleColumn--right obApp__textUnderline'>Leadership</h1>\n        <h1 class= 'obApp__paneInfoDoubleColumn obApp__paneInfoDoubleColumn--left'>Capital: " + nation.getCapital().getStarName() + "</h1><h1 class= 'obApp__paneInfoDoubleColumn obApp__paneInfoDoubleColumn--right' onclick=\"ObController.uiShowViewCharacter('o')\">" + nation.getLeaderCharacter("o").getNameAndTitle() + "</h1>\n        <h1 class= 'obApp__paneInfoDoubleColumn obApp__paneInfoDoubleColumn--left'>Culture: " + nation.getCulture().getName() + "</h1><h1 class= 'obApp__paneInfoDoubleColumn obApp__paneInfoDoubleColumn--right' onclick=\"ObController.uiShowViewCharacter('m')\">" + nation.getLeaderCharacter("m").getNameAndTitle() + "</h1>\n        <h1 class= 'obApp__paneInfoDoubleColumn obApp__paneInfoDoubleColumn--left'>Controlled stars: " + nation.controlledStars.length + "</h1><h1 class= 'obApp__paneInfoDoubleColumn obApp__paneInfoDoubleColumn--right' onclick=\"ObController.uiShowViewCharacter('c')\">" + nation.getLeaderCharacter("c").getNameAndTitle() + "</h1>\n        <h1 class= 'obApp__paneInfoSubHeader'>---------------------------------------------------------------</h1>\n        <h1 class= 'obApp__paneInfoSubHeader'>Your relationship with this faction:</h1>\n        <h1 class= 'obApp__paneInfoSubHeader'>Reputation: Neutral</h1>\n        <h1 class= 'obApp__paneInfoSubHeader'>Trade status: None</h1>\n        <h1 class= 'obApp__paneInfoSubHeader'>Employment status: None</h1>";
        insert.innerHTML = hIns;
        var bar = short.create("div", "", ["obApp__paneBtnBar"]);
        var btn = short.create("div", "", ["obApp__btn", "obApp__btn--uiPane"]);
        btn.innerText = "Close";
        btn.onclick = ObController.uiCloseNatInfoPane;
        bar.appendChild(btn);
        insert.appendChild(bar);
        short.byId('obAppCon').appendChild(insert);
    };
    ObController.uiShowViewCharacter = function (cType) {
        var insert = short.create('div', 'obCharInfoPane', ["obApp__uiPane", "obApp__uiPane--centerSmall"]);
        var char = ObController.selectedStar.getNation().getLeaderCharacter(cType);
        var hIns = "<h1 class= 'obApp__paneInfoHeader'>" + char.getName() + "</h1>\n        <h1 class= 'obApp__paneInfoDoubleColumn obApp__paneInfoDoubleColumn--left obApp__textUnderline'>Details</h1><h1 class= 'obApp__paneInfoDoubleColumn obApp__paneInfoDoubleColumn--right obApp__textUnderline'>Leadership</h1>\n        <h1 class= 'obApp__paneInfoDoubleColumn obApp__paneInfoDoubleColumn--left'>Capital: " + char.getTitle() + "</h1><h1 class= 'obApp__paneInfoDoubleColumn obApp__paneInfoDoubleColumn--right'>" + char.getTitle() + "</h1>\n        <h1 class= 'obApp__paneInfoDoubleColumn obApp__paneInfoDoubleColumn--left'>Culture: " + char.getTitle() + "</h1><h1 class= 'obApp__paneInfoDoubleColumn obApp__paneInfoDoubleColumn--right'>" + char.getTitle() + "</h1>\n        <h1 class= 'obApp__paneInfoDoubleColumn obApp__paneInfoDoubleColumn--left'>Controlled stars: " + char.getTitle() + "</h1><h1 class= 'obApp__paneInfoDoubleColumn obApp__paneInfoDoubleColumn--right'>" + char.getTitle() + "</h1>\n        <h1 class= 'obApp__paneInfoSubHeader'>---------------------------------------------------------------</h1>\n        <h1 class= 'obApp__paneInfoSubHeader'>Your relationship with this faction:</h1>\n        <h1 class= 'obApp__paneInfoSubHeader'>Reputation: Neutral</h1>\n        <h1 class= 'obApp__paneInfoSubHeader'>Trade status: None</h1>\n        <h1 class= 'obApp__paneInfoSubHeader'>Employment status: None</h1>";
        insert.innerHTML = hIns;
        var bar = short.create("div", "", ["obApp__paneBtnBar"]);
        var btn = short.create("div", "", ["obApp__btn", "obApp__btn--uiPane"]);
        btn.innerText = "Close";
        btn.onclick = ObController.uiCloseCharInfoPane;
        bar.appendChild(btn);
        insert.appendChild(bar);
        short.byId('obAppCon').appendChild(insert);
    };
    ObController.uiCloseNatInfoPane = function () {
        short.del(short.byId("obNatInfoPane"));
    };
    ObController.uiCloseCharInfoPane = function () {
        short.del(short.byId("obCharInfoPane"));
    };
    ObController.uiAddLoadingBar = function () {
        var bar = short.create("div", "obLoadingBar", ["obApp__loadingBar"]);
        var prog = short.create("div", "obLoadingProg", ["obApp__loadingBar", "obApp__loadingBar--progress"]);
        bar.appendChild(prog);
        short.byId("obAppCon").appendChild(bar);
    };
    ObController.loadingScreenFrame = function (fProg) {
        var prog = short.byId("obLoadingProg");
        fProg *= 100;
        prog.style.width = fProg + "%";
    };
    ObController.uiEndLoadingScreen = function () {
        short.del(short.byId("obLoadingText"));
        short.del(short.byId("obLoadingBar"));
        ObController.buildUiAfterLoad();
    };
    ObController.initCultures = function () {
        this.cultures.push(new Culture(0, "Colonist", "Navigator", "Fleet Admiral", "Shipping Master", "Fr", "Exp", ["Colony", "Jester", "Journey", "Wayfarer"], ["Vanguard", "Advance"], ["Pathfinder", "Traveller", "Pioneer"], "Trooper", "Award of the Pioneer", "Fleets Prize", ["Frontiers", "Field"], ["Settled", "Expanse of"], 1, 3, 2, 'green'));
        this.cultures.push(new Culture(1, "Neutralist", "President", "Secretary of Defence", "Secretary of State", "Armssel", "Comssel", ["Ocean"], ["Peace"], ["Magnificent"], "Ensign", "Prestige Ribbon", "Medal of Esteem", ["Collective", "Alliance", "Sectors", "Systems"], ["Allied", "Treaty of"], 3, 4, 3, 'cyan'));
        this.cultures.push(new Culture(2, "Imperialist", "Emperor", "Imperial Legate", "Imperial Prefect", "Legionship", "Mercship", ["Civilisation"], ["Gladius", "Hasta"], ["Trivia"], "Legionary", "Triumph", "Ovation", ["Empire", "Dominion", "Enclave"], ["Imperial"], 4, 4, 5, 'purple'));
        this.cultures.push(new Culture(3, "Bureaucratic", "Director", "Head of Risk Management", "Chief Administrator", "FSA", "OSC", ["Danube"], ["Vanguard"], ["Capital"], "Risk Management Operative", "Exemplary Citizenship Award", "Administrative Commendation", ["Concern", "Accord", "Federation"], ["League of", "Chartered"], 4, 5, 2, 'white'));
        this.cultures.push(new Culture(4, "Proletarian", "Overseer", "War Commissar", "People's Commissar", "AEV", "ICV", ["Unity"], ["Heroic"], ["Tireless"], "Matros", "Hero of the Union Medal", "Order of Victory", ["Pact", "Union", "Bloc"], ["United"], 5, 1, 3, 'red'));
        this.cultures.push(new Culture(5, "Scholastic", "Supervisor", "Security Coordinator", "Chancellor", "AS", "TR", ["Nobel"], ["Chandrasekhar", "Imahara"], ["Sagan", "Conway", "Minkowski"], "Security Agent", "Extraordinary Prize of Degree", "Distinction and Honours", ["Group", "Space", "Foundation"], ["Assembly of", "Constitution of"], 2, 2, 1, 'lime'));
    };
    ObController.initOb = function () {
        ObController.galaxyMap = new GalaxyView();
        ObController.starMap = new StarView();
        ObController.context = short.byId("obCanv").getContext("2d");
        ObController.context.lineWidth = 1.32;
        ObController.independentNat = new Nation(0, '#E5E5E5', '#E5E5E5', true);
        ObController.player = new Player();
        ObController.selectedStar = null;
        ObController.selectedDestination = null;
        ObController.viewStyle = 'n';
        ObController.frameHandle = setInterval(ObController.drawFrame, 1 / 30);
        ObController.tooltipUpdatePending = false;
        ObController.clearTipPending = false;
        ObController.natFreeSlots = [];
        ObController.cultures = [];
        ObController.initCultures();
        ObController.loadSprites();
        ObController.showMainMenu();
        ObController.inputIsLocked = false;
        ObController.mouseInput = {
            mouseDownBeginsAt: { x: 0, y: 0 },
            mouseMove: { x: 0, y: 0 },
            mouseIsDown: false,
            mouseMoveCumulative: 0
        };
        ObController.initEventHandlers();
    };
    ObController.startNewSave = function () {
        short.del(short.byId("obMainMenu"));
        var text = short.create("div", "obLoadingText", ["obApp__loadingText"]);
        text.innerText = "Generating galaxy...";
        short.byId("obAppCon").appendChild(text);
        ObController.uiAddLoadingBar();
        ObController.stars = [];
        ObController.nations = [];
        ObController.characters = [];
        ObController.generateStars(500);
        ObController.generateNations(8);
        ObController.frameMod = 0;
        ObController.galaxyGenCounter = 0;
        ObController.viewType = 'b';
    };
    ObController.generateStars = function (numStars) {
        for (var i = 0; i < numStars; i++) {
            ObController.stars.push(new StarSystem());
        }
        for (var i = 0; i < numStars; i++) {
            for (var j = 0; j < numStars; j++) {
                if (j != i) {
                    var s = Math.pow(Math.pow(ObController.stars[j].location.x - ObController.stars[i].location.x, 2) + Math.pow(ObController.stars[j].location.y - ObController.stars[i].location.y, 2), 0.5);
                    if (s < 50)
                        ObController.stars[i].nearbyStars.push(ObController.stars[j]);
                }
            }
        }
    };
    ObController.generateNations = function (numNations) {
        for (var i = 0; i < numNations; i++) {
            ObController.nations.push(new Nation(i, ObController.colourPalette[i].c1, ObController.colourPalette[i].c2, false));
            ObController.nations[i].getCapital().setNation(ObController.nations[i]);
        }
    };
    ObController.generateNewGalaxy = function () {
        for (var i = ObController.frameMod * 10; i < (ObController.frameMod + 1) * 10; i++) {
            ObController.stars[i].nationSpread();
        }
        ObController.galaxyGenCounter++;
        if (ObController.galaxyGenCounter === 700) {
            for (var i = 0; i < ObController.nations.length; i++) {
                for (var j = 0; j < ObController.nations[i].controlledStars.length; j++) {
                    ObController.nations[i].controlledStars[j].setCulture(ObController.nations[i].getCulture());
                }
            }
        }
        if (ObController.galaxyGenCounter >= 700) {
            for (var i = ObController.frameMod * 10; i < (ObController.frameMod + 1) * 10; i++) {
                ObController.stars[i].cultureSpread();
            }
        }
        if (ObController.galaxyGenCounter >= 1500) {
            for (var i = 0; i < ObController.nations.length; i++) {
                if (ObController.nations[i].controlledStars.length < 6) {
                    ObController.nations[i].freeControlledStars();
                    ObController.nations[i] = null;
                    ObController.natFreeSlots.push(i);
                }
                else {
                    ObController.nations[i].generateLeadership();
                }
            }
            ObController.player.equipShip(new Ship());
            var playerValidLoc = false;
            var tempN = 0;
            while (!playerValidLoc) {
                tempN = Math.floor(Math.random() * ObController.stars.length);
                if (ObController.stars[tempN].getNation() !== null) {
                    ObController.player.setLocationAtDestination(ObController.stars[tempN].destinations[0]);
                    playerValidLoc = true;
                    ObController.galaxyMap.centerViewAtStar(ObController.stars[tempN]);
                }
            }
            ObController.uiEndLoadingScreen();
            ObController.viewType = 'g';
        }
    };
    ObController.openGalaxyMap = function () {
        ObController.viewType = 'g';
        ObController.refreshUi();
    };
    ObController.openStarMap = function (x, y) {
        if (x === void 0) { x = null; }
        if (y === void 0) { y = null; }
        if (x && y) {
            var selected = ObController.galaxyMap.getStarAt(x, y);
            if (selected) {
                ObController.selectedStar = selected;
                ObController.starMap.resetView();
                ObController.viewType = 's';
                ObController.refreshUi();
            }
        }
        else {
            ObController.viewType = 's';
            ObController.refreshUi();
        }
    };
    ObController.returnToStarMap = function () {
        ObController.openStarMap();
    };
    ObController.openDestination = function (x, y) {
        var selected = ObController.starMap.getDestinationAt(x, y);
        if (selected) {
            ObController.selectedDestination = selected;
            ObController.viewType = 'd';
            ObController.refreshUi();
        }
    };
    ObController.beginJourneyToStar = function () {
        ObController.player.startInterstellarTravel(ObController.selectedStar);
        ObController.openGalaxyMap();
    };
    ObController.beginJourneyToDestination = function () {
        ObController.player.startSystemTravel(ObController.selectedDestination);
        ObController.openStarMap();
    };
    ObController.loadSprites = function () {
        StarSystem.starSprites = [
            short.byId("spriteWhiteMs"),
            short.byId("spriteBlueMs"),
            short.byId("spriteYellowMs"),
            short.byId("spriteOrangeMs"),
            short.byId("spriteNeutron"),
            short.byId("spriteBlackHole"),
            short.byId("spriteBrownDwarf"),
            short.byId("spriteWolfRayet"),
            short.byId("spriteCarbon"),
            short.byId("spriteWhiteDwarf")
        ];
        Destination.planetSprites = [
            short.byId("spritePlanet0"),
            short.byId("spritePlanet1"),
            short.byId("spritePlanet2"),
            short.byId("spritePlanet3")
        ];
        Destination.planetHqSprites = [
            short.byId("spritePlanet0Hq"),
            short.byId("spritePlanet1Hq"),
            short.byId("spritePlanet2Hq"),
            short.byId("spritePlanet3Hq")
        ];
        Player.playerSprite = short.byId("spritePlayerMarker");
    };
    ObController.drawFrame = function () {
        ObController.context.clearRect(0, 0, 1280, 720);
        switch (ObController.viewType) {
            case 'g':
                ObController.galaxyMap.drawGalaxyMap(ObController.viewStyle);
                break;
            case 's':
                ObController.starMap.drawSystemMap(ObController.selectedStar);
                break;
            case 'd':
                ObController.selectedDestination.drawDestinationScreen();
                break;
            case 'b':
                ObController.loadingScreenFrame(ObController.galaxyGenCounter / 1500);
                ObController.generateNewGalaxy();
                break;
        }
        if (ObController.tooltipUpdatePending) {
            if (ObController.clearTipPending)
                ObController.clearLocationTooltip();
            else
                ObController.showLocationToolTip();
            ObController.tooltipUpdatePending = false;
            ObController.clearTipPending = false;
        }
        ObController.frameTasks();
        ObController.frameMod = (ObController.frameMod + 1) % 50;
    };
    ObController.showMainMenu = function () {
        ObController.viewType = 'm';
        short.del(short.byId("obTopBar"));
        short.del(short.byId("obBottomBar"));
        var insert = short.create("div", "obMainMenu", ["obApp__mainMenu"]);
        var btn = short.create("div", "obMenuLogo", ["obApp__menuLogo"]);
        btn.innerText = "Outward and Beyond (Work In Progress!)";
        insert.appendChild(btn);
        btn = short.create("div", "", ["obApp__btn", "obApp__btn--menu"]);
        btn.innerText = "Play";
        btn.onclick = function () { return ObController.playGame(); };
        insert.appendChild(btn);
        btn = short.create("div", "", ["obApp__btn", "obApp__btn--menu"]);
        btn.innerText = "Delete Save Data";
        btn.onclick = function () { return console.log("remove save data!"); };
        insert.appendChild(btn);
        short.byId("obAppCon").appendChild(insert);
    };
    ObController.handleTooltip = function (x, y) {
        var obj, h, t1, t2, c = null;
        switch (ObController.viewType) {
            case 'g':
                obj = ObController.galaxyMap.getStarAt(x, y);
                if (obj) {
                    h = obj.getStarName();
                    t1 = obj.destinations.length + " destination";
                    if (obj.destinations.length != 1)
                        t1 += "s";
                    if (!obj.getNation()) {
                        t2 = "Uninhabited";
                        c = "grey";
                    }
                    else {
                        t2 = obj.getNation().getName();
                        c = obj.getNation().getColour2();
                        if (c === "white")
                            c = obj.getNation().getColour1();
                    }
                }
                if (ObController.galaxyMap.getMouseHoverPlayer(x, y)) {
                    h = "YOU";
                    t1 = ObController.player.locationSummary();
                    t2 = ObController.player.stateSummary();
                    c = null;
                }
                break;
            case 's':
                obj = ObController.starMap.getDestinationAt(x, y);
                if (obj) {
                    h = obj.getDestinationName();
                    t1 = "Type: " + obj.getEconomyType();
                    t2 = "Currently " + obj.getStatus();
                }
                else if (ObController.starMap.getMouseHoverStar(x, y)) {
                    h = ObController.selectedStar.getStarName();
                    t1 = "Class: " + ObController.selectedStar.getStarType(true);
                    if (this.selectedStar.getCulture())
                        t2 = "Culture: " + ObController.selectedStar.getCulture().getName();
                    else
                        t2 = "Culture: None";
                }
                if (ObController.player.currentSystem === ObController.selectedStar.getStarName() && ObController.starMap.getMouseHoverPlayer(x, y)) {
                    h = "YOU";
                    t1 = ObController.player.locationSummary();
                    t2 = ObController.player.stateSummary();
                    c = null;
                }
                break;
        }
        if (h) {
            ObController.tooltipUpdate = {
                locX: x,
                locY: y,
                header: h,
                line1: t1,
                line2: t2,
                col: c
            };
            ObController.tooltipUpdatePending = true;
        }
        else {
            ObController.tooltipUpdatePending = true;
            ObController.clearTipPending = true;
        }
    };
    ObController.showLocationToolTip = function () {
        var tip = short.byId("obLocationTooltip");
        if (!tip) {
            tip = short.create("div", "obLocationTooltip", ["obApp__locationTip"]);
            tip.appendChild(short.create("h1", "obTooltipHeader", ["obApp__locationTipHeader"]));
            tip.appendChild(short.create("h2", "obTooltipSub1", ["obApp__locationTipSubHeader"]));
            tip.appendChild(short.create("h2", "obTooltipSub2", ["obApp__locationTipSubHeader"]));
            short.byId("obAppCon").appendChild(tip);
        }
        short.byId("obTooltipHeader").innerText = ObController.tooltipUpdate.header;
        short.byId("obTooltipSub1").innerText = ObController.tooltipUpdate.line1;
        short.byId("obTooltipSub2").innerText = ObController.tooltipUpdate.line2;
        if (ObController.tooltipUpdate.col)
            short.byId("obTooltipSub2").style.color = ObController.tooltipUpdate.col;
        else
            short.byId("obTooltipSub2").style.color = "";
        tip.style.left = ObController.tooltipUpdate.locX + "px";
        tip.style.top = ObController.tooltipUpdate.locY + "px";
    };
    ObController.clearLocationTooltip = function () {
        short.del(short.byId("obLocationTooltip"));
    };
    ObController.playGame = function () {
        ObController.startNewSave();
    };
    ObController.frameTasks = function () {
        ObController.player.frameTasks();
    };
    ObController.colourPalette = [
        { c1: 'red', c2: 'white' },
        { c1: 'cyan', c2: 'white' },
        { c1: 'white', c2: 'purple' },
        { c1: 'yellow', c2: 'green' },
        { c1: 'purple', c2: 'yellow' },
        { c1: 'orange', c2: 'red' },
        { c1: 'lime', c2: 'red' },
        { c1: 'blue', c2: 'white' },
        { c1: 'red', c2: 'yellow' },
        { c1: 'cyan', c2: 'blue' },
        { c1: 'white', c2: 'red' },
        { c1: 'yellow', c2: 'orange' },
        { c1: 'purple', c2: 'white' },
        { c1: 'orange', c2: 'yellow' },
        { c1: 'lime', c2: 'green' },
        { c1: 'blue', c2: 'yellow' }
    ];
    return ObController;
}());
var Player = (function () {
    function Player() {
        this.ship = null;
        this.state = 'g';
        this.location = { x: 250, y: 250 };
        this.systemLocation = { x: 350, y: 300 };
        this.currentSystem = null;
        this.currentDestination = null;
        this.char = null;
        this.galaxyTravelTarget = null;
        this.systemTravelTarget = null;
        this.galaxyGlobalMult = 0.05;
        this.systemGlobalMult = 0.2;
    }
    Player.prototype.setCharacter = function (c) {
        this.char = c;
    };
    Player.prototype.equipShip = function (ship) {
        this.ship = ship;
    };
    Player.prototype.startInterstellarTravel = function (target) {
        this.galaxyTravelTarget = target;
        this.state = 't';
        this.currentSystem = null;
        this.currentDestination = null;
    };
    Player.prototype.startSystemTravel = function (target) {
        this.systemTravelTarget = target;
        this.state = 'u';
        this.currentDestination = null;
    };
    Player.prototype.travelDistance = function () {
        var vector;
        var vectorLength;
        switch (this.state) {
            case 't':
                vector = { x: this.galaxyTravelTarget.location.x - this.location.x, y: this.galaxyTravelTarget.location.y - this.location.y };
                vectorLength = Math.pow(vector.x, 2.0) + Math.pow(vector.y, 2.0);
                vectorLength = Math.pow(vectorLength, 0.5);
                vector.x *= this.ship.getGalaxySpeed() / vectorLength;
                vector.y *= this.ship.getGalaxySpeed() / vectorLength;
                if (Math.abs(this.location.x - this.galaxyTravelTarget.location.x) < Math.abs(vector.x * this.galaxyGlobalMult) && Math.abs(this.location.y - this.galaxyTravelTarget.location.y) < Math.abs(vector.y * this.galaxyGlobalMult)) {
                    this.arriveAtStar(this.galaxyTravelTarget);
                    return;
                }
                this.location.x += vector.x * this.galaxyGlobalMult;
                this.location.y += vector.y * this.galaxyGlobalMult;
                break;
            case 'u':
                vector = { x: this.systemTravelTarget.location.x - this.systemLocation.x, y: this.systemTravelTarget.location.y - this.systemLocation.y };
                vectorLength = Math.pow(vector.x, 2.0) + Math.pow(vector.y, 2.0);
                vectorLength = Math.pow(vectorLength, 0.5);
                vector.x *= this.ship.getSystemSpeed() / vectorLength;
                vector.y *= this.ship.getSystemSpeed() / vectorLength;
                if (Math.abs(this.systemLocation.x - this.systemTravelTarget.location.x) < Math.abs(vector.x * this.systemGlobalMult) && Math.abs(this.systemLocation.y - this.systemTravelTarget.location.y) < Math.abs(vector.y * this.systemGlobalMult)) {
                    this.arriveAtDestination(this.systemTravelTarget);
                    return;
                }
                this.systemLocation.x += vector.x * this.systemGlobalMult;
                this.systemLocation.y += vector.y * this.systemGlobalMult;
                break;
        }
    };
    Player.prototype.arriveAtStar = function (star) {
        this.state = 'g';
        console.log("ARRIVED at " + star.getStarName());
        this.currentSystem = star.getStarName();
        this.systemLocation = { x: 350, y: 300 };
    };
    Player.prototype.arriveAtDestination = function (dest) {
        this.state = 'g';
        console.log("arrived at " + dest.getDestinationName());
        this.currentDestination = dest.getDestinationName();
    };
    Player.prototype.draw = function (xOffset, yOffset, zoom, system) {
        if (system === void 0) { system = ""; }
        var xDraw;
        var yDraw;
        if (system) {
            if (system != this.currentSystem)
                return;
            xDraw = (zoom * this.systemLocation.x) - xOffset;
            yDraw = (zoom * this.systemLocation.y) - yOffset;
        }
        else {
            xDraw = (zoom * this.location.x) - xOffset;
            yDraw = (zoom * this.location.y) - yOffset;
        }
        if (xDraw > 1280 - 5 || yDraw > 720 - 5)
            return;
        if (xDraw < 5 || yDraw < 5)
            return;
        ObController.context.drawImage(Player.playerSprite, xDraw - 8, yDraw - 22, 15, 23);
    };
    Player.prototype.setLocationAtStar = function (star) {
        this.location.x = star.location.x;
        this.location.y = star.location.y;
        this.currentSystem = star.getStarName();
    };
    Player.prototype.setLocationAtDestination = function (dest) {
        this.setLocationAtStar(dest.getStar());
        this.systemLocation.x = dest.location.x;
        this.systemLocation.y = dest.location.y;
        this.currentDestination = dest.getDestinationName();
    };
    Player.prototype.locationSummary = function () {
        if (this.currentDestination) {
            return "Docked at " + this.currentDestination;
        }
        if (this.currentSystem) {
            return "Orbiting " + this.currentSystem;
        }
        else {
            return "In interstellar space";
        }
    };
    Player.prototype.stateSummary = function () {
        return "Aboard the " + this.ship.getName();
    };
    Player.prototype.frameTasks = function () {
        this.travelDistance();
    };
    return Player;
}());
//# sourceMappingURL=ob.js.map