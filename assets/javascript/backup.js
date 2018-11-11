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
var fiveFocusReds;
var fiveFocusGreens;
var fiveFocusBlues;
var fiveFocusGreys;
var fiveFocusTotal = fiveFocusReds + fiveFocusGreens + fiveFocusBlues + fiveFocusGreys;
// Five Star Unit Numbers
var fiveReds = 39;
var fiveGreens = 18;
var fiveBlues = 25;
var fiveGreys = 16;
var fiveTotal = fiveReds + fiveGreens + fiveBlues + fiveGreys;
// Four Star Unit Numbers
var fourReds = 32;
var fourGreens = 19;
var fourBlues = 29;
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
var k = 0;
var totalSummons = 0;
var isFocusGot = false;
var pityCounter = Math.floor(totalSummons / 5);
var totalOrbs = 0;
var orbCost = 5;
var trials = 0;
var targetTrials;
var snipeColor;

var totalOrbsArr = [];


// ---------------- jQuery Functions

// Tooltips
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

$(".orb").on("click", function () {
    if ($(this).hasClass("selectedOrb")) {
        $(this).removeClass("selectedOrb");
        snipeColor = undefined;
    } else {
        $(".orb").removeClass("selectedOrb");
        $(this).addClass("selectedOrb");
        let color = $(this).attr("id");

        switch (color) {

            case "red-orb":
            snipeColor = "Red";
            break;

            case "blue-orb":
            snipeColor = "Blue";
            break;

            case "green-orb":
            snipeColor = "Green";
            break;

            case "grey-orb":
            snipeColor = "Grey";
            break;


        }
        console.log(snipeColor);
    }
});



$("#red-down").on("click", function () {
    let focusRed = $("#red-orbs").val();
    if (focusRed > 0) {
        focusRed--;
    } else {
        console.log("Cannot set below 0!")
    }
    $("#red-orbs").val(focusRed);
    fiveFocusReds = focusRed;
});
$("#red-up").on("click", function () {
    let focusRed = $("#red-orbs").val();
    focusRed++;
    $("#red-orbs").val(focusRed);
    fiveFocusReds = focusRed;
});
$("#blue-down").on("click", function () {
    let focusBlue = $("#blue-orbs").val();
    if (focusBlue > 0) {
        focusBlue--;
    } else {
        console.log("Cannot set below 0!")
    }
    $("#blue-orbs").val(focusBlue);
    fiveFocusBlues = focusBlue;
});
$("#blue-up").on("click", function () {
    let focusBlue = $("#blue-orbs").val();
    focusBlue++;
    $("#blue-orbs").val(focusBlue);
    fiveFocusBlues = focusBlue;
});
$("#green-down").on("click", function () {
    let focusGreen = $("#green-orbs").val();
    if (focusGreen > 0) {
        focusGreen--;
    } else {
        console.log("Cannot set below 0!")
    }
    $("#green-orbs").val(focusGreen);
    fiveFocusGreens = focusGreen;
});
$("#green-up").on("click", function () {
    let focusGreen = $("#green-orbs").val();
    focusGreen++;
    $("#green-orbs").val(focusGreen);
    fiveFocusGreens = focusGreen;
});
$("#grey-down").on("click", function () {
    let focusGrey = $("#grey-orbs").val();
    if (focusGrey > 0) {
        focusGrey--;
    } else {
        console.log("Cannot set below 0!")
    }
    $("#grey-orbs").val(focusGrey);
    fiveFocusGreys = focusGrey;
});
$("#grey-up").on("click", function () {
    let focusGrey = $("#grey-orbs").val();
    focusGrey++;
    $("#grey-orbs").val(focusGrey);
    fiveFocusGreys = focusGrey;
});

$("#summon-button").on("click", function () {

    targetTrials = $("#trials").val().trim();
    console.log(targetTrials);
    console.log = function () { };

    let checkColor = false;


    let checkRed = parseFloat($("#red-orbs").val())
    let checkBlue = parseFloat($("#blue-orbs").val())
    let checkGreen = parseFloat($("#green-orbs").val())
    let checkGrey = parseFloat($("#grey-orbs").val())

    if (snipeColor === "Red" && checkRed > 0) {
        checkColor = true;
    }
    if (snipeColor === "Blue" && checkBlue > 0) {
        checkColor = true;
    }
    if (snipeColor === "Green" && checkGreen > 0) {
        checkColor = true;
    }
    if (snipeColor === "Grey" && checkGrey > 0) {
        checkColor = true;
    }

    if (snipeColor !== undefined && checkColor === true) {
        console.log("Go for it");
    

    init();
    getFocus(snipeColor);
    console.log(totalOrbsArr);





    /* ---------------------- APPLICATION ----------------------- */





    var sum = totalOrbsArr.reduce((total, amount) => total + amount);
    var average = totalOrbsArr.reduce((total, amount, index, array) => {
        total += amount;
        if (index === totalOrbsArr.length - 1) {
            return total / totalOrbsArr.length;
        } else {
            return total;
        }

    })


    // Statistics

    console.log(sum)

    totalOrbsArr = totalOrbsArr.sort((a, b) => a - b);

    console.log(totalOrbsArr)
    console.log("Minimum: " + totalOrbsArr[0])
    console.log("Maximum: " + totalOrbsArr[totalOrbsArr.length - 1])
    console.log("Median: " + totalOrbsArr[Math.floor(totalOrbsArr.length / 2)])
    let median = totalOrbsArr[Math.floor(totalOrbsArr.length / 2)];
    console.log("Average orbs spent until focus: " + average)



    $("#median").html(`Median: ${median} orbs`);
    $("#median").tooltip('hide');
    $("#median").attr("data-original-title", `You have a 50% chance to get the focus hero within ${median} orbs.`);
    // $("#median").tooltip('show');



    // From https://www.w3resource.com/javascript-exercises/fundamental/javascript-fundamental-exercise-225.php
    const standardDeviation = (arr, usePopulation = false) => {
        const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;
        return Math.sqrt(
            arr.reduce((acc, val) => acc.concat((val - mean) ** 2), []).reduce((acc, val) => acc + val, 0) /
            (arr.length - (usePopulation ? 0 : 1))
        );
    };

    var std = precise(standardDeviation(totalOrbsArr));

    var sem = precise(std / Math.sqrt(targetTrials));

    $("#average").html(`Average (with standard deviation): ${average} ± ${std} orbs`);

    // Statistics Display

    console.log("Average ± Standard Deviation: " + average + " ± " + std);
    console.log("Average ± Standard Deviation (for +10): " + average * 11 + " ± " + std * 11);
    console.log("Standard Error of the Mean: " + sem);
    console.log("90% chance to get focus: " + totalOrbsArr[Math.floor(totalOrbsArr.length * 0.90)]);

    console.log("90% chance to get focus (+10): " + 11 * totalOrbsArr[Math.floor(totalOrbsArr.length * 0.90)]);
    console.log("95% chance to get focus: " + totalOrbsArr[Math.floor(totalOrbsArr.length * 0.95)]);
    console.log("95% chance to get focus (+10): " + 11 * totalOrbsArr[Math.floor(totalOrbsArr.length * 0.95)]);

    let focus90 = totalOrbsArr[Math.floor(totalOrbsArr.length * 0.90)];
    let focus95 = totalOrbsArr[Math.floor(totalOrbsArr.length * 0.95)];
    let focus9010 = focus90*11;
    let focus9510 = focus95*11;

    $("#focus-90").html(`90% chance to get your focus: ${focus90} orbs`);
    $("#focus-95").html(`95% chance to get focus: ${focus95} orbs`);
    $("#focus-90-10").html(`90% chance to get focus (+10): ${focus9010} orbs`);
    $("#focus-95-10").html(`95% chance to get focus (+10): ${focus9510} orbs`);


    // Histogram 

    var trace = {
        x: totalOrbsArr,
        type: 'histogram',
        autobinx: false,
        xbins: {
            end: 500,
            size: 50,
            start: 0
        }
    };
    var data = [trace];

    var layout = {
        title: 'Orbs to Summon Desired Focus',
        xaxis: {
            title: 'Orbs spent',
            titlefont: {
                family: 'Arial, sans-serif',
                size: 18,
                color: 'lightgrey'
            },
            showticklabels: true,
            tickangle: 'auto',
            tickfont: {
                family: 'Old Standard TT, serif',
                size: 14,
                color: 'black'
            },
            exponentformat: 'e',
            showexponent: 'all'
        },
        yaxis: {
            title: 'Number in of trials in each group',
            titlefont: {
                family: 'Arial, sans-serif',
                size: 18,
                color: 'lightgrey'
            },
            showticklabels: true,
            tickangle: 45,
            tickfont: {
                family: 'Old Standard TT, serif',
                size: 14,
                color: 'black'
            },
            exponentformat: 'e',
            showexponent: 'all'
        }
    };


    Plotly.newPlot('tester', data, layout);

    } if (snipeColor === undefined) {
        console.log("Pick a color!");
    } if (checkColor === false) {
        console.log("Target color is set to 0!")
    }

});

$("#with-these-orbs-submit").on("click", function() {
    var orbsHave = parseFloat($("#with-these-orbs").val());
    console.log("total orbs arr: " + totalOrbsArr)
    var result = find(orbsHave, totalOrbsArr);
    $("#with-these-orbs-result").html("Chance to get focus with your amount of orbs: " + result + "%")
})


// ----------------------- Functions

function precise(x) {
    return Number.parseFloat(x).toPrecision(3);
}
function precise2(x) {
    return Number.parseFloat(x).toPrecision();
}

// Runs through summoning sessions until target focus is summoned
function getFocus(snipeColor) {
    while (isFocusGot === false) {
        pityCounter = Math.floor(totalSummons / 5);
        console.log("pity counter: " + pityCounter)
        threeRate = 0.36 - (0.001917 * pityCounter)
        fourRate = 0.58 - (0.003083 * pityCounter)
        fiveRate = 0.03 + (0.0025 * pityCounter)
        fiveFocusRate = 0.03 + (0.0025 * pityCounter)
        console.log("threerate: " + threeRate)
        console.log("fourrate: " + fourRate)
        console.log("fiverate: " + fiveRate)
        console.log("fiveFocusrate: " + fiveFocusRate)
        createSummonCircle();
        console.log(circleArr);
        console.log(circleHiddenArr);
        snipeCircle(snipeColor);
        totalSummons += SUMMONS;
        totalOrbs += ORBS;
        j++;
        console.log("Total Summons: " + totalSummons)
        console.log("Total Orbs Spent: " + totalOrbs)
        console.log("Circles Completed: " + j)
    }
    if (isFocusGot === true) {
        totalOrbsArr.push(totalOrbs);
    }
    trials++;
    reset();
    console.log("trials: " + trials)
    console.log("target trials: " + targetTrials)
    if (trials < targetTrials) {
        getFocus(snipeColor);
    }
}

function reset() {
    isFocusGot = false;
    totalOrbs = 0;
    totalSummons = 0;
    fiveFocusReds = parseFloat($("#red-orbs").val())
    fiveFocusGreens = parseFloat($("#green-orbs").val())
    fiveFocusBlues = parseFloat($("#blue-orbs").val())
    fiveFocusGreys = parseFloat($("#grey-orbs").val())
}

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
    fiveFocusReds = parseFloat($("#red-orbs").val())
    fiveFocusGreens = parseFloat($("#green-orbs").val())
    fiveFocusBlues = parseFloat($("#blue-orbs").val())
    fiveFocusGreys = parseFloat($("#grey-orbs").val())
    fiveFocusTotal = fiveFocusReds + fiveFocusGreens + fiveFocusBlues + fiveFocusGreys;
    // Five Star Unit Numbers
    fiveReds = 39;
    fiveGreens = 18;
    fiveBlues = 25;
    fiveGreys = 16;
    fiveTotal = fiveReds + fiveGreens + fiveBlues + fiveGreys;
    // Four Star Unit Numbers
    fourReds = 32;
    fourGreens = 19;
    fourBlues = 29;
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

    totalOrbsArr = [];
    trials = 0;
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
    // Track number of orbs spent in this circle, sets it to 0 everytime a new circle is summoned.
    orbCost = 5;

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
    console.log(circleHiddenArr);
    console.log(circleArr);

    // If the desired color doesn't exist in the summon circle, then:
    if (!circleHiddenArr.includes(item)) {
        while (!circleHiddenArr.includes(item)) {
            console.log("No " + item + " in the circle.");
            var index = colorsArr.indexOf(item);
            colorsArr.splice(index, 1);
            item = colorsArr[Math.floor(Math.random() * colorsArr.length)];
            console.log("Switched to " + item + ".")
        }
        for (var i = 0; i < 5; i++) {
            if (circleHiddenArr[i] === item) {
                SUMMONS++;
                ORBS += orbCost;
                console.log("Summoned " + item + " orb.");
                break;
            }
        }
    }

    // Otherwise, if the target color is green, pick Green...
    if (targetColor === "Green") {
        for (var i = 0; i < 5; i++) {
            if (circleHiddenArr[i] === "Green") {
                SUMMONS++;
                console.log("Summons before orb cost: " + SUMMONS)
                ORBS += orbCost;
                reduceOrbCost();
                console.log("Summoned Green orb.")
                var focusChecker = Math.floor(Math.random() * fiveFocusGreens) + 1;
                if (circleArr[i] === targetColor + " Five Star Focus" && fiveFocusGreens === focusChecker) {
                    console.log("You got your desired green focus hero!")
                    isFocusGot = true;
                    console.log(totalSummons)
                    break;
                }
                else if (circleArr[i] === targetColor + " Five Star Focus") {
                    console.log("You got an undesired green focus hero!")
                }
            }
        }
    }
    // Or Red...
    if (targetColor === "Red") {
        for (var i = 0; i < 5; i++) {
            if (circleHiddenArr[i] === "Red") {
                SUMMONS++;
                ORBS += orbCost;
                reduceOrbCost();
                console.log("Summoned red orb.")
                var focusChecker = Math.floor(Math.random() * fiveFocusReds) + 1;
                if (circleArr[i] === targetColor + " Five Star Focus" && fiveFocusReds === focusChecker) {
                    console.log("You got your desired red focus hero!")
                    isFocusGot = true;
                    console.log(totalSummons)
                    break;
                }
                else if (circleArr[i] === targetColor + " Five Star Focus" && fiveFocusReds !== focusChecker) {
                    console.log("You got an undesired red focus hero!")
                }
            }
        }
    }
    // Or Blue...
    if (targetColor === "Blue") {
        for (var i = 0; i < 5; i++) {
            if (circleHiddenArr[i] === "Blue") {
                SUMMONS++;
                ORBS += orbCost;
                reduceOrbCost();
                console.log("Summoned blue orb.")
                var focusChecker = Math.floor(Math.random() * fiveFocusBlues) + 1;
                if (circleArr[i] === targetColor + " Five Star Focus" && fiveFocusBlues === focusChecker) {
                    console.log("You got your desired blue focus hero!");
                    isFocusGot = true;
                    console.log(totalSummons)
                    break;
                }
                else if (circleArr[i] === targetColor + " Five Star Focus") {
                    console.log("You got an undesired blue focus hero!")
                }
            }
        }
    }
    // Or Grey...
    if (targetColor === "Grey") {
        for (var i = 0; i < 5; i++) {
            if (circleHiddenArr[i] === "Grey") {
                SUMMONS++;
                ORBS += orbCost;
                reduceOrbCost();
                console.log("Summoned Grey orb.")
                var focusChecker = Math.floor(Math.random() * fiveFocusGreys) + 1;
                if (circleArr[i] === targetColor + " Five Star Focus" && fiveFocusGreys === focusChecker) {
                    console.log("You got your desired grey focus hero!")
                    isFocusGot = true;
                    console.log(totalSummons)
                    break;
                }
                else if (circleArr[i] === targetColor + " Five Star Focus") {
                    console.log("You got an undesired grey focus hero!")
                }
            }
        }
    }
    console.log("ORBS this circle: " + ORBS);
}

// Reduces the orb cost per circle based on how many summons already performed
function reduceOrbCost() {
    console.log(orbCost)
    if (SUMMONS > 0 && SUMMONS < 4) {
        orbCost = 4;
    } else if (SUMMONS === 4) {
        orbCost = 3;
    }
}


