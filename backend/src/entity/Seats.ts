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

import { Aircrafts_data, aircrafts_dataSchema } from './Aircrafts_data';

import { Nullable } from '../utils';

/**
 * Schema for seats entity
 */
// @ts-ignore
export const seatsSchema = TypeBox.Type.Object({
    id: TypeBox.Type.String({ format: 'uuid' }),

        seat_no: TypeBox.Type.String({ default: '' }),

        fare_conditions: TypeBox.Type.String({ default: '' }),

        aircraft_code: TypeBox.Type.Optional(Nullable(aircrafts_dataSchema)),

}, { additionalProperties: false });

/**
 * Input type for editing and creating seats
 */
// @ts-ignore
export const seatsInputSchema = TypeBox.Type.Object({

        seat_no: TypeBox.Type.String({ default: '' }),

        fare_conditions: TypeBox.Type.String({ default: '' }),

        aircraft_code: TypeBox.Type.Optional(TypeBox.Type.String()),

}, { additionalProperties: false });

export type SeatsInput = TypeBox.Static<typeof seatsInputSchema>;

@Entity()
// @ts-ignore
export class Seats implements Omit<TypeBox.Static<typeof seatsSchema>, 'aircraft_code'> {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

        @Column({ default: '' })
        seat_no!: string;

        @Column({ default: '' })
        fare_conditions!: string;

        @ManyToOne(() => Aircrafts_data, { cascade: true })
    @JoinColumn()
        aircraft_code?: Aircrafts_data;

}
