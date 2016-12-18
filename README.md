TypeScript ExtJS Emitter
======================

A fork of Typescript 1.8 that emits classes in a way that ExtJS understands.

##Why?

The Javascript emitted by the Typescript compiler is not compatible with the ExtJS class system. ExtJS requires classes to be defined using syntax like `Ext.define(CLASSNAME, MEMBERS);` but Typescript emits code based around prototypes.

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

##Usage with Visual Studio 2013 (TypeScript 1.4)

####Update tsc.js and typescriptServices.js files (used by visual studio editor and msbuild tasks )

- Install vs 2013 plugin: https://visualstudiogallery.msdn.microsoft.com/2d42d8dc-e085-45eb-a30b-3f7d50d55304
- Download latest modified compiler: https://github.com/fabioparra/TypeScript/releases/tag/v1.4
- Run copy_to_vs2013.bat file as administrator

##Usage with IntelliJ IDEA

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