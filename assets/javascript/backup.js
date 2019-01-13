// ----------------------- Variable Set-up
// Initial Summon Rates
var threeRate;
var fourRate;
var fiveRate;
var fiveFocusRate;

// Variables Used to Set Ranges to Intepret Math.random() for Rarity Picking
var anyFiveRate = fiveRate + fiveFocusRate
var fourAndFiveRate = anyFiveRate + fourRate

// Focus Unit Numbers
var fiveFocusReds;
var fiveFocusGreens;
var fiveFocusBlues;
var fiveFocusGreys;
var fiveFocusTotal = fiveFocusReds + fiveFocusGreens + fiveFocusBlues + fiveFocusGreys;
// Five Star Unit Numbers
var fiveReds;
var fiveGreens;
var fiveBlues;
var fiveGreys;
var fiveTotal = fiveReds + fiveGreens + fiveBlues + fiveGreys;
// Four Star Unit Numbers
var fourReds;
var fourGreens;
var fourBlues;
var fourGreys;
var fourTotal = fourReds + fourGreens + fourBlues + fourGreys;
// Three Star Unit Numbers
var threeReds;
var threeGreens;
var threeBlues;
var threeGreys;
var threeTotal = threeReds + threeGreens + threeBlues + threeGreys;

// Variables Used to Set Ranges to Intepret Math.random() for Color Picking
var FiveFocusRedGreen = ((fiveFocusReds + fiveFocusGreens) / fiveFocusTotal)
var FivefocusRedGreenBlue = ((fiveFocusReds + fiveFocusGreens + fiveFocusBlues) / fiveFocusTotal)
var FiveRedGreen = ((fiveReds + fiveGreens) / fiveTotal)
var FiveRedGreenBlue = ((fiveReds + fiveGreens + fiveBlues) / fiveTotal)
var FourRedGreen = ((fourReds + fourGreens) / fourTotal)
var FourRedGreenBlue = ((fourReds + fourGreens + fourBlues) / fourTotal)
var ThreeRedGreen = ((threeReds + threeGreens) / threeTotal)
var ThreeRedGreenBlue = ((threeReds + threeGreens + threeBlues) / threeTotal)

// Arrays to represent the summoning circle
var circleHiddenArr = [];
var circleArr = [];
// Summon Tracker

var SUMMONS = 0;
var ORBS = 0;
var j = 0;
var k = 0;
var totalSummons = 0;
var summonsUntilBroken = 0;
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

$("#focus-type").on("change", function () {

    let focusType = $("#focus-type").val();

    if (focusType === "legendary") {
        $("#red-orbs").val(3);
        $("#green-orbs").val(3);
        $("#blue-orbs").val(3);
        $("#grey-orbs").val(3);
    }

    if (focusType === "hero-fest") {
        $("#red-orbs").val(1);
        $("#green-orbs").val(1);
        $("#blue-orbs").val(1);
        $("#grey-orbs").val(1);
    }

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

    let focusRed = $("#red-orbs").val();
    let focusBlue = $("#blue-orbs").val();
    let focusGreen = $("#green-orbs").val();
    let focusGrey = $("#grey-orbs").val();

    console.log(parseInt(focusRed))
    console.log(parseInt(focusBlue))
    console.log(parseInt(focusGreen))
    console.log(parseInt(focusGrey))

    // Error Messages

    if (parseInt(focusRed) === 0 && parseInt(focusBlue) === 0 && parseInt(focusGreen) === 0 && parseInt(focusGrey) === 0) {
        $("#error-section").css("visibility", "visible");
        $("#error-message").html("Please set the number of focus heroes.");
    } else if (!$(".orb").hasClass("selectedOrb")) {
        $("#error-section").css("visibility", "visible");
        $("#error-message").html("Please pick which color you wish to snipe.");
    }
    else {

        $("#error-section").css("visibility", "hidden");

        targetTrials = $("#trials").val().trim();
        console.log(targetTrials);


        // Comment the below line out to see the summons happen in real-time in the console logs
        // console.log = function () { };

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

            if (std === "NaN") {
                $("#average").html(`Average (with standard deviation): ${average} orbs`);
            } else {
                $("#average").html(`Average (with standard deviation): ${average} ± ${std} orbs`);
            }


            // Statistics Display

            console.log("Average ± Standard Deviation: " + average + " ± " + std);
            console.log("Average ± Standard Deviation (for +10): " + average * 11 + " ± " + std * 11);
            console.log("Standard Error of the Mean: " + sem);

            console.log("25% chance: " + totalOrbsArr[Math.floor(totalOrbsArr.length * 0.25)]);
            console.log("75% chance to get focus: " + totalOrbsArr[Math.floor(totalOrbsArr.length * 0.75)]);
            console.log("90% chance to get focus: " + totalOrbsArr[Math.floor(totalOrbsArr.length * 0.90)]);
            console.log("95% chance to get focus: " + totalOrbsArr[Math.floor(totalOrbsArr.length * 0.95)]);

            let focus25 = totalOrbsArr[Math.floor(totalOrbsArr.length * 0.25)];
            let focus75 = totalOrbsArr[Math.floor(totalOrbsArr.length * 0.75)];
            let focus90 = totalOrbsArr[Math.floor(totalOrbsArr.length * 0.90)];
            let focus95 = totalOrbsArr[Math.floor(totalOrbsArr.length * 0.95)];
            let focus10 = Math.round(average * 11);

            $("#focus-25").html(`25% chance: ${focus25} orbs`);
            $("#focus-75").html(`75% chance: ${focus75} orbs`);
            $("#focus-90").html(`90% chance: ${focus90} orbs`);
            $("#focus-95").html(`95% chance: ${focus95} orbs`);
            $("#focus-10-average").html(`Average to get +10: ${focus10} orbs`);


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

        }

        if (checkColor === false) {
            $("#error-section").css("visibility", "visible");
            $("#error-message").html("The number of focus heroes in your selected color must be greater than 0.");
        }

    }

});

$("#with-these-orbs-submit").on("click", function () {

    if (totalOrbsArr.length > 0) {

        let orbsHave = parseFloat($("#with-these-orbs").val());
        console.log("total orbs arr: " + totalOrbsArr)
        let result = find(orbsHave, totalOrbsArr);
        if (parseFloat(result) === 100) {
            $("#with-these-orbs-result").html("The highest trial cost " + totalOrbsArr[totalOrbsArr.length - 1] + " orbs. Your entry of " + orbsHave + " orbs exceeds that amount.")
        } else {
            $("#with-these-orbs-result").html("Chance to get focus with your amount of orbs: " + result + "%")
        }

    } else {
        $("#with-these-orbs-result").html("<span class='error'>Please Summon first.</span>")
    }

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

    console.log("snipeColor: " + snipeColor)

    while (isFocusGot === false) {

        pityCounter = Math.floor(summonsUntilBroken / 5);
        console.log("pity counter: " + pityCounter)

        let focusType = $("#focus-type").val();

        // this is the one that matters
        switch (focusType) {
            case "regular":
                threeRate = 0.36 - ((0.36/(0.36+0.58)) * pityCounter * 0.005);
                fourRate = 0.58 - ((0.58/(0.36+0.58)) * pityCounter * 0.005);
                fiveRate = 0.03 + ((0.03/(0.03+0.03)) * pityCounter * 0.005);
                fiveFocusRate = 0.03 + ((0.03/(0.03+0.03)) * pityCounter * 0.005);
                break;
            case "legendary":
                threeRate = 0.34 - ((0.34/(0.34+0.58)) * pityCounter * 0.005);
                fourRate = 0.58 - ((0.58/(0.34+0.58)) * pityCounter * 0.005);
                fiveRate = 0;
                fiveFocusRate = 0.08 + ((0.08/(0.08+0)) * pityCounter * 0.005);
                break;
            case "hero-fest":
                threeRate = 0.34 - ((0.34/(0.34+0.58)) * pityCounter * 0.005);
                fourRate = 0.58 - ((0.58/(0.34+0.58)) * pityCounter * 0.005);
                fiveRate = 0.03 + ((0.03/(0.03+0.05)) * pityCounter * 0.005);
                fiveFocusRate = 0.05 + ((0.05/(0.03+0.05)) * pityCounter * 0.005);
                break;

        }

        console.log("--------------")
        console.log("threerate: " + threeRate)
        console.log("fourrate: " + fourRate)
        console.log("fiverate: " + fiveRate)
        console.log("fiveFocusrate: " + fiveFocusRate)
        console.log("--------------")
        createSummonCircle();
        console.log(circleArr);
        console.log(circleHiddenArr);
        snipeCircle(snipeColor);
        totalSummons += SUMMONS;
        summonsUntilBroken += SUMMONS;
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
    summonsUntilBroken = 0;
    fiveFocusReds = parseFloat($("#red-orbs").val())
    fiveFocusGreens = parseFloat($("#green-orbs").val())
    fiveFocusBlues = parseFloat($("#blue-orbs").val())
    fiveFocusGreys = parseFloat($("#grey-orbs").val())
}

function init() {

    reset();

    let focusType = $("#focus-type").val();

    // this switch just sets the rates as numbers
    switch (focusType) {
        case "regular":
            threeRate = 0.36 - (0.0019125 * pityCounter);
            fourRate = 0.58 - (0.0030875 * pityCounter);
            fiveRate = 0.03 + (0.0025 * pityCounter);
            fiveFocusRate = 0.03 + (0.0025 * pityCounter);
            break;
        case "legendary":
            threeRate = 0.36 - (0.00184 * pityCounter);
            fourRate = 0.58 - (0.00316 * pityCounter);
            fiveRate = 0;
            fiveFocusRate = 0.08 + (0.005 * pityCounter);
            break;
        case "hero-fest":
            threeRate = 0.34 - (0.0019125 * pityCounter);
            fourRate = 0.58 - (0.0030875 * pityCounter);
            fiveRate = 0.03 + (0.0025 * pityCounter);
            fiveFocusRate = 0.05 + (0.0025 * pityCounter);
            break;

    }

    console.log(threeRate, fourRate, fiveRate, fiveFocusRate)

    // Variables Used to Set Ranges to Intepret Math.random() for Rarity Picking
    anyFiveRate = fiveRate + fiveFocusRate
    fourAndFiveRate = anyFiveRate + fourRate
    // Focus Unit Numbers
    fiveFocusReds = parseFloat($("#red-orbs").val())
    fiveFocusGreens = parseFloat($("#green-orbs").val())
    fiveFocusBlues = parseFloat($("#blue-orbs").val())
    fiveFocusGreys = parseFloat($("#grey-orbs").val())
    fiveFocusTotal = fiveFocusReds + fiveFocusGreens + fiveFocusBlues + fiveFocusGreys;
    // Five Star Unit Numbers
    fiveReds = 40;
    fiveBlues = 27;
    fiveGreens = 20;
    fiveGreys = 17;
    fiveTotal = fiveReds + fiveGreens + fiveBlues + fiveGreys;
    // Four Star Unit Numbers
    fourReds = 32;
    fourBlues = 29;
    fourGreens = 19;
    fourGreys = 28;
    fourTotal = fourReds + fourGreens + fourBlues + fourGreys;
    // Three Star Unit Numbers
    threeReds = 28;
    threeBlues = 25;
    threeGreens = 18;
    threeGreys = 25;
    threeTotal = threeReds + threeGreens + threeBlues + threeGreys;
    // Variables Used to Set Ranges to Intepret Math.random() for Color Picking
    FiveFocusRedGreen = ((fiveFocusReds + fiveFocusGreens) / fiveFocusTotal)
    FivefocusRedGreenBlue = ((fiveFocusReds + fiveFocusGreens + fiveFocusBlues) / fiveFocusTotal)
    FiveRedGreen = ((fiveReds + fiveGreens) / fiveTotal)
    FiveRedGreenBlue = ((fiveReds + fiveGreens + fiveBlues) / fiveTotal)
    FourRedGreen = ((fourReds + fourGreens) / fourTotal)
    FourRedGreenBlue = ((fourReds + fourGreens + fourBlues) / fourTotal)
    ThreeRedGreen = ((threeReds + threeGreens) / threeTotal)
    ThreeRedGreenBlue = ((threeReds + threeGreens + threeBlues) / threeTotal)
    // Arrays to represent the summoning circle
    circleHiddenArr = [];
    circleArr = [];
    // Summon Tracker
    SUMMONS = 0;

    totalOrbsArr = [];
    trials = 0;

    console.log("Five Focus Total: " + fiveFocusTotal)
    console.log("Five Total: " + fiveTotal)
    console.log("Four Total: " + fourTotal)
    console.log("Three Total:  " + threeTotal)

    function conLog(x) {
        for (let i = 0; i < x.length; i++) {
            console.log(x[i])
        }
    }

    let conArr = [fiveFocusReds / fiveFocusTotal, FiveFocusRedGreen, FivefocusRedGreenBlue, FiveRedGreen, FiveRedGreenBlue, FourRedGreen, FourRedGreenBlue, ThreeRedGreen, ThreeRedGreenBlue]

    conLog(conArr)

}

// Fills an array to represent the Summoning Circle:
function createSummonCircle() {

    circleHiddenArr = [];
    circleArr = [];
    SUMMONS = 0;

    // Track number of orbs spent in this circle, sets it to 0 everytime a new circle is summoned.
    ORBS = 0;

    orbCost = 5;

    // Fills the arrays with random heroes, picking by rarity first, and then by color
    for (var i = 0; i < 5; i++) {

        let rarityPick = Math.random()

        // By rarity... (this is for Focus Five Stars)

        if (rarityPick <= fiveFocusRate) {
            let colorPick = Math.random();
            console.log("colorPick: " + colorPick)
            // Then by color..
            if (colorPick < (fiveFocusReds / fiveFocusTotal)) {
                circleHiddenArr.push("Red")
                circleArr.push("Red Five Star Focus")
            }
            if (colorPick >= (fiveFocusReds / fiveFocusTotal) && colorPick < FiveFocusRedGreen) {
                circleHiddenArr.push("Green")
                circleArr.push("Green Five Star Focus")
            }
            if (colorPick >= FiveFocusRedGreen && colorPick < FivefocusRedGreenBlue) {
                circleHiddenArr.push("Blue")
                circleArr.push("Blue Five Star Focus")
            }
            if (colorPick >= FivefocusRedGreenBlue) {
                circleHiddenArr.push("Grey")
                circleArr.push("Grey Five Star Focus")
            }
        }
        // Same as above, except for Five Star Rarity
        if (rarityPick > fiveFocusRate && rarityPick <= anyFiveRate) {
            let colorPick = Math.random();
            console.log("colorPick: " + colorPick)
            if (colorPick < (fiveReds / fiveTotal)) {
                circleHiddenArr.push("Red")
                circleArr.push("Red Five Star")
            }
            if (colorPick >= (fiveReds / fiveTotal) && colorPick < FiveRedGreen) {
                circleHiddenArr.push("Green")
                circleArr.push("Green Five Star")
            }
            if (colorPick >= FiveRedGreen && colorPick < FiveRedGreenBlue) {
                circleHiddenArr.push("Blue")
                circleArr.push("Blue Five Star")
            }
            if (colorPick >= FiveRedGreenBlue) {
                circleHiddenArr.push("Grey")
                circleArr.push("Grey Five Star")
            }
        }
        // Same as above, except for Four Star Rarity
        if (rarityPick > anyFiveRate && rarityPick <= fourAndFiveRate) {
            let colorPick = Math.random();
            console.log("colorPick: " + colorPick)
            if (colorPick < (fourReds / fourTotal)) {
                circleHiddenArr.push("Red")
                circleArr.push("Red Four Star")
            }
            if (colorPick >= (fourReds / fourTotal) && colorPick < FourRedGreen) {
                circleHiddenArr.push("Green")
                circleArr.push("Green Four Star")
            }
            if (colorPick >= FourRedGreen && colorPick < FourRedGreenBlue) {
                circleHiddenArr.push("Blue")
                circleArr.push("Blue Four Star")
            }
            if (colorPick >= FourRedGreenBlue) {
                circleHiddenArr.push("Grey")
                circleArr.push("Grey Four Star")
            }
        }
        // Same as above, except for Three Star Rarity
        if (rarityPick > fourAndFiveRate) {
            let colorPick = Math.random();
            console.log("colorPick: " + colorPick)
            if (colorPick < (threeReds / threeTotal)) {
                circleHiddenArr.push("Red")
                circleArr.push("Red Three Star")
            }
            if (colorPick >= (threeReds / threeTotal) && colorPick < ThreeRedGreen) {
                circleHiddenArr.push("Green")
                circleArr.push("Green Three Star")
            }
            if (colorPick >= ThreeRedGreen && colorPick < ThreeRedGreenBlue) {
                circleHiddenArr.push("Blue")
                circleArr.push("Blue Three Star")
            }
            if (colorPick >= ThreeRedGreenBlue) {
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
                    summonsUntilBroken = 0;
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
                    summonsUntilBroken = 0;
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
                    console.log("Total heroes pulled: " + totalSummons)
                    break;
                }
                else if (circleArr[i] === targetColor + " Five Star Focus") {
                    console.log("You got an undesired blue focus hero!")
                    summonsUntilBroken = 0;
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
                    summonsUntilBroken = 0;
                }
            }
        }
    }
    console.log("ORBS spent on this circle: " + ORBS);
}

// Reduces the orb cost per circle based on how many summons already performed
function reduceOrbCost() {
    console.log(orbCost + " orbs spent.")
    if (SUMMONS > 0 && SUMMONS < 4) {
        orbCost = 4;
    } else if (SUMMONS === 4) {
        orbCost = 3;
    }
}


