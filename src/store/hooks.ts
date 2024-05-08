import type { AppState } from './index'

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { ApiDispatch } from './index'

export const useAppDispatch = () => useDispatch<ApiDispatch>()

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
