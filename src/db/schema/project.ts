import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const project = pgTable("project", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
    description: text("description"),
    image: text("image").notNull(),
    stacks: text("stacks").array().notNull(),
    url: text("url").notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }),
    updatedAt: timestamp("updatedAt", { mode: "date" }),
});
