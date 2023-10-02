// Function to use Metaphor API to search for articles on vacation spots 
// and recommend a vacation plan through ChatGPT
export async function searchVacation(location: string) {
    const metaphorPrompt = `Looking for a great vacation idea in ${location}? Check out this amazing destination:`;

    // 1. Search for articles
    const searchResponse = await fetch('/api/searchMetaphor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: metaphorPrompt,
            numResults: 5,
            startPublishedDate: '2023-01-01',
        }),

    }).then(res => res.json());

    // 2. Get contents of articles
    const articles: string[] = searchResponse.results.map((result: { id: any; }) => result.id);
    console.log("articles= " + articles);
    const articleIdsParam = articles.map((article: string) => `ids=${encodeURIComponent(article)}`).join('&');
    const contentResponse = await fetch(`/api/getMetaphorContent?articleIds=${articleIdsParam}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    }).then(res => res.json());    // Map them and feed into GPT
    const contents = contentResponse.contents.map((content: { extract: any; }) => content.extract).join("\n\n");
    const trimmedContents = contents.replace(/\s\s+/g, ' ').trim();
    console.log("trimmedContents= " + trimmedContents);

    // 3. Use GPT to generate a vacation plan
    const response = await fetch('/api/getVacationPlan', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location, trimmedContents }),
    });

    const vacationPlan = await response.json();

    const json = JSON.parse(vacationPlan ?? '');

    return json;
}