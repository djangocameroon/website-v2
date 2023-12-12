import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { DispatchType, RootStateType } from '../store';

export const useTypedDispatch: () => DispatchType = useDispatch;
export const useTypedSelector: TypedUseSelectorHook<RootStateType> =
  useSelector;
