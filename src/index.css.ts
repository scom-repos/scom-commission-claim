import { Styles } from "@ijstech/components";
const Theme = Styles.Theme.ThemeVars;

export const imageStyle = Styles.style({
  $nest: {
    '&>img': {
      maxWidth: 'unset',
      maxHeight: 'unset',
      borderRadius: 4
    }
  }
})

export const markdownStyle = Styles.style({
  overflowWrap: 'break-word',
  color: Theme.text.primary
})

export const inputStyle = Styles.style({
  $nest: {
    '> input': {
      background: 'transparent',
      border: 0,
      padding: '0.25rem 0.5rem',
      textAlign: 'right'
    }
  }
})

export const tokenSelectionStyle = Styles.style({
  $nest: {
    'i-modal': {
      minWidth: 'auto !important',
      maxWidth: '140px !important'
    },
    '.modal': {
      minWidth: 'auto !important',
    }
  }
})