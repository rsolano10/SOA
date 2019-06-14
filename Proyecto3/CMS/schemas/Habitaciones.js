export default {
    name: 'Habitaciones',
    title: 'Habitaciones',
    type: 'document',
    fields: [
      {
        name: 'Nombre',
        title: 'Nombre',
        type: 'string'
      },
      {
        name: 'Precio',
        title: 'Precio',
        type: 'string'
      },
      {
        name: 'Amenidades',
        title: 'Amenidades',
        type: 'text'
      },
      {
        name: 'logo',
        title: 'logo',
        type: 'image'
      }
    ],
    preview: {
      select: {
        title: 'Nombre',
        media: 'logo'
      }
    }
  }
  