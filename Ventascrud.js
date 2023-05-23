const { MongoClient } = require('mongodb');
const faker = require('faker');

const uri = 'mongodb+srv://Kxcwr:Brayan123@cluster0.gyshrrv.mongodb.net/?retryWrites=true&w=majority';




// VALIDACIONES




// db.createCollection("Ventas", {
//     validator: {
//        $jsonSchema: {
//           bsonType: "object",
//           title: "Validacion",
//           required: [ "idVenta", "idUsuario", "fechaVenta" ],
//           properties: {
//              idVenta: {
//                 bsonType: "int",
//              },
//              idUsuario: {
//                 bsonType: "int",
//              },
//              fechaVenta: {
//                 bsonType: "date",
//                 description: "'gpa' must be a double if the field exists"
//              }
//           }
//        }
//     }
//  } )




// REGISTRO DE 2MIL DOCUMENTOS




async function insertarVentas() {
    const cliente = new MongoClient(uri);
    try {
      await cliente.connect();
      let db = cliente.db('BabySoft');
      const ventasCollection = db.collection('Ventas');
  
      // Generar e insertar 2,000 documentos de venta
      for (let i = 0; i < 2000; i++) {
        const venta = {
          idVenta: faker.random.number(), // Generar número aleatorio
          idUsuario: faker.random.number(), // Generar número aleatorio
          fechaVenta: faker.date.recent() // Generar fecha aleatoria en los últimos días
        };
  
        // Insertar el documento en la colección "Ventas"
        const resultado = await ventasCollection.insertOne(venta);
  
        console.log(`Venta ${i + 1} insertada exitosamente`);
        console.log('ID de la venta insertada:', resultado.insertedId);
      }
    } catch (error) {
      console.error('Error al insertar las ventas:', error);
    } finally {
      cliente.close();
    }
  }
  
  insertarVentas();





//OPERACIONES BASICAS 




// async function operacionesVentas() {
//     const cliente = new MongoClient(uri);
//     try {
//       await cliente.connect();
//       const db = cliente.db('BabySoft');
//       const VentasCollection = db.collection('Ventas');
  
//       // insertOne
//       const nuevaVenta = {
//         idVenta: faker.random.number(),
//         idUsuario: faker.random.number(),
//         fechaVenta: faker.date.recent()
//       };
//       const resultadoInsertOne = await VentasCollection.insertOne(nuevaVenta);
//       console.log('Resultado de insertOne:', resultadoInsertOne);
  
//       // insertMany
//       const nuevasVentas = [
//         {
//           idVenta: faker.random.number(),
//           idUsuario: faker.random.number(),
//           fechaVenta: faker.date.recent()
//         },
//         {
//           idVenta: faker.random.number(),
//           idUsuario: faker.random.number(),
//           fechaVenta: faker.date.recent()
//         }
//       ];
//       const resultadoInsertMany = await VentasCollection.insertMany(nuevasVentas);
//       console.log('Resultado de insertMany:', resultadoInsertMany);
  
//       // find
//       const ventas = await VentasCollection.find().toArray();
//       console.log('Resultado de find:', ventas);
  
//       // findOne
//       const ventaEncontrada = await VentasCollection.findOne({ idVenta: 1 });
//       console.log('Resultado de findOne:', ventaEncontrada);
  
//       // updateOne
//       const filtroUpdateOne = { idVenta: 1 };
//       const actualizacionUpdateOne = { $set: { idUsuario: 100 } };
//       const resultadoUpdateOne = await VentasCollection.updateOne(filtroUpdateOne, actualizacionUpdateOne);
//       console.log('Resultado de updateOne:', resultadoUpdateOne);
  
//       // updateMany
//       const filtroUpdateMany = { idUsuario: { $lt: 100 } };
//       const actualizacionUpdateMany = { $set: { fechaVenta: faker.date.past() } };
//       const resultadoUpdateMany = await VentasCollection.updateMany(filtroUpdateMany, actualizacionUpdateMany);
//       console.log('Resultado de updateMany:', resultadoUpdateMany);
  
//       // deleteOne
//       const filtroDeleteOne = { idVenta: 1 };
//       const resultadoDeleteOne = await VentasCollection.deleteOne(filtroDeleteOne);
//       console.log('Resultado de deleteOne:', resultadoDeleteOne);
  
//       // deleteMany
//       const filtroDeleteMany = { idUsuario: { $lt: 100 } };
//       const resultadoDeleteMany = await VentasCollection.deleteMany(filtroDeleteMany);
//       console.log('Resultado de deleteMany:', resultadoDeleteMany);
  
//       // drop collection
//       const resultadoDropCollection = await VentasCollection.drop();
//       console.log('Resultado de drop collection:', resultadoDropCollection);
  
//       // drop
//       const resultadoDrop = await db.dropCollection('Ventas');
//       console.log('Resultado de drop:', resultadoDrop);
  
//       // drop Database
//       const resultadoDropDatabase = await db.dropDatabase();
//       console.log('Resultado de drop Database:', resultadoDropDatabase);
  
//       // $lookup - Ejemplo 1
//       const resultadoLookup1 = await VentasCollection.aggregate([
//         {
//           $lookup: {
//             from: 'Detalle de Ventas',
//             localField: 'idVenta',
//             foreignField: 'idVentas',
//             as: 'detallesVenta'
//           }
//         },
//         { $limit: 5 }
//       ]).toArray();
//       console.log('Resultado del $lookup (Ejemplo 1):', resultadoLookup1);
  
//       // $lookup - Ejemplo 2
//       const resultadoLookup2 = await VentasCollection.aggregate([
//         {
//           $lookup: {
//             from: 'Detalle de Ventas',
//             let: { ventaId: '$idVenta' },
//             pipeline: [
//               {
//                 $match: {
//                   $expr: { $eq: ['$idVentas', '$$ventaId'] }
//                 }
//               },
//               { $sort: { cantidad: -1 } },
//               { $limit: 3 }
//             ],
//             as: 'detallesVenta'
//           }
//         }
//       ]).toArray();
//       console.log('Resultado del $lookup (Ejemplo 2):', resultadoLookup2);
  
//       // Pipeline - Ejemplo 1
//       const resultadoPipeline1 = await VentasCollection.aggregate([
//         { $match: { idVenta: { $gt: 100 } } },
//         { $sort: { idVenta: 1 } },
//         { $limit: 10 }
//       ]).toArray();
//       console.log('Resultado del pipeline (Ejemplo 1):', resultadoPipeline1);
  
//       // Pipeline - Ejemplo 2
//       const resultadoPipeline2 = await VentasCollection.aggregate([
//         { $match: { idUsuario: 100 } },
//         { $project: { idVenta: 1, fechaVenta: 1, _id: 0 } },
//         { $sort: { idVenta: -1 } },
//         { $limit: 5 }
//       ]).toArray();
//       console.log('Resultado del pipeline (Ejemplo 2):', resultadoPipeline2);
  
//       // $limit - Ejemplo
//       const resultadoLimit = await VentasCollection.aggregate([
//         { $limit: 5 }
//       ]).toArray();
//       console.log('Resultado del $limit:', resultadoLimit);
  
//       // $sort - Ejemplo
//       const resultadoSort = await VentasCollection.aggregate([
//         { $sort: { idVenta: -1 } }
//       ]).toArray();
//       console.log('Resultado del $sort:', resultadoSort);
  
//       // $unwind - Ejemplo
//       const resultadoUnwind = await VentasCollection.aggregate([
//         { $unwind: '$detallesVenta' }
//       ]).toArray();
//       console.log('Resultado del $unwind:', resultadoUnwind);
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       cliente.close();
//     }
//   }
  
//   operacionesVentas();