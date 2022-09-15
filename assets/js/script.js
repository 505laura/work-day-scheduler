// Get stored events for the current day from local storage
const events = JSON.parse(localStorage.getItem(moment().format('dddd, MMMM Do')) || '[]');

// Add text displaying the current date in the header
const today = moment();
$('#currentDay').text(today.format('dddd, MMMM Do YYYY'));

// Create 9 timeblocks for each hour of the work day
for (let hour = 9; hour < 18; hour++) {
    $('.container').append(`<div class="row">
    <div class="hour col-2 text-center p-3">${workDayHour(hour)}</div>
    <div class="description col-8 ${pastPresentFuture(hour)} p-0"><textarea class="col-12 h-100">${events[hour] || ''}</textarea></div>
    <button data-hour="${hour}" class="saveBtn col-2"><i class="fas fa-save"></i></button>
    </div>`);
}

// Convert hour as a number into human readable hour
function workDayHour(time) {
    const now = moment();
    now.hours(time);
    return now.format('ha');
}

// Determine the hour of the day to be a past, present or future hour of the current time
function pastPresentFuture(time) {
    const currentTime = moment().hour();
    if (currentTime == time) {
        return 'present';
    } else if (currentTime > time) {
        return 'past';
    } else {
        return 'future';
    }
}

// Save the text corresponding to the save button clicked to local storage
function saveText(event) {
    const buttonClicked = $(event.target);
    const el = buttonClicked.siblings('.description').children().eq(0);
    events[buttonClicked.data('hour')] = el.val();
    localStorage.setItem(moment().format('dddd, MMMM Do'), JSON.stringify(events));
}

// Attach saveText function to the save buttons
$('button').on('click', saveText);