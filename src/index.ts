import { Router } from './core/router'
import { Login } from './pages/auth/login/login'
import { ServerError } from './pages/errors/server-error/server-error'
import { NotFound } from './pages/errors/not-found/not-found'
import { Register } from './pages/auth/register/register'
import { Main } from './pages/main/main'
import { PersonalData } from './pages/profile/personal-data/personal-data'
import { ProfileEdit } from './pages/profile/profile-edit/profile-edit'
import { EditPassword } from './pages/profile/edit-password/edit-password'
import { Routes } from './constants'
import { State } from './__data__/state'

import './style.css'

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
