import "server-only";

/** An expected failure carrying the HTTP status the route should respond with. */
export class HttpError extends Error {
    constructor(public status: number, message: string) {
        super(message);
    }
}
