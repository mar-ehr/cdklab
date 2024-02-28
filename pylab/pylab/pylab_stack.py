from aws_cdk import (
    # Duration,
    Stack,
    aws_ec2 as ec2,
    # aws_sqs as sqs,
)
from constructs import Construct

class PylabStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # The code that defines your stack goes here
        vpc = ec2.Vpc(
            self, "VPC",
            )
        # example resource
        # queue = sqs.Queue(
        #     self, "PylabQueue",
        #     visibility_timeout=Duration.seconds(300),
        # )
