# The Dad Joker 2000!

Welcome to The Dad Joker 2000! This is a sample application that Team DevEx are using to build a CI/CD pipeline as part of creating ephemeral environments. Feel free to use this application if you would like to 🙂

## What does this thing do?

This sample application tells you dad jokes using https://icanhazdadjoke.com, yes they are terrible 😄. It's built in Node using the [Remix framework](https://remix.run/).!

## Getting started

To get started:

- Create a _new_ repository using this one as a template.
- Clone your repository to your local machine.
- Open the repository in the IDE of your choice. Don't know what IDE to use? [VSCode](https://code.visualstudio.com/) is a pretty good default choice.
- Change to the `app` directory on the command line e.g. `cd ./app`.
- Run `npm install` to install dependencies.
- Run `npm run dev` to start a local running instance of the application. This will print out a link to the local URL where you can view the running app.

## Building a docker image

If you want to build an run a docker image locally (you won't necessarily need to for this exercise) then you use the dockerfile at the root of the repository.

To build locally:

`docker build -t {image}:{version} .`

e.g. `docker build -t OctopusDeployTesting/the-bantz-geoff:1.0.0 .`

To run locally:

`docker run -it -p 30000:3000 {image}:{version}`

e.g. `docker run -it -p 30000:3000 OctopusDeployTesting/the-bantz-geoff:1.0.0` then access the running application from inside the docker container at http://localhost:30000

## Contributing

If you would like to contribute a change to this repo, please feel free to raise a PR and send it to [#team-devex-requests](https://octopusdeploy.slack.com/archives/C06GM0962RH). Please note that we don't want any form of CI/CD pipeline in this repo as the intent of the repo is to be part of an exercise in which this is built.
