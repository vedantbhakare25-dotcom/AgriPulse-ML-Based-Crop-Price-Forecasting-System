import https from 'https';

const url = 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&limit=5&filters[state]=Maharashtra';

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const parsed = JSON.parse(data);
      console.log("Success! Total records:", parsed.total, "Returned:", parsed.records.length);
      console.log(parsed.records[0]);
    } catch (e) {
      console.error("Parse error:", e.message);
      console.log(data.substring(0, 500));
    }
  });
}).on('error', err => {
  console.error("Error fetching gov API:", err.message);
});
