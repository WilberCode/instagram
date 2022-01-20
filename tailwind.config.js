module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      padding: '20px',
      screens: {
          sm: "100%",
          md: "100%",
          lg: "975px",
          xl: "975px"
       }
  },
    extend: {

      colors: { 
       
        heading:'#262626',
        body:'#fafafa',
        layout:'#dbdbdb',
        line:'#efefef'
 
      }, 
    },
    screens: { 
      xss: '322px',
      xs: '400px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      maxs: {'max': '360px'},
      maxsm: {'max': '640px'},
      maxmd: { 'max': '768px'},
      maxlg: {'max': '1023px'},
      maxl: {'max': '1280px'}
    }
  },
  variants: {
    extend: {},
  },
  plugins: [  require('tailwind-scrollbar') ],
}
