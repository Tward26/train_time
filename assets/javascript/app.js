// Initialize Firebase
var config = {
    apiKey: "AIzaSyAxXOJnQroGY0yTZKWT78gsHXbLYHpha7U",
    authDomain: "train-time-24674.firebaseapp.com",
    databaseURL: "https://train-time-24674.firebaseio.com",
    projectId: "train-time-24674",
    storageBucket: "train-time-24674.appspot.com",
    messagingSenderId: "964127889488"
};
firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();
// Initial Values
var name = "";
var destination = "";
var firstTrain = 0;
var frequency = 0;



$("#submit").on("click", function (event) {
    event.preventDefault();

    name = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#firstTrainTime").val().trim();
    frequency = parseInt($("#frequency").val().trim());

    if (name === "" || destination === "" || firstTrain === "" || frequency === "") {
        $("#incompleteFormModal").modal("show");
    }
    else {
        database.ref().push({
            name: name,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        $("#newTrainModal").modal("show");
    }
    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrainTime").val("");
    $("#frequency").val("");
});

database.ref().orderByChild("dateAdded").on("child_added", function (childSnapshot) {

    var tFrequency = childSnapshot.val().frequency;
    var firstTime = childSnapshot.val().firstTrain;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

    // Current Time
    var currentTime = moment();

    // Difference between the times
    var diffTime = currentTime.diff(moment(firstTimeConverted), "minutes");

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;

    // Next Train
    var nextTrain = currentTime.add(tMinutesTillTrain, "minutes");

    var row = $("<tr>");
    var tdName = $("<td>").text(childSnapshot.val().name);
    var tdDestination = $("<td>").text(childSnapshot.val().destination);
    var tdFrequency = $("<td>").text(childSnapshot.val().frequency);
    var tdNextArrival = $("<td>").text(moment(nextTrain).format("hh:mm A"));
    var tdMinutesAway = $("<td>").text(tMinutesTillTrain);
    row.append(tdName, tdDestination, tdFrequency, tdNextArrival, tdMinutesAway);
    $("#tbody").append(row);

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
