import ProductForm from "../../../components/product-form";

export default class Page {
  element;
  subElements = {};
  components = {};

  async render() {
    const element = document.createElement('div');

    element.innerHTML = `
      <div>
        <h1>List page</h1>
      </div>`;

    this.element = element.firstElementChild;

    this.initComponents();
    await this.renderComponents();

    return this.element;
  }

  initComponents() {
    const productId = this.getProductId();
    if (productId == 'add'){
      this.components.productFrom = new ProductForm();
    } else {
      this.components.productFrom = new ProductForm(productId);
    }
  }

  getProductId() {
    const [productId] =  window.location.pathname.trim().split('/').slice(-1);
    return productId;
  }

  async renderComponents() {
    const element = await this.components.productFrom.render();

    this.element.append(element);
  }

  destroy() {
    for (const component of Object.values(this.components)) {
      component.destroy();
    }
  }
}
