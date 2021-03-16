const header = [
  {
    id: 'images',
    title: 'Image',
    sortable: false,
    template: data => {
      return `
          <div class="sortable-table__cell">
            <img class="sortable-table-image" alt="Image" src="${data[0].url}">
          </div>
        `;
    }
  },
  {
    id: 'title',
    title: 'Title',
    sortable: true,
  },
  {
    id: 'subcategory',
    title: 'Category',
    sortable: false,
  },
  {
    id: 'quantity',
    title: 'Quantity',
    sortable: true,
  },
  {
    id: 'price',
    title: 'Price',
    sortable: true,
  },
  {
    id: 'status',
    title: 'Status',
    sortable: true,
    template: data => {
      const status = {
        0: 'Inactive',
        1: 'Active'
      }
      return `
        <div class="sortable-table__cell">
          ${status[data]}
        </div>`
    }
  }
];

export default header;
