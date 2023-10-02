// App.tsx
"use client"; // This is a client component 👈🏽

import { Box, Button, Flex, HStack, Heading, Input, Spinner, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import ToggleColorModeButton from '../components/toggleColorButton';
import { searchVacation } from '../helper/helper';
import Recommendation from './recommendations';


export function Home() {
  const [location, setLocation] = useState<string>('');
  const [recommendation, setRecommendation] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    setIsLoading(true);  // Start loading

    try {
      const result = await searchVacation(location);
      setRecommendation(result);
    } catch (error) {
      console.error('Error fetching vacation recommendation:', error);
    }

    setIsLoading(false);  // End loading
  };

  // TODO: Implement SurpriseMe function
  if (recommendation) {
    return (
      <VStack spacing={4} align="left" p={8}>
        <Recommendation data={recommendation} goBack={() => setRecommendation(null)} />
      </VStack>
    );
  }

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" width="100vw" height="100vh">
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      </Box>
    );
  }

  return (
    <Box position="relative" width="100vw" height="100vh">
      <ToggleColorModeButton position="absolute" top={20} right={20} />
      <Flex alignItems="center" justifyContent="center" width="100%" height="100%">
        <VStack spacing={4} align="center" p={8}>
          <Heading size="lg">Find your perfect vacation</Heading>
          <Input
            placeholder="Where to?"
            alignContent={'center'}
            value={location}
            width={400}
            onChange={(e) => setLocation(e.target.value)}
          />
          <HStack spacing={4}>
            <Button onClick={handleSearch}>Search</Button>
            <Button>Surprise Me</Button>
          </HStack>
        </VStack>
      </Flex>
    </Box>
  );
};
