// ----------------- Variable Set-up

var pick = Math.random()
var threeRate = 0.36
var fourRate = 0.58
var fiveRate = 0.03
var fiveFocusRate = 0.03
var fiver = fiveRate + fiveFocusRate
var fourver = fiver + fourRate
var circleArray = [];

var uniqueFocuses = 3;

var focusArray = [];
var focusPicked = false;
var runs = 0;
var max = 0;
var trialSum = 0;
const numberTrials = 1;
var trials = 0;


// Focus Unit Set-up

for (var i = 1; i <= uniqueFocuses; i++) {
    focusArray.push((fiveFocusRate / uniqueFocuses) * i * 100)
}


// To Run the Trials

for (var i = 0; i < numberTrials; i++) {
    while (!circleArray.includes("W")) {
        runSim();
    }
    var numberOfSummons = circleArray.indexOf("W") + 1;
    console.log("Number of summons until desired unit: " + numberOfSummons);
    trialSum += numberOfSummons;
    circleArray = [];
    console.log(trialSum / numberTrials);
}

console.log("Average number of orbs for desired unit: " + (trialSum / numberTrials) * 4)




// ----------------- Functions

function runSim() {

    for (var j = 0; j < 5; j++) {
        var pick = Math.random();
        if (pick <= fiveFocusRate) {
            var item = focusArray[Math.floor(Math.random() * focusArray.length)];
            if (item === 1) {
                circleArray.push("W")
                resetRates();
            } else {
                circleArray.push("5*F")
                resetRates();
            }
        }
        if (pick > fiveFocusRate && pick <= fiver) {
            circleArray.push("5*")
            resetRates();
        }
        if (pick > fiver && pick <= fourver) {
            circleArray.push("4*")
        }
        if (pick > fourver) {
            circleArray.push("3*")
        } else {
            increaseRates();
        }

    }
}

function resetRates() {
    threeRate = 0.36;
    fourRate = 0.58;
    fiveRate = 0.03;
    fiveFocusRate = 0.03;
    console.log("RESET")

}

function increaseRates() {
    console.log("Five Rate: "+fiveRate);
    threeRate -= .001917
    fourRate -= .003083
    fiveRate += 0.0025
    fiveFocusRate += 0.0025;
}