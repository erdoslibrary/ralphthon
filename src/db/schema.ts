import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core'

// 아이디어 확정 후 스키마 작성
// 아래는 예시 — 대회 당일 삭제 후 실제 스키마로 교체

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
