import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { User } from './User'
import { Book } from './Book'

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 50,
  })
  description: String

  @Column()
  completed: Boolean

  @ManyToOne((type) => Book, (book) => book.tasks)
  book: Book

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updatedAt: Date
}
