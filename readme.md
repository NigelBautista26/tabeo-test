Steps to run my tests:

1. open the terminal and go to the project folder.
2. Do an "npm install" to install all the dependencies.
3. youll need to Install docker if you dont have it installed in your machine yet.
4. Do "docker pull testcafe/testcafe" to install the testcafe docker image.
5. run "docker run -v ${PWD}/tests:/tests -it testcafe/testcafe chromium tests/tests.js" command to run my tests using docker.