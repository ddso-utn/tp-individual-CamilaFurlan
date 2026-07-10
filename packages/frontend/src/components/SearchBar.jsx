import { Search } from "lucide-react";

function SearchBar({
    value,
    onChange,
    placeholder = "Buscar..."
}) {

    return (

        <div className="search-bar">

            <Search
                size={20}
                className="search-icon"
            />

            <input
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
            />

        </div>

    );

}

export default SearchBar;