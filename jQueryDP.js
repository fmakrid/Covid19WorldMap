$("document").ready(function () {
  $("#date").datepicker({
      showOtherMonths: true,
      selectOtherMonths: true,
      changeMonth: true,
      changeYear: true,
      //Minimum date based on first Covid-19 case in database, starts from 0, month 1 is February
      minDate: new Date(2020,1,25),
      //Maximum date based on first Covid-19 case in database, start from 0, month 10 is November
      maxDate: new Date(2020,10,21)
  });
});
