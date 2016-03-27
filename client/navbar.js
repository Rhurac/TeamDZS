$('document').ready(function(){
  $('#home').click(toggleActive);
  $('#about').click(toggleActive);
  $('#contact').click(toggleActive);
  $('#users').click(toggleActive);

  function toggleActive(){
    $("li[class='active']").removeClass();
    $(this).parent().addClass('active');
  }
});
