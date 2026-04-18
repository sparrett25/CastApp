import { useEffect, useRef, useState } from "react";
import { CatchLedger } from "@/lib/schemas";
import { loadCatchLedger } from "@/lib/dataLoader";

type State = { data?: CatchLedger; error?: string; loading: boolean };

export function useCatchLedger() {
  const [state, setState] = useState<State>({ loading: true });
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    loadCatchLedger()
      .then(data => setState({ data, loading: false }))
      .catch(err => setState({ error: String(err), loading: false }));
  }, []);

  return state;
}
