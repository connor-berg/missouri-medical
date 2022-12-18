# Missouri Medical Discord Bot

This project is for setting up the Missouri Medical Discord Bot! Using it, you can develop for, deploy locally, and maintain the Missouri Medical Discord Bot. It is built with the AWS Cloud Development Kit (entirely in TypeScript).

## Setup
When deploying, the order in which you run everything is currently important. There are 2 stages to deploying:

1. Deploying the actual infrastructure
2. Configuring the Discord server to use the infrastructure.

To deploy the infrastructure, you will want to do the following:

1. Run `npm run build`  - Compiles the TypeScript into JavaScript
2. Run `cdk deploy` - Synthesizes the CDK templates into CloudFormation templates and deploys all of the infrastructure code to AWS.
3. Login to your AWS Account and navigate to the Secrets Manager. Here, you'll want to update your Discord secrets as a JSON configuration that looks something like this:
```json
{
  "applicationId": "XXXXX",
  "publicKey": "XXXXX",
  "authToken": "XXXXX",
  "serverId": "XXXXX"
}
```
4. From the AWS Management Console navigate to API Gateway and click on `discord-bot-api`. On the Dashboard note down the URL that you can use to invoke the API. Navigate to your Discord application on the Discord Developer Portal. On the General Information page update Interactions Endpoint URL with the previously noted URL, appending `/event` to it.
5. From the Discord Developer Portal navigate to your application and select OAuth2. Click on URL Generator and check the boxes for the scopes `bot` and `applications.commands`. Under the bot permissions section check the boxes for `Send Messages` and `Use Slash Commands`. Copy the generated URL and paste it into your browser. Follow the prompts to configure the application for your Discord server.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
