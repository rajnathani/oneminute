/* Config */
var oneminute_interval = 10; // Enter recalculating time in number of milliseconds, more at github.com/relfor/oneminute/README.md


function cur_timestamp() {
    return new Date().getTime() / 1000;
}


var month_mapper = {0:'Jan', 1:'Feb', 2:'Mar', 3:'Apr', 4:'May', 5:'Jun', 6:'Jul',
    7:'Aug', 8:'Sep', 9:'Oct', 10:'Nov', 11:'Dec'};

function gimme_oneminute(timestamp,time_mode){
    if (!time_mode || time_mode === 0){
        return ts_diff(timestamp);
    } else if  (time_mode === 1){
        return ts_date(timestamp);
    } else {
    return ts_date(timestamp) + ' (' + ts_diff(timestamp) +')'  ;
    }
}

function oneminute() {

    var all_elements = document.getElementsByTagName('*');
    var cur_element, cur_timestamp, ts_diff_pref;
    for (var i = 0; i < all_elements.length; i++) {
        cur_element = all_elements[i];
        if (cur_element.getAttribute('data-timestamp') !== null) {
            cur_timestamp = parseInt(cur_element.getAttribute('data-timestamp'));

            ts_diff_pref = cur_element.getAttribute('data-time-mode');
            if (ts_diff_pref === null || ts_diff_pref === '0') {
                cur_element.innerHTML = gimme_oneminute(cur_timestamp);
                cur_element.title = ts_date(cur_timestamp);

            } else if (ts_diff_pref === '1') {
                cur_element.innerHTML = gimme_oneminute(cur_timestamp,1);


            } else {
                cur_element.innerHTML = gimme_oneminute(cur_element,2);

            }
        }
    }
}

function ts_date(timestamp) {
    var date = new Date(timestamp * 1000 + 60000);
    return  date.getDate() + ' ' + month_mapper[date.getMonth()] + ' ' + date.getFullYear();
}

function ts_diff(timestamp) {
    timestamp = parseInt(timestamp);
    var ts = cur_timestamp();

    var seconds_diff = (ts - timestamp);
    var future = seconds_diff < 0;
    seconds_diff = Math.abs(seconds_diff);
    var minutes_diff = Math.floor(seconds_diff / 60);
    var hours_diff = Math.floor(minutes_diff / 60);
    var days_diff = Math.floor(hours_diff / 24);
    var weeks_diff = Math.floor(days_diff/7);
    var months_diff = Math.floor(days_diff / 30);
    var year_diff = Math.floor(days_diff / 365);


   var base_string;
   var needs_suffix = true;

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
    else if (year_diff === 1000) {
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


oneminute();



var oneminute_rescanner = setInterval(oneminute, oneminute_interval);







