import React from "react";
import PropTypes from "prop-types";
import "./App.css";
import pokemon from "./pokemon.json";

// Component
const PokemonRow = ({ pokemon, onSelect }) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
    <td>
      <button onClick={() => onSelect(pokemon)}>Select!</button>
    </td>
  </tr>
);

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({ english: PropTypes.string }).isRequired,
    type: PropTypes.arrayOf(PropTypes.string).isRequired,
    // onSelect: PropTypes.func.isRequired,
    onSelect: PropTypes.func, // .isRequired throws warning about undefined type (not sure how to solve it)
  }),
};

const PokemonInfo = ({ name, base }) => (
  <div>
    <h1> {name.english} </h1>
    <table>
      <tbody>
        {
          // Object.keys(base) <- takes an object and returns an array of all of the key values (attack, hp, ...)
          Object.keys(base).map((key) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{base[key]}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
);

PokemonInfo.propTypes = {
  name: PropTypes.shape({ english: PropTypes.string }),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    "Sp. Attack": PropTypes.number.isRequired,
    "Sp. Defense": PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired,
  }),
};

function App() {
  // State - to track value of the input
  const [filter, filterSet] = React.useState("");
  const [selectedItem, selectedItemSet] = React.useState(null);
  return (
    <div style={{ margin: "auto", width: 800, paddingTop: "1rem" }}>
      <h1 className="title">Pokemon Search</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "70% 30%",
          gridColumnGap: "1rem",
        }}
      >
        <div>
          <input
            value={filter}
            onChange={(event) => filterSet(event.target.value)}
          />
          <table width="100%">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {pokemon
                .filter((pokemon) =>
                  pokemon.name.english
                    .toLowerCase()
                    .includes(filter.toLowerCase())
                )
                .map((pokemon) => (
                  <PokemonRow
                    pokemon={pokemon}
                    key={pokemon.id}
                    onSelect={(pokemon) => selectedItemSet(pokemon)}
                  />
                ))}
            </tbody>
          </table>
        </div>
        {/* this div is shown if we have a selected pokemon */}
        {/* {selectedItem && (
          <div>
            <h1>{selectedItem.name.english}</h1>
          </div>
        )} */}
        {/* better solution: */}
        {selectedItem && <PokemonInfo {...selectedItem} />}
        {/* ... <- (spread operator) every key from selectedItem
         is mapped to a property that goes to the PokemonInfo */}
      </div>
    </div>
  );
}

export default App;
