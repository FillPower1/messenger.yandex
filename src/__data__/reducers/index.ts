import { combineReducers } from '../../core/redux/combine-reducers.js'

import { auth } from './auth.js'
import { personalData } from './personal-data.js'
import { chats } from './chats.js'

const rootReducer = combineReducers({
    auth,
    personalData,
    chats
})

export default rootReducer
