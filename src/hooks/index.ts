import {useDispatch, useSelector} from 'react-redux'
import type { RootState, AppDispatch } from '../index';

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector = <T>(func: (state: RootState) => T): T => useSelector(func);
