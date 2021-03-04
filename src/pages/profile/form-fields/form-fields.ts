import { Block } from '../../../core/index.js'
import { templator } from '../../../utils/templator.js'
import { Validate } from '../../../utils/validate.js'

import template from './form-fields.tmpl.js'
import { FormFieldsTypes } from './types.js'

export class FormFields extends Block {
    private static className = 'profile-data'

    constructor(props: FormFieldsTypes) {
        super('form', {
            ...props,
            className: FormFields.className,
            events: {
                submit: props.onSubmit
            }
        })
    }

    componentDidRender(): void {
        this.validateInputs()
    }

    validateInputs() {
        new Validate(<HTMLFormElement>this.element, this.props.validationScheme).init()
    }

    render() {
        return templator(template)(this.props)
    }
}
