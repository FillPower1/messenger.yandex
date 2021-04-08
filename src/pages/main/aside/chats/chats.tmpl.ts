import { BASE_RESOURCE_URL } from '../../../../constants'

export default `
{{#each chats}}
    <li
        class="dialog dialogs__item{{#if active}} dialogs__item--active{{/if}}"
         data-created="{{created_by}}"
         id="{{id}}"
    >
        {{#if avatar}}
            <img class="dialog__avatar" src="${BASE_RESOURCE_URL}/{{avatar}}" alt="">
        {{else}}
            <span class="dialog__avatar"></span>
        {{/if}}
        <div class="dialog__wrapper">
            <div class="dialog__message">
                <span class="dialog__peer">{{title}}</span>
                {{#if last_message.user.display_name}}
                    <span class="dialog__name">{{last_message.user.display_name}}</span>
                {{else}}
                    <span class="dialog__name">{{last_message.user.first_name}}</span>
                {{/if}}
                <span class="dialog__short-message">
                    {{last_message.content}}
                </span>
            </div>
            <div class="dialog__info">
                <div class="dialog__date">{{time}}</div>
                {{#if amountMessages}}<div class="dialog__badge">{{unread_count}}</div>{{/if}}
            </div>
        </div>
    </li>
{{/each}}
`
