import {useSelector, TypedUseSelectorHook} from 'react-redux';
import {RootState} from '../core'

export const useTypedSelector:TypedUseSelectorHook<RootState> = useSelector