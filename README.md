# Remainder

## Description
This repository contains code for a Remainder application implemented in JavaScript. It allows users to set reminders for taking medication and displays them in a table format.

## Usage
1. Fill in the medication name and reminder time in the form fields.
2. Click the "Add Reminder" button to add the reminder to the list.
3. View the list of reminders in the table format.
4. Click the "Delete" button next to a reminder to remove it from the list.
5. Acknowledge reminder alerts by clicking the "OK" button.



## DOM Elements
- `time`: Element to display the current time.
- `form`: Form element for adding medication reminders.
- `name`: Input field for medication name.
- `remainder`: Input field for reminder time.
- `tbody`: Table body to display medication reminders.
- `alert`: Container for alert message.
- `message`: Element to display alert messages.
- `ok`: Button to acknowledge and dismiss the alert.

## Data
- `remainders`: Array to store medication reminder objects containing name and time.

## displayTime function
The `displayTime` function updates the time displayed on the webpage every second.

- `currentTime.getHours()`, `currentTime.getMinutes()`, `currentTime.getSeconds()`: Retrieves the current hour, minute, and second from the `Date` object `currentTime`.

- `(hours < 10 ? "0" : "")`, `(minutes < 10 ? "0" : "")`, `(seconds < 10 ? "0" : "")`: Adds a leading zero to hours, minutes, and seconds if they are less than 10.

- `time.innerHTML`: Updates the HTML content of the element with the ID "time" to display the current time in the format "HH:MM:SS".

- `setInterval(displayTime, 1000)`: Calls the `displayTime` function every 1000 milliseconds (1 second) to continuously update the displayed time.

## deleteRemainder function
The `deleteRemainder` function is responsible for removing reminders from the list when the user clicks on the delete button associated with each reminder.

- `event.target.classList`: This property provides access to the classList of the element that triggered the event. It returns a DOMTokenList containing all the classes of the element.

- `event.target.parentNode`: This property refers to the parent node of the element that triggered the event. In this context, it's used to navigate to the parent element of the delete button.

- `event.target.parentNode.parentNode.rowIndex`: This property retrieves the position of the table row (`<tr>`) within its parent table, starting from 0. It's a useful way to identify the row that needs to be deleted.

- `row.rowIndex - 1`: This expression calculates the index of the reminder in the `remainders` array by subtracting 1 from the rowIndex property of the table row. Since rowIndex is zero-based and the array is zero-indexed, this adjustment ensures that the correct reminder is targeted for deletion.

- `remainders.splice(index, 1)`: This line removes one element from the `remainders` array at the specified index. It effectively deletes the corresponding reminder from the array.
