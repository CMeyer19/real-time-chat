export interface IFormInputState<TValueType> {
  value: TValueType;
  isValid: boolean;
  validationError: string | null;
}

export class FormInputState<TValueType> implements IFormInputState<TValueType> {
  value: any;
  isValid = false;
  validationError = null;

  constructor(defaultValue: any) {
    this.value = defaultValue;
  }
}
