import React from 'react';

const SearchTask = ({
                         searchTerm,
                         setSearchTerm,
                         priorityFilter,
                         setPriorityFilter
                     }) => {
    return (
        <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">
                <div className="row g-3 align-items-center">

                    {/* Search Input */}
                    <div className="col-md-6">
                        <label className="form-label fw-bold text-theme-green">
                            Search Tasks
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title or description..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Priority Filter */}
                    <div className="col-md-3">
                        <label className="form-label fw-bold text-theme-green">
                            Priority Filter
                        </label>
                        <select
                            className="form-select"
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                        >
                            <option value="ALL">All Priorities</option>
                            <option value="LOW">Low</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HIGH">High</option>
                        </select>
                    </div>

                    {/* Clear Button */}
                    <div className="col-md-3 d-flex align-items-end mt-5">
                        <button
                            className="btn btn-outline-dark w-100"
                            onClick={() => {
                                setSearchTerm('');
                                setPriorityFilter('ALL');
                            }}
                        >
                            Clear Filters
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SearchTask;
