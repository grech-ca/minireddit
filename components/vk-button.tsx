import { forwardRef } from 'react';

import { Button, ButtonProps } from 'reactstrap';
import VKLogo from 'assets/vk.svg';

export interface VKButtonProps extends Omit<ButtonProps, 'children'> {
  
}

export const VKButton = forwardRef<HTMLButtonElement, VKButtonProps>(((
  props,
  ref,
) => {
  return (
    <Button {...props} color="light" innerRef={ref}>
      <VKLogo style={{ marginRight: 10 }} />
      <span>вконтакте</span>
    </Button>        
  );
}));

VKButton.displayName = 'VKButton';

