import { FormGroup } from '@angular/forms';
export class GenericGlobalValidator {

  /**
   * Creates an instance of GenericGlobalValidator.
   * controlName1: {
   *     validationRuleName1: 'Validation Message.',
   *     validationRuleName2: 'Validation Message.'
   * },
   * controlName2: {
   *     validationRuleName1: 'Validation Message.',
   *     validationRuleName2: 'Validation Message.'
   * }
   * @param {{ [key: string]: { [key: string]: string } }} validationMessages
   * @memberof GenericGlobalValidator
   */
  constructor(
    private validationMessages: { [key: string]: { [key: string]: string } }
  ) { }


  /**
   *
   * Returns a set of validation messages to display
   *
   * controlName1: 'Validation Message.',
   * controlName2: 'Validation Message.'
   * Processes each control within a FormGroup
   *
   * @param {FormGroup} container
   * @returns {{ [key: string]: string }}
   * @memberof GenericGlobalValidator
   */
  public createErrorMessages(container: FormGroup, isFormSubmitted?: boolean): { [key: string]: string } {
    // une constante qui va stocker tous les differentes erreurs qui vont être générer
    const errorMessages = {};
    // for ici on va parcourir chaque champ du formulaire
    for (const controlName in container.controls) {
      // Si le controlName correspond à celui que nous avons selectionner
      // hasOwnProperty ici retourne un booleen si controlName est bien dans le champ du formulaire
      if (container.controls.hasOwnProperty(controlName)) {
        // Variable pour le champ du formulaire selectionner
        const selectedControl = container.controls[controlName];
        // If it is a FormGroup, process its child controls.
        if (selectedControl instanceof FormGroup) {
          console.log('instance of formGroup');
          const childMessages = this.createErrorMessages(selectedControl);
          Object.assign(errorMessages, childMessages);

        } else {
          // Only validate if there are validation messages for the control
          if (this.validationMessages[controlName]) {

            errorMessages[controlName] = '';

            if ((selectedControl.dirty || selectedControl.touched || isFormSubmitted) && selectedControl.errors) {

              Object.keys(selectedControl.errors).map((errorMessageKey: string) => {
                // Si controlName et  errorMessageKey correspondent alors on va ajouter l'erreur dans notre variable errorMessages
                if (this.validationMessages[controlName][errorMessageKey]) {
                  errorMessages[controlName] += this.validationMessages[controlName][errorMessageKey] + ' ';
                }

              });
            }
          }
        }
      }
    }
    return errorMessages;
  }

  public getErrorsLength(container: FormGroup): number {
    let errorLength = 0;
    for (const controlKey in container.controls) {
      if (container.controls.hasOwnProperty(controlKey)) {
        if (container.controls[controlKey].errors) {
          errorLength += Object.keys(container.controls[controlKey].errors).length;
          console.log(errorLength);
        }
      }
    }
    return errorLength;
  }
}