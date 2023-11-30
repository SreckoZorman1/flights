import { FastifyInstance } from 'fastify'
import { getCustomRepository, Like } from 'typeorm';
import * as TypeBox from '@sinclair/typebox';
import toString from 'lodash/toString';
import omit from 'lodash/omit';
import { parse } from 'json2csv';

import { FlightsRepository } from '../repository/FlightsRepository';
import { flightsInputSchema, flightsSchema } from '../entity/Flights';

export const tag = 'Flights';

export default async (app: FastifyInstance) => {
    const schema = TypeBox.Type.Object({
        q: TypeBox.Type.Optional(TypeBox.Type.Partial(flightsSchema, { description: 'Filter query', additionalProperties: false })),
        page: TypeBox.Type.Number({ default: 0, minimum: 0, description: 'Page number' }),
        limit: TypeBox.Type.Number({ minimum: 0, maximum: 100, default: 10, description: 'Page size' }),
        field: TypeBox.Type.String({default: ''}),
        sort: TypeBox.Type.String({default: 'DESC'}),
        filetype: TypeBox.Type.Optional(TypeBox.Type.String({default: ''})),
    status: TypeBox.Type.String({default: ''}),
    aircraft_code: TypeBox.Type.String({default: ''}),
    flight_no: TypeBox.Type.String({default: ''}),

    }, {
        style: 'deepObject',
    });

    app.get<{ Querystring: TypeBox.Static<typeof schema> }>('/flights', {
        // @ts-ignore
        preHandler: app.auth([app.verifyAuthorized]),
        schema: {
            querystring: schema,
            security: [{
                bearerAuth: [],
            }],
            tags: [tag],
            summary: 'List flights',
        },
    }, async (req) => {
        // @ts-ignore
        const [items, count] = await getCustomRepository(FlightsRepository).filter(req.query, req.query.page, req.query.limit, req.query.field, req.query.sort.toUpperCase());
        const fileType = req.query.filetype;
        if (fileType && fileType === 'csv') {
            const fields = ['id', 'status','aircraft_code','flight_no',

                'scheduled_departure','scheduled_arrival','actual_departure','actual_arrival',
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

    app.get<{ Querystring: TypeBox.Static<typeof schema> }>('/flights/count', {
        // @ts-ignore
        preHandler: app.auth([app.verifyAuthorized]),
        schema: {
            querystring: schema,
            security: [{
                bearerAuth: [],
            }],
            tags: [tag],
            summary: 'List flights',
        },
    }, async (req) => {
        // @ts-ignore
        const [items, count] = await getCustomRepository(FlightsRepository).filter(req.query, req.query.page, req.query.limit, req.query.field, req.query.sort.toUpperCase(), true);
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
    }>('/flights/autocomplete', {
        // @ts-ignore
        preHandler: app.auth([app.verifyAuthorized]),
        schema: {
            querystring: autocompleteSchema,
            security: [{
                bearerAuth: [],
            }],
            tags: [tag],
            summary: 'Find flights instance to link as relations',
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
        const repo = getCustomRepository(FlightsRepository);

        const items = await repo.createQueryBuilder('item')
          .select(['item.id'])

          .where("CAST(item.id as TEXT) LIKE :query", { query: `%${req.query.query}%` })

          .orderBy('item.id', 'ASC')
          .getMany();

        return items.map((item) => ({ id: item.id, label: toString(item.id) }));
    });

    const postPayload = TypeBox.Type.Object({
        data: flightsInputSchema,
    });
    app.post<{
        Body: TypeBox.Static<typeof postPayload>,
        Reply: TypeBox.Static<typeof flightsSchema>
    }>('/flights', {
        // @ts-ignore
        preHandler: app.auth([app.verifyAuthorized]),
        schema: {
            security: [{
                bearerAuth: [],
            }],
            tags: [tag],
            summary: 'Create new flights',
            body: postPayload,
            response: {
                200: flightsSchema,
                400: TypeBox.Type.Object({
                    statusCode: TypeBox.Type.Number({ default: 400 }),
                    error: TypeBox.Type.Optional(TypeBox.Type.String()),
                    message: TypeBox.Type.String(),
                }, { description: 'Validation error' }),
            },
        },
        // @ts-ignore
    }, async (req) => {
        const repo = getCustomRepository(FlightsRepository);
        const payload = omit(req.body.data, ['departure_airport', 'arrival_airport']);

        const { id } = await repo.save({
            ...payload,
            // @ts-ignore

                    departure_airport: req.body.data.departure_airport ? { id: req.body.data.departure_airport } : undefined,

                    arrival_airport: req.body.data.arrival_airport ? { id: req.body.data.arrival_airport } : undefined,

        });

        return repo.findOne({
            where: {
                id,
            },

            relations: ['departure_airport', 'arrival_airport']

        });
    });

    const find = TypeBox.Type.Object({
        id: TypeBox.Type.String({
            format: 'uuid',
        }),
    });

    app.get<{
        Params: TypeBox.Static<typeof find>,
        Reply: TypeBox.Static<typeof flightsSchema>
    }>('/flights/:id', {
        // @ts-ignore
        preHandler: app.auth([app.verifyAuthorized]),
        schema: {
            params: find,
            tags: [tag],
            summary: 'Get specific flights',
            security: [{
                bearerAuth: [],
            }],
            response: {
                200: flightsSchema,
                404: TypeBox.Type.Object({
                    statusCode: TypeBox.Type.Number({ default: 404 }),
                    error: TypeBox.Type.String({ default: 'Not Found' }),
                    message: TypeBox.Type.String(),
                }, { description: 'Flights not found' }),
            },
        }
    // @ts-ignore
    }, async (req, reply) => {
        const entity = await getCustomRepository(FlightsRepository).findOne({
            where: {
                id: req.params.id,
            },

            relations: ['departure_airport', 'arrival_airport']

        });

        return entity ? entity : reply.notFound('Flights not found');
    });

    const putSchema = TypeBox.Type.Object({
        id: TypeBox.Type.String({ format: 'uuid' }),
        data: TypeBox.Type.Partial(flightsInputSchema),
    });
    app.put<{
        Params: TypeBox.Static<typeof find>,
        Body: TypeBox.Static<typeof putSchema>,
    }>('/flights/:id', {
        // @ts-ignore
        preHandler: app.auth([app.verifyAdmin]),
        schema: {
            summary: 'Edit existing flights',
            params: find,
            body: putSchema,
            tags: [tag],
            security: [{
                bearerAuth: [],
            }],
        }
    }, async (req) => {
        const payload = omit(req.body.data, ['departure_airport', 'arrival_airport']);
        const repo = getCustomRepository(FlightsRepository);

        await repo.save({
            ...payload,
            // @ts-ignore

                departure_airport: req.body.data.departure_airport ? { id: req.body.data.departure_airport } : undefined,

                arrival_airport: req.body.data.arrival_airport ? { id: req.body.data.arrival_airport } : undefined,

            id: req.params.id,
        });

        return repo.findOne({
            where: {
                id: req.params.id,
            },

            relations: ['departure_airport', 'arrival_airport']

        });
    });

    app.delete<{
        Params: TypeBox.Static<typeof find>,
    }>('/flights/:id', {
        // @ts-ignore
        preHandler: app.auth([app.verifyAdmin]),
        schema: {
            description: 'Delete flights',
            summary: 'Delete flights',
            params: find,
            tags: [tag],
            security: [{
                bearerAuth: [],
            }],
            response: {
                200: {
                    description: 'flights successfully deleted',
                    type: 'null',
                },
                404: TypeBox.Type.Object({
                    statusCode: TypeBox.Type.Number({ default: 404 }),
                    error: TypeBox.Type.String({ default: 'Not Found' }),
                    message: TypeBox.Type.String(),
                }, { description: 'flights not found' }),
            },
        }
    }, async (req, reply) => {
        const entity = await getCustomRepository(FlightsRepository).softDelete(req.params.id);
        if (!entity.affected) {
            reply.notFound('flights not found');
            return;
        }

        reply.code(200).send();
    });
}
