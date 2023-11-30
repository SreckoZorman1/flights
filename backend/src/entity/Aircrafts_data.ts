import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    DeleteDateColumn,
    CreateDateColumn,
    UpdateDateColumn,

} from 'typeorm';
import * as TypeBox from '@sinclair/typebox';

import { Nullable } from '../utils';

/**
 * Schema for aircrafts_data entity
 */
// @ts-ignore
export const aircrafts_dataSchema = TypeBox.Type.Object({
    id: TypeBox.Type.String({ format: 'uuid' }),

        model: TypeBox.Type.String({ default: '' }),

        range: TypeBox.Type.Number({ default: 0 }),

        constraint: TypeBox.Type.String({ default: '' }),

        aircraft_code: TypeBox.Type.String({ default: '' }),

}, { additionalProperties: false });

/**
 * Input type for editing and creating aircrafts_data
 */
// @ts-ignore
export const aircrafts_dataInputSchema = TypeBox.Type.Object({

        model: TypeBox.Type.String({ default: '' }),

        range: TypeBox.Type.Number({ default: 0 }),

        constraint: TypeBox.Type.String({ default: '' }),

        aircraft_code: TypeBox.Type.String({ default: '' }),

}, { additionalProperties: false });

export type Aircrafts_dataInput = TypeBox.Static<typeof aircrafts_dataInputSchema>;

@Entity()
// @ts-ignore
export class Aircrafts_data implements TypeBox.Static<typeof aircrafts_dataSchema> {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

        @Column({ default: '' })
        model!: string;

        @Column({ type: 'integer', default: 0 })
        range!: number;

        @Column({ default: '' })
        constraint!: string;

        @Column({ default: '' })
        aircraft_code!: string;

}
