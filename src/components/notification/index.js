export default class Notification {
    static onShow = null;
  
    constructor(message = 'Hello World!', {duration = 2000, type = 'notification_success'} = {}) {
      this.message = message;
      this.duration = duration;
      this.type = type;
      this.render();
    }
  
    get template() {
      return `
      <div class="notification ${this.type} show">
        <div class="notification__content">${this.message}</div>
      </div>`;
    }

    render() {
      const element = document.createElement('div');
      element.innerHTML = this.template;
      this.element = element.firstElementChild;
    }
  
    remove() {
      if (!Notification.onShow) {
        return;
      } else {
        clearTimeout(Notification.onShow.timerId);
        Notification.onShow.instance.element.remove();
        Notification.onShow = null;
      }
    }
      
    setOnShow(timerId) {
      Notification.onShow = {
        instance: this,
        timerId: timerId
      };
    }
  
    show(element = document.body) {
      this.remove();
      element.append(this.element);
      const timerId = setTimeout(this.remove, this.duration);
      this.setOnShow(timerId);
    }
  
    destroy() {
      this.element.remove();
      this.onShow = null;
    }
  }