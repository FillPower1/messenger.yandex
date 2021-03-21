export default `
<div class="modal__wrapper">
    <form class="form form-upload" id="{{formId}}">
        <h2 class="form__title modal__title">Загрузите файл</h2>
        <div class="modal__upload">{{fileName}}</div>
        <div class="form__field">
            <label class="form__label form__label--mode-upload">
                Выбрать файл на компьютере
                <input class="form__input visually-hidden" name="avatar" type="file" accept="image/*">
            </label>
        </div>
    </form>
</div>
`
