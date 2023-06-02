import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient

async function Main(){

    const user = await prisma.user.create({
        data: {
            name:"John Doe",
            email: 'JohnDoe@gmail.com',
            avatarUrl: 'https://avatars.githubusercontent.com/u/49167194?v=4'
        }
    })


    const pool = await prisma.pool.create({
        data: {
            title:'examplo pool',
            code: "EXAMPLE1",
            ownerId: user.id,

            participants:{
                create:{
                    userId: user.id
                }
            }

        }
    })

    await prisma.game.create({
        data:{
            date: '2022-11-03T15:00:24.909Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'AR',

        }
    })

    await prisma.game.create({
        data:{
            date: '2022-11-03T15:00:24.909Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'DE',

            guesses:{
                create:{
                    firstTeamPoints: 7,
                    secondTeamPoints: 1,

                    participant:{
                        connect:{
                            userId_poolId:{
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        }
    })

}

Main()