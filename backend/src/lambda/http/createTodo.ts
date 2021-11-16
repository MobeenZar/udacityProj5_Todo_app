import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { getUserId } from '../utils'
import { createTodo } from '../../helpers/todos'
import { createLogger } from '../../utils/logger'

const logger = createLogger('auth')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newTodo: CreateTodoRequest = JSON.parse(event.body)
    const userId = getUserId(event)

    logger.info(`Received request for creating todo item for user ${userId}...`)

    const item = await createTodo(newTodo, userId)
    
    let result = JSON.stringify({
      item
    });
    
    logger.info(`Create To do result:  ${result}...`)
    return {
      statusCode: 201,
      body: result
    }
  }
)

handler.use(
  cors({
    credentials: true
  })
)


//name: string
//  dueDate: string
//body: "{name: 'myTask', dueDate: '11/10/2021'}"