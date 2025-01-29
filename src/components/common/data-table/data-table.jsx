import React from "react";
import "./data-table.scss";
import Link from "next/link";

export const Column = ({ title }) => {
  return <th scope="col">{title}</th>;
};

const Row = ({ children }) => {
  return <tr className="table-success">{children}</tr>;
};

const Cell = ({ children }) => {
  return <td>{children}</td>;
};

const NoRecordFound = ({ colLength }) => {
  return (
    <tr>
      <td colSpan={colLength}>No records found</td>
    </tr>
  );
};

const FirstPageButton = ({ pageNumber }) => {
  return (
    <li className="page-item">
      <Link
        className={`page-link ${pageNumber ? "" : "disabled"} `}
        href="?page=0"
        aria-label="Previous"
        scroll={false}
      >
        <span aria-hidden="true">&laquo;</span>
      </Link>
    </li>
  );
};

const PreviousPageButton = ({ pageNumber }) => {
  return (
    <li className="page-item  d-none d-sm-block">
      <Link
        className={`page-link ${pageNumber ? "" : "disabled"} `}
        href={`?page=${pageNumber - 1}`}
        aria-label="Previous"
        scroll={false}
      >
        <span aria-hidden="true">&lsaquo;</span>
      </Link>
    </li>
  );
};

const PageButton = ({ totalPages, pageNumber }) => {
  let totalAmountOfButton;
  totalPages<=2 ? totalAmountOfButton=2 : totalAmountOfButton = 3;
  const averageAmountOfButton = Math.floor(totalAmountOfButton / 2);

  let startPage = Math.max(0, pageNumber - averageAmountOfButton);
  const endPage = Math.min(totalPages, startPage + totalAmountOfButton);

  if (pageNumber + averageAmountOfButton >= totalPages) {
    startPage = totalPages - totalAmountOfButton;
  }

  return [...new Array(endPage - startPage)].map((_, index) => (
    <li className="page-item" key={index} aria-current="page">
      <Link
        className={`page-link ${
          pageNumber === startPage + index ? "disabled" : ""
        }`}
        href={`?page=${startPage + index}`}
        scroll={false}
      >
        {startPage + index + 1}
      </Link>
    </li>
  ));
};

const NextPageButton = ({ totalPages, pageNumber }) => {
  return (
    <li className="page-item d-none d-sm-block">
      <Link
        className={`page-link ${
          pageNumber >= totalPages - 1 ? "disabled" : ""
        }`}
        href={`?page=${pageNumber + 1}`}
        aria-label="Next"
        scroll={false}
      >
        <span aria-hidden="true">&rsaquo;</span>
      </Link>
    </li>
  );
};

const LastPageButton = ({ totalPages, pageNumber }) => {
  return (
    <li className="page-item">
      <Link
        className={`page-link ${
          pageNumber >= totalPages - 1 ? "disabled" : ""
        }`}
        href={`?page=${totalPages - 1}`}
        aria-label="Next"
        scroll={false}
      >
        <span aria-hidden="true">&raquo;</span>
      </Link>
    </li>
  );
};

const Pagination = ({ totalPages, pageNumber }) => {
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Page navigation"
      className="d-flex justify-content-center "
    >
      <ul className="pagination">
        <FirstPageButton pageNumber={pageNumber} />
        <PreviousPageButton pageNumber={pageNumber} />
        <PageButton pageNumber={pageNumber} totalPages={totalPages} />
        <NextPageButton pageNumber={pageNumber} totalPages={totalPages} />
        <LastPageButton pageNumber={pageNumber} totalPages={totalPages} />
      </ul>
    </nav>
  );
};

const DataTable = ({
  children,
  dataSource,
  dataKey,
  pagination,
  totalPages,
  pageNumber,
  pageSize,
}) => {
  if (!dataSource) throw new Error("dataSource attribute is required");
  if (!Array.isArray(dataSource))
    throw new Error("dataSource value must be an array");
  if (!dataKey) throw new Error("dataKey attribute is required");

  const columns = [...children];

  if (!pageSize) pageSize = 0;
  if (!pageNumber) pageNumber = 0;

  return (
    <>
      <div className="card table-card">
        <div className="card-body">
          <div className="table-responsive ">
            <table className="table table-borderless">
              <thead>
                <tr>
                  {columns.map((item) => (
                    <Column key={item.props.title} {...item.props} />
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataSource.length <= 0 ? (
                  <NoRecordFound colLength={columns.length} />
                ) : null}

                {dataSource.map((row, indexRow) => {
                  return (
                    <Row key={`row-${row[dataKey]}`}>
                      {columns.map((column) => {
                        const { fields, index, title, template, selectionMode } =
                          column.props;

                        let cellData = "";
                        if (index) {
                          cellData = pageSize * pageNumber + indexRow + 1;
                        } else if (fields) {
                          cellData = row[fields];
                        } else if (template) {
                          if (typeof template !== "function") {
                            throw new Error("template prop must be a function");
                          }
                          cellData = template(row);
                        }

                        return (
                          <Cell key={`col-${row[dataKey]}-${title}`}>
                            {cellData}
                          </Cell>
                        );
                      })}
                    </Row>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div>
        {pagination ? (
          <Pagination
            totalPages={totalPages}
            pageNumber={pageNumber}
          />
        ) : null}
      </div>
    </>
  );
};

export default DataTable;
