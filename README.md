TypeScript ExtJS Emitter
======================

A fork of Typescript 1.8 that emits classes in a way that ExtJS understands.

##Why?

[TypeScript](http://www.typescriptlang.org/) is a language for application-scale JavaScript. TypeScript adds optional types, classes, and modules to JavaScript. TypeScript supports tools for large-scale JavaScript applications for any browser, for any host, on any OS. TypeScript compiles to readable, standards-based JavaScript. Try it out at the [playground](http://www.typescriptlang.org/Playground), and stay up to date via [our blog](https://blogs.msdn.microsoft.com/typescript) and [Twitter account](https://twitter.com/typescriptlang).

This forked compiler emits code that looks just like the ExtJS classes you would write in regular Javascript.

##How?
 
 We created a new "module system" inside the compiler. Just invoke node tsc.js with command line argument -m extjs .

##ExtJS API Type Declarations

To get the most use out of this compiler you will also need some type declarations (*.d.ts files) for the ExtJS API. There is a companion project to provide these: https://github.com/Dretch/typescript-declarations-for-ext


##Screenshot
![ScreenShot](https://raw.github.com/fabioparra/TypeScriptExtJSEmitter/master/TypeScriptExtJSEmitter/images/screenshot.jpg)

##Demo

https://rawgithub.com/fabioparra/TypeScriptExtJSEmitter/master/TypeScriptExtJSEmitter/index.html

##Compatibility

This project is compatible with Typescript 1.8 / 1.5 / 1.4 and ExtJS 3, 4 and 5. The emitted classes can be processed by Sencha CMD.

##Usage with Visual Studio 2015 (TypeScript 1.8)

####Update tsc.js and typescriptServices.js files (used by visual studio editor and msbuild tasks )

- Download latest modified compiler: https://github.com/fabioparra/TypeScript/releases/tag/v1.8
- Run copy_to_vs2015.bat file as administrator

##Usage with Visual Studio 2015 (TypeScript 1.5)

####Update tsc.js and typescriptServices.js files (used by visual studio editor and msbuild tasks )

- Download latest modified compiler: https://github.com/fabioparra/TypeScript/releases/tag/v1.5
- Run copy_to_vs2015.bat file as administrator

Install Gulp tools and dev dependencies:

```
npm install -g gulp
npm install
```

- Install vs 2013 plugin: https://visualstudiogallery.msdn.microsoft.com/2d42d8dc-e085-45eb-a30b-3f7d50d55304
- Download latest modified compiler: https://github.com/fabioparra/TypeScript/releases/tag/v1.4
- Run copy_to_vs2013.bat file as administrator

```
gulp local            # Build the compiler into built/local 
gulp clean            # Delete the built compiler 
gulp LKG              # Replace the last known good with the built one.
                      # Bootstrapping step to be executed when the built compiler reaches a stable state.
gulp tests            # Build the test infrastructure using the built compiler. 
gulp runtests         # Run tests using the built compiler and test infrastructure. 
                      # You can override the host or specify a test for this command. 
                      # Use host=<hostName> or tests=<testPath>. 
gulp runtests-browser # Runs the tests using the built run.js file. Syntax is gulp runtests. Optional
                        parameters 'host=', 'tests=[regex], reporter=[list|spec|json|<more>]'.
gulp baseline-accept  # This replaces the baseline test results with the results obtained from gulp runtests.
gulp lint             # Runs tslint on the TypeScript source.
gulp help             # List the above commands. 
```

IntelliJ IDEA 14 (Ultimate Edition only) has Typescript support. The ExtJS emitter can be used instead of the regular compiler.

Follow the instructions for setting up regular Typescript support (https://www.jetbrains.com/idea/help/typescript-support.html) but ensure that you do the following:

1.  Install `typescript-extjs` from NPM instead of `typescript`.

2.  Edit the file watcher that IntelliJ creates for Typescript so that it uses the `tsc-extjs` executable rather than `tsc`

##Integration with Sencha CMD

If you are using Sencha CMD, then you can add this snippet to your `build.xml` to compile all Typescript files to Javascript. The compilation will happen before any minification and combining of Javascript files.

```xml
<target name="-before-refresh">

    <!-- compile Typescript to ExtJS-compatible Javascript -->
    <apply executable="tsc-extjs" failonerror="true" verbose="true">
        <fileset dir="${basedir}/app" includes="**/*.ts"/>
    </apply>

</target>
```