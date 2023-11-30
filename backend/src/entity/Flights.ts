import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    DeleteDateColumn,
    CreateDateColumn,
    UpdateDateColumn,

    ManyToOne,
    JoinColumn,

} from 'typeorm';
import * as TypeBox from '@sinclair/typebox';

import { Airports_data, airports_dataSchema } from './Airports_data';

import { Nullable } from '../utils';

/**
 * Schema for flights entity
 */
// @ts-ignore
export const flightsSchema = TypeBox.Type.Object({
    id: TypeBox.Type.String({ format: 'uuid' }),

        scheduled_departure: TypeBox.Type.String({ format: 'date-time' }),

        scheduled_arrival: TypeBox.Type.String({ format: 'date-time' }),

        status: TypeBox.Type.String({ default: '' }),

        aircraft_code: TypeBox.Type.String({ default: '' }),

        actual_departure: TypeBox.Type.String({ format: 'date-time' }),

        actual_arrival: TypeBox.Type.String({ format: 'date-time' }),

        flight_no: TypeBox.Type.String({ default: '' }),

        departure_airport: TypeBox.Type.Optional(Nullable(airports_dataSchema)),

        arrival_airport: TypeBox.Type.Optional(Nullable(airports_dataSchema)),

}, { additionalProperties: false });

/**
 * Input type for editing and creating flights
 */
// @ts-ignore
export const flightsInputSchema = TypeBox.Type.Object({

        scheduled_departure: TypeBox.Type.String({ format: 'date-time' }),

        scheduled_arrival: TypeBox.Type.String({ format: 'date-time' }),

        status: TypeBox.Type.String({ default: '' }),

        aircraft_code: TypeBox.Type.String({ default: '' }),

        actual_departure: TypeBox.Type.String({ format: 'date-time' }),

        actual_arrival: TypeBox.Type.String({ format: 'date-time' }),

        flight_no: TypeBox.Type.String({ default: '' }),

        departure_airport: TypeBox.Type.Optional(TypeBox.Type.String()),

        arrival_airport: TypeBox.Type.Optional(TypeBox.Type.String()),

}, { additionalProperties: false });

export type FlightsInput = TypeBox.Static<typeof flightsInputSchema>;

@Entity()
// @ts-ignore
export class Flights implements Omit<TypeBox.Static<typeof flightsSchema>, 'scheduled_departure' | 'scheduled_arrival' | 'actual_departure' | 'actual_arrival' | 'departure_airport' | 'arrival_airport'> {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

        @Column({ type: 'timestamptz', nullable: true })
        scheduled_departure?: Date;

        @Column({ type: 'timestamptz', nullable: true })
        scheduled_arrival?: Date;

        @Column({ default: '' })
        status!: string;

        @Column({ default: '' })
        aircraft_code!: string;

        @Column({ type: 'timestamptz', nullable: true })
        actual_departure?: Date;

        @Column({ type: 'timestamptz', nullable: true })
        actual_arrival?: Date;

        @Column({ default: '' })
        flight_no!: string;

        @ManyToOne(() => Airports_data, { cascade: true })
    @JoinColumn()
        departure_airport?: Airports_data;

        @ManyToOne(() => Airports_data, { cascade: true })
    @JoinColumn()
        arrival_airport?: Airports_data;

}
