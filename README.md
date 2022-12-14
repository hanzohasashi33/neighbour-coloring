# Neighbour Coloring Algorithm for 3D models


We are given meshes in the form of VRML files such that each file contains the mesh for a single component. We have to render the given meshes in one display and assign  colours to each of the component such that no two adjacent components have the same colour. Components are said to be adjacent if they share an edge in the display space.

<br>

## Directory Structure
* /vrml/ -> contains all the models used for programming and testing purposes. 
* webgl_loader_vrml.html -> Contains the main integrated code for the project. To run the file, add it to the threejs downloaded repository in the path "three.js-master\three.js-master\examples\" and run the entire three js master repository using servez or any other runners.
* colouringAlgo.js -> Contains the code to assign a pallette to an adjacency graph with no neighbours being the same color

<br>

## Steps to run the program
Following are the steps to run the code:
* Download the three.js repository from <a href="https://github.com/mrdoob/three.js/">https://github.com/mrdoob/three.js/</a> using the master branch.
* Replace the webgl_vrml_loader in the "three.js-master\three.js-master\examples\" directory with the one provided in the repository. 
* Add the provided models from the \vrml\ folder in the repository to "three.js-master\three.js-master\examples\models\vrml"
* Use <a href="https://greggman.github.io/servez/">servez</a> or some other similar runners to spin off a simple web server for local web development. 
* Navigate to examples->vrml to see the corresponding output of the file. This will have the neighbour coloring algorithm for 3D VRML models. 
