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
const numberTrials = 1000;
var trials = 0;

for (var i = 1; i <= uniqueFocuses; i++) {
    focusArray.push((fiveFocusRate / uniqueFocuses) * i * 100)
}

console.log(focusArray);

function runSim() {

    for (var i = 0; i < numberTrials; i++) {
        runs++

        while (circleArray.indexOf("W") === -1) {

            for (var j = 0; j < 5; j++) {

                var pick = Math.random();
                if (pick <= fiveFocusRate) {
                    var item = focusArray[Math.floor(Math.random() * focusArray.length)];
                    if (item === 1) {
                        console.log("winner")
                        console.log(pick)
                        console.log("Sets of 5 before success: " + runs)
                        circleArray.push("W")
                    } else {
                        circleArray.push("5*F")
                    }
                }
                if (pick > fiveFocusRate && pick <= fiver) {
                    circleArray.push("5*")
                }
                if (pick > fiver && pick <= fourver) {
                    circleArray.push("4*")
                }
                if (pick > fourver) {
                    circleArray.push("3*")
                }

            }

            var numberToSummon = circleArray.indexOf("W");
            console.log("Number of Summons before Target: " + numberToSummon+1);
        }
        trialSum += (numberToSummon + 1);

    }

    console.log(trialSum)
    console.log(numberTrials)
    console.log("Average number of summons to get Target: " + (trialSum / numberTrials))
}

runSim();