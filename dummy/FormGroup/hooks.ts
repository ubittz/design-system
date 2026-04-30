import { FormGroupProps } from './types';

export const useFormGroupProps = <P extends FormGroupProps>(props: P) => {
  const { label, buttonProps, errorMessage, timerContent, caption, required, ...etcProps } = props;

  return {
    formGroupProps: {
      label,
      buttonProps,
      errorMessage,
      timerContent,
      caption,
      required,
    },
    ...etcProps,
  };
};
