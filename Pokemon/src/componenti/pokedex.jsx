import { useState } from "react";

export function Pokedex() {
  const [pokemon, setPokemon] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchPokemon = async () => {
    setError("")
    setData(null)
    try {
      setError("");
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`
      );
      if (!response.ok) {
        throw new Error("Pokemon non trovato");
      }
      const result = await response.json();
      console.log(result);

      const types = result.types.map((t) => t.type.name).join(",");
      console.log(types);
      const abilities = result.abilities.map((a) => a.ability.name).join(",");
      
      console.log(abilities);

      setData({
        name: result.name,
        types,
        abilities,
        sprite: result.sprites.front_default,
      });
    } catch (error) {
      setData(null);
      setError(error.message);
    }
  };
  return (
    <div style={{ textAlign: "center", fontFamily: "Arial" }}>
      <h1>Pokédex</h1>

      <input
        type="text"
        name="name"
        id="name"
        placeholder="Inserisci il nome del Pokemon"
        value={pokemon}
        onChange={(e) => setPokemon(e.target.value)}
      />
      <button onClick={fetchPokemon}>Cerca</button>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {data && (
        <div>
          <h2>{data.name.toUpperCase()}</h2>
          <img src={data.sprite} alt={data.name} />
          <p>Tipo: {data.types}</p>
          <p>Abilità:{data.abilities}</p>
        </div>
      )}
    </div>
  );
}
