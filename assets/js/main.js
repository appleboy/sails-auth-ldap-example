$(function() {
  $( "#datepicker" ).datepicker({
    dateFormat: 'yy-mm-dd',
    numberOfMonths: 3,
    minDate: 0,
    maxDate: new Date('2016-05-31')
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
});
