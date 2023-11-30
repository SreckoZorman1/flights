import { EntityRepository, Repository } from 'typeorm';

import { Flights } from '../entity/Flights';
import { applyFilters, EntityQuery } from './flightsUtils';

@EntityRepository(Flights)
export class FlightsRepository extends Repository<Flights> {

    async filter(query: any | undefined, page: number, size: number, field: string | undefined, sort: "ASC" | "DESC" | undefined = "ASC", countOnly: boolean | undefined ): Promise<(any[] | Promise<number>)[] | Promise<[Flights[], number]>> {
        const qb = this.createQueryBuilder('e');
        applyFilters(qb, query);
        if(field) {
            const dbQuery = qb
              .skip(page * size)
              .take(size)
              .orderBy(`e.${field}`, sort)

              .leftJoinAndSelect('e.departure_airport', 'departure_airport')

              .leftJoinAndSelect('e.arrival_airport', 'arrival_airport')
            ;

            return countOnly ? [[], await dbQuery.getCount()] : dbQuery.getManyAndCount();
        } else {
            const dbQuery = qb
              .skip(page * size)
              .take(size)

              .leftJoinAndSelect('e.departure_airport', 'departure_airport')

              .leftJoinAndSelect('e.arrival_airport', 'arrival_airport')

            return countOnly ? [[], await dbQuery.getCount()] : dbQuery.getManyAndCount();
        }
    }
}
