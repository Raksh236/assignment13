
import React, { Component } from 'react';

const RESET_VALUES = {
  id: '',
  productid: '',
  category: '',
  price: '',
  name: '',
  instock: true,
};

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      product: { ...RESET_VALUES },
      errors: {},
    };
  }

  handleChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState((prevState) => ({
      product: {
        ...prevState.product,
        [name]: value,
      },
    }));
  }

  handleSave(e) {
    e.preventDefault();
    this.props.onSave(this.state.product);
    this.setState({
      product: { ...RESET_VALUES },
      errors: {},
    });
  }

  render() {
    const { name, category, price, instock } = this.state.product;

    return (
      <form onSubmit={this.handleSave}>
        <h4>Add a new product</h4>
        <p>
          <label>
            Name
            <br />
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={this.handleChange}
              value={name}
            />
          </label>
        </p>
        <p>
          <label>
            Category
            <br />
            <input
              type="text"
              className="form-control"
              name="category"
              onChange={this.handleChange}
              value={category}
            />
          </label>
        </p>
        <p>
          <label>
            Price
            <br />
            <input
              type="number"
              step="0.01"
              className="form-control"
              name="price"
              onChange={this.handleChange}
              value={price}
            />
          </label>
        </p>
        <p>
          <label>
            In Stock
            <br />
            <input
              type="checkbox"
              name="instock"
              checked={instock}
              onChange={this.handleChange}
            />{' '}
            <span>{instock ? 'Yes' : 'No'}</span>
          </label>
        </p>
        <input
          type="submit"
          className="btn btn-info"
          value="Save"
        />
      </form>
    );
  }
}

export default ProductForm;
