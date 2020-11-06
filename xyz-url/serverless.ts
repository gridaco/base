import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'xyz-url',
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  resources: {
    Resources: {
      shortUrlTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "${self:provider.environment.DYNAMODB_TABLE}",
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH"
            },
          ],
          AttributeDefinitions: [{
            AttributeName: "id",
            AttributeType: "S"
          },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          }
        }
      }
    }
  },
  plugins: [
    // 'serverless-plugin-monorepo',
    'serverless-dotenv-plugin',
    'serverless-webpack',
    'serverless-offline',
    'serverless-dynamodb-local'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      DYNAMODB_TABLE: "${self:service}-${opt:stage, self:provider.stage}",
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: [
          'dynamodb:Query',
          'dynamodb:Scan',
          'dynamodb:GetItem',
          'dynamodb:PutItem',
          'dynamodb:UpdateItem',
          'dynamodb:DeleteItem',
        ],
        Resource: "arn:aws:dynamodb:${opt:region, self:provider.region}:*:table/${self:provider.environment.DYNAMODB_TABLE}"
      }
    ]
  },
  functions: {
    url: {
      handler: 'handler.url',
      events: [
        {
          http: {
            method: 'ANY',
            path: '/',
          }
        },
        {
          http: {
            method: 'ANY',
            path: '{proxy+}',
          }
        }
      ]
    }
  }
}

module.exports = serverlessConfiguration;
