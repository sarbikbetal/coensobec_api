document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);
});


document.addEventListener('DOMContentLoaded', function() {
  var date = new Date;
  var elems = document.querySelectorAll('.datepicker');
  var instances = M.Datepicker.init(elems, {format: "yyyy-mm-d", autoClose: true, maxDate: date});
});
