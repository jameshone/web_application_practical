# Web Application Practical v1.1
This Application uses both NPM dependencies and Bower components.

The app is uses gulp to do it's tasks and browser-sync to inject scripts, css and detect changes in the environment.

 I have used the following for libraries for this task:

* angular.js
* angular-animate.js
* angular-toastr.js
* angular-touch.js
 
I have used a single file for my app, found at ```src/app/app.js``` as I did not see the point in separating code for this demo.

####NOTE: The IDE used was webstorm and I have all my SASS, Grunt, Node and other dependencies set up in the IDE, you may need to tweak some setting on your side.

##To run/setup the app

1.   Run ```npm install``` from the root of the project.
2.   Run ```bower install``` from the root of the project.
3.   Run ```gulp default``` to build the initial project and dependencies
4.   Run ```gulp serve``` to view the development environment or ```gulp  serve:dist``` to run the distributable  version.
