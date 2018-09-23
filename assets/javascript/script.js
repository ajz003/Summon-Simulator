

$("#red-down").on("click", function() {

fiveFocusReds = $("#red-orbs").attr("value");

if (fiveFocusReds)

fiveFocusReds--;

$("#red-orbs").attr("value", fiveFocusReds);

})