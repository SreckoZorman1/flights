import { FastifyInstance } from 'fastify'
import { getCustomRepository, Like } from 'typeorm';
import * as TypeBox from '@sinclair/typebox';
import toString from 'lodash/toString';
import omit from 'lodash/omit';
import { parse } from 'json2csv';

import { SeatsRepository } from '../repository/SeatsRepository';
import { seatsInputSchema, seatsSchema } from '../entity/Seats';

export const tag = 'Seats';

export default async (app: FastifyInstance) => {
    const schema = TypeBox.Type.Object({
        q: TypeBox.Type.Optional(TypeBox.Type.Partial(seatsSchema, { description: 'Filter query', additionalProperties: false })),
        page: TypeBox.Type.Number({ default: 0, minimum: 0, description: 'Page number' }),
        limit: TypeBox.Type.Number({ minimum: 0, maximum: 100, default: 10, description: 'Page size' }),
        field: TypeBox.Type.String({default: ''}),
        sort: TypeBox.Type.String({default: 'DESC'}),
        filetype: TypeBox.Type.Optional(TypeBox.Type.String({default: ''})),
    seat_no: TypeBox.Type.String({default: ''}),
    fare_conditions: TypeBox.Type.String({default: ''}),

    }, {
        style: 'deepObject',
    });

    app.get<{ Querystring: TypeBox.Static<typeof schema> }>('/seats', {
        // @ts-ignore
        preHandler: app.auth([app.verifyAuthorized]),
        schema: {
            querystring: schema,
            security: [{
                bearerAuth: [],
            }],
            tags: [tag],
            summary: 'List seats',
        },
    }, async (req) => {
        // @ts-ignore
        const [items, count] = await getCustomRepository(SeatsRepository).filter(req.query, req.query.page, req.query.limit, req.query.field, req.query.sort.toUpperCase());
        const fileType = req.query.filetype;
        if (fileType && fileType === 'csv') {
            const fields = ['id', 'seat_no','fare_conditions',

                ];
            const opts = { fields };
            try {
                const csv = parse(items, opts);
                return csv
            } catch (err) {
                console.error(err);
            }
        } else {
            return {
                rows: items,
                count,
                isLastPage: (req.query.page + 1) * req.query.limit >= count,
            };
        }
    });

    app.get<{ Querystring: TypeBox.Static<typeof schema> }>('/seats/count', {
        // @ts-ignore
        preHandler: app.auth([app.verifyAuthorized]),
        schema: {
            querystring: schema,
            security: [{
                bearerAuth: [],
            }],
            tags: [tag],
            summary: 'List seats',
        },
    }, async (req) => {
        // @ts-ignore
        const [items, count] = await getCustomRepository(SeatsRepository).filter(req.query, req.query.page, req.query.limit, req.query.field, req.query.sort.toUpperCase(), true);
        return {
            rows: items,
            count,
            isLastPage: (req.query.page + 1) * req.query.limit >= count,
        };
    });

    const autocompleteSchema = TypeBox.Type.Object({
        query: TypeBox.Type.String({ default: '' }),
        limit: TypeBox.Type.Number({ default: 100, max: 100, min: 1 }),
    });
    const autocompleteItems = TypeBox.Type.Array(TypeBox.Type.Object({
        id: TypeBox.Type.String(),
        label: TypeBox.Type.String(),
    }));

    app.get<{
        Querystring: TypeBox.Static<typeof autocompleteSchema>,
        Reply: TypeBox.Static<typeof autocompleteItems>,
    }>('/seats/autocomplete', {
        // @ts-ignore
        preHandler: app.auth([app.verifyAuthorized]),
        schema: {
            querystring: autocompleteSchema,
            security: [{
                bearerAuth: [],
            }],
            tags: [tag],
            summary: 'Find seats instance to link as relations',
            response: {
                200: autocompleteItems,
                400: TypeBox.Type.Object({
                    statusCode: TypeBox.Type.Number({ default: 400 }),
                    error: TypeBox.Type.Optional(TypeBox.Type.String()),
                    message: TypeBox.Type.String(),
                }, { description: 'Validation error' }),
            }
        },
    }, async (req) => {
        const repo = getCustomRepository(SeatsRepository);

        const items = await repo.createQueryBuilder('item')
          .select(['item.id'])

          .where("CAST(item.id as TEXT) LIKE :query", { query: `%${req.query.query}%` })

          .orderBy('item.id', 'ASC')
          .getMany();

        return items.map((item) => ({ id: item.id, label: toString(item.id) }));
    });

    const postPayload = TypeBox.Type.Object({
        data: seatsInputSchema,
    });
    app.post<{
        Body: TypeBox.Static<typeof postPayload>,
        Reply: TypeBox.Static<typeof seatsSchema>
    }>('/seats', {
        // @ts-ignore
        preHandler: app.auth([app.verifyAuthorized]),
        schema: {
            security: [{
                bearerAuth: [],
            }],
            tags: [tag],
            summary: 'Create new seats',
            body: postPayload,
            response: {
                200: seatsSchema,
                400: TypeBox.Type.Object({
                    statusCode: TypeBox.Type.Number({ default: 400 }),
                    error: TypeBox.Type.Optional(TypeBox.Type.String()),
                    message: TypeBox.Type.String(),
                }, { description: 'Validation error' }),
            },
        },
        // @ts-ignore
    }, async (req) => {
        const repo = getCustomRepository(SeatsRepository);
        const payload = omit(req.body.data, ['aircraft_code']);

        const { id } = await repo.save({
            ...payload,
            // @ts-ignore

                    aircraft_code: req.body.data.aircraft_code ? { id: req.body.data.aircraft_code } : undefined,

        });

        return repo.findOne({
            where: {
                id,
            },

            relations: ['aircraft_code']

        });
    });

    const find = TypeBox.Type.Object({
        id: TypeBox.Type.String({
            format: 'uuid',
        }),
    });

    app.get<{
        Params: TypeBox.Static<typeof find>,
        Reply: TypeBox.Static<typeof seatsSchema>
    }>('/seats/:id', {
        // @ts-ignore
        preHandler: app.auth([app.verifyAuthorized]),
        schema: {
            params: find,
            tags: [tag],
            summary: 'Get specific seats',
            security: [{
                bearerAuth: [],
            }],
            response: {
                200: seatsSchema,
                404: TypeBox.Type.Object({
                    statusCode: TypeBox.Type.Number({ default: 404 }),
                    error: TypeBox.Type.String({ default: 'Not Found' }),
                    message: TypeBox.Type.String(),
                }, { description: 'Seats not found' }),
            },
        }
    // @ts-ignore
    }, async (req, reply) => {
        const entity = await getCustomRepository(SeatsRepository).findOne({
            where: {
                id: req.params.id,
            },

            relations: ['aircraft_code']

        });

        return entity ? entity : reply.notFound('Seats not found');
    });

    const putSchema = TypeBox.Type.Object({
        id: TypeBox.Type.String({ format: 'uuid' }),
        data: TypeBox.Type.Partial(seatsInputSchema),
    });
    app.put<{
        Params: TypeBox.Static<typeof find>,
        Body: TypeBox.Static<typeof putSchema>,
    }>('/seats/:id', {
        // @ts-ignore
        preHandler: app.auth([app.verifyAdmin]),
        schema: {
            summary: 'Edit existing seats',
            params: find,
            body: putSchema,
            tags: [tag],
            security: [{
                bearerAuth: [],
            }],
        }
    }, async (req) => {
        const payload = omit(req.body.data, ['aircraft_code']);
        const repo = getCustomRepository(SeatsRepository);

        await repo.save({
            ...payload,
            // @ts-ignore

                aircraft_code: req.body.data.aircraft_code ? { id: req.body.data.aircraft_code } : undefined,

            id: req.params.id,
        });

        return repo.findOne({
            where: {
                id: req.params.id,
            },

            relations: ['aircraft_code']

        });
    });

    app.delete<{
        Params: TypeBox.Static<typeof find>,
    }>('/seats/:id', {
        // @ts-ignore
        preHandler: app.auth([app.verifyAdmin]),
        schema: {
            description: 'Delete seats',
            summary: 'Delete seats',
            params: find,
            tags: [tag],
            security: [{
                bearerAuth: [],
            }],
            response: {
                200: {
                    description: 'seats successfully deleted',
                    type: 'null',
                },
                404: TypeBox.Type.Object({
                    statusCode: TypeBox.Type.Number({ default: 404 }),
                    error: TypeBox.Type.String({ default: 'Not Found' }),
                    message: TypeBox.Type.String(),
                }, { description: 'seats not found' }),
            },
        }
    }, async (req, reply) => {
        const entity = await getCustomRepository(SeatsRepository).softDelete(req.params.id);
        if (!entity.affected) {
            reply.notFound('seats not found');
            return;
        }

        reply.code(200).send();
    });
}
