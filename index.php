<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>PHPExecute</title>
<link href="css/style.css" rel="stylesheet" type="text/css" />
</head>

<body>

   <div id="container" class="clear">
      <h1 align="left"><img class="left" src="img/terminal.png" align="absmiddle" width="30" height="30" alt="">&nbsp;PHPExecute - Simple PHP Code Runner</h1>

      <div id="sidebar" class="left">
         <a class="navhead" href="#">Navigation</a>
         <ul class="navlinks">
            <li><a href="panel.php">My Folders</a></li>
            <li><a href="all.php">All Pages</a></li>
            <li><a href="search.php">Search Pages</a></li>
            <li><a href="about.php">About</a></li>
         </ul>         
      </div>

      <div id="code" class="left"></div>
      <div id="buttons" align="right">
         <input type="button" class="btn btn-blue" value="Execute" id="btnRun" title="Ctrl+Shift" />
         <input type="button" class="btn btn-blue" value="Clear Log" id="btnClearLog" />
         <label for="append"><input type="checkbox" name="append" id="append" /> Append</label>
      </div>      
      <div class="clear">&nbsp;</div>
      <div id="result"></div>
   </div>


<script src="js/ace/ace.js" type="text/javascript" charset="utf-8"></script>
<script src="js/ace/theme-clouds.js" type="text/javascript"></script>
<script src="js/ace/mode-php.js" type="text/javascript"></script>
<script src="js/jquery-1.7.1.min.js" type="text/javascript" charset="utf-8"></script>

<script type="text/javascript" charset="utf-8">
   
   var gEditor = null;

   gEditor = ace.edit("code");
   gEditor.setTheme("ace/theme/clouds");

   var PHPMode = require("ace/mode/php").Mode;
   gEditor.getSession().setMode(new PHPMode());


   (function($) {
         // enable cross-domain AJAX in jQuery (new in 1.5)
         jQuery.support.cors = true;


         $('#btnRun').click(function(){
            var data = encodeURIComponent(gEditor.getSession().getValue());

            if (! data) return false;

            $.post('includes/gate.php', {"data": data}, function(res){
               $('#result').fadeIn(400);

               if ($('#append')[0].checked){
                  $('#result').html($('#result').html() + '<hr />' + res);   
               }
               else {
                  $('#result').html(res);
               }

               $('#result').css('color', res.indexOf('gate.php') > -1 ? 'red' : 'black');

               $('htm, body').animate({
                  scrollTop: $('#result').offset().top
               });
            });
         });

         $('#btnClearLog').click(function(){
            $('#result').html('').hide();
         });

         $('#code').keydown(function(e){
            if (e && e["ctrlKey"] && e["shiftKey"]) {
               $('#btnRun').trigger('click');
            }
         });


         // code for sidebar menu animation starts
         var animateSidebarMenu = true; // whether or not sidebar menu animation should be there

         // DO NOT EDIT BELOW THIS LINE

         if (animateSidebarMenu){
            // initially hide all sidebar items except for first one
            $('#sidebar ul.navlinks:not(:first)').hide();

            $('.navhead').click(function(){
               if (! $(this).next('ul.navlinks').is(':visible')){
                  // hide all opended ones
                  $(this).siblings('ul.navlinks').slideUp('fast');
                  // now show the clicked one
                  $(this).next('ul.navlinks').slideDown('fast');
               }

               return false;
            });

         }
      // code for sidebar menu animation ends
   })(jQuery);


</script>

</body>
</html>