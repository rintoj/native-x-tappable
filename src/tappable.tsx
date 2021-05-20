import React, { ReactNode, useCallback } from 'react'
import { Platform, TouchableOpacity, View, ViewStyle } from 'react-native'

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
  const { children, data, feedback, disabled, onTap, style } = props as PropType
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const callback = useCallback(() => {
    if (!disabled && typeof onTap === 'function') {
      onTap(data)
    }
  }, [disabled, onTap, data])

  if (disabled === true || onTap == null) {
    return (
      <View style={[Platform.select({ web: { cursor: 'not-allowed' } as ViewStyle }), style]}>
        {children}
      </View>
    )
  }

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={feedback === false || (!!onTap && feedback == null) ? 1 : 0.8}
      onPress={callback}
      style={style}
    >
      <View style={[Platform.select({ web: { cursor: 'pointer' } as ViewStyle }), style]}>
        {children}
      </View>
    </TouchableOpacity>
  )
}
