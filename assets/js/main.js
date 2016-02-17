$(function() {
  $( "#datepicker" ).datepicker({
    dateFormat: 'yy-mm-dd',
    numberOfMonths: 3,
    minDate: 0,
    maxDate: new Date('2016-05-31'),
    onSelect: function (dateText, inst) {
      var date = $(this).datepicker('getDate');
      var day = $.datepicker.formatDate('D', date);
      if (day === 'Wed' || day === 'Fri' || day === 'Sat' || day === 'Sun') {
        $(this).val('');
        alert('目前只有開放禮拜一，禮拜二，禮拜四');
      } else {
        window.location = '/register?date=' + $(this).val();
      }
    }
  });

  $( "#start" ).datepicker({
    defaultDate: "+1w",
    changeMonth: true,
    numberOfMonths: 3,
    dateFormat: 'yy-mm-dd',
    onClose: function( selectedDate ) {
      $( "#end" ).datepicker( "option", "minDate", selectedDate );
    }
  });

  $( "#end" ).datepicker({
    defaultDate: "+1w",
    changeMonth: true,
    numberOfMonths: 3,
    dateFormat: 'yy-mm-dd',
    onClose: function( selectedDate ) {
      $( "#start" ).datepicker( "option", "maxDate", selectedDate );
    }
  });
})();
