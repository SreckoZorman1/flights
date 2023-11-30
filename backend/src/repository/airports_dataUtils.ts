import { SelectQueryBuilder } from 'typeorm';

export type EntityQuery<T> = {
    [K in keyof T]?: T[K];
};

/**
 * Applies filter query for any entity query builder
 */

export function applyFilters<T>(qb: SelectQueryBuilder<T>, query?: any) {

    let { airport_name } = query;

    if(airport_name){
        qb.where("e.airport_name like :name", { name:  `%${airport_name}%` });
    }
    let { city } = query;

    if(city){
        qb.where("e.city like :name", { name:  `%${city}%` });
    }
    let { timezone } = query;

    if(timezone){
        qb.where("e.timezone like :name", { name:  `%${timezone}%` });
    }
    let { airport_code } = query;

    if(airport_code){
        qb.where("e.airport_code like :name", { name:  `%${airport_code}%` });
    }
    return qb;
}
