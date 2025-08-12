# Ephemeral Environments - Demo

This repo contains a demonstration of using the Octopus Deploy Ephemeral Environments feature. It deploys a simple app that tells you dad jokes (yes they are terrible 😄).

## Features

- Each PR runs a [GitHub Actions workflow](https://github.com/OctopusDeployTesting/ephemeral-environments-demo/blob/main/.github/workflows/create-ephemeral-environment.yml) to build a docker container, then create a release in Octopus. The release includes the PR number as a custom field `PullRequestNumber`.
- Octopus automatically creates and deploys to an Ephemeral Environment with the name `pr-{PullRequestNumber}` (e.g. `pr-25`) using the value from the custom field.
- The app is deployed to a Kubernetes cluster with a namespace `dad-joker-2000-{EnvironmentName}` e.g. `dad-joker-2000-pr-25`.
- The app gets an automatically provisioned public URL in the format `http://dad-joker-2000-{EnvironmentName}.australiaeast.cloudapp.azure.com/` e.g. `http://dad-joker-2000-pr-25.australiaeast.cloudapp.azure.com`.
- The URL is written to the Octopus task logs as a highlight so that it shows up on the summary.
- The URL is added as a comment back on the PR, using the custom field in a script step.
