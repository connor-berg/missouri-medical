import { IDiscordSecrets } from "discord-bot-cdk-construct";
import { SecretsManager } from "aws-sdk";
import { discordBotAPIKeyName } from "../constants/EnvironmentProps";

const secretsManager = new SecretsManager({
  
});
let __discordSecrets: IDiscordSecrets | undefined = undefined;

/**
 * Gets the Discord secrets (public key, client ID, etc.) for use in our lambdas.
 * 
 * @returns {IDiscordSecrets | undefined} The Discord secrets to be used.
 */
export async function getDiscordSecrets(): Promise<IDiscordSecrets | undefined> {
  if (!__discordSecrets) {
    try {
      const discordApiKeys = await secretsManager.getSecretValue({
        SecretId: discordBotAPIKeyName,
      }).promise();
      if (discordApiKeys.SecretString) {
        __discordSecrets = JSON.parse(discordApiKeys.SecretString);
      }
    } catch (exception) {
      console.log(`Unable to get Discord secrets: ${exception}`);
    }
  }
  return __discordSecrets;
};