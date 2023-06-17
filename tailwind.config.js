/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT")

module.exports = withMT ({
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
          'login-pattern': "url('../../public/auth-side.jpg')",
          'forgot-pattern': "url('../../public/forgot.jpg')",
          'history_bg': "url('../../public/bg-2.png')",
          'payment-pattern': "url('../../public/payment.jpg')",
          'order_bg': "url('../../public/bg-1.png')",

      },
      fontFamily: {
        'label-food': ['Poppins', 'sans-serif'],

    }
    },
  },
  daisyui:{
    themes:[
      {
        defaultTheme:{
                    'primary':'#1A120B',
                    'secondary':'#3C2A21',
                    'accent':'#D5CEA3',
                    'neutral':'#E5E5CB',
                    'info':'#EAEAEA',
                    'success':'#10b981',
                    'error':'#dc2626',
                    'snow': '#EAEAEA'
        }
      }
    ]
  },
  plugins: [
    require('daisyui'),
    require('tailwind-scrollbar-hide')
  ],
})
