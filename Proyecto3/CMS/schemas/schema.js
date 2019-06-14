// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'
// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// We import object and document schemas
import blockContent from './blockContent'
import infoHotel from './InfoHotel'
import infoHotel_en from './InfoHotel_en'
import productVariant from './productVariant'
import Habitaciones from './Habitaciones'
import Habitaciones_en from './Habitaciones_en'
import ServiciosHotel from './ServiciosHotel'
import ServiciosHotel_en from './ServiciosHotel_en'
import ZoneInfo from './ZoneInfo'
import ZoneInfo_en from './ZoneInfo_en'
import Contacto from './Contacto'
import Contacto_en from './Contacto_en'
import ActividadesHotel from './ActividadesHotel'
import ActividadesHotel_en from './ActividadesHotel_en'

import localeString from './locale/String'
import localeText from './locale/Text'
import localeBlockContent from './locale/BlockContent'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    infoHotel,
    infoHotel_en,
    Habitaciones,
    Habitaciones_en,
    ServiciosHotel,
    ServiciosHotel_en,
    ZoneInfo,
    ZoneInfo_en,
    Contacto,
    Contacto_en,
    ActividadesHotel,
    ActividadesHotel_en,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    blockContent,
    localeText,
    localeBlockContent,
    localeString,
    productVariant
  ])
})
