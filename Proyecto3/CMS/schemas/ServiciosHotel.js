export default {
    name: 'ServiciosHotel',
    title: 'ServiciosHotel',
    type: 'document',
    fields: [
      {
        name: 'Nombre',
        title: 'Nombre',
        type: 'string'
      },
      {
        name: 'descripcion',
        title: 'Descripcion',
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
  