import React, { useState, useEffect } from "react";

export default function BirthdayPokemon() {
  const [date, setDate] = useState(() => {
    // prefill with today
    const today = new Date();
    const y = 2000;
    const m = String(today.getMonth() + 1).padStart(2, "0");
    const d = String(today.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  });
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function computeId(dateStr) {
    const d = new Date(dateStr + "T00:00:00");
    const month = d.getMonth() + 1;
    const day = d.getDate();
    return month * 100 + day; // e.g., Jan 1 => 101
  }

  async function handleFetch() {
    if (!date) return;
    setLoading(true);
    setError("");
    setPokemon(null);
    const id = computeId(date);
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!res.ok) throw new Error("Pokémon not found");
      const data = await res.json();
      setPokemon({
        id,
        name: data.name,
        sprite:
          data.sprites.other?.["official-artwork"]?.front_default ||
          data.sprites.front_default,
        types: data.types.map((t) => t.type.name),
        height: data.height,
        weight: data.weight,
      });
    } catch (err) {
      setError("No Pokémon found for this date’s ID.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleFetch(); // auto-load on mount with today’s date
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        minHeight: "100vh",
        background: "#f7fafc",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "2rem",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "24px",
          maxWidth: "480px",
          width: "100%",
          boxShadow: "0 6px 24px rgba(0,0,0,0.1)",
        }}
      >
        <h1>Find the Pokémon for your birthday</h1>
        <p style={{ color: "#6b7280", fontSize: "14px" }}>
          Maps a date to an ID using <code>month * 100 + day</code>. <br />
          Example: Jan 1 → 101, Aug 31 → 831.
        </p>

        <label htmlFor="birthday" style={{ fontWeight: 600 }}>
          Choose a date:
        </label>
        <input
          type="date"
          id="birthday"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            marginTop: "4px",
          }}
        />

        <div style={{ marginTop: "12px" }}>
          <button
            onClick={handleFetch}
            style={{
              background: "#10b981",
              color: "white",
              border: "none",
              padding: "10px 14px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Show my Pokémon
          </button>
        </div>

        {loading && <p>Loading…</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {pokemon && (
          <div
            style={{
              marginTop: "18px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            {pokemon.sprite && (
              <img
                src={pokemon.sprite}
                alt={pokemon.name}
                style={{ width: "120px", height: "120px" }}
              />
            )}
            <div>
              <div style={{ fontWeight: "700", fontSize: "18px" }}>
                {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
              </div>
              <div style={{ fontSize: "13px", color: "#6b7280" }}>
                ID: {pokemon.id}
              </div>
              <div style={{ fontSize: "13px", color: "#6b7280" }}>
                Type(s): {pokemon.types.join(", ")} | H: {pokemon.height} | W:{" "}
                {pokemon.weight}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
