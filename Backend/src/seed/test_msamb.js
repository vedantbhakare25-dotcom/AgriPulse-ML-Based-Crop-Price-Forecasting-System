import https from 'https';

const url = 'https://www.msamb.com/ApmcDetail/APMCPriceInformation';

https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log("Status Code:", res.statusCode);
    if(data.includes('APMC')) {
      console.log("Successfully fetched page, length:", data.length);
      // Try to find if data is loaded dynamically or in table
      const match = data.match(/<table(.*?)<\/table>/s);
      if (match) {
        console.log("Found a table on the page.");
      } else {
        console.log("No table found directly in HTML, might be loaded via AJAX.");
      }
    }
  });
}).on('error', err => {
  console.error("Error fetching MSAMB:", err.message);
});
