import Categorie from '../../components/categories/index.js'
import Notification from '../../components/notification/index.js'
import fetchJson from '../../utils/fetch-json.js';

export default class Page {
  element;
  categories = [];
  components = {};

  constructor() {
    this.loadUrl = new URL('/api/rest/categories?_sort=weight&_refs=subcategory', process.env.BACKEND_URL);
    this.saveUrl = new URL('/api/rest/subcategories', process.env.BACKEND_URL)
  }

  async loadCategories() {
    const categories = await fetchJson(this.loadUrl);
    return categories;
  }

  async render() {
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;
    this.categories = await this.loadCategories();
    this.initComponents();
    this.renderComponents();
    this.initEventListeners();
    return this.element;
  }

  initComponents() {
    const sortableLists = [];
    this.categories.map(item => {
      const component = new Categorie(item);
      sortableLists.push(component);
    });
    this.components.categories = sortableLists;
    this.components.notification = new Notification('Category order saved');
  }

  renderComponents() {
    const rootNode = this.element.querySelector('[data-elem="categoriesContainer"]');
    this.components.categories.map(component => rootNode.append(component.element));
  }

  get template() {
    return `
    <div class="categories">
      <div class="content__top-panel">
        <h1 class="page-title">Категории товаров</h1>
      </div>
      <div data-elem="categoriesContainer">
      </div>
    </div>`;
  }

  initEventListeners() {
    this.element.addEventListener('sortable-list-reorder', this.save); 
  }

  save = async (event) => {
    const element = event.target.closest('.sortable-list');
    const data = [...element.children].reduce((acc, item) => {
      let subcat = {};
      subcat.id = item.dataset.id;
      subcat.weight = [...element.children].indexOf(item) + 1;
      acc.push(subcat);
      return acc;
    }, []);
    const result = await fetchJson(this.saveUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    this.components.notification.show();
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    for (const element of this.components.categories) {
      element.destroy();
    }
    this.components.notification.destroy();
    this.remove();
  }
}