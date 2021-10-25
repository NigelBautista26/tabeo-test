Steps to run my tests:

open the terminal and go to the project folder.
Do an "npm install" to install all the dependencies.
youll need to Install docker if you dont have it installed in your machine yet.
Do "docker pull testcafe/testcafe" to install the testcafe docker image.
run "docker run -v ${PWD}/tests:/tests -it testcafe/testcafe chromium tests/tests.js" command to run my tests using docker.