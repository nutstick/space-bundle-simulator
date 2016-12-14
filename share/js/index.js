$(function(){
  $('#jumpDown').click( function (e) {
    e.preventDefault();
    window.scrollTo(0, 800);
    return false;
  });
});