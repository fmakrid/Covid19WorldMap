$("document").ready(function ($) {
  $("#date").datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    changeMonth: true,
    changeYear: true,
    dateFormat: "yy-mm-dd",
    //Minimum date based on first Covid-19 case in database, starts from 0, month 1 is February
    minDate: new Date(2020, 1, 25),
    //Maximum date based on first Covid-19 case in database, start from 0, month 10 is November
    maxDate: new Date(2020, 10, 21),
  });
});



//Prints date when a date is selected or changed
$(function () {
  $("#date").on("change", function(){
    var selectedDate = $(this).val();
    var pickedDate = selectedDate;
    // console.log(pickedDate);
    $.ajax({
      type: "POST",
      url: "/ajaxcall",
      data: {Date: pickedDate},      
    })
    .done(function(data){
      console.log(data);      
    })
    .fail( function(xhr, textStatus, errorThrown) {
      alert(xhr.responseText);
    }); 
})
});