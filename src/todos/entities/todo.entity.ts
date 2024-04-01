import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'todos'})
export class Todo {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name: string;
}
