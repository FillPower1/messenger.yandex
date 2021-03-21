import { Block } from '../../../core/block/index.js'
import { templator } from '../../../utils/templator.js'
import { Validate } from '../../../utils/validate.js'

import template from './form.tmpl.js'
import { FormType } from './types.js'
import { getAuthorizedError } from '../../../__data__/selectors/auth.js'
import { dispatch } from '../../../__data__/store.js'
import { authErrorsReset } from '../../../__data__/actions/auth.js'

export class Form extends Block<FormType> {
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

    componentDidMount(): void {
        this.connectToStore(this)
        dispatch(authErrorsReset())
    }

    mapStateToProps(store: any, ownProps?: any) {
        const textError = getAuthorizedError(store)

        return {
            textError
        }
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
