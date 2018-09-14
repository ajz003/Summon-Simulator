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


// ----------------------- Functions

function createSummonCircle() {
    for (var i = 0; i < 5; i++) {
        var rarityPick = Math.random()
        if (rarityPick <= fiveFocusRate) {
            var colorPick = Math.random();
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
createSummonCircle();
console.log(circleHiddenArr)
console.log(circleArr)