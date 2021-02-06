import { Handler } from "aws-lambda";

export const cors: Handler = (event: any) => {
  const {
    pathParameters: { url },
  } = event;


  const response = {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v1.0! Your function executed successfully!",
      },
    ),
  };

  return new Promise((resolve) => {
    resolve(response);
  });
};
