document.addEventListener('DOMContentLoaded', () => {
    const forms = Array.from(document.forms)

    const handleFormSubmit = (event) => {
        event.preventDefault()

        const inputs = Array.from(event.target.elements)
            .filter((element) => element.name)
            .map((input) => ({ [input.name]: input.value }))

        console.log(inputs)
    }

    forms.forEach((form) => form.addEventListener('submit', handleFormSubmit))
})
