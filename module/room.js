"use strict";
// import _ from 'lodash';
// import 'source-map-support/register';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import { GetDataFromToken } from '../engine/auth_util';
// import { PRouter } from '../engine/router';
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();
// const currentRouter = new PRouter();
// const getroom = {
//     ID: true,
//     name: true,
//     leaderName: true,
//     currentUserAmount: true,
// }
// currentRouter.post('/', async (req: any, _req) => {
//     const body = req.body;
//     const room = await prisma.room.create({
//         data: {
//             name: body.name,
//             leaderName: body.leaderName,
//             currentUserAmount: 1,
//             users: {
//                 connect: {
//                     ID: body.userId
//                 }
//             }
//         },
//     });
//     return room;
// });
// currentRouter.get('/', async (req: any, _req) => {
//     const rooms = await prisma.room.findMany({
//         select: {
//             ...getroom,
//         },
//         where: {
//             status: {
//                 not: 'ENDED'
//             }
//         }
//     });
//     return rooms;
// });
// currentRouter.post('/:id/join', async (req: any, _req) => {
//     const ID = req.params.ID;
//     const userId = req.body.userId;
//     const check = await prisma.room.findFirst({
//         where: {
//             users: {
//                 some: {
//                     ID: userId
//                 }
//             }
//         }
//     })
//     if(!check){
//         const room = await prisma.room.update({
//             where: {
//                 ID
//             },
//             data: {
//                 users: {
//                     connect: {
//                         ID: userId
//                     }
//                 },
//                 currentUserAmount: {
//                     increment: 1
//                 }
//             },
//         });
//     }
//     return {
//         message: 'Join',
//     };
// });
// currentRouter.post('/:id/leave', async (req: any, _req) => {
//     const ID = req.params.ID;
//     const userId = req.params.userId;
//     const room = await prisma.room.update({
//         where: {
//             ID
//         },
//         data: {
//             users: {
//                 disconnect: {
//                     ID: userId
//                 }
//             },
//             currentUserAmount: {
//                 decrement: 1
//             }
//         },
//     });
//     return {
//         message: 'Leave',
//     };
// });
// currentRouter.post('/start', async (req: any, _req) => {
//     const ID = req.body.ID;
//     const room = await prisma.room.update({
//         where: {
//             ID
//         },
//         data: {
//             status: 'PLAYING'
//         },
//     });
//     return {
//         message: 'Start',
//     };
// });
// currentRouter.put('/:id/end', async (req: any, _req) => {
//     const ID = req.params.ID;
//     const room = await prisma.room.update({
//         where: {
//             ID
//         },
//         data: {
//             status: 'ENDED'
//         },
//     });
//     return {
//         message: 'End',
//     };
// });
// export const roomRouter = currentRouter.router;
//# sourceMappingURL=room.js.map