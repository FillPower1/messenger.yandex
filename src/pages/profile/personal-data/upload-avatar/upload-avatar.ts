import { Block } from '../../../../core/block/index.js'
import { templator } from '../../../../utils/templator.js'
import { dispatch } from '../../../../__data__/store.js'
import { updateAvatar } from '../../../../__data__/actions/personal-data.js'

import template from './upload-avatar.tmpl.js'

export class UploadAvatar extends Block {
    private static className = 'modal'
    private static formId = 'upload-avatar'
    private form: HTMLFormElement | null

    constructor() {
        super('div', {
            className: UploadAvatar.className
        })
    }

    componentDidMount(): void {
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    componentWillUnmount() {
        this.form?.avatar.removeEventListener('change', this.handleInputChange)
    }

    componentDidRender(): void {
        this.form = this.element.querySelector(`#${UploadAvatar.formId}`)
        this.form?.avatar.addEventListener('change', this.handleInputChange)
    }

    handleInputChange() {
        dispatch(updateAvatar(this.form))
    }

    render() {
        return templator(template)({
            formId: UploadAvatar.formId
        })
    }
}
