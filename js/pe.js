
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


      // for sidebar links start
      
      $('.navlinks a').click(function(){
         var rel = this.rel, code = '';

         if (! rel) return false;

         switch(rel){
            case 'info' :
               code = 'phpinfo();';
               break;
            case 'ini' :
               code = 'pr(ini_get_all());';
               break;
            case 'extensions' :
               code = 'pr(get_loaded_extensions(false));';
               break;
            case 'path' :
               code = 'echo print_r(get_include_path(), true);';
               break;
            case 'classes' :
               code = 'pr(get_declared_classes());';
               break;
            case 'constants' :
               code = '$all = get_defined_constants(true);\nif(isset($all[\'user\'])) { pr($all[\'user\']); };';
               break;
            case 'functions' :
               code = '$all = get_defined_functions();\nif(isset($all[\'user\'])) { pr($all[\'user\']); };';
               break;
            default :
               code = '';
         }

         gEditor.getSession().setValue(code);
         $('#btnRun').trigger('click');

         return false;   
      });

      // for sidebar links end

   })(jQuery);

