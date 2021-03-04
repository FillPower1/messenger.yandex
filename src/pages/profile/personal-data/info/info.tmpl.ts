export default `
<h2 class="profile__name">{{name}}</h2>
<ul class="profile-data">
{{#each items}}
    <li class="profile-data__item">
        <div class="profile-data__description">{{description}}</div>
        <span class="profile-data__value">{{value}}</span>
    </li>
{{/each}}
</ul>
{{#each links}}
    <a href="{{href}}" class="profile__link {{className}}">{{linkName}}</a>
{{/each}}
`
