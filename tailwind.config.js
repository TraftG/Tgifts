/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        'bg-alternate': 'var(--color-bg-alternate)',
        text: 'var(--color-text)',
        'text-alternate': 'var(--color-text-alternate)',
        hint: 'var(--color-hint)',
        'hint-solid': 'var(--color-hint-solid)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        'secondary-plain': 'var(--color-secondary-plain)',
        'secondary-alternate': 'var(--color-secondary-alternate)',
        negative: 'var(--color-negative)',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
      },
      animation: {
        shimmer: 'var(--animate-shimmer)',
      },
    },
  },
  plugins: [],
} 