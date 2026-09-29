import { useState } from "react";

function Pagination() {

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = 5;

  const handlePrevious = () => {

    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }

  };

  const handleNext = () => {

    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }

  };

  return (

    <div className="d-flex justify-content-between align-items-center mt-4">

      <div className="text-muted">

        Showing <strong>1</strong> to <strong>5</strong> of{" "}
        <strong>25</strong> Employees

      </div>

      <nav>

        <ul className="pagination mb-0">

          <li className="page-item">

            <button
              className="page-link"
              onClick={handlePrevious}
            >
              <i className="bi bi-chevron-left"></i>
            </button>

          </li>

                    {[1, 2, 3, 4, 5].map((page) => (

            <li
              key={page}
              className={`page-item ${
                currentPage === page ? "active" : ""
              }`}
            >

              <button
                className="page-link"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>

            </li>

          ))}

          <li className="page-item">

            <button
              className="page-link"
              onClick={handleNext}
            >
              <i className="bi bi-chevron-right"></i>
            </button>

          </li>

        </ul>

      </nav>

    </div>

  );

}

export default Pagination;