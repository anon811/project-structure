import  DoubleSlider from '../double-slider/index.js';


export default class ProductFilter {
  element;
  doubleSlider;
  formData;

  constructor() {
    this.render();
  }
  
  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;
    this.initComponents();
    this.renderComponents();
    this.initEventListeners();
  }

  get template() {
    return `
      <form class="form-inline">
        <div class="form-group">
          <label class="form-label">Сортировать по:</label>
          <input type="text" name="text" data-elem="filterName" class="form-control" placeholder="Название товара">
        </div>
        <div class="form-group" data-elem="sliderContainer">
          <label class="form-label">Цена:</label>
        </div>
        <div class="form-group">
          <label class="form-label">Статус:</label>
          <select class="form-control" data-elem="filterStatus">
            <option value="" selected="">Любой</option>
            <option value="1">Активный</option>
            <option value="0">Неактивный</option>
          </select>
        </div>
      </form>`;
  }

  initComponents() {
    const  doubleSlider = new DoubleSlider({
      min: 100,
      max: 4000
    });
    this.doubleSlider = doubleSlider;
  }

  renderComponents() {
    const rootNode = this.element.querySelector('[data-elem="sliderContainer"]')
    rootNode.append(this.doubleSlider.element);
    this.formData = new FormData(this.element);
  }

  initEventListeners() {
    this.element.addEventListener('input', this.onChange);
    this.element.addEventListener('submit', this.onSubmit);
  }

  onChange = (event) => {
    event.preventDefault();
    for (const value of this.formData.keys()) {
      console.log(value)
    }
  }

  onSubmit = (event) => {
    event.preventDefault();
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.element.removeEventListener('input', this.onChange);
    this.element.removeEventListener('submit', this.onSubmit);
    this.doubleSlider.destroy();
    this.remove();
  }
}