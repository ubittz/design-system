import styled from 'styled-components';
import { twMerge } from 'tailwind-merge';

import FormGroup from '@@components/FormGroup';
import { useFormGroupProps } from '@@components/FormGroup/hooks';
import { TextFieldProps } from '@@components/TextField/types';
import { COLORS } from '@@constants/colors';

const StyledInput = styled.input`
  width: 100%;
  flex: 1;
  padding: 0 16px;
  height: 40px;
  border-width: 1px;
  border-style: solid;
  border-color: ${COLORS.INPUT_COLOR_DEFAULT_BORDER};
  background: ${COLORS.GRAY_SCALE_000};
  border-radius: 4px;
  outline: none;

  ${({ theme }) => theme.typography.Body4}

  transition: border-color 0.2s;

  &::placeholder {
    color: ${COLORS.INPUT_COLOR_DEFAULT_PLACEHOLDER};
  }

  &:disabled {
    background: ${COLORS.GRAY_SCALE_100};
    color: ${COLORS.GRAY_SCALE_500};
  }

  &.error {
    border-color: ${COLORS.ERROR};
  }
`;

function TextField(props: TextFieldProps) {
  const { formGroupProps, className, ...inputProps } = useFormGroupProps(props);

  const isError = !!formGroupProps.errorMessage;

  const mergedClassName = twMerge(className, isError ? 'error' : '');

  return (
    <FormGroup {...formGroupProps}>
      <StyledInput className={mergedClassName} {...inputProps} />
    </FormGroup>
  );
}

export default TextField;
