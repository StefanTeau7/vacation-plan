import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    darkPurple: {
      500: '#251627',  // Dark Purple shade
      200: '#533258',  // Dark Purple shade
    },

    lightGreen: {
      500: '#3b7639',  // Light Green shade
    },
  },
  components: {
    Button: {
      // Here, we define button colors specifically for light and dark modes.
      variants: {
        solid: (props: { colorMode: string; }) => ({
          bg: props.colorMode === 'dark' ? 'darkPurple.200' : 'lightGreen.500',
          color: 'white',
        }),
      },
    },
  },
  styles: {
    global: (props: { colorMode: string; }) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'darkPurple.500' : 'white',
        color: props.colorMode === 'dark' ? 'gray.200' : 'gray.800',
      },
    }),
  },
});

export default theme;
