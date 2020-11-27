import Controler from './controller';
import Service from '../services/service';
declare class BaseController implements Controler {
    service: Service;
    constructor(service?: Service);
    create: any;
    get: any;
    getAll: any;
    update: any;
    updatePartial: any;
    delete: any;
    deleteAll: any;
}
export default BaseController;
