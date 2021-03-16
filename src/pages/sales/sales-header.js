const header = [
  {
    id: 'id',
    title: 'ID',
    sortable: true,
  },
  {
    id: 'user',
    title: 'User',
    sortable: true,
  },
  {
    id: 'createdAt',
    title: 'Date',
    sortable: true,
    template: data => {
     return `
      <div class="sortable-table__cell">
        ${new Date(data).toLocaleDateString()}
      </div>`;
    }
  },
  {
    id: 'totalCost',
    title: 'Cost',
    sortable: true,
  },
  {
    id: 'delivery',
    title: 'Status',
    sortable: true,
  },
];

export default header;
