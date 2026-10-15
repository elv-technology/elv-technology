/** Shape of a Prisma record after a JSON round-trip: Date fields arrive as ISO strings. */
export type Serialized<T> = {
    [K in keyof T]: T[K] extends Date ? string : T[K] extends Date | null ? string | null : T[K];
};

/** A record as received by a client component, either straight from a server component or via JSON. */
export type ClientRecord<T> = T | Serialized<T>;

export type ImageValue = string | File | null;
