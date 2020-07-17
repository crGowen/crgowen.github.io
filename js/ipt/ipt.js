var IptController = (function () {
    function IptController() {
    }
    IptController.loadPeriod = function (period) {
        var rowTags = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rowTags[_i - 1] = arguments[_i];
        }
        var domRow = short.create("div", "", ["ptApp__tableRow"].concat(rowTags));
        var fromLeft = true;
        var finishedPeriod = false;
        var domElem;
        var index = 0;
        for (var i = 0; !finishedPeriod && i < period.length; i++) {
            if (fromLeft)
                index = i;
            else
                index = period.length - i;
            if (period[index].name === "DIR-CHANGE") {
                if (fromLeft) {
                    fromLeft = false;
                    i = 0;
                }
                else {
                    finishedPeriod = true;
                }
            }
            else {
                domElem = short.create("div", "c" + period[index].nProtons, ["ptApp__element"]);
                domElem.classList.add("ptApp__element--" + period[index].state.toLowerCase());
                if (fromLeft)
                    domElem.classList.add("ptApp__element--left");
                else
                    domElem.classList.add("ptApp__element--right");
                if (period[index].halfLife != "Nonradioactive") {
                    domElem.classList.add("ptApp__element--radioactive");
                }
                domElem.innerText = period[index].symbol;
                domRow.append(domElem);
                IptController.allElements[Number(period[index].nProtons) - 1] = period[index];
            }
        }
        short.byId("elementsTable").appendChild(domRow);
    };
    IptController.loadTable = function () {
        mainPeriods.forEach(function (p) { return IptController.loadPeriod(p); });
        IptController.loadPeriod(lanthanoids, "ptApp__tableRow--pullouts", "ptApp__tableRow--lanth");
        IptController.loadPeriod(actinoids, "ptApp__tableRow--pullouts");
        short.byId("elementsTable").addEventListener("click", IptController.displayElemInfo);
    };
    IptController.displayElemInfo = function (event) {
        var elem = event.target;
        if (elem.id[0] !== "c")
            return;
        var ind = IptController.elemStringToIndex(elem.id);
        if (ind > 200)
            return;
        var elemToDisp = IptController.allElements[ind - 1];
        short.byId("infoName").innerText = elemToDisp.name;
        short.byId("infoMass").innerText = "Atomic mass: " + elemToDisp.mass;
        short.byId("infoState").innerText = "State@STP: " + elemToDisp.state;
        short.byId("infoHL").innerText = "Half-life: " + elemToDisp.halfLife;
        short.byId("infoZ").innerText = "Protons in nucleus: " + elemToDisp.nProtons;
        short.byId("infoP1").innerText = elemToDisp.paragraph1;
        short.byId("infoP2").innerText = elemToDisp.paragraph2;
        short.byId("infoP3").innerText = elemToDisp.paragraph3;
        if (IptController.currentSelected) {
            IptController.currentSelected.classList.replace("ptApp__element--selectedRadioactive", "ptApp__element--radioactive");
            IptController.currentSelected.classList.replace("ptApp__element--selectedSolid", "ptApp__element--solid");
            IptController.currentSelected.classList.replace("ptApp__element--selectedLiquid", "ptApp__element--liquid");
            IptController.currentSelected.classList.replace("ptApp__element--selectedGas", "ptApp__element--gas");
        }
        IptController.currentSelected = elem;
        elem.classList.replace("ptApp__element--radioactive", "ptApp__element--selectedRadioactive");
        elem.classList.replace("ptApp__element--solid", "ptApp__element--selectedSolid");
        elem.classList.replace("ptApp__element--liquid", "ptApp__element--selectedLiquid");
        elem.classList.replace("ptApp__element--gas", "ptApp__element--selectedGas");
    };
    IptController.elemStringToIndex = function (elem) {
        return Number(elem.substring(1));
    };
    IptController.currentSelected = undefined;
    IptController.allElements = Array(118);
    return IptController;
}());
//# sourceMappingURL=ipt.js.map