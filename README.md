#Getting started locally

You can run the local webserver with live-rebuild with:

    npm install
	npm start

#Build for release

Create a static build with:

    npm install
	npm build

... then distribute `index.html` along with the contents of the `build/` directory.

#Developer guide
1. To clone the repository run: `git clone git@github.com:trollsofthenorth/ludumdare41.git`
2. To change the directory to the cloned repository run: `cd ludumdare41`
3. To install the dependencies run: `npm install`
4. Write tests located in the `./tests/` directory.
5. Write code in the `./src/` directory.
6. To test the code run: `npm test`
7. To build and start a demo server, run: `npm start`
8. To fetch the latest changes run: `git fetch --all`
9. To pull the latest changes, run: `git pull`