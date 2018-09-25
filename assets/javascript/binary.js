var testArr = [0, 3, 5, 7, 8, 12, 14];

function test(arg) {


    var hi = testArr.length - 1
    var lo = 0;

    while (lo < hi) {

        hi = testArr.length - 1
        lo = 0;
        let mid = Math.floor(testArr.length / 2);

        console.log(testArr)
        console.log("mid: " + mid)

        if (arg < testArr[mid]) {

            testArr.length = mid;

        }

        if (arg > testArr[mid]) {

            testArr = testArr.slice(mid, testArr.length);
            console.log(testArr)

        }

        if (arg === testArr[mid]) {
            console.log(testArr)
            return console.log("The truth is in here!")
        }

        console.log(testArr.length)
    }

    console.log("NOpe")

}

test(14);