const today = moment();
$('#currentDay').text (today.format('dddd, MMMM Do YYYY'));

for (let hour = 9; hour < 18; hour++) {
    $('.container').append(`<div class="row">
    <div class="hour col-2 text-center p-3">${workDayHour(hour)}</div>
    <div class="description col-8 ${pastPresentFuture(hour)} p-0"><textarea class="col-12 h-100"></textarea></div>
    <button class="saveBtn col-2"><i class="fas fa-save"></i></button>
    </div>`);
}

function workDayHour(time) {
    const now = moment();
    now.hours(time);
    return now.format('ha');
}

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
