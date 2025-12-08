import React, { Component } from "react";
import Filters from "./Filters";
import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      products: {},
    };
    this.handleFilter = this.handleFilter.bind(this);
    this.handleDestroy = this.handleDestroy.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:5001/product/get/")
      .then((res) => res.json())
      .then((data) => {
        const productsObj = {};
        data.forEach((doc) => {
          productsObj[doc.id] = doc;
        });
        this.setState({ products: productsObj });
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }

  handleFilter(filterInput) {
    this.setState(filterInput);
  }

  handleSave(productFormValues) {
    const id = productFormValues.id || Date.now();
    const productPayload = {
      id,
      product: {
        productid: productFormValues.productid || id,
        category: productFormValues.category,
        price: parseFloat(productFormValues.price || 0),
        name: productFormValues.name,
        instock:
          typeof productFormValues.instock === "boolean"
            ? productFormValues.instock
            : true,
      },
    };

    const isNew = !productFormValues.id;

    const url = isNew
      ? "http://localhost:5001/product/create"
      : `http://localhost:5001/product/update/${id}`;
    const method = isNew ? "POST" : "PUT";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productPayload),
    })
      .then((res) => res.json())
      .then((saved) => {
        this.setState((prevState) => {
          const products = { ...prevState.products };
          products[saved.id] = saved;
          return { products };
        });
      })
      .catch((err) => {
        console.error("Error saving product:", err);
      });
  }

  handleDestroy(productId) {
    fetch(`http://localhost:5001/product/delete/${productId}`, {
      method: "DELETE",
    })
      .then(() => {
        this.setState((prevState) => {
          const products = { ...prevState.products };
          delete products[productId];
          return { products };
        });
      })
      .catch((err) => {
        console.error("Error deleting product:", err);
      });
  }

  render() {
    return (
      <div>
        <h1>My Inventory</h1>
        <Filters onFilter={this.handleFilter} />
        <ProductTable
          products={this.state.products}
          filterText={this.state.filterText}
          onDestroy={this.handleDestroy}
        />
        <ProductForm onSave={this.handleSave} />
      </div>
    );
  }
}

export default Products;
