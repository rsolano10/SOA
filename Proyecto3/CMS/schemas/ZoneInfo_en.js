export default {
    name: 'InformacionZona_en',
    title: 'InformacionZona_en',
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
  