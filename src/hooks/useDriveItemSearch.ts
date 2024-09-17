import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export function useDriveItemSearch() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [debounced] = useDebounce(query, 1500);

  useEffect(() => {
    async function searchItem() {
      const response = await fetch(`/api/search`, {
        method: "POST",
        body: JSON.stringify({ q: debounced }),
      }).then((res) => res.json());
      if (!response.error) setResult(response);
    }

    if (debounced) searchItem();
  }, [debounced]);

  return { result, setQuery };
}
