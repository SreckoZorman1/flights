import { SelectQueryBuilder } from 'typeorm';

export type EntityQuery<T> = {
    [K in keyof T]?: T[K];
};

/**
 * Applies filter query for any entity query builder
 */

export function applyFilters<T>(qb: SelectQueryBuilder<T>, query?: any) {

    let { seat_no } = query;

    if(seat_no){
        qb.where("e.seat_no like :name", { name:  `%${seat_no}%` });
    }
    let { fare_conditions } = query;

    if(fare_conditions){
        qb.where("e.fare_conditions like :name", { name:  `%${fare_conditions}%` });
    }
    return qb;
}
