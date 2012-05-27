
   editor = ace.edit("code");
   editor.setShowPrintMargin(false);
   editor.setTheme("ace/theme/clouds");

   var PHPMode = require("ace/mode/php").Mode;
   editor.getSession().setMode(new PHPMode());


   (function($) {
         // enable cross-domain AJAX in jQuery (new in 1.5)
         jQuery.support.cors = true;


         $('#btnRun').click(function(){
            var data = encodeURIComponent(editor.getSession().getValue());

            if (! data) return false;

            $.post('includes/gate.php', {"data": data}, function(res){
               $('#result').fadeIn(400);

               if ($('#append')[0].checked){
                  $('#result').html($('#result').html() + '<hr />' + res);   
               }
               else {
                  $('#result').html(res);
               }

               $('html, body').animate({
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
            case 'server' :
               code = 'pr($_SERVER);';
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
            case 'connectdb' :
               code = "mysql_connect('localhost', 'root', 'root') or die('Could not connect to database');\nmysql_select_db('dbname') or die('Could not select database');\n###################################################################################\n";
               break;
            case 'phpquery' :
               code = "// See: http://code.google.com/p/phpquery/\nrequire_once('classes/User/phpQuery/phpQuery/phpQuery.php');\n\n$html = file_get_contents('http://www.bbc.co.uk/sport/football/results');\n$doc = phpQuery::newDocumentHTML($html);\n$resultData = pq('div#results-data');\necho $resultData;";
               break;                              
            case 'phpbuglost' :
               code = "// See: http://pbl.elgatonaranja.com\nrequire_once('classes/User/PHPBugLost.0.3/phpBugLost.0.3.php');\n\n//Code Here\n\necho bl_debug();";
               break;
            case 'enhancephp' :
               code = "// See: http://www.enhance-php.com\n// Requires PHP 5.3 or greater\nrequire_once('classes/User/EnhanceTestFramework/EnhanceTestFramework.php');\n\n";
               break;
            default :
               code = '';
         }

         editor.getSession().setValue(code);
         $('#btnRun').trigger('click');

         return false;   
      });

      // for sidebar links end


      // Save snippets
      $('#btnSave').click(function(){
         var snippet = editor.getSession().getValue();
         if (! snippet) return false;

         var name = prompt('Please enter snippet name');
         if (! name) return false;

         name = 'pe_snippet' + name;
         
         // save now
         if (typeof window.localStorage != 'object') {
            alert('Sorry localStorage is not supported by your browser.'); 
            return false;
         }

         localStorage.setItem(name, snippet);

         if(! localStorage.getItem(name)) {
            alert('Snippet could not be saved.'); 
            return false;
         }

         // populate snippets sidebar
         $('#snippets').html('');
         for (var i = 0, l = localStorage.length; i < l; i++){
            if (localStorage.key(i).indexOf('pe_snippet') > -1)
            {
               var key = localStorage.key(i);
               var value = localStorage[key];
               $('#snippets').append('<li rel="' + key + '"><a class="left" title="Delete" href="#">[X]</a><div class="left">&nbsp;</div><a href="#">' + key.replace('pe_snippet', '') + '</a></li>');
            }
         }

         // show snippets sidebar now
         $('#sidebar ul.navlinks').hide();
         $('#snippets').slideDown('fast');
            

      });

      // show clicked snippet
      $('#snippets li a').live('click', function(){
         var key = $(this).parent().attr('rel');

         if ($(this).text() === '[X]'){
            if (confirm('Are you sure to delete this snippet?')){
               localStorage.removeItem(key);
               $(this).parent().slideUp('fast');
               return false;
            }
         }

         editor.getSession().setValue(localStorage.getItem(key));
         return false;
      });


      // populate snippets sidebar
      if (typeof window.localStorage != 'undefined') {
         for (var i = 0, l = localStorage.length; i < l; i++){
            if (localStorage.key(i).indexOf('pe_snippet') > -1)
            {
               var key = localStorage.key(i);
               var value = localStorage[key];
               $('#snippets').append('<li rel="' + key + '"><a class="left" title="Delete" href="#">[X]</a><div class="left">&nbsp;</div><a href="#">' + key.replace('pe_snippet', '') + '</a></li>');
            }
         }
      }
      

   })(jQuery);

