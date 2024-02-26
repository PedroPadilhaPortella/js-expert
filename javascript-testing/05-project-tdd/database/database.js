const database = {
  customers: [
    {
      id: "4179c11d-24ae-4fda-a1a7-4302dd558948",
      name: "Hattie",
      age: 20
    },
    {
      id: "534cf8b0-5063-4fb2-9fdf-d6d0eb1c2789",
      name: "Demetrius",
      age: 41
    },
    {
      id: "bcc8d72e-2e61-4e58-8b38-83e3ca6a6426",
      name: "Krystal",
      age: 49
    }
  ],
  cars: [
    {
      id: "8081f9e8-a22b-4c32-b331-8a1326f4d514",
      name: "Passenger Van",
      releaseYear: 2024,
      avaliable: true,
      gasAvaliable: true
    },
    {
      id: "70d7733c-8409-4b63-8536-6e410e054223",
      name: "Sedan",
      releaseYear: 2023,
      avaliable: true,
      gasAvaliable: true
    },
    {
      id: "52c9582a-ab7e-49dc-802f-a5cc6d668808",
      name: "Passenger Van",
      releaseYear: 2023,
      avaliable: true,
      gasAvaliable: true
    }
  ],
  carCategories: [
    {
      id: "2bf8e13d-3b68-4629-8fd9-7ca47e9d2db7",
      name: "Sedan",
      carIds: [
        "8081f9e8-a22b-4c32-b331-8a1326f4d514",
        "70d7733c-8409-4b63-8536-6e410e054223",
        "52c9582a-ab7e-49dc-802f-a5cc6d668808"
      ],
      price: "95.37"
    }
  ]
}

module.exports = database;
