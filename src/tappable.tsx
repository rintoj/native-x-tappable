import { debounce, DebouncedFunc } from 'lodash'
import React, { ReactNode, useEffect, useRef } from 'react'
import { TouchableOpacity, View, ViewStyle } from 'react-native'

type BaseType = {
  children?: ReactNode | ReactNode[] | null
  disabled?: boolean
  feedback?: boolean
  style?: ViewStyle
}

type PropsWithData<TData> = {
  data: TData
  onTap?: (data: TData) => void
} & BaseType

type PropsWithoutData = {
  onTap?: () => void
} & BaseType

export type TappableProps<T> = PropsWithData<T> | PropsWithoutData

export function Tappable<TData>(props: TappableProps<TData>) {
  type PropType = PropsWithData<TData> & PropsWithoutData
  const onPressRef = useRef<DebouncedFunc<() => void>>()
  const { children, data, feedback, disabled, onTap, style } = props as PropType

  useEffect(() => {
    const callback = debounce(() => {
      if (!disabled && typeof onTap === 'function') {
        onTap(data)
      }
    }, 500)
    onPressRef.current = callback
    return () => callback?.cancel()
  }, [disabled, onTap, data])

  if (disabled === true || onTap == null) {
    return <View style={style}>{children}</View>
  }

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={feedback === false || (onTap && feedback == null) ? 1 : 0.8}
      onPress={onPressRef?.current}
      style={style}
    >
      {children}
    </TouchableOpacity>
  )
}
