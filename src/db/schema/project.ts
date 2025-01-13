import { pgTable, text } from "drizzle-orm/pg-core";

export const project = pgTable("project", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
    description: text("description").notNull(),
    image: text("image"),
    stacks: text("stacks").array().notNull(),
    url: text("url").notNull(),
});
