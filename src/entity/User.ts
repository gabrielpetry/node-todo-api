import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  AfterLoad,
  Unique,
} from 'typeorm'
import { Book } from './Book'
import * as bcrypt from 'bcryptjs'

const SALT_WORK_FACTOR = 10

@Entity()
@Unique(['username', 'email'])
export class User {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({
    length: 50,
  })
  public username: string

  @Column({
    length: 100,
  })
  public email: string

  @Column()
  public password: string

  @OneToMany((type) => Book, (book) => book.user)
  public books: Book

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  public updatedAt: Date

  @BeforeInsert()
  private encryptPasswordInsert(): void {
    console.log('encrypting')

    return this.encryptPassword()
  }

  @BeforeUpdate()
  private encryptPasswordUpdate(): void {
    if (this.newPassword !== this.password) {
      return this.encryptPassword()
    }
  }

  // after initialize the model, loads the old password into var
  @AfterLoad()
  private loadTempPassword(): void {
    this.newPassword = this.password
  }

  private newPassword: string

  private encryptPassword(): void {
    // generate a salt
    console.log('encrypting')
    const hash = bcrypt.genSaltSync(SALT_WORK_FACTOR, (err, salt) => {
      if (err) {
        console.log(`Error hashing password: ${err}`)
        return err
      }
      // hash the password
      return bcrypt.hashSync(this.password, salt, (err, hash) => {
        if (err) {
          console.log(`Error hashing password ${err}`)
          return err
        }
        return hash
      })
    })

    if (hash) {
      this.password = hash
    }
  }

  public async comparePasswords(challenge) {
    return await bcrypt.compare(challenge, this.password)
  }

  public clearPassword() {
    this.password = undefined
    this.newPassword = undefined
  }
}
