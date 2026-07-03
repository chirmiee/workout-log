// netlify/functions/parse-workout.js
// This runs on Netlify's servers — your API key never touches the browser.

exports.handler = async function (event) {

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: corsHeaders(),
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: corsHeaders(), body: 'Method not allowed' };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: corsHeaders(),
      body: JSON.stringify({ error: 'ANTHROPIC_API_KEY is not set in Netlify environment variables.' })
    };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    return { statusCode: 400, headers: corsHeaders(), body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  const { imageData, mediaType, knownExercises, groupList } = body;

  if (!imageData || !mediaType) {
    return { statusCode: 400, headers: corsHeaders(), body: JSON.stringify({ error: 'imageData and mediaType are required' }) };
  }

  const prompt =
    'You are reading a handwritten gym diary page (see image). ' +
    'Extract the workout into STRICT, COMPACT JSON only — no markdown fences, no preamble, no extra text. ' +
    'Schema: {"date":"YYYY-MM-DD","muscle":"muscle group label as written","satisfaction":number|null,"notes":"string (empty if none)","exercises":[{"name":"exact exercise name — reuse one of these EXACT known names if it clearly matches: [' + knownExercises + ']","muscleGroup":"one of: ' + groupList + '","sets":[["reps","weight"],...]}]} ' +
    'Rules: ' +
    'satisfaction = the % circled at the bottom satisfaction scale (10–100), or null if not marked. ' +
    'Weight notation: use "10x2" for dumbbell pairs (one each hand), plain number for cable/machine, "Bar" for barbell only. ' +
    'Date on page may be DD/MM/YY — convert to YYYY-MM-DD using 20YY. ' +
    'Omit blank or crossed-out sets. Keep notes under 10 words. ' +
    'Respond with ONLY the JSON object.';

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1500,
        messages: [{
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: mediaType, data: imageData } },
            { type: 'text', text: prompt }
          ]
        }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers: corsHeaders(),
        body: JSON.stringify({ error: data.error?.message || 'Claude API error', details: data })
      };
    }

    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: JSON.stringify(data)
    };

  } catch (e) {
    return {
      statusCode: 500,
      headers: corsHeaders(),
      body: JSON.stringify({ error: 'Function error: ' + e.message })
    };
  }
};

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };
}
