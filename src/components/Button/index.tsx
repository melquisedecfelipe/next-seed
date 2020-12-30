import React, { ButtonHTMLAttributes } from 'react'

import { ContainerButton } from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
  isDisable?: boolean
  isOutline?: boolean
}

const Button: React.FC<ButtonProps> = ({
  isActive = false,
  isDisable = false,
  isOutline = false,
  children,
  ...rest
}) => (
  <ContainerButton
    isActive={isActive}
    isDisable={isDisable}
    isOutline={isOutline}
    {...rest}
  >
    {children}
  </ContainerButton>
)

export default Button
