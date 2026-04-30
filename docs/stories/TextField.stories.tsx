import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from '../../src/components/app/TextField';
import { FormGroup } from '../../src/components/app/FormGroup';

const meta = {
  title: 'Components/App/TextField',
  component: TextField,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// Helper
// ============================================================================

const PhoneFrame: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title }) => (
  <div style={{ marginBottom: 32 }}>
    {title && <h3 style={{ fontSize: 14, fontWeight: 600, color: '#667085', marginBottom: 12 }}>{title}</h3>}
    <div
      style={{
        width: 375,
        border: '1px solid #E1E4E8',
        borderRadius: 12,
        overflow: 'hidden',
        background: '#fff',
        padding: 24,
      }}
    >
      {children}
    </div>
  </div>
);

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 style={{ fontSize: 14, fontWeight: 600, color: '#667085', marginBottom: 12 }}>{children}</h3>
);

// ============================================================================
// 1. Default
// ============================================================================

export const Default: Story = {
  name: 'Default',
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState('');
      return (
        <PhoneFrame title="기본 TextField">
          <TextField
            placeholder="플레이스 홀더입니다."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </PhoneFrame>
      );
    };
    return <Demo />;
  },
};

// ============================================================================
// 2. With Label
// ============================================================================

export const WithLabel: Story = {
  name: 'With Label',
  render: () => (
    <PhoneFrame>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <TextField label="이메일" placeholder="이메일을 입력해주세요." />
        <TextField label="비밀번호" placeholder="비밀번호를 입력해주세요." required />
      </div>
    </PhoneFrame>
  ),
};

// ============================================================================
// 3. States
// ============================================================================

export const States: Story = {
  name: 'States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <PhoneFrame title="기본">
        <TextField label="Label" placeholder="플레이스 홀더입니다." />
      </PhoneFrame>
      <PhoneFrame title="입력됨">
        <TextField label="Label" value="기본 텍스트입니다." readOnly />
      </PhoneFrame>
      <PhoneFrame title="비활성">
        <TextField label="Label" placeholder="비활성화 텍스트입니다." disabled />
      </PhoneFrame>
      <PhoneFrame title="에러">
        <TextField label="Label" placeholder="플레이스 홀더입니다." errorMessage="에러 문구 입니다." />
      </PhoneFrame>
      <PhoneFrame title="캡션">
        <TextField label="Label" placeholder="플레이스 홀더입니다." caption="안내 문구 입니다." />
      </PhoneFrame>
    </div>
  ),
};

// ============================================================================
// 4. Shapes
// ============================================================================

export const Shapes: Story = {
  name: 'Shapes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <PhoneFrame title="Default (box)">
        <TextField shape="default" label="Label" placeholder="플레이스 홀더입니다." />
      </PhoneFrame>
      <PhoneFrame title="Line (underline)">
        <TextField shape="line" label="Label" placeholder="플레이스 홀더입니다." />
      </PhoneFrame>
    </div>
  ),
};

// ============================================================================
// 5. With Unit
// ============================================================================

export const WithUnit: Story = {
  name: 'With Unit',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <PhoneFrame title="단위 표시">
        <TextField label="금액" value="10,000" unit="원" readOnly />
      </PhoneFrame>
      <PhoneFrame title="단위 + 비활성">
        <TextField label="금액" placeholder="금액을 입력해주세요." unit="원" disabled />
      </PhoneFrame>
    </div>
  ),
};

// ============================================================================
// 6. With Button
// ============================================================================

export const WithButton: Story = {
  name: 'With Button',
  render: () => {
    const Demo = () => {
      const [sent, setSent] = useState(false);
      return (
        <PhoneFrame title="버튼 포함">
          <TextField
            label="인증번호"
            placeholder="인증번호를 입력해주세요."
            buttonProps={{
              children: sent ? '재전송' : '인증',
              variant: 'primary',
              onClick: () => setSent(true),
            }}
          />
        </PhoneFrame>
      );
    };
    return <Demo />;
  },
};

// ============================================================================
// 7. With Timer
// ============================================================================

export const WithTimer: Story = {
  name: 'With Timer',
  render: () => {
    const Demo = () => {
      const [seconds, setSeconds] = useState(180);
      const min = Math.floor(seconds / 60);
      const sec = seconds % 60;
      return (
        <PhoneFrame title="타이머 포함">
          <TextField
            label="인증번호"
            placeholder="인증번호를 입력해주세요."
            timerContent={`${min}:${sec.toString().padStart(2, '0')}`}
            buttonProps={{
              children: '재전송',
              variant: 'ghost',
              onClick: () => setSeconds(180),
            }}
          />
        </PhoneFrame>
      );
    };
    return <Demo />;
  },
};

// ============================================================================
// 8. Complex Example
// ============================================================================

export const ComplexExample: Story = {
  name: 'Complex (Unit + Timer + Caption)',
  render: () => (
    <PhoneFrame title="복합 예시">
      <TextField
        label="Label"
        value="기본 텍스트입니다."
        unit="원"
        timerContent="2:59"
        caption="안내 문구 입니다."
        readOnly
      />
    </PhoneFrame>
  ),
};

// ============================================================================
// 9. FormGroup standalone
// ============================================================================

export const FormGroupStandalone: Story = {
  name: 'FormGroup (standalone)',
  render: () => (
    <PhoneFrame title="FormGroup을 커스텀 입력과 함께 사용">
      <FormGroup label="커스텀 셀렉트" required caption="항목을 선택하세요.">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            height: 40,
            padding: '0 12px',
            border: '1px solid var(--component-input-default-border)',
            borderRadius: 4,
            background: 'var(--component-input-default-background)',
            fontSize: 14,
            color: 'var(--component-input-default-placeholder)',
          }}
        >
          선택해주세요.
        </div>
      </FormGroup>
    </PhoneFrame>
  ),
};

// ============================================================================
// 10. Format
// ============================================================================

export const Format: Story = {
  name: 'Format',
  render: () => {
    const Demo = () => {
      const [phone, setPhone] = useState('');
      const [bizNo, setBizNo] = useState('');
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <PhoneFrame title="휴대폰 번호 (ddd-dddd-dddd)">
            <TextField
              label="휴대폰 번호"
              placeholder="010-0000-0000"
              format="ddd-dddd-dddd"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <SectionTitle>raw value: {phone}</SectionTitle>
          </PhoneFrame>
          <PhoneFrame title="사업자등록번호 (ddd-dd-ddddd)">
            <TextField
              label="사업자등록번호"
              placeholder="000-00-00000"
              format="ddd-dd-ddddd"
              value={bizNo}
              onChange={(e) => setBizNo(e.target.value)}
            />
            <SectionTitle>raw value: {bizNo}</SectionTitle>
          </PhoneFrame>
        </div>
      );
    };
    return <Demo />;
  },
};

// ============================================================================
// 11. Playground
// ============================================================================

export const Playground: Story = {
  args: {
    placeholder: '플레이스 홀더입니다.',
    shape: 'default',
    disabled: false,
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
    shape: {
      control: 'select',
      options: ['default', 'line'],
      description: '입력 필드 형태',
    },
    label: {
      control: 'text',
      description: '라벨 텍스트',
    },
    required: {
      control: 'boolean',
      description: '필수 표시',
    },
    disabled: {
      control: 'boolean',
      description: '비활성 상태',
    },
    caption: {
      control: 'text',
      description: '안내 문구',
    },
    errorMessage: {
      control: 'text',
      description: '에러 문구',
    },
    unit: {
      control: 'text',
      description: '단위 텍스트',
    },
    buttonProps: { control: false },
    timerContent: { control: false },
  },
  render: (args) => (
    <div style={{ width: 328, padding: 24 }}>
      <TextField {...args} />
    </div>
  ),
};

// ============================================================================
// 12. Sign Up Form Example
// ============================================================================

export const SignUpExample: Story = {
  name: 'Sign Up Form Example',
  render: () => {
    const SignUpForm = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [name, setName] = useState('');
      const [phone, setPhone] = useState('');

      const emailError = email && !email.includes('@') ? '올바른 이메일 형식이 아닙니다.' : undefined;

      return (
        <PhoneFrame title="회원가입 폼 예시">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <TextField
              label="이름"
              placeholder="이름을 입력해주세요."
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="이메일"
              placeholder="이메일을 입력해주세요."
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              errorMessage={emailError}
            />
            <TextField
              label="비밀번호"
              placeholder="8자 이상 입력해주세요."
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              caption="영문, 숫자, 특수문자를 포함해 8자 이상"
            />
            <TextField
              label="휴대폰 번호"
              placeholder="010-0000-0000"
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              buttonProps={{
                children: '인증',
                variant: 'primary',
                onClick: () => alert('인증번호 발송'),
              }}
            />
          </div>
        </PhoneFrame>
      );
    };
    return <SignUpForm />;
  },
};
