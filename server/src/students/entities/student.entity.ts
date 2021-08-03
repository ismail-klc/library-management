import { Borrow } from 'src/borrow/entities/borrow.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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

    @Column({ unique: true })
    email: string;

    @Column()
    schoolNumber: string;

    @Column()
    gender: Gender;

    @Column()
    class: string;

    @Column()
    verifyCode: number;

    @OneToMany(type => Borrow, type => type.student)
    borrows: Borrow[];

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: false })
    isVerified: boolean;
}
