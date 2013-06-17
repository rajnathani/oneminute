oneminute
=========

javascript library for in displaying time differences and dates on html pages.
The API and download links can be found at on its webpage: [oneminute.relfor.co](http://oneminute.relfor.co).

#about oneminute.js

Big websites like facebook, google, github, etc. display a lot of content, many parts of this content can
be viewed as time based events, there was some time in the past (or maybe even the future) where
the event takes place. For instance on facebook when one posts a comment, along with the content of the comment
there will be displayed something indicating the time of the posting, example: '3 minutes ago', 'yesterday', '2 months
ago', etc. To see these in live action just scroll up a bit to the project files of oneminute's repository, in the 2nd
column of the table, information is given as to when the last commit was made for the respective files.  
To get this
functionality with elegance oneminute.js was made.

#API

    <html>
      <body>
        blah blah blah
        <span data-timestamp="{timestamp}"></span>
        blah blah blah
        <span data-timestamp="{timestamp}"></span>
        blah blah blah
        <span data-timestamp="{timestamp}"></span>
        blah blah blah
      </body>
      <script src="oneminute.js"</span>
    </html>



The above html (with oneminute.js included at the bottom) will result in the span tags to obtain a text of the textual time difference, for example : "2 years ago", "3 hours ago","2 weeks from now", etc.
Note that span tags were used in the above example however any html tag (eg: div, p, abbr, ...) can be used.  

However besides textual time differences you might want to display the date? or maybe even both the textual time difference as well as the date? for that the following span tag:  

    <span data-timestamp="{timestamp}"></span>
  
would instead needed to supplied with one more data attribute, which is data-time-mode:  

    <span data-timestamp="{timestamp}" data-time-mode="{0/1/2}"></span>

The data-time-mode attribute has 3 possible options:

- 0 (by default when the attribute is not specified)  
This results in the textual time difference between the current local timestamp with the timestamp specified by data-timestamp, example: "1 week ago". The title of the html tag will be set to the date of the timestamp specified by data-timestamp, example: "23 Jan 2012".
- 1  
This results in the date of the timestamp specified by data-timestamp, example: "23 Jan 2012".
- 2  
This results in a combination of the above textual time difference and data (with respect to the timestamp specified by data-timestamp), where the date comes first and the textual time difference enclosed in parentheses occurs thereafter example: "23 Jan 2012 (one year ago)".

The library contains *5* functions, *1* setInterval variable & *1* environment variable:
###functions:  

- `cur_timestamp()`  
  Returns the current integer timestamp of the local computer (browser) in seconds, and not in milliseconds which is JavaScript's default.
  
- `ts_diff(timestamp)`  
  Returns a string representing the textual difference in time between the current local timestamp and the timestamp given by the parameter timestamp.  
  Example: 11 minutes ago.

- `ts_date(timestamp)`  
  Returns a string representing the date of the timestamp timestamp (this is what will be returned when one sets data-time-mode to 1).  
  Example: 4 July 1776.

- `gimme_oneminute(timestamp, time_mode)`  
  Returns the following depending on the time_mode specified:
  - 0 (by default when the attribute is not specified)  
This results in the textual time difference between the current local timestamp with the timestamp specified by data-timestamp, example: "1 week ago". The title of the html tag will be set to the date of the timestamp specified by data-timestamp, example: "23 Jan 2012".
  - 1  
  This results in the date of the timestamp specified by data-timestamp, example: "23 Jan 2012".
  - 2  
  This results in a combination of the above textual time difference and data (with respect to the timestamp specified by data-timestamp), where the date comes first and the textual time difference enclosed in parentheses occurs thereafter example: "23 Jan 2012 (one year ago)".  

- `oneminute()`  
  Loops through the html document find tags (span,div,i,etc.. any tag) which contains data-timestamp and optionally data-time-mode, and provides the inner html of the tag as dictated by rules of gimme_oneminute(timestamp, time_mode, where the value of data-timestamp is the parameter timestamp, and the value of  data-time-mode is the parameter time_mode. Internally oneminute() (obviously) uses gimme_oneminute().

###Environment Variable:
`oneminute_interval`    
The value of this variable is a number, and it represents, in milliseconds the time after which
oneminute
should (re)scan the html document to update the time differences and/or dates.
By default this
oneminute_interval
is set to 10 (milliseconds). 

###Interval:
`oneminute_rescanner`  
  This represents the interval which will prevail every
  oneminute_interval
  number of milliseconds, having a task of using
  oneminute
  to rescan the document to update the time differences and/or dates.





