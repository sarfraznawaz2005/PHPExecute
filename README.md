#Note
**This project has been abandoned in favor of much better [Phexecute][1]**

---

Author   : Sarfraz Ahmed (sarfraznawaz2005@gmail.com)  
Twitter  : @sarfraznawaz  
Blog     : http://sarfraznawaz.wordpress.com/  
LICENSE  : MIT
____________________________________________


WHAT IS PHPExecute?
____________________________________________

PHPExecute is the fastest way to run/test/debug your PHP code. Here are some of the cool things about it:

 - Very fast way to test your code
 - Nice friendly interface
 - Code  Highlighting
 - Useful PHP, system information panel
 - Saving favorite code snippets
 - Adding useful classes
 - Easy to extend as per your needs
 
 See [Screenshots][1]

[1]: http://sarfraznawaz.wordpress.com/2012/03/04/phpexecute-php-code-runner/
 
____________________________________________
Extending PHPExecute
____________________________________________

The good thing is that you can download it, see its source code and extend it however you like according to your needs. For example, you can add classes for testing, performance or any other purpose. One can even integrate bash commands to make it even more useful tool to work with.

____________________________________________
Usage Notes
____________________________________________

 - PHPExecute uses eval function to run the code. It is strongly recommended that you should use that tool for local testing only and not on production server due to security reasons. If you do, you use it on your own risk.
 
 - In order to save snippets, PHPExecute uses localStorage feature which is available in latest browsers (and IE9+) only and also it can be around 5MB in size. This isn't that ideal of you are going to save a lot of snippets but you can always extend PHPExecute to add database support and save your snippets there or save them online using API of snipt.net or some other snippets site.
 
 - The custom functions that can be used in PHPExecute can be found in includes/functions.php file. You can add any functions in that file that you want to use directly inside PHPExecute. The custom functions can also be seen in PHP Info > User Defined Functions.

 [1]: https://github.com/sarfraznawaz2005/Phexecute
