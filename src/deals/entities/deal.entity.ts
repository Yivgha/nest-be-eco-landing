import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Deal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 40 })
  name: string;

  @Column({ type: 'varchar' })
  total_dhs: string;

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0.0 })
  yield_amount: string;

  @Column({ type: 'varchar' })
  sold: string;

  @Column({ type: 'varchar' })
  ticket_dhs: string;

  @Column({ type: 'varchar' })
  days_left: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  deal_img_path: string;
}
