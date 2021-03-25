import { Router } from './core/router/index.js'
import { Login } from './pages/auth/login/login.js'
import { ServerError } from './pages/errors/server-error/server-error.js'
import { NotFound } from './pages/errors/not-found/not-found.js'
import { Register } from './pages/auth/register/register.js'
import { Main } from './pages/main/main.js'
import { PersonalData } from './pages/profile/personal-data/personal-data.js'
import { ProfileEdit } from './pages/profile/profile-edit/profile-edit.js'
import { EditPassword } from './pages/profile/edit-password/edit-password.js'
import { Routes } from './constants.js'
import { State } from './__data__/state.js'

// проверка авторизации
const initialAuthState = JSON.parse(localStorage.getItem('auth') || '{}')
new State().set('auth', initialAuthState)

new Router('#root')
    .use([Routes.Login, '/'], Login)
    .use(Routes.Register, Register)
    .use(Routes.Main, Main)
    .use(Routes.Profile, PersonalData)
    .use(Routes.ProfileEdit, ProfileEdit)
    .use(Routes.ProfilePasswordEdit, EditPassword)
    .use(Routes.ServerError, ServerError)
    .use(Routes.NotFound, NotFound)
    .start()
