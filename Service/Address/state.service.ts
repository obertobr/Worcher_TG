import State from "../../Models/Address/state.entity";
import AbstractCrudService from "../abstractCrud.service";

export default class StateService extends AbstractCrudService<State> {
  constructor() {
    super("state", State); 
  }
}
