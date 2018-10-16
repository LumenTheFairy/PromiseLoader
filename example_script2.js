//This example contains a typical boilerplate code needed to allow the promise loader to load a script
//
//In this example, it is assumed that the dependencies of the script have been returned as values from their respective scripts
//This method has the benefit of easier access to non-script dependencies
//It also "hides" the script, making it available only inside scripts dependent on it (and not from eventual outside scopes)
//Using this method, the full script can be treated as a process that takes some dependencies of any kind, and outputs a value of any kind
//This method does care about the order of dependencies listed in the manifest, so maintaining consistency of the orderings is necessary
//
//Mixing this method with the method in example_script1 is not an issue, but may be redundant depending on how it's actually used

//the script itself is a function in order to allow postponing running it until the dependencies are finished
//any code outside this function will run on script load (immediately) instead of waiting for the dependencies
//
//notice that the function is placed in the "scripts" object in the project namespace
//the name of the script should be the same as the name given in the manifest (the filename need not match)
//this convention is important because the promise loader uses it to look up this function when running it
//
//the dependencies parameters that is passed into this function are the values of each dependency listed in the manifest,
//and they will be in the same order defined in the manifest
project_name.scripts.example_script2 = function(dependency1, dependency2, dependency3) {

//declare a namespace for this script
const example_script2 = {};


//the code to be contained in the example_script2 namespace goes here...


//the value of a script is whatever it returns
//in this example, we return the namespace we created, but we could return any kind of value we like
//and it will be passed on to this script's dependencies
return example_script2;
}