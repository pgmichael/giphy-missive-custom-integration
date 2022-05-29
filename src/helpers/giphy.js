export async function fetchGifs(query, limit, offset) {
  const API_URL =
    query === ""
      ? `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&limit=${limit}&offset=${offset}&rating=G`
      : `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${process.env.API_KEY}&limit=${limit}&offset=${offset}`;

  const response = await fetch(API_URL);

  const json = await response.json();

  return json.data;
}

export async function fetchRandomGif(query) {
  const API_URL = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&tag=${query}&rating=G`;

  const response = await fetch(API_URL);

  const json = await response.json();

  return json.data;
}