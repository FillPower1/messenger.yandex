export default `
<div class="messages__info">
    {{#if avatar}}
        <img class="messages__info-avatar" src="{{avatar}}" alt=""> 
    {{else}}
        <span class="messages__info-avatar"></span>
    {{/if}}
    <span class="messages__info-title">{{name}}</span>
</div>
<button class="dropdown__btn {{#if active}} dropdown__btn--active {{/if}}">
    <span class="dropdown__btn-icon"></span>
    <span class="dropdown__btn-icon"></span>
    <span class="dropdown__btn-icon"></span>
</button>
<div class="dropdown-menu">
    <button class="dropdown-menu__item">
        <div class="dropdown-menu__icon">
            <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
            <line
                x1="5.99988"
                y1="0.5"
                x2="5.99988"
                y2="11.5"
                stroke="#08a652"
                stroke-width="1.5"
            />
            <line
                x1="0.499878"
                y1="6"
                x2="11.4999"
                y2="6"
                stroke="#08a652"
                stroke-width="1.5"
            />
            </svg>
        </div>
        <p class="dropdown-menu__text">Добавить пользователя</p>
    </button>
    <button class="dropdown-menu__item">
        <div class="dropdown-menu__icon">
            <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
            <line
                x1="4.11077"
                y1="4.11103"
                x2="11.8889"
                y2="11.8892"
                stroke="#08a652"
                stroke-width="1.5"
            />
            <line
                x1="4.11078"
                y1="11.8891"
                x2="11.889"
                y2="4.11093"
                stroke="#08a652"
                stroke-width="1.5"
            />
            </svg>
        </div>
        <p class="dropdown-menu__text">Удалить пользователя</p>
    </button>
</div>
`
