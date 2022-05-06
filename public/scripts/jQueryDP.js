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
  $("#date").on("change", function () {
    var selectedDate = $(this).val();
    var pickedDate = selectedDate;
    console.log(pickedDate);
    $.post("app.js",pickedDate);
    function get(){
      $.ajax({
        type: "GET",
        url: "https://localhost:8000/ajaxcall"
      })
      .done(function (data) {
        console.log("GET RESPONSE:", JSON.stringify(data));
        $("#getResponse").html(JSON.stringify(data));
      })
    }
  });
});


