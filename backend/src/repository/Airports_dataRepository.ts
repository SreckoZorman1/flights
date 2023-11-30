import { EntityRepository, Repository } from 'typeorm';

import { Airports_data } from '../entity/Airports_data';
import { applyFilters, EntityQuery } from './airports_dataUtils';

@EntityRepository(Airports_data)
export class Airports_dataRepository extends Repository<Airports_data> {

    async filter(query: any | undefined, page: number, size: number, field: string | undefined, sort: "ASC" | "DESC" | undefined = "ASC", countOnly: boolean | undefined ): Promise<(any[] | Promise<number>)[] | Promise<[Airports_data[], number]>> {
        const qb = this.createQueryBuilder('e');
        applyFilters(qb, query);
        if(field) {
            const dbQuery = qb
              .skip(page * size)
              .take(size)
              .orderBy(`e.${field}`, sort)
              ;

            return countOnly ? [[], await dbQuery.getCount()] : dbQuery.getManyAndCount();
        } else {
            const dbQuery = qb
              .skip(page * size)
              .take(size)

            return countOnly ? [[], await dbQuery.getCount()] : dbQuery.getManyAndCount();
        }
    }
}
