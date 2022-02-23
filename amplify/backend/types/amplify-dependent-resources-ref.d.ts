export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "medicalsheetdigitizab4dd08dd": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
    "storage": {
        "s3medicalsheets": {
            "BucketName": "string",
            "Region": "string"
        }
    },
    "api": {
        "MedicalSheetDigitizationApp": {
            "GraphQLAPIKeyOutput": "string",
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    },
    "function": {
        "MedicalSheetDigitizationAppPostConfirmation": {
            "Name": "string",
            "Arn": "string",
            "LambdaExecutionRole": "string",
            "Region": "string"
        }
    }
}