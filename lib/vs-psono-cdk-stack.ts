import * as ec2 from "@aws-cdk/aws-ec2";
import * as iam from '@aws-cdk/aws-iam';
import * as rds from "@aws-cdk/aws-rds";
import { Asset } from '@aws-cdk/aws-s3-assets';
import * as cdk from '@aws-cdk/core';
import { CfnOutput, Duration, RemovalPolicy } from "@aws-cdk/core";
import { KeyPair } from 'cdk-ec2-key-pair';
import * as path from 'path';
import { Ec2InstanceSetup } from "./ec2-instance";

export class VsPsonoCdkStack extends cdk.Stack {

  public testENV="test";

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create new VPC with 2 Subnets
    const vpc = new ec2.Vpc(this, 'VPC', {
      natGateways: 0,
      cidr: "10.33.0.0/16",
      subnetConfiguration: [{
        name: "public",
        subnetType: ec2.SubnetType.PUBLIC
      },{
        name: "isolated",
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED
      }]
    });
    // --------------------- DB ---------------------
    const postgresCluster = new rds.ServerlessCluster(this, 'psonoPostgres', {
      engine: rds.DatabaseClusterEngine.AURORA_POSTGRESQL,
      parameterGroup: rds.ParameterGroup.fromParameterGroupName(this, 'ParameterGroup', 'default.aurora-postgresql10'),
      removalPolicy: RemovalPolicy.DESTROY, // maybe not a good idea for the production system
      vpc,
      scaling: {
        autoPause: Duration.minutes(5), // default is to pause after 5 minutes of idle time
        minCapacity: rds.AuroraCapacityUnit.ACU_2, // default is 2 Aurora capacity units (ACUs)
        maxCapacity: rds.AuroraCapacityUnit.ACU_2, // default is 16 Aurora capacity units (ACUs)
      },
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
      },
      credentials: rds.Credentials.fromGeneratedSecret('postgres'), // Creates an admin user of postgres with a generated password

    });

    new CfnOutput(this, "postgres-Endpoint",{
      value: postgresCluster.clusterEndpoint.hostname
    })

    let ec2Instance: Ec2InstanceSetup = new Ec2InstanceSetup(this,'psono-server', {
      vpc,
      postgresDb: postgresCluster,
    })
  }
}
