export default `
<h2 class="profile__name">{{first_name}}</h2>
<ul class="profile-data">
{{#each items}}
    <li class="profile-data__item">
        <div class="profile-data__description">{{description}}</div>
        <span class="profile-data__value">{{value}}</span>
    </li>
{{/each}}
</ul>
{{#each links}}
    <a href="{{href}}" class="profile__link {{className}}" id="{{id}}">{{linkName}}</a>
{{/each}}
<button class="profile__link-btn profile__link--theme-danger" id="{{link.id}}">{{link.linkName}}</button>
`
