import State from "../../Models/Address/state.entity";
import AbstractCrudService from "../abstractCrud.service";

export default class StateService extends AbstractCrudService<State> {
  constructor() {
    super("state")
  }

  // convertToEntity(object: any): State | null {
  //   const state = Object.assign(new State(), object);

  //   return state
  // }
}