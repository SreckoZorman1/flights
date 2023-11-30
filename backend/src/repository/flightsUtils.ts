import { SelectQueryBuilder } from 'typeorm';

export type EntityQuery<T> = {
    [K in keyof T]?: T[K];
};

/**
 * Applies filter query for any entity query builder
 */

export function applyFilters<T>(qb: SelectQueryBuilder<T>, query?: any) {

    let { status } = query;

    if(status){
        qb.where("e.status like :name", { name:  `%${status}%` });
    }
    let { aircraft_code } = query;

    if(aircraft_code){
        qb.where("e.aircraft_code like :name", { name:  `%${aircraft_code}%` });
    }
    let { flight_no } = query;

    if(flight_no){
        qb.where("e.flight_no like :name", { name:  `%${flight_no}%` });
    }
    return qb;
}
