import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { createLogger } from '../../utils/logger'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getUploadUrl } from '../../helpers/todos'

// import * as AWS from 'aws-sdk'
// import * as AWSXRay from 'aws-xray-sdk'

// const XAWS = AWSXRay.captureAWS(AWS)

// const s3 = new XAWS.S3({
//   signatureVersion: 'v4'
// })
// const bucketName = process.env.TODO_IMAGES_S3_BUCKET
// const urlExpiration = process.env.SIGNED_URL_EXPIRATION

const logger = createLogger('auth')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId

    logger.info('pathParameters :' + JSON.stringify(event.pathParameters))

    if (!todoId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing todoId' })
      }
    }

    logger.info(
      `Received request for generating signed URL for todo item ${todoId}`
    )

    logger.info('Geting signed URL for todo...' + todoId)

    const url = getUploadUrl(todoId)

    return {
      statusCode: 200,
      body: JSON.stringify({
        uploadUrl: url
      })
    }
  }
)

handler.use(
  cors({
    credentials: true
  })
)

// function getUploadUrlLoc(todoId: string) {
//   let sigUrl = s3.getSignedUrl('putObject', {
//     Bucket: bucketName,
//     Key: todoId,
//     Expires: 300
//   })
//   logger.info('In side getUploadUrl...' + sigUrl);
//   return sigUrl;

// }
