var testArr = [0, 4, 7, 10, 20, 50, 100]

function test(orbs, arr) {
    var hi = arr.length - 1
    var lo = 0;
    while (lo < hi) {
        hi = arr.length - 1
        lo = 0;
        var mid = Math.floor(arr.length / 2);
        console.log(arr)
        console.log("mid: " + mid)
        console.log("hi: " + hi)
        if (orbs < arr[mid]) {
            arr.length = mid;
        }
        if (orbs > arr[mid]) {
            arr = arr.slice(mid, arr.length);
            console.log(arr)
        }
        if (orbs === arr[mid]) {
            console.log(arr)
            console.log("Final result: " + arr[mid]);
            return console.log("The truth is in here!")
        }
        console.log(arr.length)
    }
    console.log("Final result: " + arr[mid]);
}
test(49, testArr);