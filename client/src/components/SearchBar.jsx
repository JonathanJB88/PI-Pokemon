import React from "react";
import { useState } from "react";
import { useDispatch, connect } from "react-redux";
import { pokemonByName } from "../actions/index.js";
import "./styles/SearchBar.css";
import SearchIcon from "./PokeImages/Search_icon.png";

const SearchBar = ({ setInput, setPage, setSelected }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInput = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (name !== "") {
      dispatch(pokemonByName(name));
      setName("");
      setInput(1);
      setPage(1);
      setSelected(true);
    }
  };
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (name !== "") {
        dispatch(pokemonByName(name));
        setName("");
        setInput(1);
        setPage(1);
        setSelected(true);
      }
    }
  };

  return (
    <div>
      <div className="searchBar">
        <input
          className="searchBar-input"
          required
          type="text"
          placeholder="Search..."
          value={name}
          onKeyDown={(e) => onKeyDown(e)}
          onChange={(e) => handleInput(e)}
        />
        <button
          className="searchBar-button"
          type="submit"
          onClick={(e) => handleClick(e)}
        >
          <img src={SearchIcon} alt="not found" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;

// export class SearchBar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { name: "" };
//   }

//   handleInput = (e) => {
//     e.preventDefault();
//     this.setState({ name: e.target.value });
//   };
//   handleClick = (e) => {
//     e.preventDefault();
//     if (this.state.name !== "") {
//       this.props.pokemonByName(this.state.name);
//       this.setState({ name: "" });
//       this.props.setInput(1);
//       this.props.setPage(1);
//     }
//   };
//   onKeyDown = (e) => {
//     if (e.keyCode === 13) {
//       e.preventDefault();
//       if (this.state.name !== "") {
//         this.props.pokemonByName(this.state.name);
//         this.setState({ name: "" });
//         this.props.setInput(1);
//         this.props.setPage(1);
//       }
//     }
//   };

//   render() {
//     return (
//       <div>
//         <div className="searchBar">
//           <input
//             className="searchBar-input"
//             required
//             type="text"
//             placeholder="Search..."
//             value={this.state.name}
//             onKeyDown={(e) => this.onKeyDown(e)}
//             onChange={(e) => this.handleInput(e)}
//           />
//           <button
//             className="searchBar-button"
//             type="submit"
//             onClick={(e) => this.handleClick(e)}
//           >
//             <img src={SearchIcon} alt="not found" />
//           </button>
//         </div>
//       </div>
//     );
//   }
// }

// export const mapDispatchToProps = (dispatch) => {
//   return {
//     pokemonByName: (name) => dispatch(pokemonByName(name)),
//   };
// };

// export default connect(null, mapDispatchToProps)(SearchBar);
