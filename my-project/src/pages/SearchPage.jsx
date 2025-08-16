import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchResultCard from "../components/SearchResultCard";
import summaryApi from "../common";

const SearchPage = () => {
  const query = new URLSearchParams(useLocation().search);
  const navigate = useNavigate();

  const searchTerm = query.get("q") || "";
  const page = parseInt(query.get("page")) || 1;
  const limit = 12; // Match backend default or make configurable

  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit, total: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const loadingList = new Array(8).fill(null);

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${summaryApi.searchProduct.url}?q=${encodeURIComponent(searchTerm)}&page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const dataResponse = await response.json();

      if (dataResponse.success) {
        setData(dataResponse.data.products || []);
        setPagination(dataResponse.data.pagination || { page, limit, total: 0 });
      } else {
        setError(dataResponse.message || "Failed to fetch search results");
        setData([]);
      }
    } catch (err) {
      setError(err.message || "An error occurred while fetching results");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) fetchProduct();
  }, [searchTerm, page]);

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-lg font-semibold my-3">
        Search Results for "{searchTerm}" ({pagination.total || 0})
      </h1>

      {error && (
        <p className="text-red-600 font-medium text-sm my-3">{error}</p>
      )}

      {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {loadingList.map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md animate-pulse"
                >
                  <div className="bg-slate-200 h-40 w-full rounded-t-lg" />
                  <div className="p-4 flex flex-col gap-3">
                    <div className="h-4 w-3/4 bg-slate-200 rounded-full" />
                    <div className="h-3 w-1/2 bg-slate-200 rounded-full" />
                    <div className="flex gap-2">
                      <div className="h-3 w-1/2 bg-slate-200 rounded-full" />
                      <div className="h-3 w-1/2 bg-slate-200 rounded-full" />
                    </div>
                    <div className="h-6 w-2/3 bg-slate-200 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
      )}

      {!loading && data.length === 0 && !error && (
        <p className="text-gray-600">No products found for "{searchTerm}"</p>
      )}

      {!loading && data.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <SearchResultCard data={data} />
          </div>

          {/* Pagination controls */}
          <div className="flex justify-center items-center gap-3 mt-6">
            <button
              disabled={page === 1}
              onClick={() =>
                navigate(`/searchPage?q=${encodeURIComponent(searchTerm)}&page=${page - 1}`)
              }
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              Prev
            </button>
            <span className="text-sm">
              Page {page} of {totalPages || 1}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() =>
                navigate(`/searchPage?q=${encodeURIComponent(searchTerm)}&page=${page + 1}`)
              }
              className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchPage;