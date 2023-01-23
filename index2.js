import {normalize, schema, denormalize } from 'normalizr'
import util from 'util'

const originalData = {
  IdPost: "999",
  posts: [
    {
      id: "123",
      author: {
            id: "1",
            nombre: "Pablo",
            apellido: "Perez",
            DNI: "20442654",
            direccion: "CABA 123",
            telefono: "1567876547",
       },
      title: "My awesome blog post",
      comments: [
        {
          id: "324",
          commenter: {
                id: "2",
                nombre: "Nicole",
                apellido: "Gonzalez",
                DNI: "20442638",
                direccion: "CABA 456",
                telefono: "1567811543",
            },
        },
        {
          id: "325",
          commenter: {
                id: "3",
                nombre: "Pedro",
                apellido: "Mei",
                DNI: "20446938",
                direccion: "CABA 789",
                telefono: "1567291542",
            },
        },
      ],
    },
    {
      id: "1123",
      author: {
            id: "2",
            nombre: "Nicole",
            apellido: "Gonzalez",
            DNI: "20442638",
            direccion: "CABA 456",
            telefono: "1567811543",
        },
      title: "My awesome blog post",
      comments: [
        {
          id: "1324",
          commenter: {
                id: "1",
                nombre: "Pablo",
                apellido: "Perez",
                DNI: "20442654",
                direccion: "CABA 123",
                telefono: "1567876547",
            },
        },
        {
          id: "1325",
          commenter: {
                id: "3",
                nombre: "Pedro",
                apellido: "Mei",
                DNI: "20446938",
                direccion: "CABA 789",
                telefono: "1567291542",
            },
        },
      ],
    },
    {
      id: "2123",
      author: {
            id: "3",
            nombre: "Pedro",
            apellido: "Mei",
            DNI: "20446938",
            direccion: "CABA 789",
            telefono: "1567291542",
        },
      title: "My awesome blog post",
      comments: [
        {
          id: "2324",
            commenter: {
                id: "2",
                nombre: "Nicole",
                apellido: "Gonzalez",
                DNI: "20442638",
                direccion: "CABA 456",
                telefono: "1567811543",
            },
        },
        {
          id: "2325",
            commenter: {
                id: "1",
                nombre: "Pablo",
                apellido: "Perez",
                DNI: "20442654",
                direccion: "CABA 123",
                telefono: "1567876547",
            },
        },
      ],
    },
  ],
};

//author
const user = new schema.Entity('users');
//comentarios
const comment = new schema.Entity('comments',{
    commenter: user
})
//articulos
const article = new schema.Entity('articles', {
    author: user,
    comments: [comment]
})

// post 
const post = new schema.Entity('post', {
    posts: [article]
},  {idAttribute: 'IdPost' }
); //especificacion de id se agrega como obj

//normalizacion:
const normalizeDate = normalize(originalData, post)
console.log("DESNORMALIZE");
const desnormalizeDate = denormalize( normalizeDate.result, post, normalizeDate.entities)

function print (objeto){
    console.log(util.inspect(objeto, false, 12, true));
}
console.log("data normal:", JSON.stringify(originalData).length);
console.log("data normalizada ", JSON.stringify(normalizeDate).length);

//  print(normalizeDate); 
 print(desnormalizeDate)