import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '72ch',
            color: 'rgb(39 39 42)',
            h1: {
              letterSpacing: '-0.02em'
            },
            h2: {
              letterSpacing: '-0.015em'
            },
            a: {
              color: 'rgb(24 24 27)',
              textDecorationThickness: '0.08em',
              textUnderlineOffset: '0.15em'
            },
            code: {
              color: 'rgb(24 24 27)',
              backgroundColor: 'rgb(244 244 245)',
              paddingLeft: '0.3rem',
              paddingRight: '0.3rem',
              paddingTop: '0.15rem',
              paddingBottom: '0.15rem',
              borderRadius: '0.3rem'
            },
            'code::before': {
              content: 'none'
            },
            'code::after': {
              content: 'none'
            }
          }
        }
      }
    }
  },
  plugins: [typography]
};

export default config;
