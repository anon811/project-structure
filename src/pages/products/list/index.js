import SortableTable from '../../../components/sortable-table/index.js';
import ProductFilter from '../../../components/product-filter/index.js';
import header from './products-header.js';
import fetchJson from '../../../utils/fetch-json.js';

export default class Page {
  element;
  subElements = {};
  components = {};

  async updateTableComponent (from, to) {
    console.log('Update table')
  }

  initComponents () {
    const sortableTable = new SortableTable(header, {
      url: '/api/rest/products',
      href: 'products',
      isSortLocally: false
    });

    const productFilter = new ProductFilter();

    this.components.sortableTable = sortableTable;
    this.components.productFilter = productFilter;
  }

  get template () {
    return `
    <div class="product-list">
      <div class="content__top-panel">
        <h2 class="page-title">Products</h2>
        <a href="/products/add" class="button-primary">Добавить товар</a>
      </div>
      <div class="content-box content-box_small">
        <div data-element="productFilter">
          <!-- product-filter component -->
         </div>
      </div>
      
      <div data-element="sortableTable">
        <!-- sortable-table component -->
      </div>
    </div>`;
  }

  async render () {
    const element = document.createElement('div');

    element.innerHTML = this.template;

    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(this.element);

    this.initComponents();
    this.renderComponents();
    this.initEventListeners();

    return this.element;
  }

  renderComponents () {
    Object.keys(this.components).forEach(component => {
      const root = this.subElements[component];
      const { element } = this.components[component];

      root.append(element);
    });
  }

  getSubElements ($element) {
    const elements = $element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  initEventListeners () {
    return;
  }

  destroy () {
    for (const component of Object.values(this.components)) {
      component.destroy();
    }
  }
}