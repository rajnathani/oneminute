/* Config */
var pool_interval = 1; // Enter recalculating time in number of milliseconds, more at github.com/relfor/oneminute/README.md


function cur_utc() {
    return new Date().getTime() / 1000;
}

var month_mapper = {0:'Jan', 1:'Feb', 2:'Mar', 3:'Apr', 4:'May', 5:'Jun', 6:'Jul',
    7:'Aug', 8:'Sep', 9:'Oct', 10:'Nov', 11:'Dec'};


function time_engineer() {
    var all_elements = document.getElementsByTagName('*');
    var cur_element, cur_timestamp, time_diff_pref;
    for (var i = 0; i < all_elements.length; i++) {
        cur_element = all_elements[i];
        if (cur_element.getAttribute('data-timestamp') !== null) {
            cur_timestamp = parseInt(cur_element.getAttribute('data-timestamp'));

            time_diff_pref = cur_element.getAttribute('data-time-mode');
            if (time_diff_pref === null || time_diff_pref === '0') {
                cur_element.innerHTML = date_format(cur_timestamp);
            } else if (time_diff_pref === '1') {

                cur_element.innerHTML = time_diff(cur_timestamp);
                cur_element.title = date_format(cur_timestamp);

            } else {
                cur_element.innerHTML = date_format(cur_timestamp) + ' (' + time_diff(cur_timestamp) +')'

            }
        }
    }
}

function date_format(t) {
    var date = new Date(t * 1000 + 60000);
    return  date.getDate() + ' ' + month_mapper[date.getMonth()] + ' ' + date.getFullYear();
}

function time_diff(t) {
    t = parseInt(t);
    var utc = cur_utc();
    var seconds_diff = (utc - t);
    var future = seconds_diff < 0;
    var minutes_diff = Math.floor(seconds_diff / 60);
    var hours_diff = Math.floor(minutes_diff / 60);
    var days_diff = Math.floor(hours_diff / 24);
    var weeks_diff = Math.floor(days_diff/7);
    var months_diff = Math.floor(days_diff / 30);
    var year_diff = Math.floor(days_diff / 365);


   var base_string;
   var needs_suffix = true;
   console.log(seconds_diff);
    if (seconds_diff < 25) {
        base_string = 'few seconds';
    }
    else if (seconds_diff < 40) {
        base_string = 'about 30 seconds';
    } else if (seconds_diff < 60) {
        base_string = 'less than a minute';
    }
    else if (minutes_diff < 2) {
        base_string = 'one minute';

    } else if (minutes_diff <= 60) {
        base_string =  minutes_diff + ' minutes';

    } else if (hours_diff <= 2) {
        base_string =  'one hour';
    } else if (hours_diff < 24) {
        base_string =  hours_diff + ' hours';
    }
    else if (days_diff < 2) {
        needs_suffix = false;
        base_string = future ? 'tomorrow' : 'yesterday';
    }
    else if (weeks_diff < 1) {
        base_string = days_diff + ' days';
    }
    else if (weeks_diff < 2) {
        base_string = 'one week';
    }

    else if (months_diff < 1) {
        base_string = (Math.floor(days_diff / (7)) + ' weeks');
    }
    else if (months_diff < 2) {
        base_string =  'a month';
    } else if (year_diff < 1) {
        base_string =  months_diff + ' months';
    } else if (year_diff < 2) {
        base_string =  'one year';
    }
    else if (year_diff < 100){
        base_string =  year_diff + " years";
    }
    else if (year_diff === 100) {
        base_string =  "a century"
    }
    else if (year_diff < 1000) {
        base_string =  Math.floor(year_diff/100) + " centuries";
    } else if (year_diff === 1000) {
        base_string =  "a millennium"
    } else {
        base_string =  Math.floor(year_diff/1000) + " millennia";
    }

    return needs_suffix ? (future ? base_string + " from now" : base_string + " ago") : base_string;
}


time_engineer();


var oneminute_recalculator = setInterval(time_engineer, 1);













