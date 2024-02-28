import aws_cdk as core
import aws_cdk.assertions as assertions

from pylab.pylab_stack import PylabStack

# example tests. To run these tests, uncomment this file along with the example
# resource in pylab/pylab_stack.py
def test_sqs_queue_created():
    app = core.App()
    stack = PylabStack(app, "pylab")
    template = assertions.Template.from_stack(stack)

#     template.has_resource_properties("AWS::SQS::Queue", {
#         "VisibilityTimeout": 300
#     })
