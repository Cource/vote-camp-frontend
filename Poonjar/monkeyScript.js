// ==UserScript==
// @name         voterPhisher
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://lsgelection.kerala.gov.in/voters/view
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    $('#form_language')[0].value = "E"
    $('#form_captcha').attr('value','this is a fake captcha')

    $('.close').prepend('<a class="download">Download</a>')
    $('.download').css({position:'absolute', color: '#5af', background: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', zIndex: 10000000, boxShadow: '0.1rem 0.2rem 0.5rem rgba(0,0,0,0.3)'})
    $('.download').click(()=>{
        var array = [];
        var csv = '';
        $('.voters-list tr').has('td').each(function() {
            var arrayItem = [];
            $('td', $(this)).each(function(index, item) {
                if (index > 0){
                    arrayItem.push($(item).html());
                }
            });
            array.push(arrayItem);
        });
        let spaceCount = 0
        array.forEach(function(row) {
            if(spaceCount<=2){
                let Row = row.join(',')
                csv += Row;
                csv += '\n';
                if (Row == '') {spaceCount++}
            }
        });
        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hiddenElement.target = '_blank';
        let filename = ''
        $('.display-5').each((index, item)=>{
            if (index>0){
                filename += $(item).html()
            }
        })
        hiddenElement.download = filename + '.csv';
        hiddenElement.click();
    })
})();
