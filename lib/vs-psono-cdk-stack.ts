import * as cdk from '@aws-cdk/core';
import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecs from "@aws-cdk/aws-ecs";
import * as ecs_patterns from "@aws-cdk/aws-ecs-patterns";

import { SesSmtpCredentials } from 'ses-smtp-credentials-cdk';

export class VsPsonoCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
  }

 smtpCredentials = new SesSmtpCredentials(this, 'Credentials', {
    region: 'eu-central-1'
});
// new ssm.StringParameter(this, 'CredentialsParameter', {
//     parameterName: 'email',
//     stringValue: JSON.stringify({
//         username: smtpCredentials.username(),
//         password: smtpCredentials.password(),
//     })
// });

  vpc = new ec2.Vpc(this, "MyVpc", {
    maxAzs: 1 // Default is all AZs in region
  });

  cluster = new ecs.Cluster(this, "MyCluster", {
    vpc: this.vpc
  });

// Create a load-balanced Fargate service and make it public
  ecs_stuff = new ecs_patterns.ApplicationLoadBalancedFargateService(this, "MyFargateService", {
    cluster: this.cluster, // Required
    cpu: 512, // Default is 256
    desiredCount: 1, // Default is 1
    taskImageOptions: { image: ecs.ContainerImage.fromRegistry("amazon/amazon-ecs-sample") },
    memoryLimitMiB: 512, // Default is 512
    publicLoadBalancer: true // Default is false
  });



}
