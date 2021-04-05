import * as Handlebars from 'handlebars'

export const templator = (template: string) => {
    return Handlebars.compile(template)
}
