import { Box, Button, Heading, Image, List, ListItem, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Props {
    data: any;
    goBack: () => void;
}

type Photo = {
    id: string;
    urls: {
        small: string;
        medium: string;
        large: string;
        full: string;
    };
    alt_description: string;
};

type SearchResponse = {
    total: number;
    total_pages: number;
    results: Photo[];
};

const Recommendation: React.FC<Props> = ({ data, goBack }) => {
    const [photo, setPhoto] = useState<Photo>();

    useEffect(() => {
        const fetchPhotos = async () => {
            const response = await axios.get<SearchResponse>(
                `https://api.unsplash.com/search/photos?query=${data.location}`,
                {
                    params: { count: 1 },
                    headers: {
                        Authorization:
                            'Client-ID UVUMsMnUFmzCCsyDs7H2SZWQX8NS0eH7I_N3tqklu9k',
                    },
                },
            );
            if (response.data.results.length > 0) {
                setPhoto(response.data.results[0]);
            }
        };
        fetchPhotos();
    });


    if (!data) return null; // Early return if no data.

    return (
        <VStack spacing={4} align="left" p={8}>
            <Button
                width={120}
                onClick={goBack}>Back</Button>
            {renderSection("Vacation spot", data.location)}
            {photo && <Box key={photo.id} m={3}>
                <Image src={photo.urls.small} alt={photo.alt_description} />
            </Box>}
            {renderSection("Activities", data.activities)}
            {renderSection("Must-Sees", data.mustSee)}
            {renderSection("Restaurants", data.restaurants)}
            {renderSection("Hotels/Airbnb", data.hotels)}
        </VStack>
    );
};

// Helper function to avoid repetitive code.
function renderSection(title: string, items: string | undefined) {
    if (!items || items.length === 0) return null;

    return (
        <Box>
            <Heading size="md">{title}</Heading>
            <List spacing={2}>
                <ListItem key={items}>{items}</ListItem>
            </List>
        </Box>
    );
}

export default Recommendation;
