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
            <div id="actions">Actions</div>

            <a class="navhead" href="#">PHP Info</a>
            <ul class="navlinks">
               <li><a href="#" rel="info">PHP Info</a></li>
               <li><a href="#" rel="server">SERVER</a></li>
               <li><a href="#" rel="ini">PHP INI</a></li>
               <li><a href="#" rel="extensions">Loaded Extensions</a></li>
               <li><a href="#" rel="path">Include Path</a></li>
               <li><a href="#" rel="classes">Declared Classes</a></li>
               <li><a href="#" rel="constants">User Defined Constants</a></li>
               <li><a href="#" rel="functions">User Defined Functions</a></li>
            </ul>

            <a class="navhead" href="#">Database</a>
            <ul class="navlinks">
               <li><a href="#">Connect Database</a></li>
               <li><a href="#">Table Names</a></li>
               <li><a href="#">Tables and Fields</a></li>
            </ul>

            <a class="navhead" href="#">Classes</a>
            <ul class="navlinks">
               <li><a href="#">PHP Bug Lost</a></li>
            </ul>

            <a class="navhead" href="#">Snippets</a>
            <ul class="navlinks">
               <li><a href="#">My Snippet</a></li>
            </ul>

          
      </div>

      <div id="code" class="left"></div>
      <div class="clear"></div>
      <div id="buttons" align="right">
         <input type="button" class="btn btn-blue" value="Execute" id="btnRun" title="Ctrl+Shift" />
         <input type="button" class="btn btn-blue" value="Clear Log" id="btnClearLog" />
         <input type="checkbox" name="append" id="append" /> <label for="append">Append</label>
      </div>      
      <div class="clear">&nbsp;</div>
      <div id="result"></div>
   </div>


<script src="js/ace/ace.js" type="text/javascript" charset="utf-8"></script>
<script src="js/ace/theme-clouds.js" type="text/javascript"></script>
<script src="js/ace/mode-php.js" type="text/javascript"></script>
<script src="js/jquery-1.7.1.min.js" type="text/javascript" charset="utf-8"></script>
<script src="js/pe.js" type="text/javascript" charset="utf-8"></script>

</body>
</html>