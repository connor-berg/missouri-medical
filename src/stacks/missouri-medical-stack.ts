import * as path from 'path'

import { Duration, Stack } from 'aws-cdk-lib'

import { Construct } from 'constructs'
import { DiscordBotConstruct } from 'discord-bot-cdk-construct'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Runtime } from 'aws-cdk-lib/aws-lambda'

/**
 * Creates a Discord bot endpoint to track Missouri medical marijuana deals.
 */
export class MissouriMedicalStack extends Stack {
  /**
   * The constructor for building the stack.
   * @param {Construct} scope The Construct scope to create the stack in.
   * @param {string} id The ID of the stack to use.
   */
  constructor (scope: Construct, id: string) {
    super(scope, id)

    // Create the Commands Lambda.
    const discordCommandsLambda = new NodejsFunction(this, 'discord-commands-lambda', {
      runtime: Runtime.NODEJS_14_X,
      entry: path.join(__dirname, '../functions/DiscordCommands.ts'),
      handler: 'handler',
      timeout: Duration.seconds(60)
    })

    // eslint-disable-next-line
    const discordBot = new DiscordBotConstruct(this, 'discord-bot-endpoint', {
      commandsLambdaFunction: discordCommandsLambda
    })
  }
}
