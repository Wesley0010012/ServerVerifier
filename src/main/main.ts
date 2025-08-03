import { parentPort } from 'worker_threads'
import { ServerVerifierFactory } from './factories/server-verifier-factory'

const controller = ServerVerifierFactory.build()

controller.start()

if (parentPort) {
  parentPort.on('message', msg => {
    if (msg === 'stop') controller.stop()
  })
}
