const { MongoClient } = require('mongodb');
const faker = require('faker');

const uri = 'mongodb+srv://Kxcwr:Brayan123@cluster0.gyshrrv.mongodb.net/?retryWrites=true&w=majority';



//   VALIDACION DE DATOS  


//  db.createCollection("Clientes", {
//     validator: {
//        $jsonSchema: {
//           bsonType: "object",
//           title: "Validacion",
//           required: [ "idCliente", "nombreCliente", "correoCliente" ],
//           properties: {
//              idCliente: {
//                 bsonType: "int",
//              },
//              nombreCliente: {
//                 bsonType: "String",
//              },
//              correoCliente: {
//                 bsonType: "email",
//                 description: "'gpa' must be a double if the field exists"
//              }
//           }
//        }
//     }
//  } )





// REGISTRO DE 2MIL DOCUEMNTOS





async function Clientes() {
   const cliente = new MongoClient(uri);
   try {
      await cliente.connect();
      let db = cliente.db('BabySoft');

      const ClientesCollection = db.collection('Cliente');

      for (let i = 0; i < 2000; i++) {
         const cliente = {
           idCliente: faker.random.number(), // Generar número aleatorio
           nombreCliente: faker.random.alpha({ count: 10 }),//Letras aleatorias
           correoCliente: faker.random.internet.email(),//Letras aleatorias
         };


         const result = await ClientesCollection.insertOne(cliente);

         console.log(`Cliente # ${i + 1} insertado exitosamente`);
         console.log('Succesfly:', result.insertedId);
      }

   } catch (error) {
      console.error('Error:', error);

   } finally {
      cliente.close();
   }
}
Clientes();






// OPERACIONES BASICAS 






// async function operacionesClientes() {
//    const cliente = new MongoClient(uri);
//    try {
//      await cliente.connect();
//      const db = cliente.db('BabySoft');
//      const ClientesCollection = db.collection('Clientes');
 
//      // insertOne
//      const nuevoCliente = {
//        idCliente: faker.random.number(),
//        nombreCliente: faker.name.findName(),
//        correoCliente: faker.internet.email()
//      };
//      const resultadoInsertOne = await ClientesCollection.insertOne(nuevoCliente);
//      console.log('Resultado de insertOne:', resultadoInsertOne);
 
//      // insertMany
//      const nuevosClientes = [
//        {
//          idCliente: faker.random.number(),
//          nombreCliente: faker.name.findName(),
//          correoCliente: faker.internet.email()
//        },
//        {
//          idCliente: faker.random.number(),
//          nombreCliente: faker.name.findName(),
//          correoCliente: faker.internet.email()
//        }
//      ];
//      const resultadoInsertMany = await ClientesCollection.insertMany(nuevosClientes);
//      console.log('Resultado de insertMany:', resultadoInsertMany);
 
//      // find
//      const clientes = await ClientesCollection.find().toArray();
//      console.log('Resultado de find:', clientes);
 
//      // findOne
//      const clienteEncontrado = await ClientesCollection.findOne({ idCliente: 1 });
//      console.log('Resultado de findOne:', clienteEncontrado);
 
//      // updateOne
//      const filtroUpdateOne = { idCliente: 1 };
//      const actualizacionUpdateOne = { $set: { nombreCliente: 'Nuevo Nombre' } };
//      const resultadoUpdateOne = await ClientesCollection.updateOne(filtroUpdateOne, actualizacionUpdateOne);
//      console.log('Resultado de updateOne:', resultadoUpdateOne);
 
//      // updateMany
//      const filtroUpdateMany = { nombreCliente: { $regex: 'John' } };
//      const actualizacionUpdateMany = { $set: { correoCliente: 'nuevo@correo.com' } };
//      const resultadoUpdateMany = await ClientesCollection.updateMany(filtroUpdateMany, actualizacionUpdateMany);
//      console.log('Resultado de updateMany:', resultadoUpdateMany);
 
//      // deleteOne
//      const filtroDeleteOne = { idCliente: 1 };
//      const resultadoDeleteOne = await ClientesCollection.deleteOne(filtroDeleteOne);
//      console.log('Resultado de deleteOne:', resultadoDeleteOne);
 
//      // deleteMany
//      const filtroDeleteMany = { nombreCliente: { $regex: 'John' } };
//      const resultadoDeleteMany = await ClientesCollection.deleteMany(filtroDeleteMany);
//      console.log('Resultado de deleteMany:', resultadoDeleteMany);
 
//      // drop collection
//      const resultadoDropCollection = await ClientesCollection.drop();
//      console.log('Resultado de drop collection:', resultadoDropCollection);
 
//      // drop
//      const resultadoDrop = await db.dropCollection('Clientes');
//      console.log('Resultado de drop:', resultadoDrop);
 
//      // drop Database
//      const resultadoDropDatabase = await db.dropDatabase();
//      console.log('Resultado de drop Database:', resultadoDropDatabase);
 
//      // $lookup - Ejemplo 1
//      const resultadoLookup1 = await ClientesCollection.aggregate([
//        {
//          $lookup: {
//            from: 'Ventas',
//            localField: 'idCliente',
//            foreignField: 'idUsuario',
//            as: 'ventas'
//          }
//        },
//        { $limit: 5 }
//      ]).toArray();
//      console.log('Resultado del $lookup (Ejemplo 1):', resultadoLookup1);
 
//      // $lookup - Ejemplo 2
//      const resultadoLookup2 = await ClientesCollection.aggregate([
//        {
//          $lookup: {
//            from: 'DetalleVenta',
//            let: { clienteId: '$idCliente' },
//            pipeline: [
//              {
//                $match: {
//                  $expr: { $eq: ['$idVentas', '$$clienteId'] }
//                }
//              },
//              { $sort: { cantidad: -1 } },
//              { $limit: 3 }
//            ],
//            as: 'detallesVenta'
//          }
//        }
//      ]).toArray();
//      console.log('Resultado del $lookup (Ejemplo 2):', resultadoLookup2);
 
//      // Pipeline - Ejemplo 1
//      const resultadoPipeline1 = await ClientesCollection.aggregate([
//        { $match: { idCliente: { $gt: 100 } } },
//        { $sort: { idCliente: 1 } },
//        { $limit: 10 }
//      ]).toArray();
//      console.log('Resultado del pipeline (Ejemplo 1):', resultadoPipeline1);
 
//      // Pipeline - Ejemplo 2
//      const resultadoPipeline2 = await ClientesCollection.aggregate([
//        { $match: { nombreCliente: { $regex: 'John' } } },
//        { $project: { idCliente: 1, nombreCliente: 1, _id: 0 } },
//        { $sort: { idCliente: -1 } },
//        { $limit: 5 }
//      ]).toArray();
//      console.log('Resultado del pipeline (Ejemplo 2):', resultadoPipeline2);
 
//      // $limit - Ejemplo
//      const resultadoLimit = await ClientesCollection.aggregate([
//        { $limit: 5 }
//      ]).toArray();
//      console.log('Resultado del $limit:', resultadoLimit);
 
//      // $sort - Ejemplo
//      const resultadoSort = await ClientesCollection.aggregate([
//        { $sort: { idCliente: -1 } }
//      ]).toArray();
//      console.log('Resultado del $sort:', resultadoSort);
 
//      // $unwind - Ejemplo
//      const resultadoUnwind = await ClientesCollection.aggregate([
//        { $unwind: '$ventas' }
//      ]).toArray();
//      console.log('Resultado del $unwind:', resultadoUnwind);
//    } catch (error) {
//      console.error('Error:', error);
//    } finally {
//      cliente.close();
//    }
//  }
 
//  operacionesClientes();





