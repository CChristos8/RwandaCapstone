export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "MedicalSheetDigitizationApp": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string",
            "CreatedSNSRole": "string"
        },
        "userPoolGroups": {
            "developerGroupRole": "string",
            "staffGroupRole": "string"
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
        },
        "AdminQueries": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        }
    },
    "function": {
        "AdminQueries1e4ac0c4": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "MedicalSheetDigitizationAppPostConfirmation": {
            "Name": "string",
            "Arn": "string",
            "LambdaExecutionRole": "string",
            "Region": "string"
        }
    }
}