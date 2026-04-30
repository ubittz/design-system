import styled from 'styled-components';

import Button from '@@components/Button';
import Flex from '@@components/Flex';
import { FlexProps } from '@@components/Flex/types';
import Typography from '@@components/Typography';
import { COLORS } from '@@constants/colors';

import { FormGroupProps } from './types';

const TextInputWrapper = styled.div`
  position: relative;
  width: 100%;

  .required__point {
    color: ${COLORS.ERROR};
  }
`;

const TimerWrapper = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  ${({ theme }) => theme.typography.Body4};
  color: ${COLORS.GRAY_SCALE_600};
`;

const StyledTextField = styled(Flex.Vertical)`
  button {
    padding: 0 15px;
    flex-shrink: 0;
  }

  .required__point {
    color: ${COLORS.ERROR};
  }

  .formgroup__error-message {
    animation: fadeIn 0.2s forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

type Props = FlexProps & FormGroupProps;

function FormGroup({ label, buttonProps, errorMessage, className, timerContent, caption, required, children, ...props }: Props) {
  const newErrorMessage = `${className} ${errorMessage ? 'error' : ''}`;

  return (
    <StyledTextField className={newErrorMessage} gap={8} {...props}>
      {label && (
        <Typography.Body4 color={COLORS.GRAY_SCALE_600}>
          {label} {required && <span className='required__point'>*</span>}
        </Typography.Body4>
      )}
      <Flex.Horizontal gap={8}>
        <TextInputWrapper>
          {children}
          {timerContent && <TimerWrapper>{timerContent}</TimerWrapper>}
        </TextInputWrapper>
        {buttonProps && <Button.Medium {...buttonProps} />}
      </Flex.Horizontal>
      {caption && <Typography.Caption1 color={COLORS.INPUT_COLOR_DEFAULT_CAPTION}>※ {caption}</Typography.Caption1>}
      {errorMessage && (
        <Typography.Caption1 className='formgroup__error-message' color={COLORS.ERROR}>
          {errorMessage}
        </Typography.Caption1>
      )}
    </StyledTextField>
  );
}

export default FormGroup;
