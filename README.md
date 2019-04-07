# Train Time
*Train time table app using firebase real-time database*

## Purpose:
I wanted to develop a simple train time table website that could take in some basic form data, and then do some basic math on the input to tell you when the next train would arrive and how many minutes away it was, while displayed all this data in a table format.

## How it works:
The firebase database is initialized and then the information gathered from the add train form is passed in to firebase and stored. The form is then cleared out for new entries. This information is then pulled back from firebase and used to to populate the table along with some calculations to determine the how far away the train is and when the next train will be scheduled to arrive at the station. Most of this math was provided for me by a previous exercise.

## How to use:
The add train form must be completely filled out for submission to be accepted. The name and destination of the train are simply strings that perform no functionality. The first train time must be put in using an HH:MM format using military time, i.e. 01:00 PM = 13:00, 02:00PM = 14:00, and so on. Lastly a frequency of how often the train runs in minutes must be put in. The train time and frequency are what is used to perform the calculations on the back end. The table will autopopulate as new trains are added because it is linked to the real-time firebase database.

## Functionality to add:
I initially attempted to add the ability to update and remove trains from the time table. This was done by giving each train a unique id key and by targeting children of this key with updates or removal. After several hours of only getting various pieces to work over a several day period the idea was scrapped as I was also working on the 1st project for bootcamp which took precedence. If given more time I think I could get this functionality working but I would need to not also be working on the project at the same time.

## Contributors:
This project is maintained and contributed to solely by myself, Tyler Ward. All images used were taken by me at the Grand Canyon National Park.