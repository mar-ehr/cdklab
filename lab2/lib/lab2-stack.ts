import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class Lab2Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    
    //Create VPC with only 1 AZ
    const lab2VPC = new ec2.Vpc(this, 'lab2VPC',{
      maxAzs: 1,
    });
    
    //Create Security Group for EC2 Instance
    const lab2Security = new ec2.SecurityGroup(this, "lab2SG",{
      vpc: lab2VPC,
      securityGroupName: "lab2SG",
      description: "lab2SG",
      allowAllOutbound: true,
    });
    
    const clientIPs = "10.0.0.0/16";
    lab2Security.addIngressRule(
      ec2.Peer.ipv4(clientIPs),
      ec2.Port.tcp(22),
      "Ssh incoming"
    );
    
    // TASK 2 *****************
    //Instance - Image
    const myLinuxImage = new ec2.AmazonLinuxImage({
      generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      edition: ec2.AmazonLinuxEdition.STANDARD,
      virtualization: ec2.AmazonLinuxVirt.HVM,
      storage: ec2.AmazonLinuxStorage.GENERAL_PURPOSE,
    });
    
    const myInstanceType = ec2.InstanceType.of(
      ec2.InstanceClass.T3A,
      ec2.InstanceSize.MICRO,
    )
    
    // TASK 3 ******************
    //Create EC2 Instance with Variables from Task 2 
    const lab2Instance = new ec2.Instance(this, "Lab2Instance", {
      machineImage: myLinuxImage,
      instanceType: myInstanceType,
      instanceName: "Lab2Instance",
      vpc: lab2VPC,
      securityGroup: lab2Security,
    })
    // example resource
    // const queue = new sqs.Queue(this, 'Lab2Queue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
