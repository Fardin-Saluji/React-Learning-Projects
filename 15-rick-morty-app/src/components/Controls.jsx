import React from "react";

function Controls({
  search,
  setSearch,
  status,
  setStatus,
  sortOrder,
  setSortOrder,
}) {
  return (
    <div className="controls">
      <input
        data-testid="search-input"
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        data-testid="status-filter"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>All</option>
        <option>Alive</option>
        <option>Dead</option>
        <option>unknown</option>
      </select>
      
      <select
        data-testid="sort-order"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="asc">Sort A-Z</option>
        <option value="desc">Sort Z-A</option>
      </select>
    </div>
  );
}

export default Controls;
