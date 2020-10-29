import json

stub_spots = [
    {
        "id": 0,
        "name": "Surf Coffee x Solyanka",
        "geo": "55.754071, 37.637366",

    },
    {
        "id": 1,
        "name": "Surf Coffee x Mayak",
        "geo": "55.767694, 37.599575",

    },
    {
        "id": 2,
        "name": "Surf Coffee x Secret Spot",
        "geo": "55.721572, 37.611835",

    },
    {
        "id": 3,
        "name": "Surf Coffee x Sport",
        "geo": "55.724723, 37.562360",

    },
    {
        "id": 4,
        "name": "Surf Coffee x G-SPOT",
        "geo": "55.761177, 37.632409",

    }
]

item_id = 1

if item_id in stub_spots:
  print(stub_spots[item_id])


