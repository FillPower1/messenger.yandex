export default `
{{#if messages}}
    <button class="messages__button">Загрузить еще</button>
{{/if}}
{{#each messages}}
    <div class="messages__list">
            {{#if im}}
                <li class="message message--im messages__item">
                    {{#if attach.image}}
                        <div class="message__image">
                            <img src="{{attach.image}}" alt=""/>
                            <span class="message__date">{{time}}</span>
                        </div>
                    {{else}}
                        <div class="message__bubble">
                            <p class="message__text">{{content}}</p>
                            <svg
                                class="message__read"
                                width="11"
                                height="5"
                                viewBox="0 0 11 5"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <line
                                    y1="-0.5"
                                    x2="3.765"
                                    y2="-0.5"
                                    transform="matrix(0.705933 0.708278 -0.705933 0.708278 0.700195 2.33313)"
                                    stroke="#3369F3"
                                />
                                <line
                                    y1="-0.5"
                                    x2="7"
                                    y2="-0.5"
                                    transform="matrix(0.705933 -0.708278 0.705933 0.708278 3.35828 5)"
                                    stroke="#3369F3"
                                />
                                {{#if is_read}}
                                    <line
                                        y1="-0.5"
                                        x2="7"
                                        y2="-0.5"
                                        transform="matrix(0.705933 -0.708278 0.705933 0.708278 6.01587 5)"
                                        stroke="#3369F3"
                                    />
                                {{/if}}
                            </svg>
                            <span class="message__date">{{time}}</span>
                        </div>
                    {{/if}}
                </li>
            {{else}}
                <li class="message messages__item">
                    <div class="message__bubble">
                    <p class="message__text">{{content}}</p>
                    <span class="message__date">{{time}}</span>
                </div>
                </li>
            {{/if}}
        </div>
{{/each}}
`
