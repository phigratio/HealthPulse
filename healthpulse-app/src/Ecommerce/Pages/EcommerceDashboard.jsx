import React, { useEffect, useState } from "react";
import banner from "../Assect/banner.png";
import ProductResult from "../Components/ProductResult";
import ProductService from "../Sercice/ProductService";
import "./ProductDashboard.css";

const EcommerceDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chemicalNames, setChemicalNames] = useState([]);
  const [companyNames, setCompanyNames] = useState([]);
  const [selectedChemical, setSelectedChemical] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ProductService.getAllProducts();
        setProducts(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchDistinctNames = async () => {
      try {
        const chemicals = await ProductService.getDistinctChemicalNames();
        const companies = await ProductService.getDistinctCompanyNames();
        setChemicalNames(chemicals);
        setCompanyNames(companies);
      } catch (err) {
        setError(err);
      }
    };

    fetchProducts();
    fetchDistinctNames();
  }, []);

  const handleChemicalChange = (event) => {
    setSelectedChemical(event.target.value);
  };

  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const matchesChemical =
      !selectedChemical || product.chemicalName === selectedChemical;
    const matchesCompany =
      !selectedCompany || product.companyName === selectedCompany;
    return matchesChemical && matchesCompany;
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching products: {error.message}</div>;

  return (
    <div className="ecom-home">
      <section>
        <header className="cb-header-banner">
          <div className="cb-header-image-container">
            <img
              src={banner}
              alt="Phegon Hotel"
              className="cb-header-image"
            />
            <div className="cb-overlay-content">
              <h1 className="text-center">
                Order Medicine with{" "}
                <span className="cb-phegon-color">Health Pulse </span>
              </h1>
              <h3 className="text-center">
                All your health needs in one place
              </h3>
            </div>
          </div>
        </header>
      </section>

      <section className="ecom-filter-section">
        <div>
          <label htmlFor="chemical-select">Filter by Chemical Name:</label>
          <select
            id="chemical-select"
            value={selectedChemical}
            onChange={handleChemicalChange}
          >
            <option value="">All</option>
            {chemicalNames.map((chemical) => (
              <option key={chemical} value={chemical}>
                {chemical}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="company-select">Filter by Company Name:</label>
          <select
            id="company-select"
            value={selectedCompany}
            onChange={handleCompanyChange}
          >
            <option value="">All</option>
            {companyNames.map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="ecom-product-list">
        <ProductResult products={filteredProducts} />
      </section>
    </div>
  );
};

export default EcommerceDashboard;
