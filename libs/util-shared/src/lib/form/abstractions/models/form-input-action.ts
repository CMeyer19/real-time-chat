import { FormInputActionKind } from "../enums/form-input-action-kind.enum";

export interface IFormInputAction {
  type: FormInputActionKind;
  payload: string;
}
