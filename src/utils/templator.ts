export const templator = (template: string) => {
    // Временно, юзаю handlebars глобально,
    // не знал как еще подключить, не использовав сборщик
    // @ts-ignore
    return Handlebars.compile(template)
}
