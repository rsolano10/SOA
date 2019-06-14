export default {
    name: 'Contacto_en',
    title: 'Contacto_en',
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
        name: 'Telefono',
        title: 'Telefono',
        type: 'string'
      },
      {
        name: 'Email',
        title: 'Email',
        type: 'string'
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
  