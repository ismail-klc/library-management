import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum Gender {
    Male = 'Male',
    Female = 'Female',
    Other = 'Other'
}

@Entity('students')
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    birthDate: Date;

    @Column()
    schoolNumber: string;

    @Column()
    gender: Gender;

    @Column()
    class: string;

    @Column({ default: true })
    isActive: boolean;
}
