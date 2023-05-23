const { MongoClient } = require('mongodb');
const faker = require('faker');

const uri = 'mongodb+srv://Kxcwr:Brayan123@cluster0.gyshrrv.mongodb.net/?retryWrites=true&w=majority';




// VALIDACION



//  db.createCollection("Detalle de Ventas", {
//     validator: {
//        $jsonSchema: {
//           bsonType: "object",
//           title: "Validacion",
//           required: [ "idDetalleventas", "idVentas", "idReferencia", "cantidad", "precioUnitario", "valorTotalProducto" ],
//           properties: {
//              idDetalleventas: {
//                 bsonType: "int",
//              },
//              idVentas: {
//                 bsonType: "int",
//              },
//              idReferencia: {
//                 bsonType: "int",
//                 description: "'gpa' must be a double if the field exists"
//              },
//              cantidad: {
//                 bsonType: "int",
//              },
//              precioUnitario: {
//                 bsonType: "int",
//              },
//              valorTotalProducto: {
//                 bsonType: "int",
//              }
//           }
//        }
//     }
//  } )




// REGISTRO DE 2MIL DOCUMENTOS




async function detalleVenta() {
    const cliente = new MongoClient(uri);
    try {
      await cliente.connect();
      let db = cliente.db('BabySoft');
      const DetalleVentaCollection = db.collection('Detalle de Venta');
  
      // Generar e insertar 2,000 documentos de detalle de venta
      for (let i = 0; i < 2000; i++) {
        const detalleVenta = {
          idDetalleventas: faker.random.number(), // Generar número aleatorio
          idVentas: faker.random.number(), // Generar número aleatorio
          idReferencia: faker.random.number(), // Generar número aleatorio
          cantidad: faker.random.number(), // Generar número aleatorio
          precioUnitario: faker.random.number({ min: 10, max: 100 }), // Generar número aleatorio entre 10 y 100
          valorTotalProducto: 0 // Se asignará más adelante, no es generado por Faker directamente
        };
  
        const resultado = await DetalleVentaCollection.insertOne(detalleVenta);
  
        console.log(`DetalleVenta ${i + 1} insertada exitosamente`);
        console.log('ID del detalleVenta insertado:', resultado.insertedId);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      cliente.close();
    }
  }

detalleVenta();





// OPERACIONES 




// async function insertarDetalleVentas() {
//   const cliente = new MongoClient(uri);
//   try {
//     await cliente.connect();
//     const db = cliente.db('BabySoft');
//     const DetalleVentaCollection = db.collection('Detalle de Ventas');

//     // insertOne
//     const detalleVenta = {
//       idDetalleventas: faker.random.number(),
//       idVentas: faker.random.number(),
//       idReferencia: faker.random.number(),
//       cantidad: faker.random.number(),
//       precioUnitario: faker.random.number({ min: 10, max: 100 }),
//       valorTotalProducto: 0
//     };
//     const resultadoInsertOne = await DetalleVentaCollection.insertOne(detalleVenta);
//     console.log('Documento insertado con insertOne:', resultadoInsertOne.insertedId);

//     // insertMany
//     const documentos = [];
//     for (let i = 0; i < 3; i++) {
//       documentos.push({
//         idDetalleventas: faker.random.number(),
//         idVentas: faker.random.number(),
//         idReferencia: faker.random.number(),
//         cantidad: faker.random.number(),
//         precioUnitario: faker.random.number({ min: 10, max: 100 }),
//         valorTotalProducto: 0
//       });
//     }
//     const resultadoInsertMany = await DetalleVentaCollection.insertMany(documentos);
//     console.log('Documentos insertados con insertMany:', resultadoInsertMany.insertedIds);

//     // find
//     const cursor = DetalleVentaCollection.find({ cantidad: { $gt: 5 } });
//     await cursor.forEach((documento) => {
//       console.log('Documento encontrado con find:', documento);
//     });

//     // findOne
//     const documentoEncontrado = await DetalleVentaCollection.findOne({ idVentas: 123 });
//     console.log('Documento encontrado con findOne:', documentoEncontrado);

//     // updateOne
//     const resultadoUpdateOne = await DetalleVentaCollection.updateOne(
//       { idDetalleventas: 456 },
//       { $set: { cantidad: 20 } }
//     );
//     console.log('Documento actualizado con updateOne:', resultadoUpdateOne.modifiedCount);

//     // updateMany
//     const resultadoUpdateMany = await DetalleVentaCollection.updateMany(
//       { idVentas: 789 },
//       { $inc: { cantidad: 5 } }
//     );
//     console.log('Documentos actualizados con updateMany:', resultadoUpdateMany.modifiedCount);

//     // deleteOne
//     const resultadoDeleteOne = await DetalleVentaCollection.deleteOne({ idDetalleventas: 123 });
//     console.log('Documento eliminado con deleteOne:', resultadoDeleteOne.deletedCount);

//     // deleteMany
//     const resultadoDeleteMany = await DetalleVentaCollection.deleteMany({ idVentas: 456 });
//     console.log('Documentos eliminados con deleteMany:', resultadoDeleteMany.deletedCount);

//     // drop collection
//     await DetalleVentaCollection.drop();
//     console.log('Colección "Detalle de Ventas" eliminada');

//     // drop
//     await db.dropCollection('Detalle de Ventas');
//     console.log('Colección "Detalle de Ventas" eliminada');

//     // drop Database
//     await db.dropDatabase();
//     console.log('Base de datos "BabySoft" eliminada');
//     const resultadoLookup1 = await DetalleVentaCollection.aggregate([
//         {
//           $lookup: {
//             from: 'Ventas',
//             localField: 'idVentas',
//             foreignField: 'idVenta',
//             as: 'venta'
//           }
//         },
//         { $limit: 5 }
//       ]).toArray();
//       console.log('Resultado del $lookup (Ejemplo 1):', resultadoLookup1);
  
//       // $lookup - Ejemplo 2
//       const resultadoLookup2 = await DetalleVentaCollection.aggregate([
//         {
//           $lookup: {
//             from: 'Clientes',
//             let: { idReferencia: '$idReferencia' },
//             pipeline: [
//               {
//                 $match: {
//                   $expr: { $eq: ['$idCliente', '$$idReferencia'] }
//                 }
//               },
//               { $project: { _id: 0, nombreCliente: 1 } }
//             ],
//             as: 'cliente'
//           }
//         },
//         { $limit: 5 }
//       ]).toArray();
//       console.log('Resultado del $lookup (Ejemplo 2):', resultadoLookup2);
  
//       // Uso de pipelines - Ejemplo 1
//       const resultadoPipeline1 = await DetalleVentaCollection.aggregate([
//         { $match: { idVentas: { $in: [1, 2, 3] } } },
//         { $group: { _id: '$idVentas', total: { $sum: '$cantidad' } } },
//         { $sort: { total: -1 } },
//         { $limit: 3 }
//       ]).toArray();
//       console.log('Resultado del pipeline (Ejemplo 1):', resultadoPipeline1);
  
//       // Uso de pipelines - Ejemplo 2
//       const resultadoPipeline2 = await DetalleVentaCollection.aggregate([
//         { $sort: { precioUnitario: 1 } },
//         { $limit: 10 },
//         { $project: { idDetalleventas: 1, idVentas: 1, cantidad: 1, precioUnitario: 1 } }
//       ]).toArray();
//       console.log('Resultado del pipeline (Ejemplo 2):', resultadoPipeline2);
  
//       // $limit - Ejemplo
//       const resultadoLimit = await DetalleVentaCollection.find().limit(5).toArray();
//       console.log('Resultado del $limit:', resultadoLimit);
  
//       // $sort - Ejemplo
//       const resultadoSort = await DetalleVentaCollection.find().sort({ precioUnitario: -1 }).toArray();
//       console.log('Resultado del $sort:', resultadoSort);
  
//       // $unwind - Ejemplo
//       const resultadoUnwind = await DetalleVentaCollection.aggregate([
//         { $unwind: '$venta' }
//       ]).toArray();
//       console.log('Resultado del $unwind:', resultadoUnwind);
//   } catch (error) {
//     console.error('Error:', error);
//   } finally {
//     cliente.close();
//   }
// }

// insertarDetalleVentas();
