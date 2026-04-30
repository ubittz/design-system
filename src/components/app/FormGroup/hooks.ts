import { FormGroupProps } from './types';

export const useFormGroupProps = <P extends FormGroupProps>(props: P) => {
  const { label, required, caption, errorMessage, buttonProps, timerContent, ...restProps } = props;

  return {
    formGroupProps: {
      label,
      required,
      caption,
      errorMessage,
      buttonProps,
      timerContent,
    } as FormGroupProps,
    ...restProps,
  };
};
