const Controller = require('./Controller')

class InjectableController extends Controller {
  constructor(controller, service) {
    super(controller)
    this.service = service
  }
  fromAction(actionName, service) {
    return super.fromAction(actionName, service || this.service)
  }
}
module.exports = InjectableController
