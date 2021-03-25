export default `
<div class="modal__wrapper">
    <form class="form" id="{{type}}" data-method="{{method}}">
        <h2 class="form__title modal__title">{{title}}</h2>
        <div class="form__field">
            <label class="form__label">
                <input class="form__input" name="field" placeholder="{{placeholder}}" type="text">
            </label>
        </div>
        <div class="form__error"></div>
        <div class="form__actions">
            <button class="form__button modal__button" type="submit">{{buttonName}}</button>
        </div>
    </form>
</div>
`
