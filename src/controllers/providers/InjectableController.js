const Controller = require('./Controller')

class InjectableController extends Controller {
  constructor({ controllerType, service }) {
    super({ controllerType })
    this.service = service
  }
  fromAction(actionName, service) {
    return super.fromAction(actionName, service || this.service)
  }
}
module.exports = InjectableController
