import { Block } from '../../../../core/block/index.js'
import { templator } from '../../../../utils/templator.js'
import { PersonalDataController } from '../../../../__data__/controllers/personal-data.js'

import template from './upload-avatar.tmpl.js'

export class UploadAvatar extends Block {
    private static className = 'modal'
    private static formId = 'upload-avatar'
    private form: HTMLFormElement | null
    private file: File
    private fileTypes: string[] = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']

    constructor() {
        super('div', {
            className: UploadAvatar.className
        })
    }

    componentDidMount(): void {
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillUnmount() {
        this.form?.avatar.removeEventListener('change', this.handleInputChange)
    }

    componentDidRender(): void {
        this.form = this.element.querySelector(`#${UploadAvatar.formId}`)
        this.form?.avatar.addEventListener('change', this.handleInputChange)
        this.form?.addEventListener('submit', this.handleSubmit)
    }

    componentDidUpdate(oldProps: any, newProps: any) {
        if (oldProps?.fileName !== newProps?.fileName) {
            return true
        } else if (oldProps?.error !== newProps?.error) {
            return true
        }

        return false
    }

    handleInputChange(event: { target: any }) {
        this.file = event.target?.files[0]

        const { type = '', name = '' } = this.file

        if (!this.fileTypes.includes(type)) {
            this.setProps({ error: 'Недопустимый тип' })
            return
        }

        this.setProps({ fileName: name, error: '' })
    }

    handleSubmit(event: Event) {
        event.preventDefault()

        if (this.props.error) {
            return
        }

        PersonalDataController.updateAvatar(this.file)
    }

    render() {
        return templator(template)({
            formId: UploadAvatar.formId,
            ...this.props
        })
    }
}
