import { Button, useColorMode } from '@chakra-ui/react';

function ToggleColorModeButton(props: any) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode} {...props}>
      Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
    </Button>
  );
}

export default ToggleColorModeButton;
