//This example contains a typical boilerplate code needed to allow the promise loader to load a script
//
//In this example, it is assumed that the dependencies of the script have been placed in the project namespace by their respective scripts
//This method has the benefit of allowing future access to the script to anything that has access to the project namespace
//It also does not care about the order of dependencies listed in the manifest, so maintaining consistency of orderings is not necessary
//However, it is more cumbersome to make use of non-script dependencies since they will need to be handled by a process in the manifest
//
//Mixing this method with the method in example_script2 is not an issue, but may be redundant depending on how it's actually used

//the script itself is a function in order to allow postponing running it until the dependencies are finished
//any code outside this function will run on script load (immediately) instead of waiting for the dependencies
//
//notice that the function is placed in the "scripts" object in the project namespace
//the name of the script should be the same as the name given in the manifest (the filename need not match)
//this convention is important because the promise loader uses it to look up this function when running it
project_name.scripts.example_script1 = function() {

//declare a namespace for this script
const example_script1 = {};
//add the namespace to the project namespace, so it can be used elsewhere
project_name.example_script1 = example_script1;

//give more convenient names this code's dependencies
//doing this also makes the list of code dependencies very clear
//
//this is where we make use of the assumption that the dependencies have been placed in the project namespace
//(which is what we have done for this example script in the previous code line above)
//
//since the dependencies are run before this script, they will be available and ready to use
const dependency1 = project_name.dependency1;
const dependency2 = project_name.dependency2;
const dependency3 = project_name.dependency3;
//etc...
//note that for dependencies that are not script dependencies,
//they will need to have been placed in the project namespace by a process
//and that process will need to be a dependency for this script to ensure it is run first


//the code to be contained in the example_script1 namespace goes here...


};