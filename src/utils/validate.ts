enum Types {
    required = 'required',
    invalid = 'invalid',
    valid = 'valid'
}

const RegExpType = /./
type OptionsType = {
    [key: string]: {
        pattern?: typeof RegExpType
        rules: {
            type: string
            prompt: string
        }[]
        [key: string]: any
    }
}

export class Validate {
    private readonly form: HTMLFormElement
    private readonly options: OptionsType
    private static defaultWrapper = 'label'
    private static defaultTag = 'SPAN'
    private static className = 'error-field'

    constructor(form: HTMLFormElement, options: OptionsType) {
        if (!options) {
            throw new Error('Не переданы опции для валидации!')
        }

        this.form = form
        this.options = this.updateOptions(options)
    }

    private updateOptions = (options: OptionsType) => {
        return Object.keys(options).reduce((memo, key) => {
            const span = document.createElement('span')
            span.classList.add(Validate.className)

            options[key].node = span
            return memo
        }, options)
    }

    init(): void {
        this.getOptionKeys.forEach(this.initInputEvents)
    }

    private initInputEvents = (name: string): void => {
        this.form[name].addEventListener('keyup', this.handleOnInput)
        this.form[name].addEventListener('focus', this.handleOnInput)
        this.form[name].addEventListener('blur', this.handleOnInput)
        this.form[name].dataset.type = Types.required
    }

    private get getOptionKeys(): string[] {
        return Object.keys(this.options)
    }

    private getCurrentNode(name: string, type: string | undefined): HTMLElement {
        const currentInput = this.options[name]
        const node: HTMLElement = currentInput.node
        const prompt = currentInput.rules.find((r: { type: string }) => r.type === type)?.prompt

        node.textContent = prompt || ''

        return node
    }

    validateOnSubmit = (): boolean => {
        const labels = this.form.querySelectorAll(Validate.defaultWrapper)
        labels.forEach((label) => {
            if (label.lastChild?.nodeName === Validate.defaultTag) {
                label.lastChild?.remove()
            }
        })

        const validList: boolean[] = []

        this.getOptionKeys.forEach((name) => {
            this.updateDataType(this.form[name])
            validList.push(this.validateInput(this.form[name]))
        })

        return validList.every((b) => b)
    }

    private validateInput = (input: HTMLInputElement): boolean => {
        const parent = input.closest(Validate.defaultWrapper)
        const { dataset: { type }, name } = input
        const node = this.getCurrentNode(name, type)

        if (!parent) {
            throw new Error('Каждый input должен иметь label!')
        }

        if (type !== Types.valid) {
            parent.append(node)
            return false
        } else {
            node.remove()
            return true
        }
    }

    private handleOnInput = (e: { target: HTMLInputElement }): void => {
        this.updateDataType(e.target)
        this.validateInput(e.target)
    }

    private updateDataType = (input: HTMLInputElement) => {
        const { value, dataset, name } = input

        if (value.length === 0) {
            dataset.type = Types.required
        } else if (!this.isMatched(value, name)) {
            dataset.type = Types.invalid
        } else {
            dataset.type = Types.valid
        }
    }

    private isMatched = (value: string, name: string): boolean => {
        const pattern = this.options[name].pattern

        if (!pattern) {
            return true
        }

        return !!value.match(pattern)
    }
}
