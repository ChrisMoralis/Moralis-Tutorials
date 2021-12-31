# Gotchas

These files are all written with vanilla javascript. 

## Main.js
The main.js code (line 7 to 12) includes a primitive page routing solution to mimic a redirection if a user is not authenticated. The 'homepage' variable needs to be your own localhost url for your homepage file. In my example it was `http://127.0.0.1:5501/index.html` but for you it may be different. If you do not update this correctly, then the page will not load and you will be redirected indefinitely.


