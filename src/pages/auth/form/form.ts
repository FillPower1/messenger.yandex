import { Block } from '../../../core/block/index.js'
import { templator } from '../../../utils/templator.js'
import { Validate } from '../../../utils/validate/validate.js'
import { FormType } from './types.js'
import { Link } from '../../../utils/link.js'
import { AuthController } from '../../../__data__/controllers/auth.js'

import template from './form.tmpl.js'

export class Form extends Block<FormType> {
    private static className = 'form'
    inputs: NodeList

    constructor(props: FormType) {
        super('form', {
            ...props,
            className: Form.className,
            events: {
                submit: props.onSubmit
            }
        })
    }

    componentDidMount(): void {
        AuthController.subscribe(this)
        this.eventBus.on('auth:form', this.onChange.bind(this))
    }

    onChange(values: any) {
        if (!values) {
            return
        }

        this.inputs?.forEach((input: HTMLInputElement) => {
            input.value = values[input.name]
        })
    }

    componentDidRender(): void {
        this.validateInputs()
        this.inputs = this.element.querySelectorAll('input')

        const inputs = this.state.get('auth.inputs', null)
        this.eventBus.emit('auth:form', inputs)

        Link(this.element.querySelector('a'), () => {
            this.state.set('auth.inputs', '')
        })
    }

    validateInputs() {
        new Validate(<HTMLFormElement>this.element, this.props.validationScheme).init()
    }

    render(): string {
        const textError = this.state.get('auth.textError', '')

        return templator(template)({
            ...this.props,
            textError
        })
    }
}
