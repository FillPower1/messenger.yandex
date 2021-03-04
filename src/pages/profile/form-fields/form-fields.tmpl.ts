export default `
{{#each items}}
    <div class="profile-data__item">
        <p class="profile-data__description">{{description}}</p>
        <label class="profile-data__description">
            <input
                class="profile-data__value profile-data__value--edit"
                required name="{{name}}" value="{{value}}" type="{{type}}"
            >
        </label>
    </div>
{{/each}}
<button class="profile-data__button" type="submit">Сохранить</button>
`
