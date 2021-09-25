#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { VsPsonoCdkStack } from '../lib/vs-psono-cdk-stack';

const app = new cdk.App();
new VsPsonoCdkStack(app, 'VsPsonoCdkStack', {

});
