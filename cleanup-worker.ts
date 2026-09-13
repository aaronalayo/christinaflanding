interface Env {
  DB: D1Database;
}

export default {
  async scheduled(_controller: ScheduledController, env: Env): Promise<void> {
    await env.DB.prepare(
      "DELETE FROM bookings WHERE booking_date < date('now', '-90 days')"
    ).run();
  },

  async fetch(): Promise<Response> {
    return new Response('Not found', { status: 404 });
  },
} satisfies ExportedHandler<Env>;
