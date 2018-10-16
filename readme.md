# Promise Loader

Promise Loader is a JavaScript library designed to allow web projects with complicated data and script dependencies to easily run these scripts in the correct order, without the need for scripts to define messy callbacks to wait for each other. It does this by taking a simple manifest file which describes the project and its dependencies (much like a Makefile might), and then automatically loads data and runs scripts in an order that obeys these dependencies, making sure to request loads in parallel (and even run asynchronous scripts in parallel) whenever possible. Promise Loader is written in pure JavaScript and has no dependencies itself, so it can easily be used for any project.

Promise Loader is unlike some other systems in that it handles the dependency graph live, instead of somehow compiling your code. This has the added benefit that Promise Loader can reload single scripts or data files, live, without refreshing the page, and knows how to only re-run the dependent scripts.

Promise Loader gets its name from the fact that it uses JavaScript Promises as a core mechanism during the loading process. As such, any outdated version or implementation of JavaScript will not be able to use this library.

## Usage

`promise_loader.js` and the three example files are heavily documented, so most of the usage details will be relegated to those files, but the main points are as follows:

### Including Promise Loader

In your HTML, you only need to load `promise_loader.js` and your manifest script. Something like the following:

```
<script src="promise_loader.js"></script>
<script src="my_manifest.js"></script>
```

`promise_loader.js` adds the library in the namespace `pl` to the global namespace. The manifest lists all of your other scripts and dependencies. See `example_manifest.js` for details on how to structure the manifest. See `example_script1.js` and `example_script2.js` for possible methods of structuring your scripts. (I also intend to release a few larger scale examples in the future that use Promise Loader.)

### Loader Options

The `Loader` class handles loading of the project scripts. Typically you will create a `Loader` at the end of the manifest script, and call its `load()` method to get the loading started. The `Loader` constructor takes an optional parameter to configure the Loader; see the constructor in `promise_loader.js` for details on possible options.

### Reloading Scripts

You can use the `pl.Loader` created in the manifest to simultaneously live reload a set of scripts or data files. Search `pl.Loader.prototype.reload` in `promise_loader.js` for details.

Reloading is very useful for rapidly testing code changes, especially for pages with other slow loading resources. However, unless a lot of care is taken in writing the scripts, memory leaks can very easily be introduced, and any stateful code may need to specially retain its state in the presence of a reload. As such, reloading is a feature that should only be used for testing, and with the understanding that some code cannot easily be reloaded without introducing strange, irrelevant bugs.