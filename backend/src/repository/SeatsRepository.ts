import { EntityRepository, Repository } from 'typeorm';

import { Seats } from '../entity/Seats';
import { applyFilters, EntityQuery } from './seatsUtils';

@EntityRepository(Seats)
export class SeatsRepository extends Repository<Seats> {

    async filter(query: any | undefined, page: number, size: number, field: string | undefined, sort: "ASC" | "DESC" | undefined = "ASC", countOnly: boolean | undefined ): Promise<(any[] | Promise<number>)[] | Promise<[Seats[], number]>> {
        const qb = this.createQueryBuilder('e');
        applyFilters(qb, query);
        if(field) {
            const dbQuery = qb
              .skip(page * size)
              .take(size)
              .orderBy(`e.${field}`, sort)

              .leftJoinAndSelect('e.aircraft_code', 'aircraft_code')
            ;

            return countOnly ? [[], await dbQuery.getCount()] : dbQuery.getManyAndCount();
        } else {
            const dbQuery = qb
              .skip(page * size)
              .take(size)

              .leftJoinAndSelect('e.aircraft_code', 'aircraft_code')

            return countOnly ? [[], await dbQuery.getCount()] : dbQuery.getManyAndCount();
        }
    }
}
