import { forwardRef } from 'react';

import {
  InputProps as RSInputProps,
  Input as RSInput,
  Label,
  FormGroup,
  FormGroupProps,
  FormText,
} from 'reactstrap';

export interface InputProps extends Omit<RSInputProps, 'valid' | 'invalid'> {
  error?: string;
  label?: string;
  row?: FormGroupProps['row'];
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  error,
  label,
  ...props
}, ref) => {
  return (
    <FormGroup>
      {label && <Label for={props.name}>{label}</Label>}
      <RSInput
        invalid={!!error}
        innerRef={ref}
        {...props}
      />
      {error && <FormText>{error}</FormText>}
    </FormGroup>        
  );
});

Input.displayName = 'Input';

