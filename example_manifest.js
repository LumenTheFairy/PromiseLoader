//This file contains a basic example of the code required in a manifest file

//declare the namespace for the project
const project_namespace = {};
//give the namespace a place to hold the loaded scripts
//note that this property's name is required to be "scripts"
project_namespace.scripts = {};

//create the list of things to load, and processes to run
const manifest = [

	//a note about dependencies:
	//dependencies can be any other named element of the manifest, and the two special dependencies 'dom' and 'body'
	//a data dependency is considered fullfilled once it has finished loading
	//a script or process dependency is considered fullfilled once it has finished running
	//'body' is considered fullfilled once the body exists (this is when window.onload is called)
	//'dom' is considered fullfilled once the entire dom has loaded (this conincides with the document 'DOMContentLoaded' event)

	//example of data to load
	//loading for all data files will begin immediately
	//currently supported types are json, image (an img Dom element), and image_data (an ImageData object)
	{ name: 'strings', type: 'json', url: 'data/strings.json' },

	//example of a script
	//scripts are loaded immediately, but not run until all dependencies are fullfilled
	{ name: 'string_handler', type: 'script', dependencies: ['dependency1', 'dependency2', 'dependency3'],url: 'js/string_handler_file.js' },

	//example of an external script
	//external script are not loaded until all dependencies are fullfilled, but they run as soon as they are loaded
	//
	//external scripts don't actually need to be non-local;
	//they can also be used for scripts that haven't been appropriately formated for the promise loader (see example_script1.js and example_script2.js)
	//in general however, such scripts with dependecies should be avoided if possible,
	//since even starting a load of a dependent external script is blocked on those before it (losing the benefit of parallel loading)
	{ name: 'jquery', type: 'external_script', dependencies: [], url: 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js' },

	//example of a process
	//processes are not run until all dependencies are fullfilled
	//the process function takes the fullfilled values of its dependencies as parameters (in order)
	//and the 'this' that is used during that function is the pl.Loader object on which load() was called
	//
	//in this example, we assume that 'string_handler' has placed itself in 'project_namespace', and contains some function 'set_language'
	//(this follows example method 1 from example_script1.js)
	{ name: 'set_language',    
	  dependencies: ['strings', 'string_handler'],
	  type: 'process',
	  process: function(string_data) { project_namespace.string_handler.set_language(string_data, 'english'); }
	},

	//example of the special manifest element, 'final'
	//final's process will not run until all dependencies are fullfilled (including 'body' and 'dom')
	//the value returned from final's process will be the value of the fullfilled load()
	//if there is not 'final' in the manifest, a default final that simply returns the loader's results is used
	//	
	//in this example, we assume that some script in the manifest has placed 'main' in 'project_namespace' which has some 'start' function
	{ name: 'final',
	  process: function() { project_namespace.main.start(); return this.results; }
	},
];

//create a loader with the default options
const loader = new pl.Loader( project_namespace, manifest );
//run the loader
loader.load().then(
	( (val) => console.log(val) ),  //do something with the final value of the load
	( (err) => console.error(err) ) //do something with a potential error during the load
);