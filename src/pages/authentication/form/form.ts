import { Block } from '../../../core/block/index.js'
import { templator } from '../../../utils/templator.js'
import { Validate } from '../../../utils/validate.js'

import template from './form.tmpl.js'
import { FormType } from './types.js'

export class Form extends Block {
    private static className = 'form'

    constructor(props: FormType) {
        super('form', {
            ...props,
            className: Form.className,
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

    render(): string {
        return templator(template)(this.props)
    }
}
