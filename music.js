$('.welcome-screen button').on('click', function() {
        var name = $('#name-input').val();
        if (name.length > 3) {
            var message = "Welcome, " + name + ".";
            $('.main .user-name').text(message);
            $('.welcome-screen').addClass('hidden');
            $('.main').removeClass('hidden');
        } else {
            $('#name-input').addClass('error');
            $('#name]-input').val('');
            $('#name-input').attr("placeholder","Name is too short! try again");
        }
    });
 $('body').on('keypress', function() {
    var name = $('#name-input').val();
    if(event.keyCode==13)
    {
      if(name.length > 3) {
      var message = "Welcome, " +  name + ".";
      $('.main .user-name').text(message);
      $('.welcome-screen').addClass('hidden');
      $('.main').removeClass('hidden');
      }
      else {
      $('#name-input').addClass('error');
      $('#name-input').val('');
      $('#name-input').attr("placeholder", "Name too short! Try Again.");
      }
    }


  });
$('#signOut').on('click',function(){

  $('.welcome-screen').removeClass('hidden');
  $('.main').addClass('hidden');

});
$('#back-happy').on('click',function()
{
  $('.main').removeClass('hidden');
  $('.mellow').addClass('hidden');
})
$('#back-energetic').on('click',function()
{
  $('.main').removeClass('hidden');
  $('.mellow').addClass('hidden');
})
$('#back-mellow').on('click',function()
{
  $('.main').removeClass('hidden');
  $('.mellow').addClass('hidden');
})
$('#back-acoustic').on('click',function()
{
  $('.main').removeClass('hidden');
  $('.mellow').addClass('hidden');
})