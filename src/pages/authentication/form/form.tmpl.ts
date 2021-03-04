export default `
<h2 class="form__title">{{title}}</h2>
{{#each items}}
    <div class="form__field">
        <label class="form__label">
            <input class="form__input" required name="{{name}}" placeholder="{{placeholder}}" type="{{type}}">
        </label>
    </div>
{{/each}}
<div class="form__actions">
    <button class="form__button" type="submit">{{buttons.text}}</button>
    <a class="form__link" href="{{buttons.href}}">{{buttons.link}}</a>
</div>
`
