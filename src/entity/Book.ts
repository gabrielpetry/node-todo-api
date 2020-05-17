import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User } from './User'
import { Task } from './Task'

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 50,
  })
  name: String

  @Column({
    length: 255,
  })
  description: String

  @Column()
  active: Boolean

  @OneToMany((type) => Task, (tasks) => tasks.book)
  tasks: Task

  @ManyToOne((type) => User, (user) => user.books)
  user: User

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updatedAt: Date
}
