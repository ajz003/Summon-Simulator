// ----------------------- Variable Set-up
// Initial Summon Rates
var threeRate = 0.36
var fourRate = 0.58
var fiveRate = 0.03
var fiveFocusRate = 0.03

// Variables Used to Set Ranges to Intepret Math.random() for Rarity Picking
var fiver = fiveRate + fiveFocusRate
var fourver = fiver + fourRate

// Focus Unit Numbers
var fiveFocusReds = 2;
var fiveFocusGreens = 1;
var fiveFocusBlues = 0;
var fiveFocusGreys = 0;
var fiveFocusTotal = fiveFocusReds + fiveFocusGreens + fiveFocusBlues + fiveFocusGreys;
// Five Star Unit Numbers
var fiveReds = 33;
var fiveGreens = 15;
var fiveBlues = 20;
var fiveGreys = 13;
var fiveTotal = fiveReds + fiveGreens + fiveBlues + fiveGreys;
// Four Star Unit Numbers
var fourReds = 31;
var fourGreens = 19;
var fourBlues = 28;
var fourGreys = 28;
var fourTotal = fourReds + fourGreens + fourBlues + fourGreys;
// Three Star Unit Numbers
var threeReds = 28;
var threeGreens = 18;
var threeBlues = 25;
var threeGreys = 25;
var threeTotal = threeReds + threeGreens + threeBlues + threeGreys;

// Variables Used to Set Ranges to Intepret Math.random() for Color Picking
var ffRG = ((fiveFocusReds + fiveFocusGreens) / fiveFocusTotal)
var ffRGB = ((fiveFocusReds + fiveFocusGreens + fiveFocusBlues) / fiveFocusTotal)
var fRG = ((fiveReds + fiveGreens) / fiveTotal)
var fRGB = ((fiveReds + fiveGreens + fiveBlues) / fiveTotal)
var frRG = ((fourReds + fourGreens) / fourTotal)
var frRGB = ((fourReds + fourGreens + fourBlues) / fourTotal)
var tRG = ((threeReds + threeGreens) / threeTotal)
var tRGB = ((threeReds + threeGreens + threeBlues) / threeTotal)

// Arrays to represent the summoning circle
var circleHiddenArr = [];
var circleArr = [];
// Summon Tracker

var SUMMONS = 0;
var ORBS = 0;
var j = 0;
var totalSummons = 0;
var isFocusGot = false;
var pityCounter = Math.floor(totalSummons / 5);
var totalOrbs = 0;

// Initialize 
init();
// Pick Focus Color
getFocus("Green");

// ----------------------- Functions

// Sets initial variable values
function getFocus(snipeColor) {
    while (isFocusGot === false) {
        pityCounter = Math.floor(totalSummons / 5);
        console.log("pity counter: " + pityCounter)
        threeRate = 0.36 - (0.001917 * pityCounter)
        fourRate = 0.58 - (0.003083 * pityCounter)
        fiveRate = 0.03 + (0.0025 * pityCounter)
        fiveFocusRate = 0.03 + (0.0025 * pityCounter)
        console.log("Total Summons: " + totalSummons)
        console.log("threerate: " + threeRate)
        console.log("fourrate: " + fourRate)
        console.log("fiverate: " + fiveRate)
        console.log("fiveFocusrate: " + fiveFocusRate)
        createSummonCircle();
        snipeCircle(snipeColor);
        totalSummons += SUMMONS;
        totalOrbs += ORBS;
        j++;
    }
}
console.log(circleHiddenArr)
console.log(circleArr)

function init() {
    // Initial Summon Rates
    threeRate = 0.36 - (0.001917 * pityCounter)
    fourRate = 0.58 - (0.003083 * pityCounter)
    fiveRate = 0.03 + (0.0025 * pityCounter)
    fiveFocusRate = 0.03 + (0.0025 * pityCounter)
    // iables Used to Set Ranges to Intepret Math.random() for Rarity Picking
    fiver = fiveRate + fiveFocusRate
    fourver = fiver + fourRate
    // Focus Unit Numbers
    fiveFocusReds = 2;
    fiveFocusGreens = 1;
    fiveFocusBlues = 0;
    fiveFocusGreys = 0;
    fiveFocusTotal = fiveFocusReds + fiveFocusGreens + fiveFocusBlues + fiveFocusGreys;
    // Five Star Unit Numbers
    fiveReds = 33;
    fiveGreens = 15;
    fiveBlues = 20;
    fiveGreys = 13;
    fiveTotal = fiveReds + fiveGreens + fiveBlues + fiveGreys;
    // Four Star Unit Numbers
    fourReds = 31;
    fourGreens = 19;
    fourBlues = 28;
    fourGreys = 28;
    fourTotal = fourReds + fourGreens + fourBlues + fourGreys;
    // Three Star Unit Numbers
    threeReds = 28;
    threeGreens = 18;
    threeBlues = 25;
    threeGreys = 25;
    threeTotal = threeReds + threeGreens + threeBlues + threeGreys;
    // Variables Used to Set Ranges to Intepret Math.random() for Color Picking
    ffRG = ((fiveFocusReds + fiveFocusGreens) / fiveFocusTotal)
    ffRGB = ((fiveFocusReds + fiveFocusGreens + fiveFocusBlues) / fiveFocusTotal)
    fRG = ((fiveReds + fiveGreens) / fiveTotal)
    fRGB = ((fiveReds + fiveGreens + fiveBlues) / fiveTotal)
    frRG = ((fourReds + fourGreens) / fourTotal)
    frRGB = ((fourReds + fourGreens + fourBlues) / fourTotal)
    tRG = ((threeReds + threeGreens) / threeTotal)
    tRGB = ((threeReds + threeGreens + threeBlues) / threeTotal)
    // Arrays to represent the summoning circle
    circleHiddenArr = [];
    circleArr = [];
    // Summon Tracker
    SUMMONS = 0;
}

// Fills an array to represent the Summoning Circle:
function createSummonCircle() {

    // This circleHiddenArr array only shows the summon colors, but...
    circleHiddenArr = [];
    // This circleArr array contains the color, rarity, and whether it is a focus unit or not.
    circleArr = [];
    // Track number of summons from this circle, sets it to 0 everytime a new circle is summoned.
    SUMMONS = 0;
    // Track number of orbs spent in this circle, sets it to 0 everytime a new circle is summoned.
    ORBS = 0;

    // Fills the arrays with random heroes, picking by rarity first, and then by color
    for (var i = 0; i < 5; i++) {
        var rarityPick = Math.random()

        // By rarity... (this is for Focus Five Stars)
        if (rarityPick <= fiveFocusRate) {
            var colorPick = Math.random();
            // Then by color..
            if (colorPick < (fiveFocusReds / fiveFocusTotal)) {
                circleHiddenArr.push("Red")
                circleArr.push("Red Five Star Focus")
            }
            if (colorPick >= (fiveFocusReds / fiveFocusTotal) && colorPick < ffRG) {
                circleHiddenArr.push("Green")
                circleArr.push("Green Five Star Focus")
            }
            if (colorPick >= ffRG && colorPick < ffRGB) {
                circleHiddenArr.push("Blue")
                circleArr.push("Blue Five Star Focus")
            }
            if (colorPick >= ffRGB) {
                circleHiddenArr.push("Grey")
                circleArr.push("Grey Five Star Focus")
            }
        }
        // Same as above, except for Five Star Rarity
        if (rarityPick > fiveFocusRate && rarityPick <= fiver) {
            var colorPick = Math.random();
            if (colorPick < (fiveReds / fiveTotal)) {
                circleHiddenArr.push("Red")
                circleArr.push("Red Five Star")
            }
            if (colorPick >= (fiveReds / fiveTotal) && colorPick < fRG) {
                circleHiddenArr.push("Green")
                circleArr.push("Green Five Star")
            }
            if (colorPick >= fRG && colorPick < fRGB) {
                circleHiddenArr.push("Blue")
                circleArr.push("Blue Five Star")
            }
            if (colorPick >= fRGB) {
                circleHiddenArr.push("Grey")
                circleArr.push("Grey Five Star")
            }
        }
        // Same as above, except for Four Star Rarity
        if (rarityPick > fiver && rarityPick <= fourver) {
            var colorPick = Math.random();
            if (colorPick < (fourReds / fourTotal)) {
                circleHiddenArr.push("Red")
                circleArr.push("Red Four Star")
            }
            if (colorPick >= (fourReds / fourTotal) && colorPick < frRG) {
                circleHiddenArr.push("Green")
                circleArr.push("Green Four Star")
            }
            if (colorPick >= frRG && colorPick < frRGB) {
                circleHiddenArr.push("Blue")
                circleArr.push("Blue Four Star")
            }
            if (colorPick >= frRGB) {
                circleHiddenArr.push("Grey")
                circleArr.push("Grey Four Star")
            }
        }
        // Same as above, except for Three Star Rarity
        if (rarityPick > fourver) {
            var colorPick = Math.random();
            if (colorPick < (threeReds / threeTotal)) {
                circleHiddenArr.push("Red")
                circleArr.push("Red Three Star")
            }
            if (colorPick >= (threeReds / threeTotal) && colorPick < tRG) {
                circleHiddenArr.push("Green")
                circleArr.push("Green Three Star")
            }
            if (colorPick >= tRG && colorPick < tRGB) {
                circleHiddenArr.push("Blue")
                circleArr.push("Blue Three Star")
            }
            if (colorPick >= tRGB) {
                circleHiddenArr.push("Grey")
                circleArr.push("Grey Three Star")
            }
        }
    }
}


// Picks all of the summons of the desired color from the summoning circle. If none, pick a random color.
function snipeCircle(targetColor) {

    var item = targetColor;
    var colorsArr = ["Red", "Green", "Blue", "Grey"]
    console.log(circleHiddenArr)

    // If the desired color doesn't exist in the summon circle, then:
    if (!circleHiddenArr.includes(item)) {
        while (!circleHiddenArr.includes(item)) {
            console.log("No " + item + " in the circle.");
            var index = colorsArr.indexOf(item);
            colorsArr.splice(index, 1);
            item = colorsArr[Math.floor(Math.random() * colorsArr.length)];
            console.log("Switched to " + item + " .")
        }
        for (var i = 0; i < 5; i++) {
            if (circleHiddenArr[i] === item) {
                SUMMONS++;

                console.log("Summoned " + item + " orb.")
                break;
            }
        }
    }

    // Otherwise, if the target color is green, pick Green...
    if (targetColor === "Green") {
        for (var i = 0; i < 5; i++) {
            if (circleHiddenArr[i] === "Green") {
                SUMMONS++;
                console.log("Summoned Green orb.")
                var focusChecker = Math.floor(Math.random() * fiveFocusGreens + 1);
                if (circleArr[i] === targetColor + " Five Star Focus" && fiveFocusGreens === focusChecker) {
                    console.log("You got your desired green focus hero!")
                    isFocusGot = true;
                    console.log(totalSummons)
                    break;
                }
            }
        }
    }
    // Or Red...
    if (targetColor === "Red") {
        for (var i = 0; i < 5; i++) {
            if (circleHiddenArr[i] === "Red") {
                SUMMONS++;
                console.log("Summoned red orb.")
                var focusChecker = Math.floor(Math.random() * fiveFocusReds + 1);
                if (circleArr[i] === targetColor + " Five Star Focus" && fiveFocusReds === focusChecker) {
                    console.log("You got your desired red focus hero!")
                    isFocusGot = true;
                    console.log(totalSummons)
                    break;
                }
            }
        }
    }
    // Or Blue...
    if (targetColor === "Blue") {
        for (var i = 0; i < 5; i++) {
            if (circleHiddenArr[i] === "Blue") {
                SUMMONS++;
                console.log("Summoned blue orb.")
                var focusChecker = Math.floor(Math.random() * fiveFocusBlues + 1);
                if (circleArr[i] === targetColor + " Five Star Focus" && fiveFocusBlues === focusChecker) {
                    console.log("You got your desired blue focus hero!");
                    isFocusGot = true;
                    console.log(totalSummons)
                    break;
                }
            }
        }
    }
    // Or Grey...
    if (targetColor === "Grey") {
        for (var i = 0; i < 5; i++) {
            if (circleHiddenArr[i] === "Grey") {
                SUMMONS++;
                console.log("Summoned Grey orb.")
                var focusChecker = Math.floor(Math.random() * fiveFocusGreys + 1);
                if (circleArr[i] === targetColor + " Five Star Focus" && fiveFocusGreys === focusChecker) {
                    console.log("You got your desired grey focus hero!")
                    isFocusGot = true;
                    console.log(totalSummons)
                    break;
                }
            }
        }
    }
}