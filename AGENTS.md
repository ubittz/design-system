# @ubittz/design-system — AI Collaboration Guide

This document is a reference for AI assistants working in projects that use the `@ubittz/design-system` package. It covers all exported components, icons, tokens, and usage patterns.

## Quick Setup

```tsx
import { DesignSystemProvider } from '@ubittz/design-system';
import '@ubittz/design-system/tokens.css';

function App() {
  return (
    <DesignSystemProvider platform='app' defaultLang='kr'>
      <PopupProvider>
        <BottomSheetProvider>{/* app content */}</BottomSheetProvider>
      </PopupProvider>
    </DesignSystemProvider>
  );
}
```

- `platform`: `'app'` (mobile) or `'web'`
- `defaultLang`: `'kr'` or `'en'` (affects typography letter-spacing)
- Optional `theme` prop for semantic color overrides

### Tailwind Integration

```js
// tailwind.config.js
import preset from '@ubittz/design-system/tailwind-preset';
export default { presets: [preset] };
```

```css
/* global CSS */
@import '@ubittz/design-system/tailwind-theme.css';
```

---

## Components

All components are imported from `@ubittz/design-system`.

### Button

4 variants: `Button`, `FullButton`, `IconButton`, `TextButton`.

```tsx
import { Button, FullButton, IconButton, TextButton } from '@ubittz/design-system';

<Button variant="primary" size="m" shape="default" onClick={handleClick}>
  Label
</Button>

<Button variant="outline" iconFront={<RoundStroke.Plus />} fullWidth>
  With Icon
</Button>

// FullButton — 52px height, full-width. Use FullButton.Group for side-by-side layout.
<FullButton variant="primary" onClick={handleConfirm}>Confirm</FullButton>
<FullButton.Group>
  <FullButton variant="gray">Cancel</FullButton>
  <FullButton variant="primary">OK</FullButton>
</FullButton.Group>
```

| Prop        | Type                                                         | Default     | Description       |
| ----------- | ------------------------------------------------------------ | ----------- | ----------------- |
| `variant`   | `'primary' \| 'secondary' \| 'ghost' \| 'gray' \| 'outline'` | `'primary'` | Color variant     |
| `size`      | `'xs' \| 's' \| 'm' \| 'l' \| 'xl'`                          | `'m'`       | Size              |
| `shape`     | `'default' \| 'round' \| 'square' \| 'semi-round'`           | `'default'` | Border radius     |
| `iconFront` | `ReactNode`                                                  | —           | Icon before label |
| `iconBack`  | `ReactNode`                                                  | —           | Icon after label  |
| `disabled`  | `boolean`                                                    | `false`     | Disabled state    |
| `fullWidth` | `boolean`                                                    | `false`     | 100% width        |

---

### TextField

Text input with optional label, caption, error, unit, and format masking.

```tsx
import { TextField } from '@ubittz/design-system';

<TextField
  label="Phone"
  required
  placeholder="010-0000-0000"
  format="ddd-dddd-dddd"
  value={phone}
  onChange={e => setPhone(e.target.value)}
  errorMessage={error}
/>

<TextField shape="line" unit="원" />
```

| Prop           | Type                  | Default     | Description                              |
| -------------- | --------------------- | ----------- | ---------------------------------------- |
| `shape`        | `'default' \| 'line'` | `'default'` | Box or underline style                   |
| `unit`         | `string`              | —           | Unit suffix (e.g. "원", "kg")            |
| `format`       | `string`              | —           | Mask pattern (`d`=digit, others literal) |
| `label`        | `ReactNode`           | —           | FormGroup label                          |
| `required`     | `boolean`             | —           | Show required marker                     |
| `caption`      | `ReactNode`           | —           | Help text below input                    |
| `errorMessage` | `ReactNode`           | —           | Error text (replaces caption)            |
| `buttonProps`  | `ButtonProps`         | —           | Side button                              |
| `timerContent` | `ReactNode`           | —           | Timer display                            |
| ...rest        | `InputHTMLAttributes` | —           | Native input props                       |

---

### TextArea

Multiline text input with FormGroup wrapper.

```tsx
import { TextArea } from '@ubittz/design-system';

<TextArea label='Description' shape='default' placeholder='Enter description' rows={4} />;
```

| Prop                                           | Type                     | Default     | Description           |
| ---------------------------------------------- | ------------------------ | ----------- | --------------------- |
| `shape`                                        | `'default' \| 'square'`  | `'default'` | Border style          |
| `label`, `required`, `caption`, `errorMessage` | FormGroupProps           | —           | FormGroup props       |
| ...rest                                        | `TextareaHTMLAttributes` | —           | Native textarea props |

---

### Search

Search input with built-in search icon and clear button.

```tsx
import { Search } from '@ubittz/design-system';

<Search placeholder='Search...' value={query} onChange={(e) => setQuery(e.target.value)} onSearch={handleSearch} />;
```

| Prop       | Type                      | Description             |
| ---------- | ------------------------- | ----------------------- |
| `onSearch` | `(value: string) => void` | Called on search submit |
| ...rest    | `InputHTMLAttributes`     | Native input props      |

---

### Dropdown

Select-style dropdown with portal-rendered options list.

```tsx
import { Dropdown } from '@ubittz/design-system';

<Dropdown
  label='Category'
  placeholder='Select...'
  options={[
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' },
  ]}
  value={selected}
  onChange={setSelected}
/>;
```

| Prop                                           | Type                                 | Default     | Description      |
| ---------------------------------------------- | ------------------------------------ | ----------- | ---------------- |
| `shape`                                        | `'default' \| 'line'`                | `'default'` | Box or underline |
| `placeholder`                                  | `string`                             | —           | Placeholder text |
| `options`                                      | `{ label: string, value: string }[]` | —           | Options          |
| `value`                                        | `string`                             | —           | Selected value   |
| `disabled`                                     | `boolean`                            | —           | Disabled         |
| `onChange`                                     | `(value: string) => void`            | —           | Change handler   |
| `label`, `required`, `caption`, `errorMessage` | FormGroupProps                       | —           | FormGroup props  |

---

### Calendar

Date picker calendar with single and range selection modes.

```tsx
import { Calendar } from '@ubittz/design-system';

// Single date
<Calendar
  mode="single"
  value={date}
  onChange={setDate}
  showButton
  showDayHeader
/>

// Date range
<Calendar
  mode="range"
  value={range}
  onChange={setRange}
  minDate={new Date(2024, 0, 1)}
  maxDate={new Date(2025, 11, 31)}
/>
```

| Prop            | Type                                                     | Default    | Description                 |
| --------------- | -------------------------------------------------------- | ---------- | --------------------------- |
| `mode`          | `'single' \| 'range'`                                    | `'single'` | Selection mode              |
| `value`         | `Date \| null` (single) / `[Date, Date] \| null` (range) | —          | Selected value              |
| `onChange`      | `(date) => void` / `(range) => void`                     | —          | Change handler              |
| `showButton`    | `boolean`                                                | `false`    | Show cancel/confirm buttons |
| `showDayHeader` | `boolean`                                                | `true`     | Show day-of-week header     |
| `minDate`       | `Date`                                                   | —          | Earliest selectable date    |
| `maxDate`       | `Date`                                                   | —          | Latest selectable date      |
| `onCancel`      | `() => void`                                             | —          | Cancel button callback      |
| `onConfirm`     | `() => void`                                             | —          | Confirm button callback     |

Includes year/month picker views (click header title to switch).

---

### Picker (DatePicker)

Form-field wrapper around Calendar. Renders as an input that opens a Calendar dropdown.

```tsx
import { Picker } from '@ubittz/design-system';

// Single date picker
<Picker
  label="Date"
  mode="single"
  value={date}
  onChange={setDate}
  placeholder="Select date"
  formatDate={d => d.toLocaleDateString('ko-KR')}
/>

// Range picker
<Picker
  mode="range"
  value={range}
  onChange={setRange}
  formatRange={([s, e]) => `${format(s)} ~ ${format(e)}`}
/>
```

| Prop                                           | Type                              | Default     | Description            |
| ---------------------------------------------- | --------------------------------- | ----------- | ---------------------- |
| `mode`                                         | `'single' \| 'range'`             | `'single'`  | Selection mode         |
| `shape`                                        | `'default' \| 'line'`             | `'default'` | Input style            |
| `placeholder`                                  | `string`                          | —           | Placeholder            |
| `disabled`                                     | `boolean`                         | —           | Disabled               |
| `formatDate`                                   | `(date: Date) => string`          | —           | Custom date formatter  |
| `formatRange`                                  | `(range: [Date, Date]) => string` | —           | Custom range formatter |
| `minDate`, `maxDate`                           | `Date`                            | —           | Date constraints       |
| `label`, `required`, `caption`, `errorMessage` | FormGroupProps                    | —           | FormGroup props        |

---

### Toggle

Segmented control / tab-style toggle.

```tsx
import { Toggle } from '@ubittz/design-system';

<Toggle items={['Option A', 'Option B', 'Option C']} activeIndex={activeTab} onChange={setActiveTab} />;
```

| Prop          | Type                      | Description            |
| ------------- | ------------------------- | ---------------------- |
| `items`       | `string[]`                | Toggle labels          |
| `activeIndex` | `number`                  | Currently active index |
| `onChange`    | `(index: number) => void` | Change handler         |

---

### RadioButton

```tsx
import { RadioButton } from '@ubittz/design-system';

<RadioButton name='option' value='a' label='Option A' checked={selected === 'a'} onChange={() => setSelected('a')} size='M' />;
```

| Prop       | Type                         | Default | Description                |
| ---------- | ---------------------------- | ------- | -------------------------- |
| `checked`  | `boolean`                    | `false` | Checked state              |
| `size`     | `'S' \| 'M'`                 | `'M'`   | Size (S=20px, M=24px icon) |
| `label`    | `string`                     | —       | Label text                 |
| `value`    | `string`                     | —       | Input value                |
| `name`     | `string`                     | —       | Radio group name           |
| `disabled` | `boolean`                    | —       | Disabled                   |
| `onChange` | `(checked: boolean) => void` | —       | Change handler             |

---

### Checkbox

```tsx
import { Checkbox } from '@ubittz/design-system';

<Checkbox
  label="Agree to terms"
  checked={agreed}
  onChange={setAgreed}
  size="M"
  shape="default"
/>

// With caption (brand-colored prefix) and arrow
<Checkbox
  label="Marketing"
  caption="(optional)"
  arrow
  checked={marketing}
  onChange={setMarketing}
/>
```

| Prop       | Type                         | Default     | Description            |
| ---------- | ---------------------------- | ----------- | ---------------------- |
| `checked`  | `boolean`                    | `false`     | Checked state          |
| `size`     | `'S' \| 'M'`                 | `'M'`       | Size                   |
| `shape`    | `'default' \| 'square'`      | `'default'` | Rounded or square icon |
| `label`    | `string`                     | —           | Label text             |
| `caption`  | `string`                     | —           | Sub-text (brand color) |
| `arrow`    | `boolean`                    | —           | Show right arrow       |
| `disabled` | `boolean`                    | —           | Disabled               |
| `onChange` | `(checked: boolean) => void` | —           | Change handler         |

---

### SelectableOption

Pressable option chip/card used in selection lists.

```tsx
import { SelectableOption } from '@ubittz/design-system';

<SelectableOption shape='default' size='m' selected={isSelected} onClick={handleSelect}>
  Option Label
</SelectableOption>;
```

| Prop       | Type                               | Default     | Description         |
| ---------- | ---------------------------------- | ----------- | ------------------- |
| `shape`    | `'default' \| 'round' \| 'square'` | `'default'` | Border radius       |
| `size`     | `'s' \| 'm' \| 'l'`                | `'m'`       | Size                |
| `selected` | `boolean`                          | `false`     | Selected state      |
| ...rest    | `ButtonHTMLAttributes`             | —           | Native button props |

---

### FormGroup

Wrapper that adds label, required marker, caption, error message around any input.

```tsx
import { FormGroup } from '@ubittz/design-system';

<FormGroup label='Email' required errorMessage='Invalid email'>
  <input type='email' />
</FormGroup>;
```

TextField, TextArea, Dropdown, Picker all accept FormGroup props directly — no need to wrap them manually.

| Prop           | Type          | Description                              |
| -------------- | ------------- | ---------------------------------------- |
| `label`        | `ReactNode`   | Label above input                        |
| `required`     | `boolean`     | Show \* marker                           |
| `caption`      | `ReactNode`   | Help text below                          |
| `errorMessage` | `ReactNode`   | Error text (replaces caption, turns red) |
| `buttonProps`  | `ButtonProps` | Button next to input                     |
| `timerContent` | `ReactNode`   | Timer display                            |

---

### Popup (Modal Dialog)

Portal-based centered modal. Two usage patterns:

#### A. Direct component usage

```tsx
import { Popup } from '@ubittz/design-system';

<Popup
  open={isOpen}
  title='Delete item?'
  body='This action cannot be undone.'
  confirmButton={{ label: 'Delete', variant: 'primary', onClick: handleDelete }}
  cancelButton={{ label: 'Cancel', variant: 'gray', onClick: () => setIsOpen(false) }}
  onBackdropClick={() => setIsOpen(false)}
/>;
```

#### B. Context/hooks (imperative)

```tsx
import { PopupProvider, usePopup } from '@ubittz/design-system';

// Wrap app with PopupProvider (see Quick Setup above)

function MyComponent() {
  const popup = usePopup();

  const handleDelete = () => {
    popup.open({
      title: 'Delete item?',
      body: 'This action cannot be undone.',
      confirmButton: { label: 'Delete', variant: 'primary', onClick: () => doDelete() },
      cancelButton: { label: 'Cancel', variant: 'gray' },
    });
  };
  // Buttons auto-close the popup after onClick executes.
}
```

| Prop              | Type               | Description                                             |
| ----------------- | ------------------ | ------------------------------------------------------- |
| `open`            | `boolean`          | Visibility                                              |
| `title`           | `string`           | Title text (required)                                   |
| `body`            | `string`           | Body text                                               |
| `confirmButton`   | `PopupButtonProps` | Confirm button (Omit<ButtonProps,'children'> & {label}) |
| `cancelButton`    | `PopupButtonProps` | Cancel button                                           |
| `onBackdropClick` | `() => void`       | Backdrop click handler                                  |

---

### BottomSheet

Slide-up sheet from bottom with grabber, header, content area, and optional button.

#### A. Direct component usage

```tsx
import { BottomSheet } from '@ubittz/design-system';

<BottomSheet
  open={isOpen}
  title='Select Option'
  showClose
  onClose={() => setIsOpen(false)}
  button={{ label: 'Confirm', variant: 'primary', onClick: handleConfirm }}
>
  <div>Sheet content here</div>
</BottomSheet>;
```

#### B. Context/hooks (imperative)

```tsx
import { BottomSheetProvider, useBottomSheet } from '@ubittz/design-system';

// Wrap app with BottomSheetProvider (see Quick Setup above)

function MyComponent() {
  const bottomSheet = useBottomSheet();

  const openSheet = () => {
    bottomSheet.open({
      title: 'Select Option',
      showClose: true,
      content: <OptionList />,
      button: { label: 'Apply', variant: 'primary', onClick: handleApply },
    });
  };
  // Button auto-closes the sheet after onClick executes.
}
```

| Prop        | Type                     | Description                                                    |
| ----------- | ------------------------ | -------------------------------------------------------------- |
| `open`      | `boolean`                | Visibility                                                     |
| `title`     | `string`                 | Header title                                                   |
| `showClose` | `boolean`                | Show close (X) button in header                                |
| `button`    | `BottomSheetButtonProps` | Bottom FullButton (Omit<FullButtonProps,'children'> & {label}) |
| `onClose`   | `() => void`             | Close handler                                                  |
| `children`  | `ReactNode`              | Sheet content                                                  |

---

### FilterBar

Horizontal scrollable pill-style filter chips.

```tsx
import { FilterBar } from '@ubittz/design-system';

<FilterBar
  options={[
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
  ]}
  value={filter}
  onChange={setFilter}
/>;
```

| Prop       | Type                                 | Description    |
| ---------- | ------------------------------------ | -------------- |
| `options`  | `{ label: string, value: string }[]` | Filter options |
| `value`    | `string`                             | Selected value |
| `onChange` | `(value: string) => void`            | Change handler |

---

### SortSelect

Dropdown-style sort selector (label + down arrow).

```tsx
import { SortSelect } from '@ubittz/design-system';

<SortSelect
  options={[
    { label: 'Newest', value: 'newest' },
    { label: 'Price: Low to High', value: 'price_asc' },
  ]}
  value={sortBy}
  onChange={setSortBy}
/>;
```

| Prop       | Type                                 | Description    |
| ---------- | ------------------------------------ | -------------- |
| `options`  | `{ label: string, value: string }[]` | Sort options   |
| `value`    | `string`                             | Selected value |
| `onChange` | `(value: string) => void`            | Change handler |

---

### Pagination

Page navigation with prev/next arrows and page number buttons.

```tsx
import { Pagination } from '@ubittz/design-system';

<Pagination current={page} total={totalPages} onChange={setPage} maxVisible={5} />;
```

| Prop         | Type                     | Default | Description              |
| ------------ | ------------------------ | ------- | ------------------------ |
| `current`    | `number`                 | —       | Current page (1-based)   |
| `total`      | `number`                 | —       | Total pages              |
| `onChange`   | `(page: number) => void` | —       | Page change handler      |
| `maxVisible` | `number`                 | `5`     | Max visible page buttons |

---

### ImageUploader

Image upload with preview, add button, and delete.

```tsx
import { ImageUploader } from '@ubittz/design-system';
import type { ImageFile } from '@ubittz/design-system';

<ImageUploader value={images} maxCount={5} accept='image/*' onChange={setImages} />;
```

| Prop       | Type                           | Default     | Description                           |
| ---------- | ------------------------------ | ----------- | ------------------------------------- |
| `value`    | `ImageFile[]`                  | `[]`        | Current images                        |
| `maxCount` | `number`                       | —           | Max upload count                      |
| `accept`   | `string`                       | `'image/*'` | File accept filter                    |
| `disabled` | `boolean`                      | —           | Disabled                              |
| `onClick`  | `() => void`                   | —           | Custom click handler (for TWA/native) |
| `onChange` | `(files: ImageFile[]) => void` | —           | Change handler                        |

```tsx
type ImageFile = {
  id: string; // Unique ID
  file?: File; // File object (undefined for pre-existing images)
  url: string; // Preview URL
  name: string; // File name
};
```

---

### TopNavigation

Fixed top navigation bar (56px height).

```tsx
import { TopNavigation } from '@ubittz/design-system';

<TopNavigation
  left={
    <button onClick={goBack}>
      <RoundStroke.Left />
    </button>
  }
  title='Page Title'
  right={
    <button>
      <RoundStroke.Menu />
    </button>
  }
/>;
```

| Prop    | Type        | Description                 |
| ------- | ----------- | --------------------------- |
| `left`  | `ReactNode` | Left slot (back button)     |
| `title` | `ReactNode` | Center title                |
| `right` | `ReactNode` | Right slot (action buttons) |

---

### BottomNavigation

Fixed bottom navigation bar for app tab navigation.

### TabMenu

Horizontal tab navigation with underline indicator.

---

## Icons

4 namespaces with 370+ icons total:

```tsx
import { RoundStroke, RoundSolid, DefaultStroke, DefaultSolid } from '@ubittz/design-system';

<RoundStroke.Search size={24} color="var(--semantic-icon-default-primary)" />
<RoundSolid.Heart size={20} color="#E51931" />
<DefaultStroke.Calendar size={24} />
```

| Namespace       | Style            | Count |
| --------------- | ---------------- | ----- |
| `RoundStroke`   | Rounded outlined | 127   |
| `RoundSolid`    | Rounded filled   | 96    |
| `DefaultStroke` | Default outlined | 83    |
| `DefaultSolid`  | Default filled   | 64    |

**Common icons:** `Left`, `Right`, `Bottom`, `Top`, `Cancel`, `Check`, `Search`, `Plus`, `Minus`, `Menu`, `Home`, `Cart`, `Heart`, `Calendar`, `Camera`, `Edit`, `Delete`, `Download`, `Upload`, `Setting`, `User`, `Bell`, `Clock`, `Star`, `Eye`, `EyeOff`, `Lock`, `Unlock`, `Info`, `Warning`

**IconProps:**

| Prop        | Type            | Default          | Description            |
| ----------- | --------------- | ---------------- | ---------------------- |
| `size`      | `number`        | `24`             | Width and height in px |
| `color`     | `string`        | `'currentColor'` | SVG fill/stroke color  |
| `className` | `string`        | —                | CSS class              |
| `style`     | `CSSProperties` | —                | Inline styles          |

---

## Color Token System

Three-layer architecture:

```
baseColors (constants) → semanticColors (overridable) → componentTokens (derived)
```

### Using CSS Variables

All tokens are available as CSS variables at runtime:

```css
/* Semantic tokens */
var(--semantic-brand-primary-500)      /* Brand primary color */
var(--semantic-text-default-primary)   /* Primary text color */
var(--semantic-border-default-default) /* Default border color */
var(--semantic-surface-default-background) /* Background color */

/* Component tokens */
var(--component-button-primary-background)
var(--component-input-default-border)
var(--component-calendar-selected-background)
var(--component-navigation-default-text)
var(--component-toggle-selected-background)
var(--component-filter-selected-background)
var(--component-modal-background)
```

### Theme Customization

Override semantic colors via the provider:

```tsx
<DesignSystemProvider
  platform="app"
  defaultLang="kr"
  theme={{
    semanticColors: {
      brand: {
        primary: {
          50: '#FFF0F0',
          100: '#FFD6D6',
          500: '#FF4444',  // Override primary brand color
          600: '#E03333',
          700: '#CC2222',
        },
      },
    },
  }}
>
```

### Base Color Palettes

Available palettes: `Gray` (0-900), `Sky`, `Pistachio`, `Coral`, `Apple`, `Orange`, `Grass`, `Carrot`, `Mustard`, `Lemon`, `Coffee`, `Sage`, `Blueberry`, `Violet`, `Plum`, `Purple`, `Wine`

Each palette has shades: `50`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`

Default brand primary: **Sky** (#288FF6)
Default brand secondary: **Pistachio** (#68BC43)

---

## Typography

Import typography tokens if needed for custom styling:

```tsx
import { typography } from '@ubittz/design-system';

// typography.app.kr.title.h1 → { fontSize: '28px', fontWeight: 700, lineHeight: '34px', ... }
// typography.app.en.body.body1 → { fontSize: '20px', fontWeight: 400, lineHeight: '30px', ... }
// typography.web.title.h1 → { fontSize: '52px', fontWeight: 800, lineHeight: '68px', ... }
```

**Font family:** Pretendard (all styles)

### Mobile (App) Scale

| Token             | Size | Weight         |
| ----------------- | ---- | -------------- |
| `title.h1`        | 28px | Bold (700)     |
| `title.h2`        | 24px | Bold           |
| `title.h3`        | 20px | SemiBold (600) |
| `title.h4`        | 18px | SemiBold       |
| `title.subtitle1` | 18px | Medium (500)   |
| `title.subtitle2` | 16px | Medium         |
| `title.subtitle3` | 14px | Medium         |
| `body.body1`      | 20px | Regular (400)  |
| `body.body2`      | 16px | Regular        |
| `body.body3`      | 14px | Regular        |
| `body.caption1`   | 12px | Regular        |
| `body.caption2`   | 10px | Regular        |
| `button.button1`  | 16px | Medium         |
| `button.button2`  | 14px | Medium         |
| `button.button3`  | 12px | Medium         |

---

## Spacing Scale

```tsx
import { spacing } from '@ubittz/design-system';
```

| Token | Value          |
| ----- | -------------- |
| `0`   | 0              |
| `1`   | 4px (0.25rem)  |
| `2`   | 8px (0.5rem)   |
| `3`   | 12px (0.75rem) |
| `4`   | 16px (1rem)    |
| `5`   | 20px (1.25rem) |
| `6`   | 24px (1.5rem)  |
| `8`   | 32px (2rem)    |
| `10`  | 40px (2.5rem)  |
| `12`  | 48px (3rem)    |
| `16`  | 64px (4rem)    |
| `20`  | 80px (5rem)    |
| `24`  | 96px (6rem)    |

---

## Key Patterns & Conventions

### All styling is inline

Components use `React.CSSProperties` inline styles with CSS variables. No CSS modules, no Tailwind classes inside the design system. Consuming projects may use Tailwind with the provided preset.

### FormGroup integration

`TextField`, `TextArea`, `Dropdown`, and `Picker` accept `label`, `required`, `caption`, `errorMessage` props directly — they use `FormGroup` internally.

### Controlled components

All interactive components follow the controlled pattern: `value` + `onChange`. No internal state for values.

### Portal rendering

`Popup`, `BottomSheet`, `Dropdown`, `SortSelect`, and `Picker` render overlays/dropdowns via `createPortal` to `document.body`.

### Provider nesting order

```tsx
<DesignSystemProvider>
  <PopupProvider>
    <BottomSheetProvider>{children}</BottomSheetProvider>
  </PopupProvider>
</DesignSystemProvider>
```

### Discriminated union props

`Calendar` and `Picker` use discriminated unions on `mode`:

- `mode='single'` → `value: Date | null`, `onChange: (date: Date) => void`
- `mode='range'` → `value: [Date, Date] | null`, `onChange: (range: [Date, Date] | null) => void`

### Type exports

All prop types are exported and can be imported directly:

```tsx
import type {
  ButtonProps,
  TextFieldProps,
  CalendarProps,
  PopupProps,
  PopupButtonProps,
  BottomSheetProps,
  DropdownOption,
  ImageFile,
  // etc.
} from '@ubittz/design-system';
```
