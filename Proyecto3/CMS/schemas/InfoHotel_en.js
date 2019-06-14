export default {
    name: 'InfoHotel_en',
    title: 'InfoHotel_en',
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
        description: 'descripcion',
        media: 'logo'
      }
    }
  }
  