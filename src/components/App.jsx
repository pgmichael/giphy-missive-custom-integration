import debounce from "lodash.debounce";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import { Gif } from "./Gif";
import { fetchGifs } from "../helpers/giphy";

export function App() {
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(25);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [gifs, setGifs] = useState([]);

  useEffect(fetchAndSetGifs, [query]);
  useEffect(() => {
    if (!loading) fetchAndSetGifs(true);
  }, [offset]);

  // Debouncing is to avoid gifs constantly being re-loaded on every keystroke.
  const debouncedSetQuery = useCallback(
    debounce((query) => setQuery(query), 275)
  );

  async function fetchAndSetGifs(addToList = false) {
    const fetchedGifs = await fetchGifs(query, limit, offset);

    addToList ? setGifs([...gifs, ...fetchedGifs]) : setGifs(fetchedGifs);

    if (loading) setLoading(false);
  }

  // Infinite scroll related code
  const loaderRef = useRef();
  const handleObserver = useCallback((entries) => {
    const target = entries[0];

    if (target.isIntersecting) setOffset((prev) => prev + limit);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 0 });

    if (loaderRef.current) observer.observe(loaderRef.current);
  }, [handleObserver]);

  return (
    <div className="app margin-left margin-right margin-bottom">
      <div className="search-container padding-top">
        <input
          type="text"
          className="search"
          placeholder="Search for a GIF"
          onInput={(e) => debouncedSetQuery(e.currentTarget.value)}
        />
      </div>

      <div className="columns">
        <div className="app__column">
          {gifs
            .map((x, i) => (i % 2 === 0 ? x : null))
            .filter((x) => x !== null)
            .map((gif) => (
              <Gif gif={gif} />
            ))}
        </div>
        <div className="app__column">
          {gifs
            .map((x, i) => (i % 2 !== 0 ? x : null))
            .filter((x) => x !== null)
            .map((gif) => (
              <Gif gif={gif} />
            ))}
        </div>
      </div>
      <div ref={loaderRef}></div>
    </div>
  );
}
