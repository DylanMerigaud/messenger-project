import { arg, stringArg, idArg } from 'nexus'
import { prismaObjectType } from 'nexus-prisma'

import { AlimentYupSchema } from './yupSchemas'

import { mutation as authMutation } from './auth'
import GraphQLServerContext from './types/GraphQLServerContext'

const Mutation = prismaObjectType({
  name: 'Mutation',
  definition: (t) => {
    t.prismaFields(['createUser', 'deletePost', 'updatePost'])
    t.field('createDraft', {
      type: 'Post',
      args: {
        title: stringArg(),
        authorId: idArg({ nullable: true }),
      },
      resolve: (_, { title, authorId }, ctx: GraphQLServerContext) =>
        ctx.prisma.createPost({
          title,
          author: { connect: { id: authorId } },
        }),
    })
    t.field('publish', {
      type: 'Post',
      nullable: true,
      args: { id: idArg() },
      resolve: (_, { id }, ctx: GraphQLServerContext) =>
        ctx.prisma.updatePost({
          where: { id },
          data: { published: true },
        }),
    })
    t.field('testoss', {
      type: 'Test',
      args: {
        aliment: arg({
          type: 'Aliment',
        }),
      },
      resolve: (_, { aliment }, ctx) => {
        console.log('aliment: ' + aliment)
        // const yupVal =
        AlimentYupSchema.validateSync(aliment)

        // console.log({ yupVal })

        return {
          id: '',
          lol: aliment,
        }
      },
    })
    authMutation(t)
  },
})

export default Mutation
