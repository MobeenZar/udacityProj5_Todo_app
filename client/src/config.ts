// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'ghd572vmhk'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map. For example:
  
  domain: 'dev-0h0qrtq5.us.auth0.com', 		 // Auth0 domain
  clientId: '550UmfxGMBujBc4JHT5V8IEHgQdh5T16',  // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
