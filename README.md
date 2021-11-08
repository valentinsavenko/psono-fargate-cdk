# Welcome to your CDK TypeScript project!

This is a blank project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template


## run stuff:

1. https://eu-central-1.console.aws.amazon.com/secretsmanager/home?region=eu-central-1#!/listSecrets
save SES cred into the secretmange of aws to not have them in code as `SES_creds`:
```JSON
SMTP_USER: 'bla'
SMTP_PASSWORD: 'omg'
```


```bash
SETTINGS_FILE=/Users/valentin.savenko/workspace/vs-psono-cdk/files/settings.yaml

docker run --rm   -v ${SETTINGS_FILE}:/root/.psono_server/settings.yaml -ti psono/psono-server:latest python3 ./psono/manage.py sendtestmail neonape@gmail.com
Successfully sent a testmail to: neonape@gmail.com
```

```bash 
docker run --rm \
  -v ${SETTINGS_FILE}:/root/.psono_server/settings.yaml \
  -ti psono/psono-server:latest python3 ./psono/manage.py migrate
```