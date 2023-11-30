import { SelectQueryBuilder } from 'typeorm';

export type EntityQuery<T> = {
    [K in keyof T]?: T[K];
};

/**
 * Applies filter query for any entity query builder
 */

export function applyFilters<T>(qb: SelectQueryBuilder<T>, query?: any) {

    let { model } = query;

    if(model){
        qb.where("e.model like :name", { name:  `%${model}%` });
    }
    let { constraint } = query;

    if(constraint){
        qb.where("e.constraint like :name", { name:  `%${constraint}%` });
    }
    let { aircraft_code } = query;

    if(aircraft_code){
        qb.where("e.aircraft_code like :name", { name:  `%${aircraft_code}%` });
    }
    return qb;
}
