# Url shortening service

This is the URL shortening function readme.

For a quick rundown, this project uses Typescript and [Koa.js](https://github.com/orgs/koajs/repositories?type=all). It also interacts with a Cosmos DB.

## tech stack

So this app uses Koa.js. It is similar to express and was made by a group of people who also worked on Express.
It uses Docker for containers since it lives in a k8s cluster when deployed.
A azure comsos sql DB is where all the keys and data are stored.
Jest is used for testing.
Nodemon is also used as a middle ware for code change updates and hot refreshing.
There is also a make file for spinning up the container.
The config package is also used to get the db string from a config json file.

## async await everywhere

Koa uses async await, and so all function calls need to follow that. This enables us to use ctx.status and ctx.response.body for error handling and sending back a status

## GET:/123key

A get request would be for triggering a redirect.

An example would be ```https://www.k8scluster.com/123uniuqeKey```

123uniuqeKey is the id/key created by the /post request

## POST:/

This is where you can register a new key/id. You can pass a custom name, or let one be generated.
You must also pass the url to attach the id/key to.

example request
```
{
    "url":"https://www.somewhere.com"
    "customName":"123456name" //leave this out to let a id be generated
}
```

## PATCH:/

This is where you can update a key/id. 
You must pass the id/key for the item to be updated
You must pass the new url

example request
```
{
    "url":"https://www.somewhere.com"
    "key":"123456name"
}
```

## DELETE:/

This is where you can remove a key/id. 
You must pass the id/key for the item to be updated

example request
```
{
    "key":"123456name"
}
```

### file sctructure

The entry file is index.ts at the root of the project. Then each api endpoint is in the /apis folder
There are some shared functions in /functions and some database specific functions in /functions/db
There are also shared types/classes in /classes

### debugging

This can be run locaclly with the vscode debugger. simply set your breakpoints and hit the api via local host
[http://localhost:3000](http://localhost:3000)

### using make file

in a admin command terminal run ```choco install make``` then you can simply run any of the commands in the make file.

if make is already isntalled, feel free to use the make commands to handle the docker container!

or simply run the commands yourself and refrence the make file

### test

npm run test, watch-tests, and test-coverage is available.
