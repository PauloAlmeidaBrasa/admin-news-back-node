import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("client").del();

    // Inserts seed entries
    await knex("client").insert([
        { id: 1, name: 'Acme Corporation', address: '123 Business Rd, New York, NY 10001' },
        { id: 2, name: 'Globex Corporation', address: '456 Industry Ave, Chicago, IL 60601' },
        { id: 3, name: 'Initech', address: '789 Technology Blvd, San Francisco, CA 94103' },
        { id: 4, name: 'Umbrella Corporation', address: '100 Research Park, Raccoon City' }
    ]);
};
