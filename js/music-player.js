$(document).ready(function() {
//Declare the elements we are going to use as variables
var player = $('.player');
//On Mouseover of the player, add the class 'playerhover' to '.player' and 'searchButtonHover' to '.searchButton'
player.mouseover(
  function () {
    player.addClass('playerHover');
  });
//On Mouseout of the player, remove the class 'playerhover' to '.player' and 'searchButtonHover' to '.searchButton'  
player.mouseout(
  function () {
    player.removeClass('playerHover');
  });
});