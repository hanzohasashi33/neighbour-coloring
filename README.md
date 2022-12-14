# Neighbour Coloring Algorithm for 3D models


We are given meshes in the form of VRML files such that each file contains the mesh for a single component. We have to render the given meshes in one display and assign  colours to each of the component such that no two adjacent components have the same colour. Components are said to be adjacent if they share an edge in the display space.

<br><br>

* /vrml/ -> contains all the models used for programming and testing purposes. 
* webgl_loader_vrml.html -> Contains the main integrated code for the project. To run the file, add it to the threejs downloaded repository in the path "three.js-master\three.js-master\examples\" and run the entire three js master repository using servez or any other runners.
* colouringAlgo.js -> Contains the code to assign a pallette to an adjacency graph with no neighbours being the same color
* index.js -> file used to create a standalone project using node as opposed to create a coupled one with the three js repository.
