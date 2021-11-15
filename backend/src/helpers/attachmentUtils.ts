import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { createLogger } from '../utils/logger'
const XAWS = AWSXRay.captureAWS(AWS)

//TODO: Implement the fileStogare logic
const logger = createLogger('auth')

const s3 = new XAWS.S3({
    signatureVersion: 'v4'
  })
  
const bucketName = process.env.TODO_IMAGES_S3_BUCKET
//const urlExpiration = process.env.SIGNED_URL_EXPIRATION
export class AttachmentUtils {
   getUploadUrl(todoId: string) {
        let sigUrl = s3.getSignedUrl('putObject', {
            Bucket: bucketName,
            Key: todoId,
            Expires: 300
        })
        

        logger.info('In side getUploadUrl...' + sigUrl);
        return sigUrl;
     }
}

// async getUploadUrl(todoId: string): Promise<string> {
        
    //     let sigUrl = await s3.getSignedUrl('putObject', {
    //       Bucket: bucketName,
    //       Key: todoId,
    //       Expires: 300
    //     })
    //     .promise()

    //     logger.info('In side getUploadUrl...' + sigUrl);
    //     return sigUrl as string;
      
    // }
