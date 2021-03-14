import SortableList from '../sortable-list/index.js'


export default class CategoriesList {
  element;
  categorie;
  
  constructor(categorie) {
    this.categorie = categorie;
    this.render();
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;
    this.initSortableList();
    this.initEventListeners();
  }

  initSortableList() {
    const {subcategories} = this.categorie;
    const elements = subcategories.reduce((acc, item) => {
      const element = document.createElement('div');
      element.innerHTML = this.sortableItemTemplate(item);
      acc.push(element.firstElementChild);
      return acc;
    }, []);

    const sortableList = new SortableList({items: elements});
    const rootNode = this.element.querySelector('.subcategory-list');
    rootNode.append(sortableList.element);
  }

  sortableItemTemplate({id, title, count} = {}) {
    return `
      <li class="categories__sortable-list-item" data-grab-handle=""data-id="${id}">
        <strong>${title}</strong>
        <span><b>${count}</b> products</span>
      </li>`;
  }

  get template() {
    return `
    <div class="category category_open" data-id="${this.categorie.id}">
      <header class="category__header">
        ${this.categorie.title}
      </header>
      <div class="category__body">
        <div class="subcategory-list"></div>
      </div>
    </div>`;
  }

  initEventListeners() {
    this.element.addEventListener('pointerdown', event => this.onCategorieClick(event));
  }

  onCategorieClick = (event) => {
    if (event.target.classList.contains('category__header')) {
      this.element.classList.toggle('category_open');
    }
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}