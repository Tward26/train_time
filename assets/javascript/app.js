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
        alert("Please fill out the form");
    }
    else {
        database.ref().push({
            name: name,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        alert("New Train added");

    }
    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrainTime").val("");
    $("#frequency").val("");
});

database.ref().orderByChild("dateAdded").on("child_added", function (snapshot) {

    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().name);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().firstTrain);
    console.log(snapshot.val().frequency);

    var nextArrival = 0;
    var minutesAway = 0;

   
    var row = $("<tr>");
    var tdName = $("<td>").text(snapshot.val().name);
    var tdDestination = $("<td>").text(snapshot.val().destination);
    var tdFrequency = $("<td>").text(snapshot.val().frequency);
    var tdNextArrival = $("<td>").text(nextArrival);
    var tdMinutesAway = $("<td>").text(minutesAway);
    row.append(tdName, tdDestination, tdFrequency, tdNextArrival, tdMinutesAway);
    $("#tbody").append(row);

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

