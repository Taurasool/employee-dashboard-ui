interface DashboardCardsProps {
  totalEmployees: number;
  totalDepartments: number;
  highestSalary: number;
  averageSalary: number;
}

function DashboardCards({
  totalEmployees,
  totalDepartments,
  highestSalary,
  averageSalary,
}: DashboardCardsProps) {
  const cards = [
    {
      title: "Total Employees",
      value: totalEmployees,
      subtitle: "Current Employees",
      icon: "bi-people-fill",
      bg: "bg-success",
    },
    {
      title: "Departments",
      value: totalDepartments,
      subtitle: "Active Departments",
      icon: "bi-building-fill",
      bg: "bg-primary",
    },
    {
      title: "Highest Salary",
      value: `₹${highestSalary.toLocaleString()}`,
      subtitle: "Highest Paid Employee",
      icon: "bi-currency-dollar",
      bg: "bg-warning",
    },
    {
      title: "Average Salary",
      value: `₹${averageSalary.toLocaleString()}`,
      subtitle: "Company Average",
      icon: "bi-graph-up-arrow",
      bg: "bg-danger",
    },
  ];

  return (
    <div className="row g-4">
      {cards.map((card, index) => (
        <div className="col-xl-3 col-lg-6 col-md-6" key={index}>
          <div className="card dashboard-card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">

                <div>
                  <small className="text-muted fw-semibold">
                    {card.title}
                  </small>

                  <h2 className="fw-bold mt-2 mb-1">
                    {card.value}
                  </h2>

                  <small className="text-success">
                    {card.subtitle}
                  </small>
                </div>

                <div
                  className={`${card.bg} rounded-circle d-flex justify-content-center align-items-center`}
                  style={{
                    width: "65px",
                    height: "65px",
                    color: "white",
                    fontSize: "28px",
                  }}
                >
                  <i className={`bi ${card.icon}`}></i>
                </div>
              </div>

              <div
                className="progress mt-4"
                style={{ height: "6px" }}
              >
                <div
                  className={`progress-bar ${card.bg}`}
                  style={{ width: `${70 + index * 8}%` }}
                ></div>
              </div>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;