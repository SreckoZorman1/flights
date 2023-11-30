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
 * Schema for airports_data entity
 */
// @ts-ignore
export const airports_dataSchema = TypeBox.Type.Object({
    id: TypeBox.Type.String({ format: 'uuid' }),

        airport_name: TypeBox.Type.String({ default: '' }),

        city: TypeBox.Type.String({ default: '' }),

        timezone: TypeBox.Type.String({ default: '' }),

        airport_code: TypeBox.Type.String({ default: '' }),

}, { additionalProperties: false });

/**
 * Input type for editing and creating airports_data
 */
// @ts-ignore
export const airports_dataInputSchema = TypeBox.Type.Object({

        airport_name: TypeBox.Type.String({ default: '' }),

        city: TypeBox.Type.String({ default: '' }),

        timezone: TypeBox.Type.String({ default: '' }),

        airport_code: TypeBox.Type.String({ default: '' }),

}, { additionalProperties: false });

export type Airports_dataInput = TypeBox.Static<typeof airports_dataInputSchema>;

@Entity()
// @ts-ignore
export class Airports_data implements TypeBox.Static<typeof airports_dataSchema> {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

        @Column({ default: '' })
        airport_name!: string;

        @Column({ default: '' })
        city!: string;

        @Column({ default: '' })
        timezone!: string;

        @Column({ default: '' })
        airport_code!: string;

}
