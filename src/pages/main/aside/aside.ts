import { Block } from '../../../core/index.js'
import { renderChild } from '../../../utils/render.js'

import { Search } from './search/index.js'
import { Dialogs } from './dialogs/index.js'

export class Aside extends Block {
    private static className = 'aside'

    constructor() {
        super('aside', {
            className: Aside.className,
            components: [
                new Search(),
                new Dialogs({
                    dialogs: [
                        {
                            name: 'Андрей',
                            time: '10:20',
                            shortMessage: 'Друзья, у меня для вас особенный выпуск новостей!',
                            amountMessages: 10,
                            avatar: 'https://w7.pngwing.com/pngs/980/304/png-transparent-computer-icons-user-profile-avatar-heroes-silhouette-avatar.png'
                        },
                        {
                            name: 'Николай',
                            time: '00:20',
                            shortMessage: 'Друзья, у меня для вас особенный выпуск новостей!',
                            amountMessages: 0,
                            active: true
                        }
                    ]
                })
            ]
        })
    }

    componentDidRender(): void {
        renderChild(this.element, this.props.components)
    }
}
