import { FastifyInstance } from 'fastify'
import { getCustomRepository, Like } from 'typeorm';
import * as TypeBox from '@sinclair/typebox';
import toString from 'lodash/toString';
import omit from 'lodash/omit';
import { parse } from 'json2csv';

import { Airports_dataRepository } from '../repository/Airports_dataRepository';
import { airports_dataInputSchema, airports_dataSchema } from '../entity/Airports_data';

export const tag = 'Airports_data';

export default async (app: FastifyInstance) => {
    const schema = TypeBox.Type.Object({
        q: TypeBox.Type.Optional(TypeBox.Type.Partial(airports_dataSchema, { description: 'Filter query', additionalProperties: false })),
        page: TypeBox.Type.Number({ default: 0, minimum: 0, description: 'Page number' }),
        limit: TypeBox.Type.Number({ minimum: 0, maximum: 100, default: 10, description: 'Page size' }),
        field: TypeBox.Type.String({default: ''}),
        sort: TypeBox.Type.String({default: 'DESC'}),
        filetype: TypeBox.Type.Optional(TypeBox.Type.String({default: ''})),
    airport_name: TypeBox.Type.String({default: ''}),
    city: TypeBox.Type.String({default: ''}),
    timezone: TypeBox.Type.String({default: ''}),
    airport_code: TypeBox.Type.String({default: ''}),

    }, {
        style: 'deepObject',
    });

    app.get<{ Querystring: TypeBox.Static<typeof schema> }>('/airports_data', {
        // @ts-ignore
        preHandler: app.auth([app.verifyAuthorized]),
        schema: {
            querystring: schema,
            security: [{
                bearerAuth: [],
            }],
            tags: [tag],
            summary: 'List airports_data',
        },
    }, async (req) => {
        // @ts-ignore
        const [items, count] = await getCustomRepository(Airports_dataRepository).filter(req.query, req.query.page, req.query.limit, req.query.field, req.query.sort.toUpperCase());
        const fileType = req.query.filetype;
        if (fileType && fileType === 'csv') {
            const fields = ['id', 'airport_name','city','timezone','airport_code',

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

    app.get<{ Querystring: TypeBox.Static<typeof schema> }>('/airports_data/count', {
        // @ts-ignore
        preHandler: app.auth([app.verifyAuthorized]),
        schema: {
            querystring: schema,
            security: [{
                bearerAuth: [],
            }],
            tags: [tag],
            summary: 'List airports_data',
        },
    }, async (req) => {
        // @ts-ignore
        const [items, count] = await getCustomRepository(Airports_dataRepository).filter(req.query, req.query.page, req.query.limit, req.query.field, req.query.sort.toUpperCase(), true);
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
    }>('/airports_data/autocomplete', {
        // @ts-ignore
        preHandler: app.auth([app.verifyAuthorized]),
        schema: {
            querystring: autocompleteSchema,
            security: [{
                bearerAuth: [],
            }],
            tags: [tag],
            summary: 'Find airports_data instance to link as relations',
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
        const repo = getCustomRepository(Airports_dataRepository);

        const items = await repo.createQueryBuilder('item')
          .select(['item.id'])

          .where("CAST(item.id as TEXT) LIKE :query", { query: `%${req.query.query}%` })

          .orderBy('item.id', 'ASC')
          .getMany();

        return items.map((item) => ({ id: item.id, label: toString(item.id) }));
    });

    const postPayload = TypeBox.Type.Object({
        data: airports_dataInputSchema,
    });
    app.post<{
        Body: TypeBox.Static<typeof postPayload>,
        Reply: TypeBox.Static<typeof airports_dataSchema>
    }>('/airports_data', {
        // @ts-ignore
        preHandler: app.auth([app.verifyAuthorized]),
        schema: {
            security: [{
                bearerAuth: [],
            }],
            tags: [tag],
            summary: 'Create new airports_data',
            body: postPayload,
            response: {
                200: airports_dataSchema,
                400: TypeBox.Type.Object({
                    statusCode: TypeBox.Type.Number({ default: 400 }),
                    error: TypeBox.Type.Optional(TypeBox.Type.String()),
                    message: TypeBox.Type.String(),
                }, { description: 'Validation error' }),
            },
        },
        // @ts-ignore
    }, async (req) => {
        const repo = getCustomRepository(Airports_dataRepository);
        const payload = omit(req.body.data, []);

        const { id } = await repo.save({
            ...payload,
            // @ts-ignore

        });

        return repo.findOne({
            where: {
                id,
            },

        });
    });

    const find = TypeBox.Type.Object({
        id: TypeBox.Type.String({
            format: 'uuid',
        }),
    });

    app.get<{
        Params: TypeBox.Static<typeof find>,
        Reply: TypeBox.Static<typeof airports_dataSchema>
    }>('/airports_data/:id', {
        // @ts-ignore
        preHandler: app.auth([app.verifyAuthorized]),
        schema: {
            params: find,
            tags: [tag],
            summary: 'Get specific airports_data',
            security: [{
                bearerAuth: [],
            }],
            response: {
                200: airports_dataSchema,
                404: TypeBox.Type.Object({
                    statusCode: TypeBox.Type.Number({ default: 404 }),
                    error: TypeBox.Type.String({ default: 'Not Found' }),
                    message: TypeBox.Type.String(),
                }, { description: 'Airports_data not found' }),
            },
        }
    // @ts-ignore
    }, async (req, reply) => {
        const entity = await getCustomRepository(Airports_dataRepository).findOne({
            where: {
                id: req.params.id,
            },

        });

        return entity ? entity : reply.notFound('Airports_data not found');
    });

    const putSchema = TypeBox.Type.Object({
        id: TypeBox.Type.String({ format: 'uuid' }),
        data: TypeBox.Type.Partial(airports_dataInputSchema),
    });
    app.put<{
        Params: TypeBox.Static<typeof find>,
        Body: TypeBox.Static<typeof putSchema>,
    }>('/airports_data/:id', {
        // @ts-ignore
        preHandler: app.auth([app.verifyAdmin]),
        schema: {
            summary: 'Edit existing airports_data',
            params: find,
            body: putSchema,
            tags: [tag],
            security: [{
                bearerAuth: [],
            }],
        }
    }, async (req) => {
        const payload = omit(req.body.data, []);
        const repo = getCustomRepository(Airports_dataRepository);

        await repo.save({
            ...payload,
            // @ts-ignore

            id: req.params.id,
        });

        return repo.findOne({
            where: {
                id: req.params.id,
            },

        });
    });

    app.delete<{
        Params: TypeBox.Static<typeof find>,
    }>('/airports_data/:id', {
        // @ts-ignore
        preHandler: app.auth([app.verifyAdmin]),
        schema: {
            description: 'Delete airports_data',
            summary: 'Delete airports_data',
            params: find,
            tags: [tag],
            security: [{
                bearerAuth: [],
            }],
            response: {
                200: {
                    description: 'airports_data successfully deleted',
                    type: 'null',
                },
                404: TypeBox.Type.Object({
                    statusCode: TypeBox.Type.Number({ default: 404 }),
                    error: TypeBox.Type.String({ default: 'Not Found' }),
                    message: TypeBox.Type.String(),
                }, { description: 'airports_data not found' }),
            },
        }
    }, async (req, reply) => {
        const entity = await getCustomRepository(Airports_dataRepository).softDelete(req.params.id);
        if (!entity.affected) {
            reply.notFound('airports_data not found');
            return;
        }

        reply.code(200).send();
    });
}
