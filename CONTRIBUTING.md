# Contributors' Guidline



## About port usage on local environment
for running multuple services via sls offline, we set the difference ports by each services.

- url service            : 4000
- asset service          : 4001
- build service          : 4002
- build-store service    : 4003
- g11n service           : 4004
- hosting service        : 4005
- project service        : 4007
- resource service       : 4008
- design-store service   : 4009
- scene service          : 4010




## NestJS + Yarn workspace + Typescript + Webpack configuration

> we are using serverless-bundle , which is an wrapper of webpack + babel + ts loader + node externals for our required stack. but this to work with nestJS seamless, we need extra configurations


**serverless.yml**
``` yml
service:
  name: service-name

plugins:
  - serverless-bundle
  - serverless-dynamodb-local
  - serverless-offline
  - serverless-domain-manager

custom:
  bundle:
    caching: false
    forceExclude:
      - '@nestjs/microservices'
      - '@nestjs/microservices/microservices-module'
      - '@nestjs/websockets/socket-module'
      - 'cache-manager'
  customDomain:
    domainName: service-name.bridged.cc
    hostedZoneId: us-west-1
    basePath: ''
    stage: ${self:provider.stage}
    createRoute53Record: true
  serverless-offline:
    httpPort: 4004


## Usage of dynamoose
> using dynamoose requires `dynamodb:DescribeTable` permission

``` yml

provider:
  name: aws
  runtime: nodejs12.x
  region: us-west-1
  apiGateway:
    minimumCompressionSize: 1024
  environment: 
    AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1'
    DYNAMODB_KEY_TABLE: "${self:service}-key-${opt:stage, self:provider.stage}"
  iamRoleStatements:
    - Effect: Allow
      Action:
        - dynamodb:Query
        - dynamodb:Scan
        - dynamodb:GetItem
        - dynamodb:PutItem
        - dynamodb:UpdateItem
        - dynamodb:DeleteItem
        - dynamodb:DescribeTable
      Resource: "arn:aws:dynamodb:${opt:region, self:provider.region}:*:table/${self:provider.environment.DYNAMODB_KEY_TABLE}"
```