import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import Divider from "../components/Divider";
import { supabase } from "../lib/supabaseClient";

function Publicacoes() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("publicacoes")
        .select("id,title,scheduled_at,image_url,description,created_at")
        .order("created_at", { ascending: false });
      if (!mounted) return;
      if (error) {
        setErr(error.message);
      } else {
        setItems(data || []);
      }
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const fmtTime = (iso) =>
    new Date(iso).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  const fmtDate = (iso) => new Date(iso).toLocaleDateString("pt-BR");

  return (
    <div className="px-5 py-6 space-y-4">
      {err && (
        <div className="p-4 rounded-xl bg-red-50 text-red-700 text-sm font-medium border border-red-200">
          {err}
        </div>
      )}
      {loading && (
        <>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-sm overflow-hidden flex animate-pulse"
            >
              <div className="shimmer w-24 h-24 flex-shrink-0" />
              <div className="flex-1 p-4 space-y-3">
                <div className="shimmer h-3 w-32 rounded" />
                <div className="shimmer h-3 w-24 rounded" />
                <div className="shimmer h-2 w-40 rounded" />
              </div>
            </div>
          ))}
        </>
      )}
      {items.length > 0
        ? items.map((i) => (
            <EventCard
              key={i.id}
              title={i.title}
              time={fmtTime(i.scheduled_at)}
              date={fmtDate(i.scheduled_at)}
              image={i.image_url || "/logo.png"}
              detailsTo={`/publicacoes/${i.id}`}
            />
          ))
        : !loading && (
            <div className="text-center py-12 text-slate-500">
              Nenhuma publicação encontrada
            </div>
          )}
    </div>
  );
}

export default Publicacoes;
