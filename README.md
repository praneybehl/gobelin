# Gobelin

Gobelin is a lightweight Node.JS HMVC framework which intends to simplify the
creation of modules via its HMVC architecture. It is also created to add
simplicity to Node.JS development as it has quite a steep learning curve. This
framework aims for both performances and ease-of-use while keeping it simple in
its source code. No hand holding, just providing an efficient way to modularize
your projects and provide a sane default environment, thus keeping your developers from
growing white hair.

## Installation

To install, you need to execute the following command 
`npm install -g gobelin`

## Usage

### Creating a new project (not implemented)
To create a new project, use the following command
`gobelin createProject project_name`

### Creating a new module (not implemented)
To create a new module, use the following command. Default controllers will be created
`gobelin createModule module_name`

### Starting the server
To start a gobelin instance, use the following command
`gobelin [-s <path>] [-l <path>] [-p <integer>]`
Here are some details about each settings
**-s <path>**
This is used to provide the location for a settings file.
*Defaults to settings.js*

**-l <path>**
This is used to provide the location of the project.
*Defaults to the current working directory*

**-p <integer>**
This is used to provide a port which will override the one in your settings file
*Defaults to the port provided in the settings file*

##How it works
To make it short, every module in the "modules" folder are composed of controllers(one for each major HTTP verb), 
a models file, a views folder as well as a route override file, as well as its own configuration file which can be used
to, for example, disable default routes. A more exhaustive list of settings will be made once those are implemented.
Default routes always point to `module_name/function_name`