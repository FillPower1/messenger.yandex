export default `
<h2 class="form__title">{{title}}</h2>
{{#each items}}
    <div class="form__field">
        <label class="form__label">
            <input class="form__input" required name="{{name}}" placeholder="{{placeholder}}" type="{{type}}">
        </label>
    </div>
{{/each}}
{{#if textError}}
    <div class="error-field auth-error">{{textError}}</div>
{{/if}}
<div class="form__actions">
    <button class="form__button" type="submit">{{text}}</button>
    <a class="form__link" href="{{href}}">{{link}}</a>
</div>
`
