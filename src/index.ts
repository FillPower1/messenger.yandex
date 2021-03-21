import { Router } from './core/router/index.js'
import { Login } from './pages/authentication/login/login.js'
import { ServerError } from './pages/errors/server-error/server-error.js'
import { NotFound } from './pages/errors/not-found/not-found.js'
import { Register } from './pages/authentication/register/register.js'
import { Main } from './pages/main/main.js'
import { PersonalData } from './pages/profile/personal-data/personal-data.js'
import { EditPersonalData } from './pages/profile/edit-personal-data/edit-personal-data.js'
import { EditPassword } from './pages/profile/edit-password/edit-password.js'

import { Routes } from './constants.js'

new Router('#root')
    .use([Routes.login, ''], Login)
    .use(Routes.register, Register)
    .use(Routes.main, Main)
    .use(Routes.profile, PersonalData)
    .use(Routes.profileEdit, EditPersonalData)
    .use(Routes.profilePasswordEdit, EditPassword)
    .use(Routes.serverError, ServerError)
    .use(Routes.notFound, NotFound)
    .start()

// Задание не доделано, я специально отправил на предварительное ревью, нужно еще доработать/доделать
