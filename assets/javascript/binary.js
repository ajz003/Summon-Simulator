var testArr = [14, 14, 23, 35, 37, 38, 39, 45, 45, 52, 52, 54, 57, 59, 71, 74, 75, 79, 88, 88, 120, 155, 164, 176, 195]

function find(orbs, arr) {

    // Setting up additional arrays to avoid changing the parameter arr

    var originalArr = arr.slice();
    var slicedArr = arr.slice()

    // Binary Search
    var hi = slicedArr.length - 1
    var lo = 0;
    while (lo < hi) {
        hi = slicedArr.length - 1
        lo = 0;
        var mid = Math.floor(slicedArr.length / 2);
        console.log(slicedArr)
        console.log("mid: " + mid)
        console.log("hi: " + hi)
        console.log("orbs: " + orbs)
        if (orbs < slicedArr[mid]) {
            slicedArr.length = mid;
        }
        if (orbs > slicedArr[mid]) {
            slicedArr = slicedArr.slice(mid, slicedArr.length);
            console.log(slicedArr)
        }
        if (orbs === slicedArr[mid]) {
            console.log(slicedArr)
            console.log("Final result: " + slicedArr[mid]);
            hi = 1
            lo = 3

        }
        console.log("test: "+ slicedArr.length)
    }
    console.log("Final result: " + slicedArr[mid]);
    var midIndex = slicedArr[mid]
console.log("index of: " + originalArr.indexOf(midIndex))


console.log("orig arr.length: " + originalArr.length)
return (((originalArr.indexOf(midIndex)+1)/originalArr.length)*100)

}
