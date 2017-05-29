const TABLE_NAME = 'users';

export default {
    async find(ctx) {
        const users = await ctx.db.select().from(TABLE_NAME);
        ctx.body = users;
    }
}